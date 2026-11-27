'use client';

import { useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const WARMUP_COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Invisible background warmup component.
 * Pings backend health endpoint during browser idle time so free-tier containers
 * (Render, Railway, Fly.io, etc.) spin up before users trigger inquiries or chats.
 * Runs completely non-blocking without impacting Core Web Vitals or FPS.
 */
export default function BackendWarmup() {
  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return;

    // Check if we warmed up recently in this browser session
    try {
      const lastWarmed = sessionStorage.getItem('backend_last_warmed_at');
      if (lastWarmed && Date.now() - parseInt(lastWarmed, 10) < WARMUP_COOLDOWN_MS) {
        return;
      }
    } catch {
      // sessionStorage might be disabled or restricted in private browsing
    }

    const triggerWarmup = () => {
      const controller = new AbortController();
      // Generous timeout for free-tier spin up (45s), but cleanly aborts if it takes longer
      const timeoutId = setTimeout(() => controller.abort(), 45000);

      // Primary ping to lightweight /health, fallback to /services if running an older backend image
      const primaryUrl = `${API_BASE_URL.replace(/\/$/, '')}/health`;
      const fallbackUrl = `${API_BASE_URL.replace(/\/$/, '')}/services`;

      const performFetch = async () => {
        try {
          const res = await fetch(primaryUrl, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-store',
            signal: controller.signal,
          });

          if (!res.ok && res.status === 404) {
            // Older backend without /health endpoint, ping /services instead
            await fetch(fallbackUrl, {
              method: 'GET',
              mode: 'cors',
              cache: 'no-store',
              signal: controller.signal,
            });
          }

          try {
            sessionStorage.setItem('backend_last_warmed_at', Date.now().toString());
          } catch {
            // Ignore storage errors
          }
        } catch {
          // Completely silent — never throw errors or log noise in production console
        } finally {
          clearTimeout(timeoutId);
        }
      };

      performFetch();
    };

    // Schedule during browser idle time so initial page render, hydration, and animations are 100% finished
    let idleHandle: number | undefined;
    let timerHandle: ReturnType<typeof setTimeout> | undefined;

    if ('requestIdleCallback' in window) {
      idleHandle = (window as Window).requestIdleCallback(
        () => {
          triggerWarmup();
        },
        { timeout: 3500 }, // Don't delay more than 3.5s even under heavy load
      );
    } else {
      timerHandle = setTimeout(() => {
        triggerWarmup();
      }, 1500);
    }

    return () => {
      if (idleHandle && 'cancelIdleCallback' in window) {
        (window as Window).cancelIdleCallback(idleHandle);
      }
      if (timerHandle) {
        clearTimeout(timerHandle);
      }
    };
  }, []);

  return null;
}
