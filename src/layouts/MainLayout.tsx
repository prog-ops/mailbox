import React from 'react';
import Header from "../components/Header.tsx";
import Sidebar from "../components/Sidebar.tsx";
import FloatingActions from "../components/FloatingActions.tsx";
import {useView} from "../context/ViewContext.tsx";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const { setView } = useView();

    return (
        <div className="bg-[#313338] text-white h-screen w-screen flex flex-col overflow-hidden">
            <Header />
            <div className="flex flex-grow relative"> {/* 'relative' for FAB */}
                <Sidebar />
                <main className="flex-grow bg-[#282c34] relative">
                    {children}
                </main>
                {/* Always-On-Top FAB */}
                <FloatingActions
                    onInboxClick={() => setView('inbox')}
                    onTaskClick={() => setView('tasks')}
                />
            </div>
        </div>
    );
};
export default MainLayout;
