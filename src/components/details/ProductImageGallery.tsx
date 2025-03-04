'use client';

import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { Button } from '$/components/ui/button';
import { cn } from '$/utils/cn';
import { getImageUrl } from '$/utils/get-image-url';

function ProductImageGallery({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images?.length) return null;

  const selectedImage = images[selectedIndex];
  const selectedImageUrl = getImageUrl(selectedImage, 1280, 1280, 100);

  const nextImage = () => {
    setSelectedIndex((current) => (current + 1) % images.length);
  };

  const previousImage = () => {
    setSelectedIndex((current) => (current - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Main Image */}
      <AnimatePresence mode="wait">
        {isFullscreen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4 md:p-8"
          >
            <div className="relative flex h-full w-full items-center justify-center" onClick={() => setIsFullscreen(false)}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative aspect-square h-full max-h-[90vh] w-auto max-w-7xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImageUrl}
                  alt={selectedImage}
                  className="size-full rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
                />

                {/* Navigation Controls */}
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

                {/* Close Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-4 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 shadow-lg"
                  onClick={() => setIsFullscreen(false)}
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
        ) : (
          <motion.div
            layoutId="main-image"
            className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl bg-muted/50"
            onClick={() => setIsFullscreen(true)}
          >
            <motion.img
              key={selectedImageUrl}
              src={selectedImageUrl}
              alt={selectedImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="size-full object-cover object-center transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thumbnails */}
      <div className="w-full">
        <motion.div className="grid grid-cols-4 gap-3 sm:gap-4" initial={false}>
          {images.map((image, index) => {
            const url = getImageUrl(image, 300, 300, 80);
            const isSelected = index === selectedIndex;

            return (
              <motion.button
                key={url}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  'group relative aspect-square overflow-hidden rounded-lg bg-muted/50 focus:outline-none',
                  isSelected && 'ring-2 ring-primary ring-offset-2',
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <motion.img
                  src={url}
                  alt=""
                  className="size-full object-cover object-center transition duration-300 group-hover:scale-110"
                />
                <div
                  className={cn(
                    'absolute inset-0 transition duration-300',
                    isSelected ? 'bg-white/10' : 'bg-black/20 group-hover:bg-black/10',
                  )}
                />
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
export default ProductImageGallery;
