import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
import ConservationBadge from './ConservationBadge';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function SpeciesCard({ species, onFavoriteToggle, isFavorited = false }) {
  const { user } = useAuth();
  const [favorited, setFavorited] = useState(isFavorited);
  const [loading, setLoading] = useState(false);

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      if (favorited) {
        await axios.delete(`/api/favorites/${species._id}`);
        setFavorited(false);
      } else {
        await axios.post(`/api/favorites/${species._id}`);
        setFavorited(true);
      }
      if (onFavoriteToggle) onFavoriteToggle(species._id, !favorited);
    } catch (err) {
      console.error('Favorite error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card group overflow-hidden">
      <Link to={`/species/${species._id}`}>
        <div className="relative overflow-hidden h-52">
          <img
            src={species.image}
            alt={species.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <ConservationBadge status={species.conservationStatus} />
          </div>
          {user && (
            <button
              onClick={handleFavorite}
              disabled={loading}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                favorited ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-600 hover:bg-red-500 hover:text-white'
              }`}
            >
              <FaHeart className={loading ? 'animate-pulse' : ''} />
            </button>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {species.name}
          </h3>
          {species.commonName && species.commonName !== species.name && (
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">{species.commonName}</p>
          )}
          <div className="flex items-center gap-1 mt-2 text-sm text-slate-500 dark:text-slate-400">
            <FaMapMarkerAlt className="text-primary-500 flex-shrink-0" />
            <span>{species.region}</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{species.habitat?.substring(0, 60)}...</p>
        </div>
      </Link>
    </div>
  );
}
