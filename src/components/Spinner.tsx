import { cn } from '$/utils/cn';

function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-block h-5 w-5 animate-spin rounded-full border-[3px] border-current border-t-transparent text-rg-dark',
        className,
      )}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
