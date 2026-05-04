import { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import axios from 'axios';
import SpeciesCard from '../components/SpeciesCard';
import LoadingSpinner from '../components/LoadingSpinner';

const STATUSES = ['Critically Endangered', 'Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern'];
const REGIONS = ['All', 'Africa', 'Asia', 'North America', 'Central America', 'Ocean', 'Arctic', 'Europe/Asia'];

export default function SpeciesDirectory() {
  const [species, setSpecies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const PER_PAGE = 9;

  useEffect(() => {
    fetchSpecies();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [species, search, selectedStatuses, selectedRegion]);

  const fetchSpecies = async () => {
    try {
      const { data } = await axios.get('/api/species');
      setSpecies(data);
    } catch (err) {
      setError('Failed to load species data');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let data = [...species];
    if (search) {
      const s = search.toLowerCase();
      data = data.filter(sp =>
        sp.name.toLowerCase().includes(s) ||
        (sp.commonName && sp.commonName.toLowerCase().includes(s)) ||
        (sp.habitat && sp.habitat.toLowerCase().includes(s))
      );
    }
    if (selectedStatuses.length > 0) {
      data = data.filter(sp => selectedStatuses.includes(sp.conservationStatus));
    }
    if (selectedRegion !== 'All') {
      data = data.filter(sp => sp.region === selectedRegion);
    }
    setFiltered(data);
    setPage(1);
  };

  const toggleStatus = (status) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  if (loading) return <LoadingSpinner text="Loading species..." />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-slate-900 dark:text-white mb-2">Species Directory</h1>
          <p className="text-slate-600 dark:text-slate-300">Explore {species.length} species and their conservation status</p>
        </div>

        {/* Search and filter bar */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-4 mb-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search species by name, habitat..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={selectedRegion}
            onChange={e => setSelectedRegion(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors font-medium text-sm ${
              showFilters || selectedStatuses.length > 0
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary-400'
            }`}
          >
            <FaFilter /> Filters {selectedStatuses.length > 0 && `(${selectedStatuses.length})`}
          </button>
        </div>

        {/* Status filter checkboxes */}
        {showFilters && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-4 mb-6">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Conservation Status:</p>
            <div className="flex flex-wrap gap-3">
              {STATUSES.map(status => (
                <label key={status} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status)}
                    onChange={() => toggleStatus(status)}
                    className="rounded accent-primary-600"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{status}</span>
                </label>
              ))}
              {selectedStatuses.length > 0 && (
                <button onClick={() => setSelectedStatuses([])} className="text-xs text-red-500 hover:underline ml-2">
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {paginated.length} of {filtered.length} species
          </p>
        </div>

        {/* Grid */}
        {error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl mb-2">🔍</p>
            <p className="text-slate-500 dark:text-slate-400">No species found matching your criteria.</p>
            <button onClick={() => { setSearch(''); setSelectedStatuses([]); setSelectedRegion('All'); }} className="mt-4 text-primary-600 hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map(sp => (
              <SpeciesCard key={sp._id} species={sp} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 disabled:opacity-50 hover:border-primary-500 transition-colors text-sm"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  page === i + 1
                    ? 'bg-primary-600 text-white'
                    : 'border border-slate-200 dark:border-slate-600 hover:border-primary-500 text-slate-700 dark:text-slate-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 disabled:opacity-50 hover:border-primary-500 transition-colors text-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
