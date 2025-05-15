import PublicRoutes from './PublicRoutes';
import StudentRoutes from './StudentRoutes';
import AdminRoutes from './AdminRoutes';

const routes = [...PublicRoutes, ...StudentRoutes, ...AdminRoutes];
export default routes;
