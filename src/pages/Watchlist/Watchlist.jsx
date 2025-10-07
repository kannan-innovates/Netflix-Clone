import React from 'react';
import { useWatchlist } from '../../context/WatchlistContext';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { toast } from 'react-toastify';
import './Watchlist.css';

function Watchlist() {
  const { watchlist, removeFromWatchlist, loading } = useWatchlist();

  if (loading) {
    return (
      <div className='watchlist-page'>
        <Navbar />
        <div className="watchlist-content">
          <p style={{ textAlign: 'center', padding: '100px' }}>Loading watchlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='watchlist-page'>
      <Navbar />
      
      <div className="watchlist-content">
        <h1>My Watchlist</h1>
        
        {watchlist.length === 0 ? (
          <div className="empty-watchlist">
            <p>Your watchlist is empty</p>
            <Link to="/" className="btn">Browse Movies</Link>
          </div>
        ) : (
          <div className="watchlist-grid">
            {watchlist.map((movie) => (
              <div key={movie.docId} className="watchlist-item">
                <Link to={`/movie/${movie.movieId}`}>
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
                    alt={movie.title} 
                  />
                  <div className="watchlist-item-info">
                    <h3>{movie.title}</h3>
                    <p>⭐ {movie.vote_average?.toFixed(1)}</p>
                  </div>
                </Link>
                <button 
                  className="remove-btn" 
                  onClick={() => {
                    removeFromWatchlist(movie.movieId);
                    toast.success('Removed from watchlist');
                  }}
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Watchlist;