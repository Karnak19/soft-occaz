import { useDescription, useTsController } from '@ts-react/form';

import { cn } from '$/utils/cn';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$/components/ui/select';

function SelectField({ options }: { options: string[] }) {
  const { label, placeholder } = useDescription();
  const { field, error } = useTsController<string>();
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <Select onValueChange={field.onChange} value={field.value ?? ''}>
        <SelectTrigger
          className={cn({
            'ring-2 ring-destructive': error?.errorMessage,
          })}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((e) => (
            <SelectItem value={e} key={e}>
              {e}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error?.errorMessage && <span className="text-red-500">{error?.errorMessage}</span>}
    </div>
  );
}

export default SelectField;
