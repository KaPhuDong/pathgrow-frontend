import StudentProfile from '../features/student/pages/StudentProfile';
import Goals from '../features/student/pages/Goals';
import StudyPlan from '../features/student/pages/StudyPlan';

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
];

export default StudentRoutes;
