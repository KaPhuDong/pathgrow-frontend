import UserManagement from '../features/admin/pages/UserManagement';
import ClassesManagement from '../features/admin/pages/ClassesManagement';
import ClassDetail from '../features/admin/components/ClassDetail';


const AdminRoutes = [
  {
    path: '/admin/users/management',
    element: <UserManagement />,
  },

  {
    path: '/admin/classes/management',
    element: <ClassesManagement />,
  },
  {
    path: '/admin/classes/detail/:className', // ✅ ROUTE MỚI
    element: <ClassDetail />,
  },
];

export default AdminRoutes;
