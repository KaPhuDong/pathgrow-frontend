import Home from '../features/teacher/pages/Home';
import ListStudent from '../features/teacher/pages/ListStudent';
import TeacherSchedule from '../features/teacher/pages/TeacherSchedule';

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
];

export default TeacherRoutes;
