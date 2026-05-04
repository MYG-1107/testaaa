require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const speciesRoutes = require('./routes/species');
const ecosystemRoutes = require('./routes/ecosystems');
const authRoutes = require('./routes/auth');
const favoritesRoutes = require('./routes/favorites');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecosphere';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection failed, using in-memory fallback:', err.message));

// Routes
app.use('/api/species', speciesRoutes);
app.use('/api/ecosystems', ecosystemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'EcoSphere API is running', version: '1.0.0' });
});

app.listen(PORT, () => {
  console.log(`EcoSphere server running on port ${PORT}`);
});
