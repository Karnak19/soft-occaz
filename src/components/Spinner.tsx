import { cn } from '$/utils/cn';

function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-block size-5 animate-spin rounded-full border-[3px] border-current border-t-transparent text-rg-700',
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
