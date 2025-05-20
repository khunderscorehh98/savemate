const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');

router.post('/register', register);
// router.post('/login', login);
router.get('/me', protect, getProfile);
router.post('/login', (req, res, next) => {
    console.log('🛬 /api/auth/login route reached');
    next();
  }, login);
  

module.exports = router;
