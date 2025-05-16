import React from 'react'
import { Navigate, Route, Router, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LogoutPage from './pages/LogoutPage.jsx';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './utils/axios.js';




const App = () => {
  // Fetching the auth user data
  // using react-query
  // using axiosInstance to make the request
  const { data: authData, isLoading, isError } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await axiosInstance.get('/auth/Protected');
      return res.data;
    },
    retry: false,
  });

  const authUser = authData?.user;



  return (
    <div data-theme="retro" className='h-screen' >

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/notification" element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={authUser ? <OnboardingPage /> : <Navigate to="/login" />} />
        <Route path="/Logout" element={authUser ? <LogoutPage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )

}
export default App;
