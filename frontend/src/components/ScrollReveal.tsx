'use client';

import React, { useEffect, useRef, useState } from 'react';

type RevealAnimation = 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  className?: string;
  threshold?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.12,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback if browser doesn't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const getHiddenClass = () => {
    switch (animation) {
      case 'fade-left':
        return 'sr-hidden-left';
      case 'fade-right':
        return 'sr-hidden-right';
      case 'zoom-in':
        return 'sr-hidden-zoom';
      case 'fade-up':
      default:
        return 'sr-hidden';
    }
  };

  const style: React.CSSProperties = {
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
  };

  return (
    <div
      ref={ref}
      style={style}
      className={`${getHiddenClass()} ${isVisible ? 'sr-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

