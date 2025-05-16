import StudentProfile from '../features/student/pages/StudentProfile';
import Goals from '../features/student/pages/Goals';
import StudyPlan from '../features/student/pages/StudyPlan';
import Notifications from '../features/student/pages/Notifications';

const StudentRoutes = [
  {
    path: '/student/profile',
    element: <StudentProfile />,
  },
  {
    path: '/student/goals',
    element: <Goals />,
  },
  {
    path: '/study/plans',
    element: <StudyPlan />,
  },
  {
    path: '/student/notifications',
    element: <Notifications />,
  },
];

export default StudentRoutes;
