import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from 'react-router-dom';
import routes from './routes';

import { useEffect } from 'react';
import { LoadingProvider, useLoading } from './utils/loading';
import { setupAxiosInterceptors } from './api/axiosConfig';
import Loading from './components/ui/Loading';

function AppRoutesWithLoading() {
  const { loadingCount, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    setupAxiosInterceptors(startLoading, stopLoading);
  }, []);

  const element = useRoutes(routes);
  return (
    <>
      {loadingCount > 0 && <Loading />}
      {element}
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
}

function App() {
  return (
    <LoadingProvider>
      <Router>
        <AppRoutesWithLoading />
      </Router>
    </LoadingProvider>
  );
}

export default App;
