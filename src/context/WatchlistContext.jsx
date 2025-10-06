import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`watchlist_${user.uid}`);
      if (saved) {
        setWatchlist(JSON.parse(saved));
      }
    } else {
      setWatchlist([]);
    }
  }, [user]);

  
  useEffect(() => {
    if (user && watchlist.length >= 0) {
      localStorage.setItem(`watchlist_${user.uid}`, JSON.stringify(watchlist));
    }
  }, [watchlist, user]);

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.find(m => m.id === movie.id);
      if (exists) return prev;
      return [...prev, movie];
    });
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter(m => m.id !== movieId));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(m => m.id === movieId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}