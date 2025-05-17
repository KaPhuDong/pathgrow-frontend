import Sidebar from '../layout/Sidebar';

const Main = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
};

export default Main;
