<template>
    <v-container>
      <v-row class="mb-4">
        <v-col>
          <h1 class="text-h4 font-weight-bold">Your Financial Goals</h1>
          <v-btn color="primary" @click="fetchGoals">Refresh</v-btn>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12" v-if="goals.length === 0">
          <v-alert type="info" border="left" colored-border>
            No goals have been set yet.
          </v-alert>
        </v-col>
  
        <v-col v-for="goal in goals" :key="goal._id" cols="12" md="6" lg="4">
          <v-card>
            <v-card-title class="text-h6">{{ goal.title }}</v-card-title>
            <v-card-text>
              <div><strong>Target Amount:</strong> ${{ goal.target_amount.toFixed(2) }}</div>
              <div><strong>Saved:</strong> ${{ goal.saved_amount.toFixed(2) }}</div>
              <div><strong>Status:</strong> {{ goal.status }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'Goals',
    data() {
      return {
        goals: []
      }
    },
    methods: {
      async fetchGoals() {
        try {
          const token = localStorage.getItem('token')
          const userId = localStorage.getItem('user_id')
          const response = await axios.get(`http://localhost:5003/api/goals/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          this.goals = response.data
        } catch (err) {
          console.error('Failed to fetch goals:', err)
        }
      }
    },
    mounted() {
      this.fetchGoals()
    }
  }
  </script>
  
  <style scoped>
  .v-card {
    transition: box-shadow 0.2s;
  }
  
  .v-card:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  </style>