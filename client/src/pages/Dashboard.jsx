import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const tempData = [
  { year: '1950', anomaly: -0.17 }, { year: '1955', anomaly: -0.14 },
  { year: '1960', anomaly: -0.02 }, { year: '1965', anomaly: -0.11 },
  { year: '1970', anomaly: 0.01 }, { year: '1975', anomaly: -0.01 },
  { year: '1980', anomaly: 0.26 }, { year: '1985', anomaly: 0.11 },
  { year: '1990', anomaly: 0.44 }, { year: '1995', anomaly: 0.38 },
  { year: '2000', anomaly: 0.42 }, { year: '2005', anomaly: 0.67 },
  { year: '2010', anomaly: 0.72 }, { year: '2015', anomaly: 0.87 },
  { year: '2020', anomaly: 1.02 }, { year: '2024', anomaly: 1.35 },
];

const co2Data = [
  { sector: 'Energy', emissions: 34.5 },
  { sector: 'Transport', emissions: 8.2 },
  { sector: 'Industry', emissions: 14.1 },
  { sector: 'Agriculture', emissions: 11.3 },
  { sector: 'Buildings', emissions: 5.9 },
  { sector: 'Waste', emissions: 3.2 },
];

const deforestationData = [
  { year: '2000', rate: 5.7 }, { year: '2003', rate: 5.1 },
  { year: '2006', rate: 4.8 }, { year: '2009', rate: 4.3 },
  { year: '2012', rate: 3.9 }, { year: '2015', rate: 4.1 },
  { year: '2018', rate: 4.5 }, { year: '2021', rate: 5.0 },
  { year: '2023', rate: 4.7 },
];

const speciesStatusData = [
  { name: 'Least Concern', value: 42 },
  { name: 'Near Threatened', value: 11 },
  { name: 'Vulnerable', value: 18 },
  { name: 'Endangered', value: 14 },
  { name: 'Critically Endangered', value: 12 },
  { name: 'Extinct', value: 3 },
];

const STATUS_COLORS = {
  'Least Concern': '#22c55e',
  'Near Threatened': '#84cc16',
  'Vulnerable': '#eab308',
  'Endangered': '#f97316',
  'Critically Endangered': '#ef4444',
  'Extinct': '#6b7280',
};

const KEY_STATS = [
  { label: 'Global Avg Temp Rise', value: '+1.35°C', desc: 'Above pre-industrial levels (2024)', color: 'from-red-500 to-orange-500' },
  { label: 'Current CO₂ Level', value: '424 ppm', desc: 'Highest in 800,000 years', color: 'from-orange-500 to-amber-500' },
  { label: 'Species Assessments', value: '150,388', desc: 'On IUCN Red List (2023)', color: 'from-blue-500 to-cyan-500' },
  { label: 'Forest Lost 2023', value: '4.1M ha', desc: 'Equivalent to 11 million football fields', color: 'from-primary-500 to-emerald-500' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-slate-900 dark:text-white mb-2">Environmental Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-300">Real-time data on climate change, biodiversity loss, and conservation status</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {KEY_STATS.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-5 overflow-hidden relative">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
              <div className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} font-heading`}>
                {stat.value}
              </div>
              <div className="font-semibold text-slate-900 dark:text-white mt-1">{stat.label}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Temperature Anomaly Line Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-1">
              Global Temperature Anomaly
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">°C relative to 1951-1980 average</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={tempData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(val) => [`${val}°C`, 'Anomaly']}
                />
                <Line
                  type="monotone"
                  dataKey="anomaly"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  dot={{ fill: '#ef4444', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* CO2 Emissions Bar Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-1">
              CO₂ Emissions by Sector
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Billion tonnes CO₂e (2023)</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={co2Data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="sector" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(val) => [`${val} Gt`, 'Emissions']}
                />
                <Bar dataKey="emissions" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Deforestation Area Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-1">
              Global Deforestation Rate
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Million hectares per year</p>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={deforestationData}>
                <defs>
                  <linearGradient id="defoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(val) => [`${val}M ha`, 'Rate']}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#16a34a"
                  strokeWidth={2.5}
                  fill="url(#defoGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Species Status Pie Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-1">
              Species by Conservation Status
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Percentage distribution (IUCN Red List)</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={speciesStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {speciesStatusData.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(val) => [`${val}%`, 'Percentage']}
                />
                <Legend
                  formatter={(value) => <span style={{ fontSize: 11, color: '#94a3b8' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data sources note */}
        <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-600">
          Data sourced from NASA GISS, IPCC, IUCN Red List, and Global Forest Watch. Values are approximations for educational purposes.
        </div>
      </div>
    </div>
  );
}
