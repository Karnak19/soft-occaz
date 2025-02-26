'use client';

import { useDescription, useTsController } from '@ts-react/form';

import { Checkbox } from '$/components/ui/checkbox';
import { cn } from '$/utils/cn';

type Option = {
  label: string;
  value: string;
};

function CheckboxGroupField({ options }: { options: Option[] }) {
  const { label } = useDescription();
  const { field, error } = useTsController<string[]>();

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentValues = field.value || [];

    if (checked) {
      field.onChange([...currentValues, value]);
    } else {
      field.onChange(currentValues.filter((val) => val !== value));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label>{label}</label>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={(field.value || []).includes(option.value)}
              onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
              className={cn({
                'ring-2 ring-destructive': error?.errorMessage,
              })}
            />
            <label
              htmlFor={option.value}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error?.errorMessage && <span className="text-red-500">{error?.errorMessage}</span>}
    </div>
  );
}

export default CheckboxGroupField;
