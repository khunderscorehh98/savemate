// src/services/apiClient.js
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5003/api', // change if your backend URL is different
  headers: {
    'Content-Type': 'application/json'
  }
})

// Attach token if available
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API