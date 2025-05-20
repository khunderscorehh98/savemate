const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
  res.send('SaveMate API is live 🚀');
});

// Add after other middleware
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const budgetRoutes = require('./routes/budgetRoutes');
app.use('/api/budgets', budgetRoutes);

const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/expenses', expenseRoutes);

const goalRoutes = require('./routes/goalRoutes');
app.use('/api/goals', goalRoutes);

const subscriptionRoutes = require('./routes/subscriptionRoutes');
app.use('/api/subscription', subscriptionRoutes);

module.exports = app;
