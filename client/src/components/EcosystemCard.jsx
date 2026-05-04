import { Link } from 'react-router-dom';
import { FaTree, FaWater, FaSun, FaSnowflake, FaLeaf, FaGlobeAmericas } from 'react-icons/fa';

const TYPE_CONFIG = {
  Forest: { icon: FaTree, color: 'bg-emerald-500', light: 'bg-emerald-100 text-emerald-700' },
  Ocean: { icon: FaWater, color: 'bg-blue-500', light: 'bg-blue-100 text-blue-700' },
  Desert: { icon: FaSun, color: 'bg-amber-500', light: 'bg-amber-100 text-amber-700' },
  Wetlands: { icon: FaLeaf, color: 'bg-teal-500', light: 'bg-teal-100 text-teal-700' },
  Grassland: { icon: FaGlobeAmericas, color: 'bg-lime-500', light: 'bg-lime-100 text-lime-700' },
  Tundra: { icon: FaSnowflake, color: 'bg-cyan-500', light: 'bg-cyan-100 text-cyan-700' },
};

export default function EcosystemCard({ ecosystem }) {
  const config = TYPE_CONFIG[ecosystem.type] || TYPE_CONFIG.Forest;
  const Icon = config.icon;

  return (
    <div className="card group overflow-hidden">
      <Link to={`/ecosystems/${ecosystem._id}`}>
        <div className="relative overflow-hidden h-48">
          <img
            src={ecosystem.image}
            alt={ecosystem.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${config.light}`}>
              <Icon className="text-xs" />
              {ecosystem.type}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-heading font-bold text-xl text-white group-hover:text-primary-300 transition-colors">
              {ecosystem.name}
            </h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
            {ecosystem.description?.substring(0, 120)}...
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {ecosystem.keySpecies?.length || 0} key species
            </span>
            <span className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline">
              Explore →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
