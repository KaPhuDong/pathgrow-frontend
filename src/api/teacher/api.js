import axios from '../axiosConfig';

const getClasses = async () => {
  const res = await axios.get('/classes');
  return res.data;
};

const fetchAllClasses = async () => {
  const res = await axios.get('/classes');
  return res.data;
};

const fetchStudentsByClass = async (classId) => {
  const res = await axios.get(`/list-student/class/${classId}`);
  return res.data;
};

export default {
  getClasses,
  fetchAllClasses,
  fetchStudentsByClass,
};
