import { Type } from '@prisma/client';

import { cn } from '$/utils/cn';

import { variants } from './Badge';

type IProps = {
  variant: Type;
  className?: string;
  title?: string;
  description?: string;
  icon?: JSX.Element;
};

function BigBadge({ variant, className, icon, description, title }: IProps) {
  const baseClassNames = 'rounded-lg border border-rg-700 bg-rg-900 px-6 py-3 text-center';

  return (
    <dl className={cn(baseClassNames, variants[variant], className)}>
      <dt>
        {icon}
        <span className="mt-4  font-medium">{title}</span>
      </dt>
      {description && <dd className="mt-1  text-rg-900">{description}</dd>}
    </dl>
  );
}

export default BigBadge;
