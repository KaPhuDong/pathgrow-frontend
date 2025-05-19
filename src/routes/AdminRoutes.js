import UserManagement from '../features/admin/pages/UserManagement';

const AdminRoutes = [
  {
    path: '/admin/users/management',
    element: <UserManagement />,
  },

  {
    path: '/admin/classes/management',
    // element: <ClassManagement />,
  },
];

export default AdminRoutes;
