'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '../ui';

export interface GalleryItem {
  src: string;
  alt: string;
  /** Small label shown on the image, e.g. "Opening: Top down". */
  tag?: string;
}

/**
 * Product gallery.
 *  - Desktop: a vertical thumbnail rail beside one large image, with arrows,
 *    a photo counter and a click-to-enlarge viewer.
 *  - Mobile: a swipeable image with a thumbnail strip underneath.
 * The parent owns the active index, so choosing a colour or an opening can
 * jump straight to the matching photo.
 */
export default function Gallery({ images, active, onChange }: { images: GalleryItem[]; active: number; onChange: (i: number) => void }) {
  const [open, setOpen] = useState(false);
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const programmatic = useRef(false);
  const n = images.length;
  const current = images[active];
  const go = useCallback((i: number) => onChange(((i % n) + n) % n), [n, onChange]);

  // Keep the active thumbnail in view inside the rail (never scrolls the page).
  useEffect(() => {
    const el = rail.current;
    const t = el?.children[active] as HTMLElement | undefined;
    if (!el || !t) return;
    if (el.scrollHeight > el.clientHeight + 1) {
      if (t.offsetTop < el.scrollTop || t.offsetTop + t.offsetHeight > el.scrollTop + el.clientHeight) el.scrollTo({ top: t.offsetTop - 8, behavior: 'smooth' });
    } else if (t.offsetLeft < el.scrollLeft || t.offsetLeft + t.offsetWidth > el.scrollLeft + el.clientWidth) {
      el.scrollTo({ left: t.offsetLeft - 8, behavior: 'smooth' });
    }
  }, [active]);

  // Mobile swipe track follows the active index when it changes from outside.
  useEffect(() => {
    const el = track.current;
    if (!el || !el.clientWidth) return;
    if (Math.round(el.scrollLeft / el.clientWidth) !== active) {
      programmatic.current = true;
      el.scrollTo({ left: active * el.clientWidth, behavior: 'smooth' });
      window.setTimeout(() => (programmatic.current = false), 600);
    }
  }, [active]);

  const onSwipe = () => {
    const el = track.current;
    if (!el || programmatic.current) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== active) onChange(i);
  };

  // Enlarged viewer: keyboard control and page scroll lock.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowLeft') go(active - 1);
      if (e.key === 'ArrowRight') go(active + 1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, active, go]);

  const arrow = 'flex h-11 w-11 items-center justify-center rounded-full bg-white text-foreground shadow-md ring-1 ring-black/5 transition hover:scale-105';

  return (
    <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[84px_1fr] lg:gap-4">
      {/* Thumbnails: a strip on mobile, a rail on desktop */}
      <div className="relative order-2 min-w-0 px-5 lg:order-1 lg:px-0">
        <div ref={rail} className="relative flex gap-2 overflow-x-auto py-0.5 scrollbar-hide lg:absolute lg:inset-0 lg:flex-col lg:overflow-x-visible lg:overflow-y-auto" role="tablist" aria-label="Product photos">
          {images.map((g, i) => (
            <button
              key={g.src}
              role="tab"
              aria-selected={i === active}
              aria-label={`Photo ${i + 1}: ${g.alt}`}
              onClick={() => go(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-linen transition lg:h-auto lg:w-full lg:aspect-square ${
                i === active ? 'ring-2 ring-foreground ring-offset-2' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={g.src} alt="" fill sizes="84px" className="object-contain mix-blend-multiply" />
            </button>
          ))}
        </div>
      </div>

      {/* Main image */}
      <div className="order-1 min-w-0 lg:order-2">
        {/* Mobile: swipe */}
        <div className="relative -mx-5 lg:hidden">
          <div ref={track} onScroll={onSwipe} className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide">
            {images.map((g, i) => (
              <div key={g.src} className="relative aspect-square w-full shrink-0 snap-start bg-linen">
                <Image src={g.src} alt={g.alt} fill sizes="100vw" preload={i === 0} className="object-contain mix-blend-multiply" />
              </div>
            ))}
          </div>
          <span className="pointer-events-none absolute bottom-3 left-5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium tabular-nums">
            {active + 1} / {n}
          </span>
          {current.tag && <span className="pointer-events-none absolute left-5 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium">{current.tag}</span>}
          <button onClick={() => setOpen(true)} className="absolute bottom-3 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90" aria-label="Enlarge photo">
            <Icon name="search" className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop: one large image */}
        <div className="group relative hidden aspect-square overflow-hidden rounded-3xl bg-linen lg:block">
          <button onClick={() => setOpen(true)} className="absolute inset-0 cursor-zoom-in" aria-label="Enlarge photo">
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" preload={active === 0} className="object-contain mix-blend-multiply animate-fade-in" />
          </button>
          {current.tag && <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium">{current.tag}</span>}
          <span className="pointer-events-none absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium tabular-nums">
            {active + 1} / {n}
          </span>
          <span className="pointer-events-none absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 transition-opacity group-hover:opacity-100">
            <Icon name="search" className="h-5 w-5" />
          </span>
          <button onClick={() => go(active - 1)} className={`${arrow} absolute left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100`} aria-label="Previous photo">
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
          </button>
          <button onClick={() => go(active + 1)} className={`${arrow} absolute right-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100`} aria-label="Next photo">
            <Icon name="arrow" className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Enlarged viewer */}
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Product photos" className="fixed inset-0 z-60 flex items-center justify-center bg-ink/95 p-4" onClick={() => setOpen(false)}>
          <button onClick={() => setOpen(false)} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label="Close">
            <Icon name="close" className="h-5 w-5" />
          </button>
          <div className="relative aspect-square w-[min(92vw,82vh)] overflow-hidden rounded-2xl bg-white" onClick={(e) => e.stopPropagation()}>
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="90vw" className="object-contain animate-fade-in" />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(active - 1);
            }}
            className={`${arrow} absolute left-3 top-1/2 -translate-y-1/2 sm:left-8`}
            aria-label="Previous photo"
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(active + 1);
            }}
            className={`${arrow} absolute right-3 top-1/2 -translate-y-1/2 sm:right-8`}
            aria-label="Next photo"
          >
            <Icon name="arrow" className="h-4 w-4" />
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm tabular-nums text-white/80">
            {active + 1} / {n}
          </p>
        </div>
      )}
    </div>
  );
}
