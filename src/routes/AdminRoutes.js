import AdminDashBoard from '../features/admin/components/Dashboard';
import UserManagement from '../features/admin/pages/UserManagement';

const AdminRoutes = [
  {
    path: '/admin',
    element: <AdminDashBoard />,
    children: [
      {
        path: 'user/management',
        element: <UserManagement />,
      },
      {
        path: 'class/management',
        // element: <ClassManagement />,
      },
    ],
  },
];

export default AdminRoutes;
