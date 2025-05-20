import React from 'react'
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LogoutPage from './pages/LogoutPage.jsx';
import toast, { Toaster } from 'react-hot-toast';
import PageLoader from './components/pageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.jsx';




const App = () => {
  
  const { isLoading,authUser }= useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const onBoarded=authUser?.onBoarded;
  if (isLoading) {
    return < PageLoader />
    
  }

  return (
    <div data-theme="night" className='h-screen' >

      <Routes>
        <Route path="/" element={isAuthenticated && onBoarded ? <HomePage /> : !isAuthenticated ? <LoginPage /> : <Navigate to="/onboarding" />}  />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/notification" element={isAuthenticated ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={ isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )} />
        <Route path="/Logout" element={isAuthenticated ? <LogoutPage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )

}
export default App;
