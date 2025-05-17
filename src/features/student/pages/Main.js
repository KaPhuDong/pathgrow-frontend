import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

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
