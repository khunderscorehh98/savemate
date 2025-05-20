<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-5" max-width="600" width="100%">
      <v-card-title class="text-h5 font-weight-bold">Create an Account</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field
            v-model="form.name"
            label="Full Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.confirmPassword"
            label="Confirm Password"
            type="password"
            required
          ></v-text-field>

          <v-btn type="submit" color="primary" block class="mt-4">
            Register
          </v-btn>
        </v-form>
        <div class="text-center mt-4">
          <span>Already have an account?</span>
          <v-btn text color="primary" to="/login">Login</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import API from '@/services/apiClient'

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    async register() {
      if (this.form.password !== this.form.confirmPassword) {
        alert('Passwords do not match.')
        return
      }
      try {
        const res = await API.post('/auth/register', {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        })
        alert('Registration successful! Please log in.')
        this.$router.push('/login')
      } catch (err) {
        alert(err.response?.data?.message || 'Registration failed.')
      }
    }
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
.v-card {
  width: 100%;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
}
</style>
