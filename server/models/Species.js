const mongoose = require('mongoose');

const speciesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  commonName: { type: String },
  habitat: { type: String },
  conservationStatus: {
    type: String,
    enum: ['Critically Endangered', 'Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern', 'Extinct'],
    required: true
  },
  region: { type: String },
  description: { type: String },
  image: { type: String },
  diet: { type: String },
  lifespan: { type: String },
  weight: { type: String },
  height: { type: String },
  funFacts: [{ type: String }],
  threats: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Species', speciesSchema);
