const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models/Simple');
const { PasswordReset } = require('../models/PasswordReset');
const { Op } = require('sequelize');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const register = async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ message: 'Please provide full name, email, and password' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    const existingUser = await User.findOne({ where: { email } });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ 
      full_name, 
      email, 
      password_hash: password, 
      role: role || 'student' 
    });
    
    const token = generateToken(user.id);
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    await PasswordReset.create({
      user_id: user.id,
      email: user.email,
      reset_token: resetToken,
      expires_at: expiresAt
    });

    res.json({
      message: 'Password reset token generated',
      resetToken,
      expiresIn: '1 hour'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const resetRecord = await PasswordReset.findOne({
      where: {
        reset_token: token,
        used: false,
        expires_at: { [Op.gt]: new Date() }
      }
    });

    if (!resetRecord) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const user = await User.findByPk(resetRecord.user_id);
    user.password_hash = newPassword;
    await user.save();

    resetRecord.used = true;
    await resetRecord.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register, login, forgotPassword, resetPassword };