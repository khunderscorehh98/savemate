const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  month: {
    type: String, // Format: 'YYYY-MM'
    required: true
  },
  auto_reset: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
