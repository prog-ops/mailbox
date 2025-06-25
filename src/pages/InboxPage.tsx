import { Outlet } from 'react-router-dom';
import FloatingActions from '../components/FloatingActions.tsx';
import { useView } from '../context/ViewContext.tsx';
import InboxContent from '../features/inbox/components/InboxContent.tsx';
import TasksView from '../features/task/components/TasksView.tsx';
import MainLayout from '../layouts/MainLayout.tsx';

const InboxPage = () => {
  const { view, setView } = useView();

  return (
    <>
      <MainLayout>
        {/* Tampilkan InboxContent jika view adalah 'inbox' */}
        {view === 'inbox' && <InboxContent />}

        {/* Jika view adalah 'tasks', tampilkan komponen Task di sini */}
        {view === 'tasks' && <TasksView />}

        {/* Outlet akan merender ConversationPage saat URL cocok */}
        <Outlet />
      </MainLayout>
      <FloatingActions
        onInboxClick={() => setView('inbox')}
        onTaskClick={() => setView('tasks')}
      />
    </>
  );
};
export default InboxPage;
