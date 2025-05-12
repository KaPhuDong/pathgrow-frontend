import axios from './axiosConfig';

const login = async (email, password) => {
  const response = await axios.post('/login', {
    email,
    password,
  });
  return response.data;
};

const logout = async () => {
  const response = await axios.post('/logout');
  return response.data;
};

export default {
  login,
  logout,
};
