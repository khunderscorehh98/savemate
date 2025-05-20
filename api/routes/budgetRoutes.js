const express = require('express');
const router = express.Router();
const { setBudget, getBudget } = require('../controllers/budgetController');
const protect = require('../middlewares/authMiddleware');

router.post('/', protect, setBudget);
router.get('/:month', protect, getBudget);

module.exports = router;
