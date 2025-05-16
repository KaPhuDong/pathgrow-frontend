import axios from '../axiosConfig';

const fetchUsers = async () => {
  const response = await axios.get('/admin/users');
  return response.data;
};

const addUser = async (userData) => {
  const response = await axios.post('/admin/users', userData);
  return response.data;
};

const updateUser = async (id, userData) => {
  const response = await axios.put(`/admin/users/${id}`, userData);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`/admin/users/${id}`);
  return response.data;
};

export default {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
};
