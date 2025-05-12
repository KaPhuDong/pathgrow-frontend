import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ví dụ: nếu lỗi 401 thì redirect login
    if (error.response?.status === 401) {
      console.log('Unauthorized. Redirect to login...');
      // window.location.href = '/login'; // nếu cần
    }
    return Promise.reject(error);
  }
);

export default instance;
