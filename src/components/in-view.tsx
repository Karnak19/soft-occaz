'use client';

import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

function InView({ onInView }: { onInView: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      onInView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return <div ref={ref} />;
}

export default InView;
