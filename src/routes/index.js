import PublicRoutes from './PublicRoutes';
import StudentRoutes from './StudentRoutes';
import TeacherRoutes from './TeacherRoutes';

const routes = [...PublicRoutes, ...StudentRoutes, ...TeacherRoutes];
export default routes;
