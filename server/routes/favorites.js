const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Species = require('../models/Species');
const authMiddleware = require('../middleware/auth');
const { speciesData } = require('../seed/seedData');

const isDBConnected = () => mongoose.connection.readyState === 1;

// In-memory favorites store (maps userId -> [speciesId])
const inMemoryFavorites = {};

// GET /api/favorites
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (isDBConnected()) {
      const user = await User.findById(req.userId).populate('favorites');
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json(user.favorites);
    }
    const favIds = inMemoryFavorites[req.userId] || [];
    const favSpecies = speciesData.filter(s => favIds.includes(s._id));
    res.json(favSpecies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/favorites/:speciesId
router.post('/:speciesId', authMiddleware, async (req, res) => {
  try {
    const { speciesId } = req.params;
    if (isDBConnected()) {
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (!user.favorites.includes(speciesId)) {
        user.favorites.push(speciesId);
        await user.save();
      }
      return res.json({ message: 'Added to favorites', favorites: user.favorites });
    }
    if (!inMemoryFavorites[req.userId]) inMemoryFavorites[req.userId] = [];
    if (!inMemoryFavorites[req.userId].includes(speciesId)) {
      inMemoryFavorites[req.userId].push(speciesId);
    }
    res.json({ message: 'Added to favorites', favorites: inMemoryFavorites[req.userId] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/favorites/:speciesId
router.delete('/:speciesId', authMiddleware, async (req, res) => {
  try {
    const { speciesId } = req.params;
    if (isDBConnected()) {
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      user.favorites = user.favorites.filter(id => id.toString() !== speciesId);
      await user.save();
      return res.json({ message: 'Removed from favorites', favorites: user.favorites });
    }
    if (inMemoryFavorites[req.userId]) {
      inMemoryFavorites[req.userId] = inMemoryFavorites[req.userId].filter(id => id !== speciesId);
    }
    res.json({ message: 'Removed from favorites', favorites: inMemoryFavorites[req.userId] || [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
