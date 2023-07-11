import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './routes/home-page.component';
import ChatPage from './routes/chat-page.component';
import { Fragment } from 'react';

function App() {
  return (
    <div className='page'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/chats' element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
