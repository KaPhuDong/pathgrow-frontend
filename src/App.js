// import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <Login></Login>
      </main>
    </div>
=======
import Goals from './pages/student/Goals';
import StudyPlan from'./pages/student/studyPlan/StudyPlan';

function App() {
  return (
    <StudyPlan></StudyPlan>
    // <Goals></Goals>
>>>>>>> e2df1b14c6d4cfe75316a313d2b4289aebca5ddc
  );
}

export default App;
