import { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '$/utils/cn';

export const inputClassName = 'form-input py-1 focus:ring-sky-600 focus:border-sky-600 rounded bg-slate-900';

function FormField<T extends string>({
  register,
  errors,
  field,
  type,
  multiple,
  label,
}: {
  field: T;
  register: UseFormRegisterReturn<T>;
  errors: FieldError | undefined;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  multiple?: boolean;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={field}>{label ?? field}</label>
      <input
        type={type}
        {...register}
        className={cn(inputClassName, { 'ring-red-500': errors })}
        {...(type === 'file' && {
          multiple,
        })}
      />
      {errors && <span className="text-red-500">{errors.message}</span>}
    </div>
  );
}

export default FormField;
