import React from 'react';
import Header from "../components/Header.tsx";
import Sidebar from "../components/Sidebar.tsx";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="bg-[#313338] text-white h-screen w-screen flex flex-col overflow-hidden">
            <Header />

            <div className="flex flex-grow">
                <Sidebar />

                <main className="flex-grow relative bg-[#282c34]">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
