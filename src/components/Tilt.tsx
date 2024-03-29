'use client';

import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    VanillaTilt.init(ref.current as HTMLElement, {
      max: 7,
      scale: 1.05,
      glare: true,
      'max-glare': 0.2,
      transition: true,
      easing: 'cubic-bezier(.09,.91,.52,.99)',
    });
  }, []);

  return (
    <div ref={ref} className="rounded-lg">
      {children}
    </div>
  );
}

export default Tilt;
