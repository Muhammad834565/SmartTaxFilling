'use client';

import React, { useEffect, useState } from 'react';

interface TextRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function TextRotator({
  words,
  interval = 3200,
  className = '',
}: TextRotatorProps) {
  const [index, setIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    if (!words || words.length <= 1) return;

    const timer = setInterval(() => {
      // Step 1: Fade & slide out current word
      setFadeState('out');

      // Step 2: Switch word and fade & slide in
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFadeState('in');
      }, 350);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  const currentWord = words[index] || words[0] || '';

  return (
    <span
      className={`inline-block transition-all duration-300 ease-out ${
        fadeState === 'in'
          ? 'opacity-100 translate-y-0 filter-none'
          : 'opacity-0 -translate-y-2 blur-[2px]'
      } ${className}`}
      aria-live="polite"
    >
      {currentWord}
    </span>
  );
}

