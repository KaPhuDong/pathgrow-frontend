import Header1 from '../layouts/Header1';
import { NotificationProvider } from '../components/NotificationContext';

const Main1 = ({ children }) => {
  return (
    <NotificationProvider>
      <Header1 />
      <main>
        <div className="main-content">{children}</div>
      </main>
    </NotificationProvider>
  );
};

export default Main1;
