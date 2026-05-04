const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Species = require('../models/Species');
const { speciesData } = require('../seed/seedData');

const isDBConnected = () => mongoose.connection.readyState === 1;

const VALID_STATUSES = new Set(['Critically Endangered', 'Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern', 'Extinct']);
const VALID_REGIONS = new Set(['Africa', 'Asia', 'North America', 'Central America', 'Ocean', 'Arctic', 'Europe/Asia']);

// Allowlist sanitizer: only permit letters, digits, spaces, and hyphens
function sanitizeSearch(str) {
  return String(str).slice(0, 100).replace(/[^a-zA-Z0-9\s\-]/g, '');
}

// GET /api/species
router.get('/', async (req, res) => {
  try {
    const { status, region, search } = req.query;
    if (isDBConnected()) {
      // Apply enum/exact-match filters at DB level; apply search in application code
      let query = {};
      if (status) query.conservationStatus = status;
      if (region) query.region = region;
      let species = await Species.find(query).lean();
      // Post-query text filter to avoid user input in DB regex
      if (search) {
        const s = sanitizeSearch(search).toLowerCase();
        if (s) {
          species = species.filter(sp =>
            sp.name.toLowerCase().includes(s) ||
            (sp.commonName && sp.commonName.toLowerCase().includes(s)) ||
            (sp.habitat && sp.habitat.toLowerCase().includes(s))
          );
        }
      }
      return res.json(species);
    }
    // In-memory fallback
    let data = [...speciesData];
    if (status) data = data.filter(s => s.conservationStatus === status);
    if (region) data = data.filter(s => s.region === region);
    if (search) {
      const s = sanitizeSearch(search).toLowerCase();
      if (s) {
        data = data.filter(sp =>
          sp.name.toLowerCase().includes(s) ||
          (sp.commonName && sp.commonName.toLowerCase().includes(s)) ||
          (sp.habitat && sp.habitat.toLowerCase().includes(s))
        );
      }
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
