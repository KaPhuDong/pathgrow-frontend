import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes/index';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
