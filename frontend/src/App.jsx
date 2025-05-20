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
import Layout from './components/Layout.jsx';
import { useThemeStore } from './stores/useThemeStore.jsx';




const App = () => {
  
  const { isLoading,authUser }= useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const onBoarded=authUser?.isOnBoarded;
  const { theme } = useThemeStore();

  if (isLoading) {
    return < PageLoader />
    
  }

  return (
    <div  className='h-screen' data-theme={theme}> 

      <Routes>
        <Route path="/" element={isAuthenticated && onBoarded ? 
        <Layout showSidebar={true}> <HomePage /> </Layout>
         
        : !isAuthenticated ? <LoginPage /> : <Navigate to="/onboarding" />}  />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to  ={onBoarded ? "/" : "/onboarding"} />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to  ={onBoarded ? "/" : "/onboarding"} />} />
        <Route path="/notifications" element={isAuthenticated ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={ isAuthenticated ? (
              !onBoarded ? (
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
