require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Species = require('../models/Species');
const Ecosystem = require('../models/Ecosystem');
const { speciesData, ecosystemData } = require('./seedData');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecosphere';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Species.deleteMany({});
    await Ecosystem.deleteMany({});
    console.log('Cleared existing data');

    await Species.insertMany(speciesData);
    console.log(`Inserted ${speciesData.length} species`);

    await Ecosystem.insertMany(ecosystemData);
    console.log(`Inserted ${ecosystemData.length} ecosystems`);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
