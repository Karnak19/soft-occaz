import { PropsWithChildren } from 'react';

import { cn } from '$/utils/cn';
type ButtonProps = PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'tertiary';
  block?: boolean;
  className?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ variant = 'primary', block = false, className, children, ...rest }: ButtonProps) {
  const baseClasses = cn([
    'inline-flex items-center text-sky-100 rounded border border-transparent px-4 py-2 font-title text-sm leading-4 shadow',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      'w-full': block,
    },
  ]);

  const variants: {
    [key in NonNullable<ButtonProps['variant']>]: string;
  } = {
    primary: cn([baseClasses, 'bg-sky-800 hover:bg-sky-700 focus:ring-sky-800', className]),
    secondary: cn([baseClasses, 'bg-transparent hover:bg-sky-800/50 border-sky-800', className]),
    tertiary: cn([baseClasses, 'hover:bg-sky-800/50 hover:border-sky-800', className]),
  };

  return (
    <button className={variants[variant]} type="button" {...rest}>
      {children}
    </button>
  );
}

export default Button;
