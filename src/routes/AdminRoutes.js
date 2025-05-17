import UserManagement from '../features/admin/pages/UserManagement';

const AdminRoutes = [
  {
    path: 'admin/user/management',
    element: <UserManagement />,
  },
  {
    path: '/admin/class/management',
    // element: <ClassManagement />,
  },
];

export default AdminRoutes;
