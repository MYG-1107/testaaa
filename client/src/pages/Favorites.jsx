import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import SpeciesCard from '../components/SpeciesCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Favorites() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }
    if (user) fetchFavorites();
  }, [user, authLoading]);

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get('/api/favorites');
      setFavorites(data);
    } catch {
      setError('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (speciesId, isFav) => {
    if (!isFav) {
      setFavorites(prev => prev.filter(s => s._id !== speciesId));
    }
  };

  if (authLoading || loading) return <LoadingSpinner text="Loading favorites..." />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <FaHeart className="text-red-500 text-3xl" />
          <div>
            <h1 className="font-heading text-4xl font-bold text-slate-900 dark:text-white">My Favorites</h1>
            <p className="text-slate-600 dark:text-slate-400">{favorites.length} species saved</p>
          </div>
        </div>

        {error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-20">
            <FaHeart className="text-6xl text-slate-200 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-2">No favorites yet</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Browse our species directory and click the heart icon to save your favorites.
            </p>
            <Link to="/species" className="btn-primary">
              Explore Species
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(sp => (
              <SpeciesCard
                key={sp._id}
                species={sp}
                isFavorited={true}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
