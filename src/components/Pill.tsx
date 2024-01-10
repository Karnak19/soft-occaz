'use client';

import { motion } from 'framer-motion';

export function Pill() {
  return (
    <motion.div
      layoutId="active"
      className="absolute inset-0 rounded-md bg-rg-700 dark:bg-primary-foreground"
      transition={{ type: 'spring', duration: 0.6 }}
    />
  );
}
