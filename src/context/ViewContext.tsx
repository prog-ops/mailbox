import React, {createContext, useState, useContext, type ReactNode} from 'react';

type View = 'idle' | 'inbox' | 'tasks';

interface ViewContextType {
    view: View;
    setView: React.Dispatch<React.SetStateAction<View>>;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider = ({children}: { children: ReactNode }) => {
    const [view, setView] = useState<View>('idle');
    return (
        <ViewContext.Provider value={{view, setView}}>
            {children}
        </ViewContext.Provider>
    );
};

export const useView = () => {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error('useView must be used within a ViewProvider');
    }
    return context;
};
