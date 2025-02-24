'use client';

import Image from 'next/image';
import type React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageDropzoneProps {
  maxFiles?: number;
  onChange?: (files: File[]) => void;
}

interface PreviewFile {
  preview: string;
  name: string;
  type: string;
  canPreview: boolean;
  file: File;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ maxFiles = 3, onChange }) => {
  const [files, setFiles] = useState<PreviewFile[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.slice(0, maxFiles - files.length).map((file) => {
        const isAppleFormat = file.type === 'image/heic' || file.type === 'image/heif';
        return {
          preview: isAppleFormat ? '' : URL.createObjectURL(file),
          name: file.name,
          type: file.type,
          canPreview: !isAppleFormat,
          file,
        };
      });
      const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
      setFiles(updatedFiles);
      onChange?.(updatedFiles.map((f) => f.file));
    },
    [files, maxFiles, onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.avif', '.heic', '.heif'],
    },
    multiple: true,
    maxFiles: maxFiles,
  });

  const removeFile = (name: string) => {
    const updatedFiles = files.filter((file) => file.name !== name);
    setFiles(updatedFiles);
    onChange?.(updatedFiles.map((f) => f.file));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-primary">Drop the images here ...</p>
        ) : (
          <p>Glissez-déposez vos images ici, ou cliquez pour sélectionner des fichiers</p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          (Max {maxFiles} fichier{maxFiles > 1 ? 's' : ''})
        </p>
      </div>
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {files.map((file) => (
            <div key={file.name} className="relative">
              {file.canPreview ? (
                <Image
                  src={file.preview || '/placeholder.svg'}
                  alt={file.name}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover w-full h-24"
                />
              ) : (
                <div className="rounded-lg bg-gray-200 w-full h-24 flex items-center justify-center text-center p-2">
                  <p className="text-xs">{file.type.toUpperCase()} image (pas de prévisualisation disponible)</p>
                </div>
              )}
              <button
                onClick={() => removeFile(file.name)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
