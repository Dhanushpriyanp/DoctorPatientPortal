// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Add your base URL here
  // headers: {}
});

export default axiosInstance;
