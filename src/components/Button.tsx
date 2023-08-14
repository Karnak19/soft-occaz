import { cn } from '$/utils/cn';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

export type ButtonVariantProps = VariantProps<typeof button>;

export const button = cva(
  [
    'inline-flex items-center justify-center rounded font-title leading-4 shadow',
    'disabled:cursor-not-allowed focus:ring-2 focus:ring-offset-2 focus:outline-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-r from-rg-400 to-rg-600 text-white',
          'hover:from-rg-500  hover:to-rg-700 ',
          'active:from-600 active:to-800',
          'disabled:from-rg-100 disabled:to-rg-300 disabled:text-rg-700',
        ],
        secondary: [
          'bg-transparent border border-rg-700 text-rg-700',
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
