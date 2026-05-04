const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ecosystem = require('../models/Ecosystem');
const { ecosystemData } = require('../seed/seedData');

const isDBConnected = () => mongoose.connection.readyState === 1;

// GET /api/ecosystems
router.get('/', async (req, res) => {
  try {
    if (isDBConnected()) {
      const ecosystems = await Ecosystem.find();
      return res.json(ecosystems);
    }
    res.json(ecosystemData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/ecosystems/type/:type
router.get('/type/:type', async (req, res) => {
  try {
    const type = req.params.type;
    if (isDBConnected()) {
      const ecosystems = await Ecosystem.find({ type });
      return res.json(ecosystems);
    }
    const data = ecosystemData.filter(e => e.type === type);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/ecosystems/:id
router.get('/:id', async (req, res) => {
  try {
    if (isDBConnected()) {
      const ecosystem = await Ecosystem.findById(req.params.id);
      if (!ecosystem) return res.status(404).json({ message: 'Ecosystem not found' });
      return res.json(ecosystem);
    }
    const ecosystem = ecosystemData.find(e => e._id === req.params.id);
    if (!ecosystem) return res.status(404).json({ message: 'Ecosystem not found' });
    res.json(ecosystem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
