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
  const baseClassNames = 'rounded-lg border border-slate-700 bg-slate-800 px-6 py-3 text-center';

  return (
    <dl className={cn(baseClassNames, variants[variant], className)}>
      <dt>
        {icon}
        <span className="mt-4 text-sm font-medium">{title}</span>
      </dt>
      {description && <dd className="mt-1 text-sm text-slate-800">{description}</dd>}
    </dl>
  );
}

export default BigBadge;
