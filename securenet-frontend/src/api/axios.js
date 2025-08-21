
// src/api.js or src/axios.js

import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // Update if needed
  withCredentials: true,  // ✅ Sends cookies for session and CSRF
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Automatically attach CSRF token from cookie to all requests
api.interceptors.request.use((config) => {
  const csrfToken = Cookies.get('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

export default api;
