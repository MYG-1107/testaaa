import { useState, useEffect } from 'react';
import { FaHeart, FaShare, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdVolunteerActivism } from 'react-icons/md';

const PLEDGE_TYPES = [
  'Reduce meat consumption',
  'Use public transportation',
  'Plant trees in my community',
  'Reduce single-use plastics',
  'Support conservation charities',
  'Educate others about biodiversity',
  'Use renewable energy at home',
  'Advocate for wildlife protection',
];

const TIPS = [
  { icon: '🌱', tip: 'Plant native species in your garden to support local wildlife.' },
  { icon: '🚗', tip: 'Walk, cycle, or use public transport to reduce your carbon footprint.' },
  { icon: '🥦', tip: 'Reduce meat consumption — livestock farming drives deforestation.' },
  { icon: '♻️', tip: 'Reduce single-use plastics that end up in oceans and harm marine life.' },
  { icon: '💡', tip: 'Switch to LED bulbs and renewable energy to cut emissions.' },
  { icon: '💧', tip: 'Conserve water — freshwater habitats are critical for biodiversity.' },
  { icon: '🛍️', tip: 'Choose sustainable products and avoid items made from endangered species.' },
  { icon: '📣', tip: 'Vote for politicians who prioritize environmental protection.' },
  { icon: '🤝', tip: 'Volunteer with local conservation groups and habitat restoration projects.' },
  { icon: '📚', tip: 'Learn and share knowledge — education is the foundation of conservation.' },
];

const ORGS = [
  {
    name: 'World Wildlife Fund',
    url: 'https://www.worldwildlife.org/how-to-help/donate',
    desc: 'Leading conservation organization protecting wildlife and habitats worldwide.',
    color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    textColor: 'text-orange-700 dark:text-orange-400',
    icon: '🐼',
  },
  {
    name: 'Greenpeace',
    url: 'https://www.greenpeace.org/usa/donate/',
    desc: 'Campaigning for a green and peaceful world through direct action.',
    color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    textColor: 'text-green-700 dark:text-green-400',
    icon: '🌍',
  },
  {
    name: 'Conservation International',
    url: 'https://www.conservation.org/donate',
    desc: 'Science-based conservation protecting nature for the benefit of humanity.',
    color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-700 dark:text-blue-400',
    icon: '🦋',
  },
];

export default function TakeAction() {
  const [pledges, setPledges] = useState(() => {
    const stored = localStorage.getItem('ecosphere_pledges');
    return stored ? JSON.parse(stored) : [];
  });
  const [form, setForm] = useState({ name: '', email: '', pledgeType: PLEDGE_TYPES[0] });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem('ecosphere_pledges', JSON.stringify(pledges));
  }, [pledges]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPledge = { ...form, date: new Date().toISOString() };
    setPledges(prev => [...prev, newPledge]);
    setSubmitted(true);
    setForm({ name: '', email: '', pledgeType: PLEDGE_TYPES[0] });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const shareText = `I just pledged to help protect our planet's biodiversity on EcoSphere! Join me: ${window.location.origin}/take-action`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-emerald-900 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MdVolunteerActivism className="text-6xl mx-auto mb-4 text-primary-300" />
          <h1 className="font-heading text-5xl font-bold mb-4">Take Action</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Every individual action contributes to a collective change. Join thousands of people committed to protecting our planet's biodiversity.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
            <FaHeart className="text-red-400" />
            <span className="font-semibold">{pledges.length.toLocaleString()} people have pledged</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Pledge Form */}
          <div>
            <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-2">Make Your Pledge</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Commit to one action that will help protect our natural world.
            </p>

            {submitted && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl text-green-700 dark:text-green-400 flex items-center gap-2">
                <span className="text-xl">🌿</span>
                <div>
                  <p className="font-semibold">Thank you for your pledge!</p>
                  <p className="text-sm">Together we make a difference.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">I Pledge To</label>
                <select
                  value={form.pledgeType}
                  onChange={e => setForm(f => ({ ...f, pledgeType: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {PLEDGE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <FaHeart /> Make My Pledge
              </button>
            </form>

            {/* Share buttons */}
            <div className="mt-6">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <FaShare /> Share on social media
              </p>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <FaTwitter /> Twitter
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <FaFacebook /> Facebook
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(shareText)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  📋 Copy Link
                </button>
              </div>
            </div>
          </div>

          {/* Donation Organizations */}
          <div>
            <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-2">Support Conservation</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Your donation to these organizations directly funds wildlife protection.
            </p>
            <div className="space-y-4">
              {ORGS.map(org => (
                <a
                  key={org.name}
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-5 rounded-2xl border ${org.color} hover:shadow-md transition-all duration-200 group`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{org.icon}</span>
                    <h3 className={`font-heading font-bold text-lg ${org.textColor}`}>{org.name}</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{org.desc}</p>
                  <span className={`mt-2 inline-block text-sm font-medium ${org.textColor} group-hover:underline`}>
                    Donate now →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div>
          <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center">
            10 Ways You Can Help
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-8">
            Simple everyday actions that make a real difference
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TIPS.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
