const STATUS_CONFIG = {
  'Critically Endangered': { bg: 'bg-red-100 dark:bg-red-900/40', text: 'text-red-700 dark:text-red-400', dot: 'bg-red-500' },
  'Endangered': { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-400', dot: 'bg-orange-500' },
  'Vulnerable': { bg: 'bg-yellow-100 dark:bg-yellow-900/40', text: 'text-yellow-700 dark:text-yellow-500', dot: 'bg-yellow-500' },
  'Near Threatened': { bg: 'bg-lime-100 dark:bg-lime-900/40', text: 'text-lime-700 dark:text-lime-400', dot: 'bg-lime-500' },
  'Least Concern': { bg: 'bg-green-100 dark:bg-green-900/40', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500' },
  'Extinct': { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-400', dot: 'bg-slate-500' },
};

export default function ConservationBadge({ status, size = 'sm' }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['Least Concern'];
  const textSize = size === 'lg' ? 'text-sm' : 'text-xs';
  const padding = size === 'lg' ? 'px-3 py-1.5' : 'px-2 py-0.5';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${config.bg} ${config.text} ${textSize} ${padding}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}
