import NextLink from 'next/link';
import { ComponentProps } from 'react';

import { button, type ButtonVariantProps } from './Button';
import { cn } from '$/utils/cn';

type LinkProps = ButtonVariantProps & ComponentProps<typeof NextLink>;

function Link({ variant, size, className, children, ...rest }: LinkProps) {
  return (
    <NextLink className={cn(button({ variant, size, className }))} {...rest}>
      {children}
    </NextLink>
  );
}

export default Link;
