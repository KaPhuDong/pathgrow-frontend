import Header2 from '../layouts/Header2';

const Main2 = ({ children }) => {
  return (
    <>
      <Header2 />
      <main>
        <div className="main-content">{children}</div>
      </main>
    </>
  );
};

export default Main2;
