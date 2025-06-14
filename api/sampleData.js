const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const User = require('./models/User');
const Budget = require('./models/Budget');
const Expense = require('./models/Expense');
const Goal = require('./models/Goal');

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  await User.deleteMany({});
  await Budget.deleteMany({});
  await Expense.deleteMany({});
  await Goal.deleteMany({});

  const password = await bcrypt.hash('password123', 10);
  const user = await User.create({
    name: 'Test User',
    email: 'test@example.com',
    password
  });

  const budgets = [
    { user_id: user._id, amount: 1000, month: '2024-01', auto_reset: true },
    { user_id: user._id, amount: 1200, month: '2024-02', auto_reset: true }
  ];

  const expenses = [
    { user_id: user._id, amount: 50, category: 'Food', note: 'Groceries', date: new Date('2024-01-05') },
    { user_id: user._id, amount: 30, category: 'Transport', note: 'Bus pass', date: new Date('2024-01-07') }
  ];

  const goals = [
    { user_id: user._id, title: 'New Laptop', target_amount: 1500, saved_amount: 100 }
  ];

  await Budget.insertMany(budgets);
  await Expense.insertMany(expenses);
  await Goal.insertMany(goals);

  console.log('Sample data inserted');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
