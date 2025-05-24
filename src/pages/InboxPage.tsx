import FloatingActions from "../components/FloatingActions.tsx";
import {useState} from "react";
import InboxContent from "../features/inbox/InboxContent.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import CircularProgress from '@mui/material/CircularProgress';

type PageStatus = 'idle' | 'loading' | 'success';

const InboxPage = () => {
    const [status, setStatus] = useState<PageStatus>('idle');

    const handleInboxClick = () => {
        setStatus('loading');

        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    const handleTaskClick = () => {
        console.log('Task clicked');
    };

    const renderContent = () => {
        switch (status) {
            case 'loading':
                return (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-y-4">
                        <CircularProgress color="inherit" />
                        <span>Loading Chats ...</span>
                    </div>
                );
            case 'success':
                return <InboxContent />;
            case 'idle':
            default:
                return (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Pilih tindakan di tombol bawah kanan.
                    </div>
                );
        }
    };

    return (
        <MainLayout>
            {renderContent()}

            <FloatingActions onInboxClick={handleInboxClick} onTaskClick={handleTaskClick} />
        </MainLayout>
    );
};

export default InboxPage;
