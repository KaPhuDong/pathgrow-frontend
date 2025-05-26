import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const Main = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <div className="main-content">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Main;
