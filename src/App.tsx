import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InboxPage from './pages/InboxPage';
import ConversationPage from "./pages/ConversationPage.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<InboxPage />} />
                <Route path="/conversation/:postId" element={<ConversationPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
