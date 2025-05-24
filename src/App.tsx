import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InboxPage from './pages/InboxPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<InboxPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
