import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './layout/student/header/Header';
import Footer from './layout/student/footer/Footer';
import routes from './routes/StudentRoutes';
import '@fortawesome/fontawesome-free/css/all.min.css';

function AppContent() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' && location.pathname !== '/login' && <Header />}
      <main>
        <Routes>
          {routes.map(({ path, element }, i) => (
            <Route key={i} path={path} element={element} />
          ))}
        </Routes>
      </main>
      {location.pathname !== '/' && location.pathname !== '/login' && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;