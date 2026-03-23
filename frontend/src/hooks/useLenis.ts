import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Initialises Lenis smooth-scroll once and returns nothing.
 * Call this hook at the root of your app (e.g. in App.tsx or LandingPage).
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    // Integrate Lenis with requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    let rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
