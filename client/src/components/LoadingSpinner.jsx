export default function LoadingSpinner({ size = 'md', text = '' }) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-20 h-20 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div
        className={`${sizeClasses[size]} rounded-full border-primary-200 border-t-primary-600 animate-spin`}
      />
      {text && <p className="text-slate-500 dark:text-slate-400 text-sm animate-pulse">{text}</p>}
    </div>
  );
}
