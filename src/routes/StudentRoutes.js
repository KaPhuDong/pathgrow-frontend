import StudentProfile from '../pages/student/StudentProfile';
import Goals from '../pages/student/Goals';
import StudyPlan from '../pages/student/StudyPlan';

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
