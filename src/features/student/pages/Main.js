import Header from '../layout/Header';
import Footer from '../layout/Footer';

const Main = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Main;
