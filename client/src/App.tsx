import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './routes/home-page.component';
import ChatPage from './routes/chat-page.component';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<HomePage />}
      />
      <Route
        path='/chats'
        element={<ChatPage />}
      />
    </Routes>
  );
}

export default App;
