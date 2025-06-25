import type React from 'react';
import FloatingActions from '../components/FloatingActions.tsx';
import Header from '../components/Header.tsx';
import Sidebar from '../components/Sidebar.tsx';
import { useView } from '../context/ViewContext.tsx';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { setView } = useView();

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-white">
      <Header />
      <div className="relative flex min-h-0 flex-grow">
        <Sidebar />
        <main className="relative min-h-0 flex-grow bg-white">{children}</main>
        <FloatingActions
          onInboxClick={() => setView('inbox')}
          onTaskClick={() => setView('tasks')}
        />
      </div>
    </div>
  );
};
export default MainLayout;
