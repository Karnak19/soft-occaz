import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '$/utils/cn';

export type ButtonVariantProps = VariantProps<typeof button>;

export const button = cva(
  [
    'inline-flex items-center justify-center rounded leading-4 shadow',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-r from-rg-400 to-primary text-white',
          'hover:from-primary hover:to-rg-700 ',
          'active:from-primary active:to-rg-800',
          'disabled:from-rg-100 disabled:to-rg-300 disabled:text-rg-700',
        ],
        secondary: [
          'border border-rg-700 bg-transparent text-rg-700',
          'hover:bg-rg-50',
          'active:bg-rg-100',
          'disabled:text-rg-700',
        ],
        premium: [
          'bg-gradient-to-r from-amber-300 to-amber-500 text-black',
          'hover:from-amber-400 hover:to-amber-600',
          'active:from-amber-500 active:to-amber-700',
          'disabled:from-amber-100 disabled:to-amber-300 disabled:text-amber-700',
        ],
      },
      size: {
        sm: ['px-2 py-1 text-sm'],
        md: ['px-4 py-2 text-base'],
        lg: ['px-6 py-3 text-lg'],
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {}

function Button({ variant, size, className, children, ...rest }: ButtonProps) {
  return (
    <button className={cn(button({ variant, size, className }))} type="button" {...rest}>
      {children}
    </button>
  );
}

export default Button;
