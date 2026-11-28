'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Drives the scroll-reveal animation for every [data-reveal] element.
 * Elements already on screen are marked visible before reveal mode switches
 * on, so nothing above the fold flickers. Elements React mounts later (state
 * changes, hot reload) are picked up by a MutationObserver, so nothing can be
 * left hidden. Runs again on each route change.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

    // Show what is already on screen immediately; watch the rest.
    const track = (els: HTMLElement[]) => {
      const vh = window.innerHeight;
      for (const el of els) {
        if (el.hasAttribute('data-in')) continue;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) el.setAttribute('data-in', '');
        else io.observe(el);
      }
    };

    track(Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')));
    document.documentElement.setAttribute('data-reveal-ready', '');

    const mo = new MutationObserver((mutations) => {
      const added: HTMLElement[] = [];
      for (const m of mutations) {
        // React may reuse an existing node and just add data-reveal to it.
        if (m.type === 'attributes' && m.target instanceof HTMLElement && m.target.hasAttribute('data-reveal')) {
          added.push(m.target);
          continue;
        }
        for (const n of m.addedNodes) {
          if (!(n instanceof HTMLElement)) continue;
          if (n.matches('[data-reveal]')) added.push(n);
          added.push(...n.querySelectorAll<HTMLElement>('[data-reveal]'));
        }
      }
      if (added.length) track(added);
    });
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-reveal'] });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
