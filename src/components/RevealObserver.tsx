'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Drives the scroll-reveal animation for every [data-reveal] element.
 * Elements already on screen are marked visible before reveal mode switches
 * on, so nothing above the fold flickers. Runs again on each route change.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-in])'));
    const vh = window.innerHeight;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) el.setAttribute('data-in', '');
    }
    document.documentElement.setAttribute('data-reveal-ready', '');

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute('data-in', '');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    for (const el of els) if (!el.hasAttribute('data-in')) io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
