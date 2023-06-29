'use client';

import { motion } from 'framer-motion';

export function Pill() {
  return (
    <motion.div
      layoutId="active"
      className="absolute inset-0 rounded-md bg-rg-lightest"
      transition={{ type: 'spring', duration: 0.6 }}
    />
  );
}
