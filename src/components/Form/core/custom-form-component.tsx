import { ComponentProps, PropsWithChildren } from 'react';

import { Button } from '$/components/ui/button';
import { CardContent, CardFooter, CardHeader, FormCard } from '$/components/ui/card';

export function CustomFormComponent({
  children,
  onSubmit,
  submitButtonProps = {},
  className,
  renderBefore,
}: PropsWithChildren<{
  onSubmit: () => void;
  submitButtonProps?: ComponentProps<typeof Button>;
  className?: string;
  renderBefore?: (opts: { submit: () => void }) => JSX.Element;
  isLoading?: boolean;
}>) {
  return (
    <FormCard onSubmit={onSubmit} className={className}>
      <CardHeader>{renderBefore?.({ submit: onSubmit })}</CardHeader>
      <CardContent className="flex flex-col gap-5">{children}</CardContent>
      <CardFooter>
        <Button type="submit" {...submitButtonProps} />
      </CardFooter>
    </FormCard>
  );
}
