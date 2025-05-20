// src/router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import { component } from 'vue/types/umd'

// Views (lazy-loaded)
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: () => import('@/views/HomeView.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('@/views/Register.vue') },

  { path: '/dashboard', name: 'Dashboard', component: () => import('@/views/Dashboard.vue'), meta: { requiresAuth: true } },
  { path: '/budgets', name: 'Budgets', component: () => import('@/views/Budget.vue'), meta: { requiresAuth: true } },
  { path: '/goals', name: 'Goals', component: () => import('@/views/Goals.vue'), meta: { requiresAuth: true } },
  { path: '/transactions', name: 'Transactions', component: () => import('@/views/Transactions.vue'), meta: { requiresAuth: true } },
  { path: '/transaction-form', name: 'TransactionForm', component: () => import('@/views/TransactionForm.vue'), meta: { requiresAuth: true } },
  { path: '/transaction/:id', name: 'TransactionDetail', component: () => import('@/views/TransactionDetail.vue'), meta: { requiresAuth: true } },

  { path: '/categories', name: 'Categories', component: () => import('@/views/Categories.vue'), meta: { requiresAuth: true } },
  { path: '/category-form', name: 'CategoriesForm', component: () => import('@/views/CategoriesForm.vue'), meta: { requiresAuth: true } },
  { path: '/forecast', name: 'Forecast', component: () => import('@/views/Forecast.vue'), meta: { requiresAuth: true } },
  { path: '/forecast-form', name: 'ForecastForm', component: () => import('@/views/ForecastForm.vue'), meta: { requiresAuth: true } },
  { path: '/reports', name: 'Reports', component: () => import('@/views/Reports.vue'), meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: () => import('@/views/Profile.vue'), meta: { requiresAuth: true } },
  { path: '/about', name: 'About', component: () => import('@/views/AboutView.vue') },
  
  // Premium Pages
  { path: '/advance-analytics', name: 'Analytics', component: () => import('@/views/Analytics.vue') },
  { path: '/spend-insights', name: 'SpendingInsights', component: () => import('@/views/SpendInsights.vue') },
  { path: '/financial-forecast', name: 'FinancialForecast', component: () => import('@/views/FinancialForecast.vue') },
  { path: '/recurring-payments', name: 'RecurringPayments', component: () => import('@/views/RecurringPayments.vue')},
  { path: '/custom-reports', name: 'CustomReports', component: () => import('@/views/CustomReports.vue') },
  { path: '/smart-recommends', name: 'SmartRecommendations', component: () => import('@/views/SmartRecommendations.vue') },
  { path: '/goal-tracker', name: 'GoalTracker', component: () => import('@/views/GoalTracker.vue') },
  { path: '/wallet', name: 'Wallets', component: () => import('@/views/Wallets.vue') },
  
]

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  let isAuthenticated = false;

  if (token && token !== 'null' && token !== 'undefined') {
    try {
      // Parse JWT and check expiration
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      const exp = payload?.exp;
      const now = Math.floor(Date.now() / 1000);
      if (exp && exp > now) {
        isAuthenticated = true;
      }
    } catch (e) {
      // Invalid token
      isAuthenticated = false;
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    return next('/login');
  }

  if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    return next('/dashboard');
  }

  next();
});

export default router