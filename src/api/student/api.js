import axios from '../axiosConfig';

const fetchSemesters = async () => {
  const response = await axios.get('/semesters');
  return response.data;
};

const fetchSubjects = async () => {
  const response = await axios.get('/subjects');
  return response.data;
};

const fetchGoal = async (semester, subject) => {
  const response = await axios.get(`/goals/${semester}/${subject}`);
  return response.data;
};

const saveGoal = async ({
  semester,
  subject,
  expect_course,
  expect_teacher,
  expect_myself,
}) => {
  const response = await axios.put(`/goals/${semester}/${subject}`, {
    expect_course,
    expect_teacher,
    expect_myself,
  });
  return response.data;
};

const createGoal = async ({
  semester,
  subject,
  expect_course,
  expect_teacher,
  expect_myself,
}) => {
  const response = await axios.post(`/goals/${semester}/${subject}`, {
    semester_id: semester,
    subject_id: subject,
    expect_course,
    expect_teacher,
    expect_myself,
  });
  return response.data;
};

const fetchQA = async (semester, subject) => {
  const response = await axios.get(`/goal-questions/${semester}/${subject}`);
  return response.data;
};

const sendQuestion = async (data) => {
  const response = await axios.post(
    `/goal-questions/${data.semester}/${data.subject}`,
    data
  );
  return response.data;
};

const fetchNotificationsByUser = async (userId) => {
  const response = await axios.get(`/notifications/${userId}`);
  return response.data;
};

// study-plans api
const fetchWeeks = async () => {
  const response = await axios.get('/weekly-study-plans');
  return response.data;
};

const createWeek = async (weekData) => {
  const response = await axios.post('/weekly-study-plans', weekData);
  return response.data;
};

const deleteWeek = async (id) => {
  const response = await axios.delete(`/weekly-study-plans/${id}`);
  return response.data;
};

const updateWeek = async (id, updatedData) => {
  const response = await axios.put(`/weekly-study-plans/${id}`, updatedData);
  return response.data;
};

// weekly-goals api
const getWeeklyGoals = (studyPlanId) => {
  return axios.get(`/weekly-goals/${studyPlanId}`);
};

const createWeeklyGoal = (goal) => {
  return axios.post('/weekly-goals', goal);
};

const updateWeeklyGoal = (id, updatedData) => {
  return axios.put(`/weekly-goals/${id}`, updatedData);
};

const deleteWeeklyGoal = (id) => {
  return axios.delete(`/weekly-goals/${id}`);
};

// export
export default {
  fetchSemesters,
  fetchSubjects,
  fetchGoal,
  saveGoal,
  createGoal,
  fetchQA,
  sendQuestion,
  fetchNotificationsByUser,
  fetchWeeks,
  createWeek,
  deleteWeek,
  updateWeek,
  getWeeklyGoals,
  createWeeklyGoal,
  updateWeeklyGoal,
  deleteWeeklyGoal,
};
