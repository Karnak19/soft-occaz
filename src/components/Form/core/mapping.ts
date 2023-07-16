import { createTsForm, createUniqueFieldSchema } from '@ts-react/form';
import { z } from 'zod';

import ImageField from './ImageField';
import NumberField from './NumberField';
import RichTextField from './RichTextField';
import SelectField from './SelectField';
import TextField from './TextField';
import ToggleField from './ToggleField';

export const zRichText = createUniqueFieldSchema(z.string(), 'richText');

export const zSelect = createUniqueFieldSchema(z.string(), 'select');

export const zFile = createUniqueFieldSchema(z.string(), 'file');

const mapping = [
  [z.string(), TextField],
  [zRichText, RichTextField],
  [zSelect, SelectField],
  [zFile, ImageField],
  [z.boolean(), ToggleField],
  [z.number(), NumberField],
] as const; // 👈 `as const` is necessary

// A typesafe React component
export const MyForm = createTsForm(mapping);

export const inputClassName = 'form-input py-1 focus:ring-rg focus:border-rg rounded bg-gray-100';
