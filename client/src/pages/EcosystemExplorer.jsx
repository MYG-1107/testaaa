import { useState, useEffect } from 'react';
import axios from 'axios';
import EcosystemCard from '../components/EcosystemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaTree, FaWater, FaSun, FaSnowflake, FaLeaf, FaGlobeAmericas } from 'react-icons/fa';

const TYPES = [
  { label: 'All', icon: FaGlobeAmericas },
  { label: 'Forest', icon: FaTree },
  { label: 'Ocean', icon: FaWater },
  { label: 'Desert', icon: FaSun },
  { label: 'Wetlands', icon: FaLeaf },
  { label: 'Grassland', icon: FaGlobeAmericas },
  { label: 'Tundra', icon: FaSnowflake },
];

export default function EcosystemExplorer() {
  const [ecosystems, setEcosystems] = useState([]);
  const [activeType, setActiveType] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEcosystems();
  }, []);

  const fetchEcosystems = async () => {
    try {
      const { data } = await axios.get('/api/ecosystems');
      setEcosystems(data);
    } catch {
      setError('Failed to load ecosystems');
    } finally {
      setLoading(false);
    }
  };

  const filtered = activeType === 'All'
    ? ecosystems
    : ecosystems.filter(e => e.type === activeType);

  if (loading) return <LoadingSpinner text="Loading ecosystems..." />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-slate-900 dark:text-white mb-2">Ecosystem Explorer</h1>
          <p className="text-slate-600 dark:text-slate-300">Discover Earth's most vital and threatened environments</p>
        </div>

        {/* Type filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TYPES.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveType(label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                activeType === label
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600'
              }`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>

        {error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400">No ecosystems found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(eco => (
              <EcosystemCard key={eco._id} ecosystem={eco} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
