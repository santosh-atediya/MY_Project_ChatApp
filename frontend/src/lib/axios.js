import axios from "axios"

// Vite automatically sets import.meta.env.MODE to 'development' or 'production'
const BASE_URL = import.meta.env.MODE === 'development'
  ? (import.meta.env.VITE_API_URL || 'http://localhost:2000/api')
  : '/api'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send cookies with requests
})