import axios from '../axiosConfig';

const fetchUsers = async () => {
  const response = await axios.get('/admin/users');
  return response.data;
};

const addClass = async (classData) => {
  const response = await axios.post('/classesManagement', classData);
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

const fetchClassById = async (id) => {
  const response = await axios.get(`/classesManagement/${id}`);
  return response.data;
};

const fetchClasses = async () => {
  const response = await axios.get('/classesManagement');
  return response.data;
};

const deleteClass = async (id) => {
  const response = await axios.delete(`/classesManagement/${id}`);
  return response.data;
};

const renameClass = async (id, name) => {
  const response = await axios.put(`/classesManagement/${id}`, { name });
  return response.data;
};

const fetchSubjects = async () => {
  const response = await axios.get('/subjects');
  return response.data;
};

const fetchUsersByRole = async (role) => {
  const response = await axios.get(`/users/${role}`);
  return response.data;
};

const addSubjectsToClass = async (classId, subjectIds) => {
  const response = await axios.post(`/classesManagement/${classId}/subjects`, {
    subjects: subjectIds,
  });
  return response.data;
};

const addStudentsToClass = async (classId, studentIds) => {
  const response = await axios.post(`/classesManagement/${classId}/students`, {
    students: studentIds,
  });
  return response.data;
};

const addTeachersToClass = async (classId, teacherIds) => {
  const response = await axios.post(`/classesManagement/${classId}/teachers`, {
    teachers: teacherIds,
  });
  return response.data;
};

export default {
  fetchUsers,
  addUser,
  addClass,
  updateUser,
  deleteUser,
  fetchClassById,
  fetchClasses,
  deleteClass,
  renameClass,
  fetchSubjects,
  fetchUsersByRole,
  addSubjectsToClass,
  addStudentsToClass,
  addTeachersToClass,
};
