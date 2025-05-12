import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes/StudentRoutes';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          {routes.map(({ path, element }, i) => (
            <Route key={i} path={path} element={element} />
          ))}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
