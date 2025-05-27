import Home from '../features/teacher/pages/Home';
import ListStudent from '../features/teacher/pages/ListStudent';
import TeacherSchedule from '../features/teacher/pages/TeacherSchedule';
import StudentGoals from '../features/teacher/pages/StudentGoals';
import StudentProfile from '../features/teacher/pages/StudentProfile';
import StudyPlan from '../features/teacher/pages/StudyPlan';
import StudentSchedule from '../features/teacher/pages/StudentSchedule';
import StudentAchievements from '../features/teacher/pages/StudentAchievements';

const TeacherRoutes = [
  {
    path: '/teacher/home',
    element: <Home />,
  },
  {
    path: '/teacher/list-student',
    element: <ListStudent />,
  },
  {
    path: '/teacher/schedule',
    element: <TeacherSchedule />,
  },
  {
    path: '/teacher/view-student-profile/:studentId',
    element: <StudentProfile />,
  },
  {
    path: '/teacher/view-student-goals/:studentId',
    element: <StudentGoals />,
  },
  {
    path: '/teacher/view-student-study-plans/:studentId',
    element: <StudyPlan />,
  },
  {
    path: '/teacher/view-student-schedule/:studentId',
    element: <StudentSchedule />,
  },
  {
    path: '/teacher/view-student-achievements/:studentId',
    element: <StudentAchievements />,
  },
];

export default TeacherRoutes;
