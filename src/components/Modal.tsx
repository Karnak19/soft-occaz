'use client';

import { XCircleIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import { MouseEventHandler, useCallback, useEffect, useRef } from 'react';
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { motion } from 'framer-motion';

import { Card } from './ui/card';

const MotionCard = motion(Card);

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss],
  );

  // lock scroll on mount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const shouldShowModal = pathname.includes('/annonces/details');

  if (!shouldShowModal) return null;

  return (
    <motion.div
      ref={overlay}
      className="fixed inset-0 z-[49] grid place-items-center bg-black/60"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MotionCard
        ref={wrapper}
        className="absolute h-full overflow-auto sm:w-full md:max-h-[calc(100vh-4rem)] md:w-8/12 md:p-6"
        initial={{ y: 100, opacity: 0, scale: 0.1 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0 }}
      >
        <div>
          <button type="button" className="p-4 md:p-0" onClick={onDismiss}>
            <span className="sr-only">Close</span>
            <XCircleIcon className="size-8 text-muted-foreground hover:text-foreground" aria-hidden="true" />
          </button>
        </div>
        {children}
      </MotionCard>
    </motion.div>
  );
}
