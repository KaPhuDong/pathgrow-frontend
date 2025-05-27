import Header1 from '../layouts/Header1';

const Main1 = ({ children }) => {
  return (
    <>
      <Header1 />
      <main>
        <div className="main-content">{children}</div>
      </main>
    </>
  );
};

export default Main1;
