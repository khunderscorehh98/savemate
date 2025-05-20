const Goal = require('../models/Goal');

// Create goal
exports.createGoal = async (req, res) => {
  try {
    const { title, target_amount, saved_amount, description } = req.body;
    const goal = await Goal.create({
      user_id: req.user.id,
      title,
      target_amount,
      saved_amount,
      description
    });
    res.status(201).json({ message: 'Goal created.', goal });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create goal.', error: err.message });
  }
};

// Get all user goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user_id: req.user.id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get goals.', error: err.message });
  }
};

// Update goal
exports.updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Goal.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Goal not found.' });
    res.json({ message: 'Goal updated.', goal: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update goal.', error: err.message });
  }
};

// Delete goal
exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Goal.findOneAndDelete({ _id: id, user_id: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Goal not found.' });
    res.json({ message: 'Goal deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete goal.', error: err.message });
  }
};
