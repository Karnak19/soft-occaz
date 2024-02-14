import { createUniqueFieldSchema } from '@ts-react/form';
import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'];

export const zStars = createUniqueFieldSchema(z.number().int().min(1).max(5), 'stars');
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
