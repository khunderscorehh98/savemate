<template>
  <v-container fluid>
    <!-- Summary Cards -->
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-bold">
            Total Income
            <v-spacer />
            <v-icon color="green">mdi-cash</v-icon>
          </v-card-title>
          <v-card-text class="text-h5 font-weight-medium text--success">
            ${{ totalIncome.toLocaleString() }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-bold">
            Total Expenses
            <v-spacer />
            <v-icon color="red">mdi-cash-minus</v-icon>
          </v-card-title>
          <v-card-text class="text-h5 font-weight-medium text--error">
            ${{ totalExpense.toLocaleString() }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h6 font-weight-bold">
            Net Total
            <v-spacer />
            <v-icon :color="netTotal >= 0 ? 'green' : 'red'">mdi-scale-balance</v-icon>
          </v-card-title>
          <v-card-text :class="netTotal >= 0 ? 'text--success' : 'text--error'" class="text-h5 font-weight-medium">
            ${{ netTotal.toLocaleString() }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="pa-4 fill-height d-flex flex-column" outlined>
          <v-card-title class="text-h6 font-weight-bold">Cash Flow Overview</v-card-title>
          <v-spacer></v-spacer>
          <v-responsive class="d-flex align-center justify-center" style="min-height: 300px;">
            <BarChart v-if="barChartData" :chart-data="barChartData" :options="barChartOptions" />
            <v-alert v-else type="info">📉 No data to render yet. Add some transactions!</v-alert>
          </v-responsive>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4 fill-height d-flex flex-column" outlined>
          <v-card-title class="text-h6 font-weight-bold">This Month</v-card-title>
          <v-spacer></v-spacer>
          <v-responsive class="d-flex align-center justify-center" style="min-height: 300px;">
            <PieChart :chart-data="pieChartData" :options="pieChartOptions" />
          </v-responsive>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Transactions -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="pa-4" outlined>
          <v-card-title class="font-weight-bold text-h6">Recent Transactions</v-card-title>
          <div class="text--secondary">Below is a sample of your most recent financial activities.</div>
          <v-simple-table class="mt-4">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(t, index) in recentTransactions" :key="index">
                <td>{{ new Date(t.date).toLocaleDateString() }}</td>
                <td>{{ t.category }}</td>
                <td>${{ parseFloat(t.amount).toFixed(2) }}</td>
                <td>{{ t.category_type }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- AI Insight Placeholder -->
    <v-row>
      <v-col cols="12">
        <v-card outlined class="pa-4 d-flex flex-column justify-center align-center text-center">
          <v-card-title class="text-h6 font-weight-bold">AI Insight</v-card-title>
          <v-card-text class="text-subtitle-1 grey--text">
            🤖 Smart financial suggestions will appear here based on your income and expense trends.
          </v-card-text>
          <v-chip color="grey lighten-2" text-color="black" class="mt-2" outlined>
            AI Summary Placeholder
          </v-chip>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
  import BarChart from '@/components/BarChart.vue';
  import PieChart from '@/components/PieChart.vue';
  import API from '@/services/apiClient';
  
  export default {
    name: 'Dashboard',
    components: {
      BarChart,
      PieChart
    },
    data() {
      return {
        totalIncome: 0,
        totalExpense: 0,
        barChartData: null,
        pieChartData: null,
        recentTransactions: [],
        barChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{ ticks: { beginAtZero: true } }]
          }
        },
        pieChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      }
    },
    computed: {
      netTotal() {
        return this.totalIncome - this.totalExpense;
      }
    },
    methods: {
      async fetchDashboardData() {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) return

        try {
          const response = await API.get(`/transactions/user/${user.id}`);
          const transactions = response.data;

          this.totalIncome = transactions.filter(t => t.category_type === 'income')
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

          this.totalExpense = transactions.filter(t => t.category_type === 'expense')
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

          this.recentTransactions = transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

          this.prepareBarChartData(transactions);
          this.preparePieChartData(transactions);
        } catch (error) {
          console.error('Failed to fetch dashboard data:', error);
        }
      },
      prepareBarChartData(transactions) {
        const grouped = {};
        transactions.forEach(t => {
          const month = new Date(t.date).toLocaleString('default', { month: 'short' });
          if (!grouped[month]) grouped[month] = { income: 0, expense: 0 };
  
          if (t.category_type === 'income') grouped[month].income += parseFloat(t.amount);
          if (t.category_type === 'expense') grouped[month].expense += parseFloat(t.amount);
        });
  
        const labels = Object.keys(grouped);
        const incomeData = labels.map(m => grouped[m].income);
        const expenseData = labels.map(m => grouped[m].expense);
  
        this.barChartData = {
          labels,
          datasets: [
            { label: 'Income', backgroundColor: '#4caf50', data: incomeData },
            { label: 'Expenses', backgroundColor: '#f44336', data: expenseData }
          ]
        }
      },
      preparePieChartData(transactions) {
        const now = new Date();
        const thisMonth = now.getMonth();
  
        const income = transactions
          .filter(t => new Date(t.date).getMonth() === thisMonth && t.category_type === 'income')
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
        const expense = transactions
          .filter(t => new Date(t.date).getMonth() === thisMonth && t.category_type === 'expense')
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
        this.pieChartData = {
          labels: ['Income', 'Expenses'],
          datasets: [
            {
              backgroundColor: ['#4caf50', '#f44336'],
              borderColor: '#ffffff',
              borderWidth: 2,
              hoverOffset: 10,
              data: [income, expense]
            }
          ]
        };
      }
    },
    mounted() {
      this.fetchDashboardData();
    }
  };
  </script>
  
  <style scoped>
  .text-subtitle-1 {
    color: #6c757d;
  }
  </style>