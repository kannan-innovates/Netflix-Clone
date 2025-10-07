import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { addToWatchlistDB, getWatchlistDB, removeFromWatchlistDB } from '../firebase';

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load watchlist from Firebase when user logs in
  useEffect(() => {
    const loadWatchlist = async () => {
      if (user) {
        setLoading(true);
        const data = await getWatchlistDB(user.uid);
        setWatchlist(data);
        setLoading(false);
      } else {
        setWatchlist([]);
        setLoading(false);
      }
    };

    loadWatchlist();
  }, [user]);

  const addToWatchlist = async (movie) => {
    // Check if already exists
    const exists = watchlist.find(m => m.movieId === movie.id);
    if (exists) return;

    // Add to Firebase
    await addToWatchlistDB(user.uid, movie);
    
    // Reload watchlist
    const updated = await getWatchlistDB(user.uid);
    setWatchlist(updated);
  };

  const removeFromWatchlist = async (movieId) => {
    // Find the document to delete
    const movieDoc = watchlist.find(m => m.movieId === movieId);
    if (!movieDoc) return;

    // Delete from Firebase
    await removeFromWatchlistDB(movieDoc.docId);
    
    // Remove from local state
    setWatchlist((prev) => prev.filter(m => m.movieId !== movieId));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(m => m.movieId === movieId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, loading }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}