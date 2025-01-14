import { createTsForm } from '@ts-react/form';
import { z } from 'zod';

import ImageField from './ImageField';
import ImagePreviewField from './ImagePreviewField';
import { ImageEditor } from './ImagesEditor';
import NumberField from './NumberField';
import RangeField from './RangeField';
import RichTextField from './RichTextField';
import SelectField from './SelectField';
import StarsField from './StarsField';
import TextField from './TextField';
import TextareaField from './TextareaField';
import ToggleField from './ToggleField';
import { CustomFormComponent } from './custom-form-component';
import { zFileList, zImagesEditor, zImagesPreviewer, zRange, zRichText, zSelect, zStars, zTextarea } from './unique-fields';

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
  [zImagesEditor, ImageEditor],
  [zRange, RangeField],
] as const;

export const MyForm = createTsForm(mapping);
export const MyFormWithTemplate = createTsForm(mapping, { FormComponent: CustomFormComponent });

export const inputClassName =
  'border-gray-500 focus-visible:outline-primary py-1.5 px-2 focus:ring-primary focus:border-primary rounded border';
