import './App.css';
import Header from './layout/student/header/Header';
import Content from './pages/student/student-profile/StudentProfile';
import Footer from './layout/student/footer/Footer';
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