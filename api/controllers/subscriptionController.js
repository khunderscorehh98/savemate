const User = require('../models/User');

// GET /api/subscription/status
exports.getSubscriptionStatus = async (req, res) => {
  const { is_premium, subscription_expiry } = req.user;
  const valid = is_premium && (!subscription_expiry || new Date(subscription_expiry) > new Date());
  res.json({ is_premium, subscription_expiry, valid });
};

// POST /api/subscription/start (Mock only for now)
exports.startMockSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.is_premium = true;
    user.subscription_expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // +30 days
    await user.save();

    res.json({ message: 'Mock Premium started (30 days).', user });
  } catch (err) {
    res.status(500).json({ message: 'Subscription failed.', error: err.message });
  }
};
