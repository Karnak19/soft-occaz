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
  aeg: 'bg-lime-200 text-lime-800',
  gbb: 'bg-blue-200 text-blue-800',
  gbbr: 'bg-teal-200 text-teal-800',
  ptw: 'bg-purple-200 text-purple-800',
  hpa: 'bg-indigo-200 text-indigo-800',
  gear: 'bg-pink-200 text-pink-800',
  autres: 'bg-gray-200 text-gray-800',
};

export default function Badge(props: IProps) {
  const className = cn(baseBadgeClasses, variants[props.variant], props.className);

  return <span className={className}>{props.variant.toUpperCase()}</span>;
}
