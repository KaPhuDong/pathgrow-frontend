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

export default {
  fetchSemesters,
  fetchSubjects,
  fetchGoal,
  saveGoal,
  createGoal,
  fetchQA,
  sendQuestion,
  fetchNotificationsByUser,
};
