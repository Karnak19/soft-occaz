'use client';

import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { usePocketbase } from '$/app/pocketbase-provider';
import { Badge } from '$/components/ui/badge';
import { Button } from '$/components/ui/button';
import { cn } from '$/utils/cn';
import { getImageUrl } from '$/utils/get-image-url';
import { ListingsResponse, UsersResponse } from '$/utils/pocketbase/pocketbase-types';

const FullScreenCarousel = () => {
  const { pb } = usePocketbase();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Clear all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Fetch the 5 latest listings
  const { data, isLoading } = useQuery({
    queryKey: ['latestListings'],
    queryFn: async () =>
      pb.collection('listings').getList<ListingsResponse<string[], { user: UsersResponse }>>(1, 10, {
        sort: '-created',
        expand: 'user',
        requestKey: 'fullScreenCarousel',
      }),
  });

  // Auto-advance carousel - simplified to always work when not paused
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only set up interval if we have data and autoplay is not paused
    if (data?.items?.length && !isAutoplayPaused) {
      console.log('Setting up auto-advance interval');

      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.items.length);
      }, 5000);
    } else {
      console.log('Auto-advance not active because:', {
        hasData: Boolean(data?.items?.length),
        isAutoplayPaused,
      });
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [data?.items?.length, isAutoplayPaused, data]);

  // Handle manual navigation
  const handleNext = () => {
    if (!data?.items?.length) return;

    // Pause autoplay temporarily
    setIsAutoplayPaused(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.items.length);

    // Resume autoplay after 10 seconds of inactivity
    const timeoutId = setTimeout(() => {
      console.log('Resuming autoplay after manual navigation');
      setIsAutoplayPaused(false);
    }, 10000);

    // Store timeout reference for cleanup
    timeoutRefs.current.push(timeoutId);
  };

  const handlePrev = () => {
    if (!data?.items?.length) return;

    // Pause autoplay temporarily
    setIsAutoplayPaused(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.items.length) % data.items.length);

    // Resume autoplay after 10 seconds of inactivity
    const timeoutId = setTimeout(() => {
      console.log('Resuming autoplay after manual navigation');
      setIsAutoplayPaused(false);
    }, 10000);

    // Store timeout reference for cleanup
    timeoutRefs.current.push(timeoutId);
  };

  // Handle dot navigation
  const handleDotClick = (index: number) => {
    setIsAutoplayPaused(true);
    setCurrentIndex(index);

    // Resume autoplay after 10 seconds of inactivity
    const timeoutId = setTimeout(() => {
      console.log('Resuming autoplay after dot navigation');
      setIsAutoplayPaused(false);
    }, 10000);

    // Store timeout reference for cleanup
    timeoutRefs.current.push(timeoutId);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data?.items.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading || !data?.items.length) {
    return (
      <div className="relative h-screen w-full bg-muted flex items-center justify-center">
        <div className="animate-pulse text-2xl font-bold text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  const currentListing = data.items[currentIndex];
  const firstImage = currentListing.images?.[0];
  const imageUrl = getImageUrl(firstImage, 1920, 1080, 90);

  // Determine the next and previous indices for preloading
  const nextIndex = (currentIndex + 1) % data.items.length;
  const prevIndex = (currentIndex - 1 + data.items.length) % data.items.length;

  // Preload next and previous images
  const nextImage = data.items[nextIndex].images?.[0];
  const prevImage = data.items[prevIndex].images?.[0];
  const nextImageUrl = getImageUrl(nextImage, 1920, 1080, 90);
  const prevImageUrl = getImageUrl(prevImage, 1920, 1080, 90);

  return (
    <div className="relative h-screen w-full overflow-hidden" data-carousel-container="true">
      {/* Preload images */}
      <link rel="preload" as="image" href={nextImageUrl} />
      <link rel="preload" as="image" href={prevImageUrl} />

      {/* Background parallax image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 bg-black/40"
          >
            <img src={imageUrl} alt={currentListing.title} className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 z-30 w-full h-1 bg-white/10">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear', repeat: isAutoplayPaused ? 0 : Infinity }}
          key={`progress-${currentIndex}-${isAutoplayPaused}`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end">
        <div className="container mx-auto px-4 pb-24 pt-40 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Badge
                  variant="outline"
                  className={cn(
                    'mb-4 text-sm font-medium uppercase tracking-wider',
                    currentListing.type === 'aeg' && 'bg-blue-500/10 text-blue-500 border-blue-500/20',
                    currentListing.type === 'gbb' && 'bg-green-500/10 text-green-500 border-green-500/20',
                    currentListing.type === 'sniper' && 'bg-amber-500/10 text-amber-500 border-amber-500/20',
                    currentListing.type === 'gear' && 'bg-purple-500/10 text-purple-500 border-purple-500/20',
                  )}
                >
                  {currentListing.type}
                </Badge>
              </motion.div>

              <motion.h1
                className="font-brand mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {currentListing.title}
              </motion.h1>

              <motion.div
                className="mb-6 flex items-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/20">
                    {currentListing.expand?.user?.avatar ? (
                      <img
                        src={pb.files.getURL(currentListing.expand.user, currentListing.expand.user.avatar, { thumb: '100x100' })}
                        alt={currentListing.expand.user.name || 'Utilisateur'}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                        {(currentListing.expand?.user?.name || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-white/90">{currentListing.expand?.user?.name || 'Utilisateur'}</span>
                </div>

                <motion.div
                  className="text-xl font-bold text-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6,
                    type: 'spring',
                    stiffness: 200,
                  }}
                >
                  {currentListing.price} €
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Button asChild size="lg" className="rounded-full group relative overflow-hidden">
                  <Link href={`/annonces/details/${currentListing.id}`}>
                    <span className="relative z-10">Voir l'annonce</span>
                    <span className="absolute inset-0 bg-linear-to-r from-primary to-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/20 bg-white/10 text-white backdrop-blur-xs hover:bg-white/20"
                >
                  <Link href="/annonces">Toutes les annonces</Link>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <motion.div
            className="mt-8 flex justify-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {data.items.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  'h-2 w-2 rounded-full transition-all duration-300',
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80',
                )}
                aria-label={`Aller à l'annonce ${index + 1}`}
              />
            ))}
          </motion.div>

          {/* Slide counter */}
          <motion.div
            className="absolute bottom-8 right-8 text-white/70 font-mono text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {currentIndex + 1} / {data.items.length}
          </motion.div>
        </div>
      </div>

      {/* Navigation arrows */}
      <motion.button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 p-3 text-white backdrop-blur-xs transition-all hover:bg-black/40 hover:scale-110"
        aria-label="Annonce précédente"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </motion.button>

      <motion.button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 p-3 text-white backdrop-blur-xs transition-all hover:bg-black/40 hover:scale-110"
        aria-label="Annonce suivante"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </motion.button>

      {/* Pause/Play button */}
      <motion.button
        onClick={() => setIsAutoplayPaused(!isAutoplayPaused)}
        className="absolute right-4 top-4 z-20 rounded-full bg-black/20 p-2 text-white backdrop-blur-xs transition-all hover:bg-black/40"
        aria-label={isAutoplayPaused ? 'Reprendre le défilement automatique' : 'Mettre en pause le défilement automatique'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {isAutoplayPaused ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>
        )}
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <span className="mb-2 text-xs font-medium uppercase tracking-wider text-white/70">Découvrir</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-white/70"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FullScreenCarousel;
