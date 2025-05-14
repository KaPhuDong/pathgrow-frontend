import StudentProfile from '../pages/student/StudentProfile';
import Goals from '../pages/student/Goals';
import StudyPlan from '../pages/student/StudyPlan';
import Notifications from '../pages/student/Notifications'

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
    element: <Notifications/>,
  },
];

export default StudentRoutes;
