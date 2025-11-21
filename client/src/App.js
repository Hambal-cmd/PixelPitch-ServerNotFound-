import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [brandName, setBrandName] = useState('');
  const [apps, setApps] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    setMessage('');
    setApps([]);
    try {
      const response = await axios.get(`http://localhost:5000/api/apps/${brandName}`);
      setApps(response.data);
      if (response.data.length === 0) {
        setMessage('No apps found for this brand.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage(`No apps found for brand: ${brandName}`);
      } else {
        setMessage('Error fetching data. Please ensure the backend server is running.');
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fake App Detector</h1>
      </header>
      <main>
        <div className="search-section">
          <input
            type="text"
            placeholder="Enter brand name (e.g., gpay, phonepe, paytm)"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {message && <p className="message">{message}</p>}

        {apps.length > 0 && (
          <div className="results-section">
            <h2>Search Results for "{brandName}"</h2>
            <table>
              <thead>
                <tr>
                  <th>App Name</th>
                  <th>Package Name</th>
                  <th>Developer</th>
                  <th>Risk Score</th>
                  <th>Genuine?</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((app) => (
                  <tr key={app.id} className={app.isGenuine ? 'genuine' : 'fake'}>
                    <td>{app.appName}</td>
                    <td>{app.packageName}</td>
                    <td>{app.developer}</td>
                    <td>{app.riskScore}</td>
                    <td>{app.isGenuine ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;