import Welcome from '../features/auth/pages/Welcome';
import Login from '../features/auth/pages/Login';
import Logout from '../features/auth/pages/Logout';

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
