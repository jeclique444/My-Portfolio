// components/ui/VisibleAuraCursor.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import AuraCursor from './AuraCursor';

export default function VisibleAuraCursor({ ...props }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none">
      {isVisible && <AuraCursor {...props} />}
    </div>
  );
}