import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InboxPage from './pages/InboxPage';
import ConversationPage from "./pages/ConversationPage.tsx";
import {ViewProvider} from "./context/ViewContext.tsx";

const App = () => {
    return (
        <ViewProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<InboxPage/>}/>
                    <Route path="/conversation/:postId" element={<ConversationPage/>}/>
                </Routes>
            </BrowserRouter>
        </ViewProvider>
    );
};

export default App;
