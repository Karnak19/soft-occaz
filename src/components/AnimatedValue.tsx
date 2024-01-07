'use client';

import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import React, { useEffect } from 'react';

function AnimatedValue({ value, duration }: { value: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration });

    return controls.stop;
  }, [count, value, duration]);

  return <motion.span>{rounded}</motion.span>;
}

export default AnimatedValue;
