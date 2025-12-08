// api.js - Centralized API service for the College Registration App

import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/api`,
  timeout: 30000, // Increase timeout to 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response || error.message);
    
    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: 'Network Error: Unable to connect to the server. Please check if the backend is running.',
        type: 'NETWORK_ERROR'
      });
    }
    
    // Handle server errors
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return Promise.reject({
          message: data.detail || data.message || 'Bad Request: Please check your input data.',
          type: 'VALIDATION_ERROR'
        });
      case 409:
        return Promise.reject({
          message: data.detail || data.message || 'Conflict: This registration already exists.',
          type: 'CONFLICT_ERROR'
        });
      case 500:
        return Promise.reject({
          message: data.detail || data.message || 'Server Error: Something went wrong on our end.',
          type: 'SERVER_ERROR'
        });
      default:
        return Promise.reject({
          message: `HTTP ${status}: ${data.detail || data.message || 'An unexpected error occurred.'}`,
          type: 'UNKNOWN_ERROR'
        });
    }
  }
);

// API functions
export const submitRegistration = async (formData) => {
  try {
    const response = await apiClient.post('/submit', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLectures = async () => {
  try {
    const response = await apiClient.get('/lectures');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;