import { Switch } from '@headlessui/react';
import { ControllerRenderProps } from 'react-hook-form';

import { cn } from '$/utils/cn';

import { FormData } from './CreateAdForm';

export default function Toggle({ value, onChange }: ControllerRenderProps<FormData, 'envoi'>) {
  return (
    <Switch.Group as="div" className="flex items-center justify-between">
      <span className="flex flex-col flex-grow">
        <Switch.Label as="span" className=" font-medium text-rg-lightest" passive>
          Envoi
        </Switch.Label>
        <Switch.Description as="span" className="text-xs text-gray-500">
          Êtes-vous prêt à envoyer votre article ?
        </Switch.Description>
      </span>
      <Switch
        checked={value}
        onChange={onChange}
        className={cn(
          value ? 'bg-sky-600' : 'bg-rg',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={cn(
            value ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          )}
        >
          <span
            className={cn(
              value ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            <svg className="w-3 h-3 text-rg-light" fill="none" viewBox="0 0 12 12">
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className={cn(
              value ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            <svg className="w-3 h-3 text-sky-600" fill="currentColor" viewBox="0 0 12 12">
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </span>
        </span>
      </Switch>
    </Switch.Group>
  );
}
