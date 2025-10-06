import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import Watchlist from './pages/Watchlist/Watchlist'
import { ToastContainer } from 'react-toastify'
import { useAuth } from './context/AuthContext'
import netflix_spinner from './assets/netflix_spinner.gif'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { user, loading } = useAuth();

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
          path='/login'
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path='/'
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/movie/:id'
          element={user ? <MovieDetail /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/player/:id'
          element={user ? <Player /> : <Navigate to="/login" replace />}
        />
        <Route
          path='/watchlist'
          element={user ? <Watchlist /> : <Navigate to="/login" replace />}
        />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;