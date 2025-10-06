import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useWatchlist } from '../../context/WatchlistContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './MovieDetail.css';
import play_icon from '../../assets/Play_icon.png';
import { toast } from 'react-toastify';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleWatchlist = () => {
  if (isInWatchlist(movie.id)) {
    removeFromWatchlist(movie.id);
    toast.success('Removed from watchlist');
  } else {
    addToWatchlist({
      id: movie.id,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      overview: movie.overview,
      vote_average: movie.vote_average
    });
    toast.success('Added to watchlist');
  }
};

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>Loading...</div>;
  }

  if (!movie) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>Movie not found</div>;
  }

  return (
    <div className='movie-detail'>
      <Navbar />
      
      <div className="detail-hero" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="detail-content">
          <h1>{movie.title}</h1>
          <div className="detail-meta">
            <span>{movie.release_date?.substring(0, 4)}</span>
            <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
          </div>
          <p className="detail-overview">{movie.overview}</p>
          
          <div className="detail-buttons">
            <Link to={`/player/${movie.id}`} className="btn">
              <img src={play_icon} alt="" />
              Play
            </Link>
            <button className="btn dark-btn" onClick={handleWatchlist}>
              {isInWatchlist(movie.id) ? '✓ In Watchlist' : '+ Add to Watchlist'}
            </button>
          </div>

          <div className="detail-info">
            <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(', ')}</p>
            <p><strong>Language:</strong> {movie.original_language?.toUpperCase()}</p>
            <p><strong>Budget:</strong> ${movie.budget?.toLocaleString()}</p>
            <p><strong>Revenue:</strong> ${movie.revenue?.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDetail;