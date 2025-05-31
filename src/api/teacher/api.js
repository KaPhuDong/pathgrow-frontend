import axios from '../axiosConfig';

const fetchClasses = async () => {
  const res = await axios.get('/classes');
  return res.data;
};

const fetchStudentsByClass = async (classId) => {
  const res = await axios.get(`/list-student/class/${classId}`);
  return res.data;
};

//
const fetchSemesters = async () => {
  const response = await axios.get('/semesters');
  return response.data;
};

const fetchSubjects = async () => {
  const response = await axios.get('/subjects');
  return response.data;
};

const fetchGoal = async (studentId, semester, subject) => {
  const response = await axios.get(
    `/goals/${studentId}/${semester}/${subject}`
  );
  return response.data;
};

//fetchWeeklyStudyPlan
const fetchWeeks = async (studentId) => {
  const response = await axios.get(`/weekly-study-plans/user/${studentId}`);
  return response.data;
};

// weekly-goals api
const getWeeklyGoals = (weeklyStudyPlanId) => {
  return axios.get(`/weekly-goals/${weeklyStudyPlanId}`);
};

// in-class-plans and self-study-plans api
const fetchInClassPlanIdByWeek = async (weeklyStudyPlanId) => {
  const response = await axios.get(`/in-class-plans/${weeklyStudyPlanId}`);
  return response.data;
};

const fetchSelfStudyPlanIdByWeek = async (weeklyStudyPlanId) => {
  const response = await axios.get(`/self-study-plans/${weeklyStudyPlanId}`);
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

// getStudentCalendar
const getStudentCalendar = async (studentId) => {
  const response = await axios.get(
    `/teacher-view-student-calendar/${studentId}`
  );
  return response.data;
};

// getTeacherCalendar
const getTeacherCalendar = async () => {
  const response = await axios.get(`/teacher-schedule`);
  return response.data;
};

// addSchedule
const addSchedule = async (studentId, scheduleData) => {
  const response = await axios.post(
    `/teacher-view-student-calendar/${studentId}`,
    scheduleData
  );
  return response.data;
};

//addEvent
const addEvent = async (scheduleData) => {
  const response = await axios.post('/teacher-schedule', scheduleData);
  return response.data;
};

//deleteEvent
const deleteEvent = async (eventId) => {
  const response = await axios.delete(`/teacher-schedule/${eventId}`);
  return response.data;
};

// deleteSchedule
const deleteSchedule = async (studentId, scheduleId) => {
  const response = await axios.delete(
    `/teacher-view-student-calendar/${studentId}/${scheduleId}`
  );
  return response.data;
};

//getAchievements
const getAchievements = async (studentId) => {
  const response = await axios.get(`/achievements/${studentId}`);
  return response.data;
};

export default {
  fetchClasses,
  fetchClasses,
  fetchStudentsByClass,
  fetchSemesters,
  fetchSubjects,
  fetchGoal,
  fetchWeeks,
  getWeeklyGoals,
  getAchievements,
  fetchInClassPlanIdByWeek,
  fetchSelfStudyPlanIdByWeek,
  fetchInClassSubjects,
  fetchSelfStudySubjects,
  addEvent,
  deleteEvent,
  getStudentCalendar,
  getTeacherCalendar,
  addSchedule,
  deleteSchedule,
};
