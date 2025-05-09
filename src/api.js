import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  withCredentials: true, // BẮT BUỘC cho Sanctum dùng cookie
});

export default api;
