'use client';

import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPct = (totalScroll / windowHeight) * 100;
        setProgress(Math.min(100, Math.max(0, scrollPct)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (progress <= 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#2DC55F] via-[#4ade80] to-[#23a54e] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(45,197,95,0.7)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

