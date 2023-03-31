import { cn } from '$/utils/cn';
import { AnnoncesTypeOptions } from '$/utils/pocketbase-types';

import { variants } from './Badge';

type IProps = {
  variant: AnnoncesTypeOptions;
  className?: string;
  title?: string;
  description?: string;
  icon?: JSX.Element;
};

function BigBadge({ variant, className, icon, description, title }: IProps) {
  const baseClassNames = 'rounded-lg border border-rg-dark bg-rg-darkest px-6 py-3 text-center';

  return (
    <dl className={cn(baseClassNames, variants[variant], className)}>
      <dt>
        {icon}
        <span className="mt-4  font-medium">{title}</span>
      </dt>
      {description && <dd className="mt-1  text-rg-darkest">{description}</dd>}
    </dl>
  );
}

export default BigBadge;
