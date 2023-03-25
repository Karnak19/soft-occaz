import { cn } from '$/utils/cn';
import { AdsTypeOptions } from '$/utils/pocketbase-types';

import { variants } from './Badge';

type IProps = {
  variant: AdsTypeOptions;
  className?: string;
  title?: string;
  description?: string;
  icon?: JSX.Element;
};

function BigBadge({ variant, className, icon, description, title }: IProps) {
  const baseClassNames = 'rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-3 text-center';

  return (
    <div className={cn(baseClassNames, variants[variant], className)}>
      <dt>
        {icon}
        <span className="mt-4 text-sm font-medium">{title}</span>
      </dt>
      {description && <dd className="mt-1 text-sm text-zinc-800">{description}</dd>}
    </div>
  );
}

export default BigBadge;
