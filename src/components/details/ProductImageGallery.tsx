'use client';

import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import { Button } from '$/components/ui/button';
import { getImageUrl } from '$/utils/get-image-url';

function ProductImageGallery({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images?.length) return null;

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const previousImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const closeFullscreen = () => {
    setSelectedIndex(null);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* All Images in Column Layout */}
      <div className="flex w-full flex-col gap-4">
        {images.map((image, index) => {
          const imageUrl = getImageUrl(image, 1280, 1280, 100);

          return (
            <motion.div
              key={`${image}-${index}`}
              className="group relative w-full cursor-zoom-in overflow-hidden rounded-xl bg-muted/50"
              onClick={() => handleImageClick(index)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={imageUrl}
                alt={`Image ${index + 1}`}
                className="w-full h-auto object-cover object-center transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

              {/* Image number indicator */}
              <div className="absolute bottom-4 right-4 rounded-full bg-background/80 px-3 py-1 text-sm font-medium backdrop-blur-sm shadow-lg opacity-0 transition duration-300 group-hover:opacity-100">
                {index + 1} / {images.length}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence mode="wait">
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
            onClick={closeFullscreen}
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative h-full max-h-[95vh] w-auto max-w-[95vw]"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={getImageUrl(images[selectedIndex], 1920, 1920, 100)}
                  alt={`Image ${selectedIndex + 1}`}
                  className="size-full rounded-xl object-contain shadow-2xl"
                />

                {/* Navigation Controls - Only show if more than 1 image */}
                {images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-4 md:p-6">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        previousImage();
                      }}
                    >
                      <ArrowLeftIcon className="size-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                    >
                      <ArrowRightIcon className="size-5" />
                    </Button>
                  </div>
                )}

                {/* Close Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-4 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 shadow-lg"
                  onClick={closeFullscreen}
                >
                  <XMarkIcon className="size-5" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/50 px-4 py-2 text-sm font-medium backdrop-blur-sm shadow-lg">
                  {selectedIndex + 1} / {images.length}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default ProductImageGallery;
