import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ViewProvider } from './context/ViewContext.tsx';
import ConversationPage from './pages/ConversationPage';
import InboxPage from './pages/InboxPage';

const App = () => {
  return (
    <ViewProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<InboxPage />} path="/">
            <Route element={<ConversationPage />} path="conversation/:postId" />
          </Route>
        </Routes>
      </BrowserRouter>
    </ViewProvider>
  );
};

export default App;
