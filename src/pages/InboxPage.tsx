import InboxContent from "../features/inbox/components/InboxContent.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import { Outlet } from 'react-router-dom';
import { useView } from "../context/ViewContext.tsx";

const InboxPage = () => {
    const { view } = useView();

    return (
        <MainLayout>
            {/* Tampilkan InboxContent jika view adalah 'inbox' */}
            {view === 'inbox' && <InboxContent />}

            {/* Jika view adalah 'tasks', tampilkan komponen Task di sini */}
            {view === 'tasks' && <div className="p-4">Tasks View Coming Soon...</div>}

            {/* Outlet akan merender ConversationPage saat URL cocok */}
            <Outlet />
        </MainLayout>
    );
};
export default InboxPage;
