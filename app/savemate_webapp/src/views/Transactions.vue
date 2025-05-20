

<template>
  <v-container fluid>
    <v-row justify="space-between" align="center" class="mb-4">
      <v-col cols="auto">
        <h1 class="text-h5 font-weight-bold">Transactions</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="fetchTransactions">
          <v-icon left>mdi-refresh</v-icon> Refresh
        </v-btn>
      </v-col>
    </v-row>

    <v-alert type="info" v-if="transactions.length === 0">
      No transactions found.
    </v-alert>

    <v-data-table
      :headers="headers"
      :items="transactions"
      class="elevation-1"
      item-value="id"
    >
      <template v-slot:item.amount="{ item }">
        ${{ parseFloat(item.amount).toFixed(2) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Transactions',
  data() {
    return {
      transactions: [],
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Category', value: 'category' },
        { text: 'Description', value: 'description' },
        { text: 'Amount', value: 'amount' }
      ]
    }
  },
  methods: {
    async fetchTransactions() {
      try {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await axios.get(
          `http://localhost:5003/api/transactions/user/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        this.transactions = res.data
      } catch (err) {
        console.error('Failed to fetch transactions:', err)
      }
    }
  },
  mounted() {
    this.fetchTransactions()
  }
}
</script>