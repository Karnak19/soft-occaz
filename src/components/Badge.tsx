import { cn } from '$/utils/cn';
import { AdsTypeOptions } from '$/utils/pocketbase-types';

type IProps = {
  variant: AdsTypeOptions;
  className?: string;
};

type Variants = {
  [key in AdsTypeOptions]: string;
};

export const baseBadgeClasses = 'inline-flex items-center rounded-lg px-2.5 py-0.5 text-sm font-medium';

export const variants: Variants = {
  aeg: 'bg-amber-200 text-amber-800',
  gbb: 'bg-blue-200 text-blue-800',
  gbbr: 'bg-indigo-200 text-indigo-800',
  ptw: 'bg-fuchsia-200 text-fuchsia-800',
  hpa: 'bg-emerald-200 text-emerald-800',
  gear: 'bg-red-200 text-red-800',
  autres: 'bg-gray-200 text-gray-800',
};

export default function Badge(props: IProps) {
  const className = cn(baseBadgeClasses, variants[props.variant], props.className);

  return <span className={className}>{props.variant.toUpperCase()}</span>;
}
