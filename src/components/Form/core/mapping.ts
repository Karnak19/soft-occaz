import { createTsForm } from '@ts-react/form';
import { z } from 'zod';

import CheckboxGroupField from './CheckboxGroupField';
import ImageDropzoneField from './ImageDropzoneField';
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
import { TipTapRichTextField } from './tiptap-richtext-field';
import {
  zCheckboxGroup,
  zFileList,
  zImageDropzone,
  zImagesEditor,
  zImagesPreviewer,
  zOptionalFileList,
  zOptionalImageDropzone,
  zRange,
  zRichText,
  zSelect,
  zStars,
  zTextarea,
  zTipTapRichText,
} from './unique-fields';

const mapping = [
  [z.string(), TextField],
  [z.boolean(), ToggleField],
  [z.number(), NumberField],
  [zStars, StarsField],
  [zRichText, RichTextField],
  [zTipTapRichText, TipTapRichTextField],
  [zTextarea, TextareaField],
  [zSelect, SelectField],
  [zFileList, ImageField],
  [zOptionalFileList, ImageField],
  [zImagesPreviewer, ImagePreviewField],
  [zImagesEditor, ImageEditor],
  [zRange, RangeField],
  [zImageDropzone, ImageDropzoneField],
  [zOptionalImageDropzone, ImageDropzoneField],
  [zCheckboxGroup, CheckboxGroupField],
] as const;

export const MyForm = createTsForm(mapping);
export const MyFormWithTemplate = createTsForm(mapping, { FormComponent: CustomFormComponent });

export const inputClassName =
  'border-gray-500 focus-visible:outline-primary py-1.5 px-2 focus:ring-primary focus:border-primary rounded border';
