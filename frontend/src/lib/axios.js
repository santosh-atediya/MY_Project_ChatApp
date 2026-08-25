import axios from "axios"

// Vite automatically sets import.meta.env.MODE to 'development' or 'production'
const configuredApiUrl = import.meta.env.VITE_API_URL || "https://my-project-chatapp.onrender.com";
const productionApiUrl = configuredApiUrl.replace(/\/$/, "").endsWith("/api")
  ? configuredApiUrl.replace(/\/$/, "")
  : `${configuredApiUrl.replace(/\/$/, "")}/api`;

const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:2000/api"
  : productionApiUrl;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send cookies with requests
})