import Sidebar from '../layouts/Sidebar';

const Main = ({ children }) => {
  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default Main;
