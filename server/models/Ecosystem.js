const mongoose = require('mongoose');

const ecosystemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['Forest', 'Ocean', 'Desert', 'Wetlands', 'Grassland', 'Tundra'],
    required: true
  },
  description: { type: String },
  keySpecies: [{ type: String }],
  threats: [{ type: String }],
  image: { type: String },
  climate: { type: String },
  area: { type: String },
  biodiversityIndex: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Ecosystem', ecosystemSchema);
