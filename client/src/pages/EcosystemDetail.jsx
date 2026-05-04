import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaMapMarkerAlt, FaThermometerHalf, FaExpand, FaChartBar } from 'react-icons/fa';

export default function EcosystemDetail() {
  const { id } = useParams();
  const [ecosystem, setEcosystem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEcosystem();
  }, [id]);

  const fetchEcosystem = async () => {
    try {
      const { data } = await axios.get(`/api/ecosystems/${id}`);
      setEcosystem(data);
    } catch {
      setError('Ecosystem not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading ecosystem data..." />;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-600 dark:text-slate-400">{error}</p>
        <Link to="/ecosystems" className="mt-4 text-primary-600 hover:underline block">Back to Ecosystems</Link>
      </div>
    </div>
  );

  const biodiversityPercent = Math.round((ecosystem.biodiversityIndex / 10) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero */}
      <div className="relative h-80 md:h-[450px] overflow-hidden">
        <img
          src={ecosystem.image}
          alt={ecosystem.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Link to="/ecosystems" className="text-white/70 hover:text-white text-sm mb-3 inline-block">
            ← Back to Ecosystems
          </Link>
          <div className="inline-block bg-primary-500/80 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full mb-3">
            {ecosystem.type}
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">{ecosystem.name}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: FaExpand, label: 'Area', value: ecosystem.area, color: 'text-primary-600' },
            { icon: FaThermometerHalf, label: 'Climate', value: ecosystem.climate?.split(' - ')[0], color: 'text-orange-500' },
            { icon: FaChartBar, label: 'Biodiversity Index', value: `${ecosystem.biodiversityIndex}/10`, color: 'text-blue-500' },
            { icon: FaMapMarkerAlt, label: 'Key Species', value: `${ecosystem.keySpecies?.length || 0} documented`, color: 'text-emerald-600' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                <Icon className={`text-xl ${item.color} mb-2`} />
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">{item.label}</p>
                <p className="font-semibold text-slate-900 dark:text-white text-sm">{item.value}</p>
              </div>
            );
          })}
        </div>

        {/* Biodiversity index bar */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-4">Biodiversity Index</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-400 to-emerald-500 rounded-full transition-all duration-1000"
                style={{ width: `${biodiversityPercent}%` }}
              />
            </div>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400 w-12 text-right">
              {ecosystem.biodiversityIndex}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Scale of 0-10 (10 being highest biodiversity)</p>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
          <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-4">About</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">{ecosystem.description}</p>
          {ecosystem.climate && (
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Climate: </span>
              <span className="text-slate-600 dark:text-slate-400">{ecosystem.climate}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Key Species */}
          {ecosystem.keySpecies?.length > 0 && (
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-primary-800 dark:text-primary-400 mb-4">🌿 Key Species</h2>
              <ul className="space-y-2">
                {ecosystem.keySpecies.map((sp, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-primary-700 dark:text-primary-300">
                    <span className="w-6 h-6 rounded-full bg-primary-200 dark:bg-primary-800 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    {sp}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Threats */}
          {ecosystem.threats?.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-red-800 dark:text-red-400 mb-4">⚠️ Threats</h2>
              <ul className="space-y-2">
                {ecosystem.threats.map((threat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-red-700 dark:text-red-300">
                    <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                    {threat}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-10 bg-gradient-to-r from-primary-700 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="font-heading text-2xl font-bold mb-3">Protect This Ecosystem</h3>
          <p className="text-primary-100 mb-6">Learn what you can do to help preserve the {ecosystem.name}.</p>
          <Link to="/take-action" className="inline-block bg-white text-primary-700 font-bold py-3 px-6 rounded-xl hover:bg-primary-50 transition-colors">
            Take Action Now
          </Link>
        </div>
      </div>
    </div>
  );
}
