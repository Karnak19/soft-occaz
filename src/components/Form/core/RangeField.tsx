import { useDescription, useTsController } from '@ts-react/form';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

function RangeField({ max = 5 }: { max?: number }) {
  const [value, setValue] = useState(0);

  const { field } = useTsController<number>();

  const { label } = useDescription();

  const onClick = (i: number) => {
    // update value or reset to 0 if already selected
    setValue((prev) => (prev === i + 1 ? 0 : i + 1));

    field.onChange(i + 1);
  };

  return (
    <div className="flex flex-col gap-1 col-start-1 col-span-full mb-12">
      <label>{label}</label>

      <div className="flex items-center">
        {Array.from({ length: max }, (_, i) => (
          <button onClick={() => onClick(i)} type="button" key={i} className="flex items-center justify-center">
            {i < value ? <SolidStarIcon className="w-6 h-6 text-amber-500" /> : <StarIcon className="w-6 h-6 text-amber-500" />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RangeField;
