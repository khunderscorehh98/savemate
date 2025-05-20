<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="pa-6" elevation="6">
            <v-card-title class="text-h5 font-weight-bold justify-center">
              Welcome Back
            </v-card-title>
  
            <v-form ref="loginForm" @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                type="email"
                required
              ></v-text-field>
  
              <v-text-field
                v-model="password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPassword = !showPassword"
                required
              ></v-text-field>
  
              <v-btn color="primary" block type="submit" class="mt-4">
                Login
              </v-btn>
  
              <v-btn text block class="mt-2" to="/register">
                Don't have an account? Register
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import API from '@/services/apiClient'
  
  export default {
    name: 'LoginView',
    data() {
      return {
        email: '',
        password: '',
        showPassword: false
      }
    },
    methods: {
      async handleLogin() {
        try {
          const res = await API.post('/auth/login', {
            email: this.email,
            password: this.password
          })
  
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          this.$router.push('/dashboard')
        } catch (err) {
          alert('Login failed. Please check your credentials.')
          console.error(err)
        }
      }
    }
  }
  </script>