const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Species = require('../models/Species');
const { speciesData } = require('../seed/seedData');

const isDBConnected = () => mongoose.connection.readyState === 1;

// Escape special regex characters to prevent ReDoS
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// GET /api/species
router.get('/', async (req, res) => {
  try {
    const { status, region, search } = req.query;
    if (isDBConnected()) {
      let query = {};
      if (status) query.conservationStatus = status;
      if (region) query.region = region;
      if (search) {
        const safeSearch = escapeRegex(String(search).slice(0, 100));
        query.$or = [
          { name: { $regex: safeSearch, $options: 'i' } },
          { commonName: { $regex: safeSearch, $options: 'i' } },
          { habitat: { $regex: safeSearch, $options: 'i' } }
        ];
      }
      const species = await Species.find(query);
      return res.json(species);
    }
    // In-memory fallback
    let data = [...speciesData];
    if (status) data = data.filter(s => s.conservationStatus === status);
    if (region) data = data.filter(s => s.region === region);
    if (search) {
      const s = search.toLowerCase();
      data = data.filter(sp =>
        sp.name.toLowerCase().includes(s) ||
        (sp.commonName && sp.commonName.toLowerCase().includes(s)) ||
        (sp.habitat && sp.habitat.toLowerCase().includes(s))
      );
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/species/:id
router.get('/:id', async (req, res) => {
  try {
    if (isDBConnected()) {
      const species = await Species.findById(req.params.id);
      if (!species) return res.status(404).json({ message: 'Species not found' });
      return res.json(species);
    }
    const species = speciesData.find(s => s._id === req.params.id);
    if (!species) return res.status(404).json({ message: 'Species not found' });
    res.json(species);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
