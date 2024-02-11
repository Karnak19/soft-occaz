import { ComponentProps } from 'react';
import NextLink from 'next/link';

import { cn } from '$/utils/cn';

import { button, type ButtonVariantProps } from './Button';

type LinkProps = ButtonVariantProps & ComponentProps<typeof NextLink>;

function Link({ variant, size, className, children, ...rest }: LinkProps) {
  return (
    <NextLink className={cn(button({ variant, size, className }))} {...rest}>
      {children}
    </NextLink>
  );
}

export default Link;
