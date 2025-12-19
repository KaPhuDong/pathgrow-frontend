import axios from '../axiosConfig';

const API_BASE = 'https://pathgrow-backend-z6tf.onrender.com/api';

const fetchNotificationsByUser = async (userId) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_BASE}/goal-questions/student`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const normalized = res.data
    .filter((item) => item.answer) // Lọc chỉ các câu hỏi đã được trả lời
    .map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      subject: item.subject?.name || 'Môn học không xác định',

      // Dùng answered_at (ngày trả lời) nếu có, fallback về created_at
      createdAt: item.answered_at || item.updated_at || item.created_at,

      // Thông tin giáo viên trả lời (nếu có)
      teacher: item.answered_by || {
        name: 'Giáo viên không xác định',
        avatar: '/default-teacher-avatar.png',
      },

      // Thông tin user (học sinh), vẫn giữ để hiển thị hoặc dùng sau
      user: item.user || {
        name: `HS #${item.user_id}`,
        avatar: '/default-avatar.png',
      },
    }));

  return normalized;
};

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

const fetchQA = async (userId) => {
  const response = await axios.get(`/goal-questions/${userId}`);
  return response.data;
};

const sendQuestion = async (data) => {
  try {
    const response = await axios.post('/goal-questions', data);
    return response.data;
  } catch (error) {
    console.error('Error sending question:', error);
    throw error;
  }
};

const fetchNotificationsForTeacher = async () => {
  const response = await axios.get('/goal-questions/teacher');
  return response.data;
};

const fetchNotificationsForStudent = async (userId) => {
  const response = await axios.get(`/notifications`);
  return response.data;
};

// Weekly study plan APIs
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

// Weekly goals APIs
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

// In-class and self-study plans
const fetchInClassPlanIdByWeek = async (weeklyStudyPlanId) => {
  const response = await axios.get(`/in-class-plans/${weeklyStudyPlanId}`);
  return response.data;
};

const fetchSelfStudyPlanIdByWeek = async (weeklyStudyPlanId) => {
  const response = await axios.get(`/self-study-plans/${weeklyStudyPlanId}`);
  return response.data;
};

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

// Subjects in plans
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

// ✅ Export đầy đủ
export default {
  fetchSemesters,
  fetchSubjects,
  fetchGoal,
  saveGoal,
  createGoal,
  fetchQA,
  sendQuestion,
  fetchNotificationsForStudent,
  fetchNotificationsByUser, // ✅ đã định nghĩa đúng
  fetchNotificationsForTeacher,
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
  fetchInClassPlanIdByWeek,
  fetchSelfStudyPlanIdByWeek,
};
