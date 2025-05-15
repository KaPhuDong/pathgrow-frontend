import Welcome from '../pages/Welcome';
import Login from '../pages/auth/Login';
import Logout from '../pages/auth/Logout';

const PublicRoutes = [
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
];

export default PublicRoutes;
