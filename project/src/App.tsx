import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Opportunities from './pages/Opportunities';
import OnlineUsersList from './components/users/OnlineUsersList';
import ChatWindow from './components/chat/ChatWindow';
import VideoCall from './components/video/VideoCall';
import { useStore } from './store/useStore';
import { socketService } from './services/socket';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const [activeChatUser, setActiveChatUser] = useState<string | null>(null);
  const [activeCallUser, setActiveCallUser] = useState<string | null>(null);
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      socketService.connect(currentUser.id);
    }

    return () => {
      socketService.disconnect();
    };
  }, [currentUser]);

  const handleUserSelect = (userId: string) => {
    setActiveChatUser(userId);
  };

  const handleStartCall = (userId: string) => {
    setActiveCallUser(userId);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Navbar onStartCall={handleStartCall} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/opportunities" element={<Opportunities />} />
          </Routes>
        </main>

        {currentUser && (
          <>
            <OnlineUsersList onSelectUser={handleUserSelect} />
            <AnimatePresence>
              {activeChatUser && (
                <ChatWindow
                  recipientId={activeChatUser}
                  onClose={() => setActiveChatUser(null)}
                />
              )}
              {activeCallUser && (
                <VideoCall
                  recipientId={activeCallUser}
                  onEnd={() => setActiveCallUser(null)}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;