import { createTsForm } from '@ts-react/form';
import { z } from 'zod';

import { CustomFormComponent } from './custom-form-component';
import ImageField from './ImageField';
import ImagePreviewField from './ImagePreviewField';
import NumberField from './NumberField';
import RangeField from './RangeField';
import RichTextField from './RichTextField';
import SelectField from './SelectField';
import StarsField from './StarsField';
import TextareaField from './TextareaField';
import TextField from './TextField';
import ToggleField from './ToggleField';
import { zFileList, zImagesPreviewer, zRange, zRichText, zSelect, zStars, zTextarea } from './unique-fields';

const mapping = [
  [z.string(), TextField],
  [z.boolean(), ToggleField],
  [z.number(), NumberField],
  [zStars, StarsField],
  [zRichText, RichTextField],
  [zTextarea, TextareaField],
  [zSelect, SelectField],
  [zFileList, ImageField],
  [zImagesPreviewer, ImagePreviewField],
  [zRange, RangeField],
] as const;

export const MyForm = createTsForm(mapping);
export const MyFormWithTemplate = createTsForm(mapping, { FormComponent: CustomFormComponent });

export const inputClassName =
  'border-gray-500 focus-visible:outline-rg-500 py-1.5 px-2 focus:ring-rg-500 focus:border-rg-500 rounded border';
