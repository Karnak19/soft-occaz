import { cn } from '$/utils/cn';

function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-rg-dark rounded-full',
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
