const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists.' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed.', error: err.message });
  }
};

exports.login = async (req, res) => {
    try {
      console.log('📥 Login request received');
      console.log('🔍 Body:', req.body);
  
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log('👤 User found:', user);
  
      if (!user) return res.status(400).json({ message: 'Invalid credentials.' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('🔑 Password match:', isMatch);
  
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          is_premium: user.is_premium
        }
      });
    } catch (err) {
      console.error('❌ Login Error:', err);
      res.status(500).json({ message: 'Login failed.', error: err.message });
    }
  };
  

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch profile.', error: err.message });
  }
};
