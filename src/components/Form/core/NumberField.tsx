import { useDescription, useTsController } from '@ts-react/form';

import { cn } from '$/utils/cn';

import { Input } from '$/components/ui/input';

function NumberField() {
  const { field, error } = useTsController<number>();

  const { label, placeholder } = useDescription();

  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <Input
        className={cn({
          'ring-2 ring-destructive': error?.errorMessage,
        })}
        type="number"
        placeholder={placeholder}
        value={field.value ? field.value : ''} // conditional to prevent "uncontrolled to controlled" react warning
        onChange={(e) => {
          field.onChange(Number(e.target.value));
        }}
      />
      {error?.errorMessage && <span className="text-red-500">{error?.errorMessage}</span>}
    </div>
  );
}

export default NumberField;
