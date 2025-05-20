const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  is_premium: {
    type: Boolean,
    default: false
  },
  subscription_expiry: {
    type: Date,
    default: null
  },
  settings: {
    currency: {
      type: String,
      default: 'BND'
    },
    budget_reset_day: {
      type: Number,
      default: 1
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
