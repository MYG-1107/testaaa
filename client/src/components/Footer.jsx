import { Link } from 'react-router-dom';
import { FaLeaf, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold text-primary-400 mb-4">
              <FaLeaf className="text-2xl" />
              <span>EcoSphere</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Dedicated to protecting our planet's biodiversity by raising awareness about endangered species and ecosystems in crisis.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-400 transition-colors text-lg">
                <FaTwitter />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-400 transition-colors text-lg">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-400 transition-colors text-lg">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-400 transition-colors text-lg">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              {[
                { to: '/species', label: 'Species Directory' },
                { to: '/ecosystems', label: 'Ecosystems' },
                { to: '/dashboard', label: 'Data Dashboard' },
                { to: '/take-action', label: 'Take Action' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-primary-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="font-semibold text-white mb-4">Conservation Partners</h3>
            <ul className="space-y-2">
              {[
                { href: 'https://www.worldwildlife.org', label: 'WWF' },
                { href: 'https://www.greenpeace.org', label: 'Greenpeace' },
                { href: 'https://www.conservation.org', label: 'Conservation International' },
                { href: 'https://www.iucn.org', label: 'IUCN' },
              ].map(link => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} EcoSphere. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Built with 🌱 for a sustainable future
          </p>
        </div>
      </div>
    </footer>
  );
}
