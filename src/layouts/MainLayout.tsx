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
        <div className="bg-white h-screen w-screen flex flex-col overflow-hidden">
            <Header />
            <div className="flex flex-grow relative min-h-0">
                <Sidebar />
                <main className="flex-grow bg-white relative min-h-0">
                    {children}
                </main>
                <FloatingActions
                    onInboxClick={() => setView('inbox')}
                    onTaskClick={() => setView('tasks')}
                />
            </div>
        </div>
    );
};
export default MainLayout;
