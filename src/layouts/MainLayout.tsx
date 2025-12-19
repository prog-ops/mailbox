import { useNavigate } from 'react-router-dom';
import FloatingActions from '../components/FloatingActions.tsx';
import Header from '../components/Header.tsx';
import Sidebar from '../components/Sidebar.tsx';
import { useView } from '../context/ViewContext.tsx';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { setView } = useView();
  const navigate = useNavigate();

  const handleInboxClick = () => {
    setView('inbox');
    navigate('/');
  };

  const handleTaskClick = () => {
    setView('tasks');
    navigate('/');
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-white">
      <Header />
      <div className="relative flex min-h-0 flex-grow">
        <Sidebar />
        <main className="relative min-h-0 flex-grow bg-white">{children}</main>
        <FloatingActions
          onInboxClick={handleInboxClick}
          onTaskClick={handleTaskClick}
        />
      </div>
    </div>
  );
};
export default MainLayout;
