import Header from '../../../layout/student/Header';
import Footer from '../../../layout/student/Footer';

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
