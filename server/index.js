const express = require('express');
const cors = require('cors');
const apps = require('./data');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/apps/:brand', (req, res) => {
  const { brand } = req.params;
  const brandName = brand.toLowerCase();

  if (!brandName) {
    return res.status(400).json({ message: 'Brand name is required' });
  }

  const results = apps.filter(app => app.brand.toLowerCase() === brandName);

  if (results.length === 0) {
    return res.status(404).json({ message: `No apps found for brand: ${brand}` });
  }

  res.json(results);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
