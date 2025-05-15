import Header from '../../layout/teacher/Header';

const Main = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Main;
