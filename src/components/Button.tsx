import { PropsWithChildren } from 'react';

import { cn } from '$/utils/cn';
type ButtonProps = PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'tertiary';
  block?: boolean;
  className?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const baseButtonClasses = cn([
  'inline-flex items-center justify-center rounded border border-transparent px-4 py-2 font-title leading-4 shadow',
  'focus:outline-none focus:ring-2 focus:ring-offset-2 text-center',
  'hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
]);

function Button({ variant = 'primary', block = false, className, children, ...rest }: ButtonProps) {
  const blockObj = {
    'w-full': block,
  };

  const variants: {
    [key in NonNullable<ButtonProps['variant']>]: string;
  } = {
    primary: cn([
      baseButtonClasses,
      'bg-gradient-to-t from-rg to-rg-400 hover:bg-rg-dark focus:ring-rg text-white',
      blockObj,
      className,
    ]),
    secondary: cn([baseButtonClasses, 'bg-transparent hover:bg-rg/50 border-rg-lightest', blockObj, className]),
    tertiary: cn([baseButtonClasses, 'hover:bg-rg/50 hover:border-rg', blockObj, className]),
  };

  return (
    <button className={variants[variant]} type="button" {...rest}>
      {children}
    </button>
  );
}

export default Button;
