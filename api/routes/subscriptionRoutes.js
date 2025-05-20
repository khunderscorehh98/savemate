const express = require('express');
const router = express.Router();
const { getSubscriptionStatus, startMockSubscription } = require('../controllers/subscriptionController');
const protect = require('../middlewares/authMiddleware');

router.get('/status', protect, getSubscriptionStatus);
router.post('/start', protect, startMockSubscription); // Replace with Stripe flow later

module.exports = router;
