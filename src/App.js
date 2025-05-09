import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/student/header/Header';
import Footer from './layout/student/footer/Footer';
import routes from './routes/StudentRoutes';
import Goals from './pages/student/Goals';
import StudyPlan from'./pages/student/studyPlan/StudyPlan';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {routes.map(({ path, element }, i) => (
            <Route key={i} path={path} element={element} />
          ))}
        </Routes>
      </main>
      <Footer />
    </Router>

function App() {
  return (
    <StudyPlan></StudyPlan>
    // <Goals></Goals>
  );
}

export default App;