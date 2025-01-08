import { useDescription, useTsController } from '@ts-react/form';

import { Input } from '$/components/ui/input';
import { cn } from '$/utils/cn';

function TextField({ className }: { className?: string }) {
  const { field, error } = useTsController<string>();

  const { label, placeholder } = useDescription();

  return (
    <div className="flex flex-col gap-1">
      {label && <label>{label}</label>}
      <Input
        className={cn(
          {
            'ring-2 ring-destructive': error?.errorMessage,
          },
          className,
        )}
        placeholder={placeholder}
        value={field.value ? field.value : ''} // conditional to prevent "uncontrolled to controlled" react warning
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
      />
      {error?.errorMessage && <span className="text-red-500">{error?.errorMessage}</span>}
    </div>
  );
}

export default TextField;
