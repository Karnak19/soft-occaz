'use client';

import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { useDescription, useTsController } from '@ts-react/form';
import { useState } from 'react';

import { cn } from '$/utils/cn';

function StarsField() {
  const [count, setCount] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const { field, error } = useTsController<number>();

  const { label } = useDescription();
  return (
    <div className="flex flex-col gap-1">
      {label && <label>{label}</label>}

      <div className="flex gap-1" onMouseLeave={() => setHovered(null)}>
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setCount(i);
              field.onChange(i);
            }}
            onMouseEnter={() => setHovered(i)}
          >
            {count >= i ? (
              <StarIcon className="size-6 text-yellow-500" />
            ) : (
              <OutlineStarIcon
                className={cn('size-6 text-muted-foreground', {
                  'text-yellow-500': hovered && i <= hovered,
                })}
              />
            )}
          </button>
        ))}
      </div>

      {error?.errorMessage && <span className="text-red-500">{error?.errorMessage}</span>}
    </div>
  );
}

export default StarsField;
