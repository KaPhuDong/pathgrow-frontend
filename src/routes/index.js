import PublicRoutes from './PublicRoutes';
import StudentRoutes from './StudentRoutes';
import TeacherRoutes from './TeacherRoutes';
import AdminRoutes from './AdminRoutes';

const routes = [
  ...PublicRoutes,
  ...StudentRoutes,
  ...TeacherRoutes,
  ...AdminRoutes,
];
export default routes;
