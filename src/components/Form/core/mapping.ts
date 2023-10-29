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
import ImagePreviewField from './ImagePreviewField';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'];

export const zRichText = createUniqueFieldSchema(z.string(), 'richText');
export const zTextarea = createUniqueFieldSchema(z.string(), 'textarea');
export const zSelect = createUniqueFieldSchema(z.string(), 'select');
export const zRange = createUniqueFieldSchema(z.number().min(0).max(5), 'range');
export const zImagesPreviewer = createUniqueFieldSchema(z.array(z.string()), 'imagesPreviewer');
export const zFileList = createUniqueFieldSchema(
  z
    .any()
    .refine((files) => files?.length >= 1, 'Image is required.')
    .refine((files) => files.every((file: File) => file.size <= MAX_FILE_SIZE), `Image size can't exceed 5MB.`)
    .refine((files) => files.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), 'Image type is not supported.'),
  'fileList',
);

const mapping = [
  [z.string(), TextField],
  [z.boolean(), ToggleField],
  [z.number(), NumberField],
  [zRichText, RichTextField],
  [zTextarea, TextareaField],
  [zSelect, SelectField],
  [zFileList, ImageField],
  [zImagesPreviewer, ImagePreviewField],
  [zRange, RangeField],
] as const;

export const MyForm = createTsForm(mapping);

export const inputClassName =
  'border-gray-500 focus-visible:outline-rg-500 py-1.5 px-2 focus:ring-rg-500 focus:border-rg-500 rounded border';
