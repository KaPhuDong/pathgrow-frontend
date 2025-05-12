import authApi from '../api/authApi';
import { saveToken, saveUser, removeAuth } from '../utils/auth';

const login = async (email, password) => {
  try {
    const data = await authApi.login(email, password);

    saveToken(data.token);
    saveUser(data.user);

    return { success: true, user: data.user };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed',
    };
  }
};

const logout = async () => {
  try {
    await authApi.logout();
  } catch (_) {}
  removeAuth();
};

export default {
  login,
  logout,
};
