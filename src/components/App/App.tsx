import { lazy, Suspense } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import './App.scss';

import Loader from '../Commons/Loader/Loader';
const LoginForm = lazy(() => import('../LoginForm/LoginForm'));
const ChatForm = lazy(() => import('../ChatForm/ChatForm'));
const Chat = lazy(() => import('../Chat/Chat'));


function App() {
  return (
    <div className="App">
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/chat-form" element={ <ChatForm /> } />
        <Route path="/chat" element={ <Chat /> } />
        <Route path="/login" element={ <LoginForm /> } />
      </Routes>
    </Suspense>
    </div>
  );
}

export default App;
