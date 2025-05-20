<template>
  <v-container fluid>
    <!-- Hero Section -->
    <div class="hero-section">
      <v-container fill-height class="text-center white--text d-flex flex-column justify-center align-center">
        <h1 class="display-2 font-weight-bold">Welcome to SaveMate</h1>
        <h4 class="subtitle-1">
          Your trusted partner in mastering personal finance and budgeting
        </h4>
        <v-btn color="primary" class="mt-4" to="/register">Get Started</v-btn>
        <div class="credit-text">Credit: <em>User</em></div>
      </v-container>
    </div>

    <!-- Mission & Vision -->
    <v-container class="my-12">
      <v-row>
        <v-col cols="12" md="6">
          <v-card outlined class="pa-6">
            <h2 class="text-h5 font-weight-bold">🎯 Our Mission</h2>
            <p>
              To empower students and individuals with smart financial tools
              that make budgeting simple, intuitive, and stress-free.
            </p>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card outlined class="pa-6">
            <h2 class="text-h5 font-weight-bold">🌟 Our Vision</h2>
            <p>
              To become the go-to platform for personal finance tracking and
              AI-powered spending insights in Southeast Asia and beyond.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Features Section -->
    <v-container class="my-10">
      <h2 class="text-h4 font-weight-bold text-center mb-6">
        Why Choose SaveMate?
      </h2>
      <v-row>
        <v-col cols="12" md="4">
          <v-card outlined class="pa-4 text-center">
            <v-icon color="primary" size="40">mdi-cash-multiple</v-icon>
            <h3 class="text-h6 font-weight-bold mt-3">Real-Time Tracking</h3>
            <p>
              Monitor your spending, income, and cash flow with insightful
              visuals and summaries.
            </p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card outlined class="pa-4 text-center">
            <v-icon color="green" size="40">mdi-brain</v-icon>
            <h3 class="text-h6 font-weight-bold mt-3">AI Insights</h3>
            <p>
              Get AI-generated tips and suggestions tailored to your financial
              habits.
            </p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card outlined class="pa-4 text-center">
            <v-icon color="blue" size="40">mdi-chart-line</v-icon>
            <h3 class="text-h6 font-weight-bold mt-3">Forecasting Reports</h3>
            <p>
              Visualize monthly forecasts and generate printable reports to stay
              informed.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- FAQ Section -->
    <v-container class="my-12">
      <h2 class="text-h4 font-weight-bold text-center mb-6">FAQs</h2>
      <v-list dense class="faq-list">
        <template v-for="(item, i) in faqs">
          <v-list-item :key="'faq-' + i" @click="toggle(i)" class="faq-question">
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">{{ item.question }}</v-list-item-title>
            </v-list-item-content>
            <v-icon>{{ expanded === i ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-list-item>

          <v-slide-y-transition>
            <div v-if="expanded === i" class="faq-answer px-4 pb-4 text-body-2 text--secondary">
              {{ item.answer }}
            </div>
          </v-slide-y-transition>
        </template>
      </v-list>
    </v-container>

    <!-- Call to Action -->
    <v-container class="text-center my-12">
      <h2 class="text-h4 font-weight-bold mb-4">
        Start your journey to financial freedom
      </h2>
      <v-btn color="primary" large to="/register">Create Your Account</v-btn>
      <v-btn text class="ml-4" to="/login">Already have one? Login here</v-btn>
    </v-container>
  </v-container>
</template>

<script>
import HeroImage from '@/assets/hero-image.jpg'
export default {
  name: 'HomeView',
  data() {
    return {
      HeroImage,
      expanded: null,
      faqs: [
        {
          question: 'Is SaveMate free to use?',
          answer:
            'Yes, our core features are free for all users. Premium features may be introduced in the future.'
        },
        {
          question: 'Can I track both income and expenses?',
          answer:
            'Absolutely. SaveMate is designed to monitor both your income and spending in real-time.'
        },
        {
          question: 'Does SaveMate use AI?',
          answer:
            'Yes, our system offers smart financial tips and forecasts based on your spending habits.'
        },
        {
          question: 'Is this platform secure?',
          answer:
            'We take your privacy seriously and implement encryption to protect your data.'
        }
      ]
    }
  },
  methods: {
    toggle(i) {
      this.expanded = this.expanded === i ? null : i
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Kumbh Sans', sans-serif !important;
}

.v-card-title,
.v-card-text,
.v-btn,
h1, h2, h3, h4, h5, h6,
p {
  font-family: 'Kumbh Sans', sans-serif !important;
}

.v-card-title,
.v-card-text,
.v-btn,
.v-list-item-title,
.v-list-item-subtitle,
h1, h2, h3, h4, h5, h6,
.display-2,
.text-h1,
.text-h2,
.text-h3,
.text-h4,
.text-h5,
.text-h6,
.subtitle-1 {
  font-family: 'Kumbh Sans', sans-serif !important;
}

.hero-section {
  background-image: url('@/assets/hero-image.jpg');
  background-size: cover;
  background-position: center;
  height: 600px;
  position: relative;
}

.credit-text {
  position: absolute;
  bottom: 16px;
  right: 24px;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
  font-size: 0.875rem;
}

.faq-list {
  background-color: #fafafa;
  border-radius: 8px;
  padding: 1rem;
}

.faq-question {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.faq-question:hover {
  background-color: #f0f0f0;
}

.faq-answer {
  padding-top: 0.5rem;
}
</style>