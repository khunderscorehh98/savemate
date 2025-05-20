const Budget = require('../models/Budget');

// Add or update monthly budget
exports.setBudget = async (req, res) => {
  try {
    const { amount, month, auto_reset } = req.body;

    let budget = await Budget.findOne({ user_id: req.user.id, month });

    if (budget) {
      budget.amount = amount;
      budget.auto_reset = auto_reset;
      await budget.save();
    } else {
      budget = await Budget.create({ user_id: req.user.id, amount, month, auto_reset });
    }

    res.status(200).json({ message: 'Budget saved successfully.', budget });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save budget.', error: err.message });
  }
};

// Get current month's budget
exports.getBudget = async (req, res) => {
  try {
    const { month } = req.params;
    const budget = await Budget.findOne({ user_id: req.user.id, month });
    if (!budget) return res.status(404).json({ message: 'Budget not found.' });

    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: 'Could not retrieve budget.', error: err.message });
  }
};
