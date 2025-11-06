import axios from "axios";
import { StatusCodes } from "http-status-codes"; 


// Create the axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json", 
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Attach token if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === StatusCodes.UNAUTHORIZED) {
      console.warn("Unauthorized! Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/"; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
