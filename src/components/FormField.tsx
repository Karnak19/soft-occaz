import { cn } from "$/utils/cn";
import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export const inputClassName = "form-input rounded bg-zinc-900";

function FormField<T extends string>({
  register,
  errors,
  field,
  type,
  multiple,
}: {
  field: T;
  register: UseFormRegisterReturn<T>;
  errors: FieldError | undefined;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  multiple?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={field} className="capitalize">
        {field}
      </label>
      <input
        type={type}
        {...register}
        className={cn(inputClassName, { "ring-red-500": errors })}
        {...(type === "file" && {
          multiple,
        })}
      />
      {errors && <span className="text-red-500">{errors.message}</span>}
    </div>
  );
}

export default FormField;
