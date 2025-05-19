import Header from '../layouts/Header';

const Main = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Main;
