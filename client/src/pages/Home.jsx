import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowDown, FaLeaf, FaFire, FaWater, FaTree } from 'react-icons/fa';
import { MdThermostat, MdForest, MdWaves } from 'react-icons/md';
import axios from 'axios';
import SpeciesCard from '../components/SpeciesCard';
import EcosystemCard from '../components/EcosystemCard';

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { value: 1000000, suffix: '+', label: 'Species Threatened', desc: 'Plants and animals face extinction', color: 'from-red-500 to-orange-500', icon: '🦁' },
  { value: 50, suffix: '%', label: 'Wildlife Lost', desc: 'Since 1970 due to human activity', color: 'from-orange-500 to-amber-500', icon: '📉' },
  { value: 3, suffix: 'B', label: 'Birds Lost', desc: 'In North America since 1970', color: 'from-amber-500 to-yellow-500', icon: '🐦' },
  { value: 68, suffix: '%', label: 'Population Decline', desc: 'Decrease in wildlife populations', color: 'from-yellow-500 to-lime-500', icon: '🌍' },
];

const CRISIS_CARDS = [
  {
    icon: MdThermostat,
    title: 'Rising Temperatures',
    desc: 'Global temperatures have risen 1.1°C since pre-industrial times, disrupting ecosystems worldwide and pushing species beyond their thermal limits.',
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    icon: MdForest,
    title: 'Deforestation',
    desc: 'Over 10 million hectares of forest are destroyed every year, eliminating habitat for countless species and releasing stored carbon into the atmosphere.',
    color: 'text-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: MdWaves,
    title: 'Ocean Acidification',
    desc: 'Oceans have absorbed 30% of CO₂ emissions, causing a 26% increase in acidity since the Industrial Revolution, devastating coral reefs and marine life.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
];

export default function Home() {
  const [featuredSpecies, setFeaturedSpecies] = useState([]);
  const [ecosystems, setEcosystems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [specRes, ecoRes] = await Promise.all([
          axios.get('/api/species'),
          axios.get('/api/ecosystems'),
        ]);
        setFeaturedSpecies(specRes.data.slice(0, 6));
        setEcosystems(ecoRes.data.slice(0, 4));
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      }
    };
    loadData();
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900" />
        {/* Animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-secondary-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        {/* Particle dots */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary-500/20 border border-primary-400/30 rounded-full px-4 py-1.5 text-primary-300 text-sm font-medium mb-6">
            <FaLeaf className="animate-pulse" />
            Join the conservation movement
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Protecting Our Planet's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-300">
              Biodiversity
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover, learn, and take action to protect Earth's most vulnerable species and ecosystems before they disappear forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/species" className="btn-primary text-base">
              🦁 Explore Species
            </Link>
            <Link to="/take-action" className="btn-secondary text-base">
              Take Action Now
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <FaArrowDown className="text-sm" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">The Crisis in Numbers</h2>
            <p className="section-subtitle">The scale of biodiversity loss is staggering</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-2xl p-6 bg-slate-50 dark:bg-slate-700 hover:shadow-lg transition-all duration-300 group">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className={`font-heading text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-semibold text-slate-900 dark:text-white mt-1">{stat.label}</div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Climate Crisis Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">The Climate Crisis</h2>
            <p className="section-subtitle">Understanding the threats facing our natural world</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CRISIS_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className={`${card.bg} rounded-2xl p-8 hover:shadow-lg transition-all duration-300`}>
                  <Icon className={`text-5xl ${card.color} mb-4`} />
                  <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-3">{card.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Species */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title mb-2">Featured Species</h2>
              <p className="text-slate-600 dark:text-slate-300">Animals that need our help right now</p>
            </div>
            <Link to="/species" className="text-primary-600 dark:text-primary-400 font-medium hover:underline hidden sm:block">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSpecies.map(species => (
              <SpeciesCard key={species._id} species={species} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link to="/species" className="btn-primary">View All Species</Link>
          </div>
        </div>
      </section>

      {/* Ecosystem Preview */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title mb-2">Explore Ecosystems</h2>
              <p className="text-slate-600 dark:text-slate-300">Earth's most vital and threatened environments</p>
            </div>
            <Link to="/ecosystems" className="text-primary-600 dark:text-primary-400 font-medium hover:underline hidden sm:block">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystems.map(eco => (
              <EcosystemCard key={eco._id} ecosystem={eco} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-primary-800 to-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Every Action Counts
          </h2>
          <p className="text-primary-100 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of people who are making a difference for our planet's biodiversity.
          </p>
          <Link to="/take-action" className="inline-block bg-white text-primary-700 font-bold py-4 px-8 rounded-xl hover:bg-primary-50 transition-colors text-lg shadow-lg">
            Take Action Today 🌿
          </Link>
        </div>
      </section>
    </div>
  );
}
