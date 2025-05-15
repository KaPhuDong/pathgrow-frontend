import { useState } from 'react';
import { loginService } from '../services/authService';

export const useAuth = () => {
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const user = await loginService(email, password);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return null;
    }
  };

  return { login, error };
};
