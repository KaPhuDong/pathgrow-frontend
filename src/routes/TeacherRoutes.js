import Home from '../pages/teacher/Home';
import ListStudent from '../pages/teacher/ListStudent';

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

