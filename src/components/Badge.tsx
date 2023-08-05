import type { Type } from '@prisma/client';

import { cn } from '$/utils/cn';

type IProps = {
  variant: Type;
  className?: string;
};

type Variants = {
  [key in Type]: string;
};

export const baseBadgeClasses = 'inline-flex items-center rounded-lg px-2.5 py-0.5  font-medium';

export const variants: Variants = {
  AEG: 'bg-amber-200 text-amber-800',
  AEP: 'bg-violet-200 text-violet-800',
  GBB: 'bg-blue-200 text-blue-800',
  GBBR: 'bg-indigo-200 text-indigo-800',
  PTW: 'bg-fuchsia-200 text-fuchsia-800',
  HPA: 'bg-emerald-200 text-emerald-800',
  GEAR: 'bg-red-200 text-red-800',
  Sniper: 'bg-yellow-200 text-yellow-800',
  Other: 'bg-gray-200 text-gray-800',
};

export default function Badge(props: IProps) {
  const className = cn(baseBadgeClasses, variants[props.variant], props.className);

  return <span className={className}>{props.variant.toUpperCase()}</span>;
}
