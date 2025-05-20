

<template>
    <v-container fluid>
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
          <h2>Budgets</h2>
        </v-col>
        <v-col cols="auto">
          <v-btn color="green darken-1" dark @click="fetchBudgets">
            <v-icon left>mdi-refresh</v-icon> Refresh
          </v-btn>
        </v-col>
      </v-row>
  
      <v-data-table
        :headers="headers"
        :items="budgets"
        :loading="loading"
        class="elevation-1"
        item-value="id"
        loading-text="Loading budgets..."
        no-data-text="No budgets available."
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Budget Summary</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.amount="{ item }">
          {{ formatCurrency(item.amount) }}
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  import axios from '@/services/apiClient';
  
  export default {
    name: 'Budgets',
    data() {
      return {
        budgets: [],
        loading: false,
        headers: [
          { text: 'Category', value: 'category' },
          { text: 'Amount', value: 'amount' },
          { text: 'Start Date', value: 'startDate' },
          { text: 'End Date', value: 'endDate' },
        ],
      };
    },
    methods: {
      async fetchBudgets() {
        this.loading = true;
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get('/budgets', {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.budgets = res.data;
        } catch (error) {
          console.error('Failed to fetch budgets:', error);
        } finally {
          this.loading = false;
        }
      },
      formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount);
      }
    },
    mounted() {
      this.fetchBudgets();
    }
  };
  </script>
  
  <style scoped>
  h2 {
    font-weight: bold;
  }
  </style>