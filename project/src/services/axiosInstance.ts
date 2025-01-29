import axios from 'axios';

// Get the JWT token from localStorage or any other storage mechanism you use
const getToken = () => {
  return localStorage.getItem('jwt'); // Replace with your token storage logic
};

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/skill-fusion', // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific status codes (e.g., 401 for unauthorized)
    if (error.response && error.response.status === 401) {
      // Optional: Redirect to login or refresh token logic
      console.error('Unauthorized: Redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
