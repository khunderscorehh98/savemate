<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-4">📈 Advanced Analytics</h1>

    <v-btn color="primary" @click="fetchPrediction" :loading="loading">
      Get Prediction
    </v-btn>

    <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>

    <v-card v-if="prediction" class="mt-5 pa-4">
      <h3 class="text-h6">📊 Predicted Next Month</h3>
      <p><strong>Month:</strong> {{ prediction.prediction_month }}</p>
      <p><strong>Predicted Amount:</strong> ${{ prediction.predicted_amount }}</p>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdvancedAnalytics',
  data() {
    return {
      loading: false,
      error: null,
      prediction: null
    }
  },
  methods: {
    async fetchPrediction() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('http://127.0.0.1:5000/predict', [
          { month: '2025-01-01', amount: 300 },
          { month: '2025-02-01', amount: 420 },
          { month: '2025-03-01', amount: 510 },
        ])
        this.prediction = response.data
      } catch (err) {
        this.error = err.response?.data?.error || 'Prediction failed'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
h1 {
  color: #2e7d32;
}
</style>