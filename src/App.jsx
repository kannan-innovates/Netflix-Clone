import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { ToastContainer } from 'react-toastify'
import { useAuth } from './context/AuthContext'
import netflix_spinner from './assets/netflix_spinner.gif' 

function App() {
  const { user, loading } = useAuth();

  // Show global spinner while Firebase checks auth
  if (loading) {
    return (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route
          path='/'
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path='/player/:id'
          element={user ? <Player /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;