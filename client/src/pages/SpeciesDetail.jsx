import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaMapMarkerAlt, FaLeaf, FaWeight, FaRuler, FaClock, FaUtensils } from 'react-icons/fa';
import axios from 'axios';
import ConservationBadge from '../components/ConservationBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

export default function SpeciesDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorited, setFavorited] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    fetchSpecies();
  }, [id]);

  const fetchSpecies = async () => {
    try {
      const { data } = await axios.get(`/api/species/${id}`);
      setSpecies(data);
    } catch {
      setError('Species not found');
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!user) return;
    setFavLoading(true);
    try {
      if (favorited) {
        await axios.delete(`/api/favorites/${id}`);
        setFavorited(false);
      } else {
        await axios.post(`/api/favorites/${id}`);
        setFavorited(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFavLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading species data..." />;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl text-slate-400 mb-4">🔍</p>
        <p className="text-slate-600 dark:text-slate-400">{error}</p>
        <Link to="/species" className="mt-4 text-primary-600 hover:underline block">Back to Species Directory</Link>
      </div>
    </div>
  );

  const infoItems = [
    { icon: FaMapMarkerAlt, label: 'Region', value: species.region },
    { icon: FaLeaf, label: 'Habitat', value: species.habitat },
    { icon: FaUtensils, label: 'Diet', value: species.diet },
    { icon: FaClock, label: 'Lifespan', value: species.lifespan },
    { icon: FaWeight, label: 'Weight', value: species.weight },
    { icon: FaRuler, label: 'Height / Length', value: species.height },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Image */}
      <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden">
        <img
          src={species.image}
          alt={species.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Link to="/species" className="text-white/70 hover:text-white text-sm mb-3 inline-block transition-colors">
            ← Back to Species
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">{species.name}</h1>
              {species.commonName && species.commonName !== species.name && (
                <p className="text-white/80 text-xl italic">{species.commonName}</p>
              )}
              <div className="mt-3">
                <ConservationBadge status={species.conservationStatus} size="lg" />
              </div>
            </div>
            {user && (
              <button
                onClick={handleFavorite}
                disabled={favLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  favorited
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white/20 text-white hover:bg-red-500 backdrop-blur-sm'
                }`}
              >
                <FaHeart className={favLoading ? 'animate-pulse' : ''} />
                {favorited ? 'Favorited' : 'Favorite'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Info grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {infoItems.map((item, idx) => {
            const Icon = item.icon;
            return item.value ? (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-1">
                  <Icon className="text-sm" />
                  <span className="text-xs font-medium uppercase tracking-wide">{item.label}</span>
                </div>
                <p className="text-slate-900 dark:text-white font-medium text-sm">{item.value}</p>
              </div>
            ) : null;
          })}
        </div>

        {/* Description */}
        {species.description && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-4">About</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">{species.description}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Threats */}
          {species.threats && species.threats.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-red-800 dark:text-red-400 mb-4">⚠️ Major Threats</h2>
              <ul className="space-y-2">
                {species.threats.map((threat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-red-700 dark:text-red-300">
                    <span className="text-red-500 mt-1">•</span>
                    {threat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fun Facts */}
          {species.funFacts && species.funFacts.length > 0 && (
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-primary-800 dark:text-primary-400 mb-4">🌟 Fun Facts</h2>
              <ul className="space-y-3">
                {species.funFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-primary-700 dark:text-primary-300">
                    <span className="text-primary-500 font-bold mt-0.5">{idx + 1}.</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-r from-primary-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="font-heading text-2xl font-bold mb-3">Help Protect the {species.name}</h3>
          <p className="text-primary-100 mb-6">Every action makes a difference. Learn what you can do to help conserve this species.</p>
          <Link to="/take-action" className="inline-block bg-white text-primary-700 font-bold py-3 px-6 rounded-xl hover:bg-primary-50 transition-colors">
            Take Action Now
          </Link>
        </div>
      </div>
    </div>
  );
}
