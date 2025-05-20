const Expense = require('../models/Expense');

// Add new expense
exports.addExpense = async (req, res) => {
  try {
    const { amount, category, note, date } = req.body;

    const expense = await Expense.create({
      user_id: req.user.id,
      amount,
      category,
      note,
      date
    });

    res.status(201).json({ message: 'Expense added.', expense });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add expense.', error: err.message });
  }
};

// Get all expenses for user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user_id: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve expenses.', error: err.message });
  }
};

// Edit an expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Expense.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Expense not found.' });

    res.json({ message: 'Expense updated.', expense: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update expense.', error: err.message });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.findOneAndDelete({ _id: id, user_id: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Expense not found.' });

    res.json({ message: 'Expense deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete expense.', error: err.message });
  }
};
