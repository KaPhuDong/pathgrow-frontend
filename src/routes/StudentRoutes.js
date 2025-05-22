import StudentProfile from '../features/student/pages/StudentProfile';
import Goals from '../features/student/pages/Goals';
import StudyPlan from '../features/student/pages/StudyPlan';
import Notifications from '../features/student/pages/Notifications';
import StudentAccount from '../features/student/pages/StudentAccount';
import StudentAchievements from '../features/student/pages/StudentAchievements';
import StudentSchedule from '../features/student/pages/StudentSchedule';

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
  {
    path: '/student/account',
    element: <StudentAccount />,
  },
  {
    path: '/student/achievements',
    element: <StudentAchievements />,
  },
   {
    path: '/student/schedule',
    element: <StudentSchedule />,
  },
];

export default StudentRoutes;
