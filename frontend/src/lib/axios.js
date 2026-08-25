import axios from "axios"

// Vite automatically sets import.meta.env.MODE to 'development' or 'production'
const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:2000/api"
  : (import.meta.env.VITE_API_URL || "https://my-project-chatapp.onrender.com");

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send cookies with requests
})