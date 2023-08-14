import { createTsForm, createUniqueFieldSchema } from '@ts-react/form';
import { z } from 'zod';

import ImageField from './ImageField';
import NumberField from './NumberField';
import RichTextField from './RichTextField';
import SelectField from './SelectField';
import TextField from './TextField';
import ToggleField from './ToggleField';
import TextareaField from './TextareaField';
import RangeField from './RangeField';

export const zRichText = createUniqueFieldSchema(z.string(), 'richText');

export const zTextarea = createUniqueFieldSchema(z.string(), 'textarea');

export const zSelect = createUniqueFieldSchema(z.string(), 'select');

export const zFile = createUniqueFieldSchema(z.string(), 'file');

export const zRange = createUniqueFieldSchema(z.number().min(0).max(5), 'range');

const mapping = [
  [z.string(), TextField],
  [zRichText, RichTextField],
  [zTextarea, TextareaField],
  [zSelect, SelectField],
  [zFile, ImageField],
  [z.boolean(), ToggleField],
  [z.number(), NumberField],
  [zRange, RangeField],
] as const;

export const MyForm = createTsForm(mapping);

export const inputClassName =
  'border-gray-500 focus-visible:outline-rg-500 py-1.5 px-2 focus:ring-rg-500 focus:border-rg-500 rounded bg-gray-100 border';
