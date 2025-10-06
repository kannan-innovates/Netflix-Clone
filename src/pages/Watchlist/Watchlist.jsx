import React from 'react';
import { useWatchlist } from '../../context/WatchlistContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Watchlist.css';

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

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
              <div key={movie.id} className="watchlist-item">
                <Link to={`/movie/${movie.id}`}>
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
                      removeFromWatchlist(movie.id);
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