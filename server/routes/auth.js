const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'ecosphere_secret_key_2024';
const isDBConnected = () => mongoose.connection.readyState === 1;

// In-memory users fallback
const inMemoryUsers = [];

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: 'All fields are required' });
    // Ensure inputs are strings to prevent NoSQL injection via object payloads
    if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string')
      return res.status(400).json({ message: 'Invalid input' });

    if (isDBConnected()) {
      const existing = await User.findOne({
        $or: [{ email: { $eq: email } }, { username: { $eq: username } }]
      });
      if (existing) return res.status(400).json({ message: 'User already exists' });
      const user = new User({ username, email, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({ token, user: { id: user._id, username, email } });
    }

    // In-memory fallback
    if (inMemoryUsers.find(u => u.email === email || u.username === username))
      return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now().toString(), username, email, password: hashedPassword, favorites: [] };
    inMemoryUsers.push(user);
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user.id, username, email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });
    if (typeof email !== 'string' || typeof password !== 'string')
      return res.status(400).json({ message: 'Invalid input' });

    if (isDBConnected()) {
      const user = await User.findOne({ email: { $eq: email } });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
      const match = await user.comparePassword(password);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    }

    // In-memory fallback
    const user = inMemoryUsers.find(u => u.email === email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    if (isDBConnected()) {
      const user = await User.findById(req.userId).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json(user);
    }
    const user = inMemoryUsers.find(u => u.id === req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
