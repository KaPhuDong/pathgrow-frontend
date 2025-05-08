import './App.css';
import Header from './layout/student/Header/Header';
import Content from './pages/student/StudentProfile/StudentProfile';
import Footer from './layout/student/Footer/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className='App-PathGrow'>
      <Header />
      <main>
        <Content />
      </main>
      <Footer />
    </div>
  );
}

export default App;