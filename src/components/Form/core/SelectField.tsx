import { useDescription, useTsController } from '@ts-react/form';

import { cn } from '$/utils/cn';

import { inputClassName } from './mapping';

function SelectField({ options }: { options: string[] }) {
  const { label } = useDescription();
  const { field, error } = useTsController<string>();
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <select
        value={field.value ? field.value : 'none'}
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
        className={cn(inputClassName, {
          'ring-2 border-red-500 ring-red-500 bg-red-100': error?.errorMessage,
        })}
      >
        {!field.value && <option value="none">Please select...</option>}
        {options.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
      {error?.errorMessage && <span className="text-red-500">{error?.errorMessage}</span>}
    </div>
  );
}

export default SelectField;
