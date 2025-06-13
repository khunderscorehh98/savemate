<template>
    <v-list dense>
      <v-list-item>
        <v-list-item-title>Hi {{ userName }}</v-list-item-title>
      </v-list-item>
      <v-divider class="my-2" />
      <v-list-item link :to="{ name: 'Dashboard' }">
        <v-list-item-icon><v-icon>mdi-view-dashboard</v-icon></v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item link :to="{ name: 'Transactions' }">
        <v-list-item-icon><v-icon>mdi-receipt</v-icon></v-list-item-icon>
        <v-list-item-title>Transactions</v-list-item-title>
      </v-list-item>
      <v-list-item link :to="{ name: 'Budgets' }">
        <v-list-item-icon><v-icon>mdi-wallet</v-icon></v-list-item-icon>
        <v-list-item-title>Budgets</v-list-item-title>
      </v-list-item>
      <v-list-item link :to="{ name: 'Goals' }">
        <v-list-item-icon><v-icon>mdi-flag-checkered</v-icon></v-list-item-icon>
        <v-list-item-title>Goals</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!isPremium" link :to="{ name: 'Subscriptions' }">
        <v-list-item-icon><v-icon>mdi-credit-card-multiple</v-icon></v-list-item-icon>
        <v-list-item-title>Subscriptions</v-list-item-title>
      </v-list-item>
  
      <v-divider class="my-2" v-if="isPremium" />
      <v-subheader v-if="isPremium">Premium Tools</v-subheader>
      <v-list-item v-if="isPremium" link :to="{ name: 'Analytics' }">
        <v-list-item-icon><v-icon>mdi-chart-line</v-icon></v-list-item-icon>
        <v-list-item-title>Advanced Analytics</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isPremium" link :to="{ name: 'SpendingInsights' }">
        <v-list-item-icon><v-icon>mdi-chart-donut</v-icon></v-list-item-icon>
        <v-list-item-title>Spending Insights</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isPremium" link :to="{ name: 'FinancialForecast' }">
        <v-list-item-icon><v-icon>mdi-finance</v-icon></v-list-item-icon>
        <v-list-item-title>Financial Forecast</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isPremium" link :to="{ name: 'RecurringPayments' }">
        <v-list-item-icon><v-icon>mdi-calendar-refresh</v-icon></v-list-item-icon>
        <v-list-item-title>Recurring Payments</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isPremium" link :to="{ name: 'CustomReports' }">
        <v-list-item-icon><v-icon>mdi-file-chart</v-icon></v-list-item-icon>
        <v-list-item-title>Custom Reports</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isPremium" link :to="{ name: 'SmartRecommendations' }">
        <v-list-item-icon><v-icon>mdi-lightbulb-on-outline</v-icon></v-list-item-icon>
        <v-list-item-title>Smart Recommendations</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isPremium" link :to="{ name: 'Wallets' }">
        <v-list-item-icon><v-icon>mdi-wallet-outline</v-icon></v-list-item-icon>
        <v-list-item-title>Wallets</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isPremium" link :to="{ name: 'GoalTracker' }">
        <v-list-item-icon><v-icon>mdi-target</v-icon></v-list-item-icon>
        <v-list-item-title>Goal Progress Tracker</v-list-item-title>
      </v-list-item>
    </v-list>
  </template>
  
  <script>
  export default {
    name: 'SideDrawer',
    computed: {
      isPremium() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.is_premium === true;
      },
      userName() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.name || 'user';
      }
    }
  };
  </script>
  
  <style scoped>
  .v-list-item-icon {
    color: #4caf50;
  }
  </style>
