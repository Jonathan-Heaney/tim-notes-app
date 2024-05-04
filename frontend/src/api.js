import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

// This gets the URL of our backend server from the .env file
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
