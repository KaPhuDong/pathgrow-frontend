import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setupAxiosInterceptors = (startLoading, stopLoading) => {
  // Request Interceptor
  instance.interceptors.request.use(
    (config) => {
      startLoading && startLoading();

      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      stopLoading && stopLoading();
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response) => {
      stopLoading && stopLoading();
      return response;
    },
    (error) => {
      stopLoading && stopLoading();

      if (error.response?.status === 401) {
        console.log('Unauthorized. Redirect to login...');
        // window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );
};

export default instance;
