import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaLeaf, FaMoon, FaSun, FaBars, FaTimes, FaHeart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/species', label: 'Species' },
    { to: '/ecosystems', label: 'Ecosystems' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/take-action', label: 'Take Action' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const activeClass = 'text-primary-500 font-semibold';
  const inactiveClass = 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors';

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold text-primary-700 dark:text-primary-400">
            <FaLeaf className="text-2xl text-primary-600" />
            <span>EcoSphere</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `font-medium text-sm ${isActive ? activeClass : inactiveClass}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun className="text-yellow-400 text-lg" /> : <FaMoon className="text-slate-600 text-lg" />}
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/favorites"
                  className="flex items-center gap-1 text-sm text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors p-2"
                >
                  <FaHeart className="text-red-500" />
                </Link>
                <span className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  <FaUser className="text-primary-600" /> {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300 hover:text-red-600 transition-colors p-2"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-600 dark:text-slate-300">
              {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700 py-4 space-y-2">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => `block px-3 py-2 rounded-lg font-medium text-sm ${isActive ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2 space-y-2">
                <Link to="/favorites" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300">
                  <FaHeart className="text-red-500" /> Favorites
                </Link>
                <div className="px-3 py-2 text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <FaUser className="text-primary-600" /> {user.username}
                </div>
                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center gap-2">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2 space-y-2">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold bg-primary-600 text-white rounded-lg text-center">Register</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
