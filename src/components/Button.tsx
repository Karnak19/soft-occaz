import { PropsWithChildren } from 'react';

import { cn } from '$/utils/cn';
type ButtonProps = PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'tertiary';
  block?: boolean;
  className?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const baseButtonClasses = cn([
  'inline-flex items-center text-sky-100 rounded border border-transparent px-4 py-2 font-title text-sm leading-4 shadow',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
]);

function Button({ variant = 'primary', block = false, className, children, ...rest }: ButtonProps) {
  const blockObj = {
    'w-full': block,
  };

  const variants: {
    [key in NonNullable<ButtonProps['variant']>]: string;
  } = {
    primary: cn([baseButtonClasses, 'bg-sky-500 hover:bg-sky-700 focus:ring-sky-500', blockObj, className]),
    secondary: cn([baseButtonClasses, 'bg-transparent hover:bg-sky-500/50 border-sky-500', blockObj, className]),
    tertiary: cn([baseButtonClasses, 'hover:bg-sky-500/50 hover:border-sky-500', blockObj, className]),
  };

  return (
    <button className={variants[variant]} type="button" {...rest}>
      {children}
    </button>
  );
}

export default Button;
