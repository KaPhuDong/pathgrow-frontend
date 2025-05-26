import Header from '../layouts/Header';

const Main = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <div className="main-content">{children}</div>
      </main>
    </>
  );
};

export default Main;
