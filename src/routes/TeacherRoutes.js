import Home from '../features/teacher/pages/Home';
import ListStudent from '../features/teacher/pages/ListStudent';

const TeacherRoutes = [
  {
    path: '/teacher/home',
    element: <Home />,
  },
  {
    path: '/teacher/list-student',
    element: <ListStudent />,
  },
];

export default TeacherRoutes;
