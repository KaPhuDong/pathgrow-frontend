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
const getWeeklyGoals = (weeklyStudyPlanId) => {
  return axios.get(`/weekly-goals/${weeklyStudyPlanId}`);
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

// in-class-plans and self-study-plans api
const createInClassPlan = async (data) => {
  const response = await axios.post('/in-class-plans', data);
  return response.data;
};

const createSelfStudyPlan = async (data) => {
  const response = await axios.post('/self-study-plans', data);
  return response.data;
};

const deleteInClassPlan = async (id) => {
  const response = await axios.delete(`/in-class-plans/${id}`);
  return response.data;
};

const deleteSelfStudyPlan = async (id) => {
  const response = await axios.delete(`/self-study-plans/${id}`);
  return response.data;
};

// in-class-subjects and self-study-subjects api
const createInClassSubject = async (data) => {
  const response = await axios.post('/in-class-subjects', data);
  return response.data;
};

const createSelfStudySubject = async (data) => {
  const response = await axios.post('/self-study-subjects', data);
  return response.data;
};

const deleteInClassSubject = async (id) => {
  const response = await axios.delete(`/in-class-subjects/${id}`);
  return response.data;
};

const deleteSelfStudySubject = async (id) => {
  const response = await axios.delete(`/self-study-subjects/${id}`);
  return response.data;
};

const updateInClassSubject = async (id, updatedData) => {
  const response = await axios.put(`/in-class-subjects/${id}`, updatedData);
  return response.data;
};
const updateSelfStudySubject = async (id, updatedData) => {
  const response = await axios.put(`/self-study-subjects/${id}`, updatedData);
  return response.data;
};

const fetchInClassSubjects = async (weeklyStudyPlanId) => {
  const response = await axios.get(`/in-class-subjects/${weeklyStudyPlanId}`);
  return response.data;
};

const fetchSelfStudySubjects = async (weeklyStudyPlanId) => {
  const response = await axios.get(`/self-study-subjects/${weeklyStudyPlanId}`);
  return response.data;
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
  createInClassPlan,
  createSelfStudyPlan,
  deleteInClassPlan,
  deleteSelfStudyPlan,
  createInClassSubject,
  createSelfStudySubject,
  deleteInClassSubject,
  deleteSelfStudySubject,
  updateInClassSubject,
  updateSelfStudySubject,
  fetchInClassSubjects,
  fetchSelfStudySubjects,
};
