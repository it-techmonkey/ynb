'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ROOM_CLOSED, ROOM_OPEN } from '@/data/product';
import { Icon } from '../ui';

/*
 * Photo-real open/close preview built from the live product's two lifestyle
 * renders (same camera: blind half open vs. fully closed).
 *
 *  - Fully open: the open half of the window is mirrored into the other half
 *    (a mullion hides the seam) and the fabric is stacked at the right edge.
 *  - Closing: the "closed" photo is revealed from the blind's leading edge,
 *    daylight on the room fades out and the room goes dark.
 *
 * Geometry is in % of the square image.
 */
const WIN = { left: 14.6, right: 77.1, top: 13.2, bottom: 75.6 }; // outer frame
const GLASS = { left: 15.6, right: 75.9, top: 14.4, bottom: 74.6 }; // inside the frame
const SEAM = 44.8; // blind edge in the half-open photo = mirror axis
const STACK = 71.4; // leading edge when fully open (fabric stacked at the right)

const OPEN = ROOM_OPEN;
const CLOSED = ROOM_CLOSED;

const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

export default function RoomSlider({ className = '', controls = true }: { className?: string; controls?: boolean }) {
  const [t, setT] = useState(0); // 0 = fully open, 1 = fully closed
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const anim = useRef<number | null>(null);
  const played = useRef(false);

  const stopAnim = () => {
    if (anim.current) cancelAnimationFrame(anim.current);
    anim.current = null;
  };

  // Play one open → closed demo the first time the slider scrolls into view.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || played.current) return;
        played.current = true;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const start = performance.now() + 500;
        const dur = 2600;
        const step = (now: number) => {
          const p = Math.min(1, Math.max(0, (now - start) / dur));
          setT(easeInOut(p));
          if (p < 1) anim.current = requestAnimationFrame(step);
          else anim.current = null;
        };
        anim.current = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stopAnim();
    };
  }, []);

  const edge = STACK - (STACK - WIN.left) * t; // blind's leading edge, % from left
  const closed = t > 0.985;
  const daylight = Math.max(0, 1 - t * 1.15);

  const fromPointer = (e: PointerEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width) * 100;
    const next = (STACK - x) / (STACK - WIN.left);
    setT(Math.max(0, Math.min(1, next > 0.97 ? 1 : next < 0.03 ? 0 : next)));
  };

  // Everything except the still-open glass fades to the "closed" photo.
  const roomClip = `polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ${GLASS.left}% ${GLASS.top}%, ${edge}% ${GLASS.top}%, ${edge}% ${GLASS.bottom}%, ${GLASS.left}% ${GLASS.bottom}%, ${GLASS.left}% ${GLASS.top}%)`;
  // Mirrored daylight view for the right half of the window.
  const mirrorClip = `inset(${GLASS.top}% ${100 - GLASS.right}% ${100 - GLASS.bottom}% ${SEAM}%)`;
  // The blind: "closed" photo from the leading edge to the right frame.
  const blindClip = `inset(${WIN.top}% ${100 - WIN.right}% ${100 - WIN.bottom}% ${edge}%)`;
  // Daylight falling from the open part of the window onto the seat and floor.
  const beamClip = `polygon(${GLASS.left}% ${GLASS.bottom}%, ${edge}% ${GLASS.bottom}%, ${Math.min(100, edge + 14)}% 100%, ${Math.max(0, GLASS.left - 10)}% 100%)`;

  return (
    <div className={className}>
      <div
        ref={box}
        className="relative aspect-square w-full overflow-hidden rounded-lg bg-ink select-none touch-none cursor-ew-resize"
        onPointerDown={(e) => {
          stopAnim();
          dragging.current = true;
          (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
          fromPointer(e);
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          if (e.pointerType === 'mouse' && e.buttons === 0) {
            dragging.current = false;
            return;
          }
          fromPointer(e);
        }}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {/* 1. Room in daylight */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={OPEN} alt="Bedroom with the blind fully open" className="absolute inset-0 h-full w-full object-cover pointer-events-none" draggable={false} />

        {/* 2. Right half of the window, mirrored from the open half */}
        <div className="absolute inset-0 pointer-events-none" style={{ clipPath: mirrorClip }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={OPEN}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transform: 'scaleX(-1)', transformOrigin: `${SEAM}% 50%` }}
            draggable={false}
          />
        </div>
        {/* window mullion over the mirror seam */}
        <div
          className="absolute pointer-events-none bg-linear-to-r from-[#cfd3d6] via-[#f2f3f4] to-[#c4c8cb] shadow-[0_0_4px_rgba(0,0,0,0.25)]"
          style={{ left: `${SEAM - 0.6}%`, width: '1.2%', top: `${GLASS.top}%`, height: `${GLASS.bottom - GLASS.top}%` }}
        />

        {/* 3. Daylight through the glass and onto the room */}
        <div
          className="absolute pointer-events-none mix-blend-screen"
          style={{
            left: `${GLASS.left}%`,
            top: `${GLASS.top}%`,
            width: `${Math.max(0, edge - GLASS.left)}%`,
            height: `${GLASS.bottom - GLASS.top}%`,
            opacity: daylight * 0.35,
            background: 'linear-gradient(160deg, rgba(255,250,230,0.9), rgba(255,240,200,0.2))',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{
            clipPath: beamClip,
            opacity: daylight * 0.55,
            background: 'linear-gradient(to bottom, rgba(255,240,205,0.85), rgba(255,240,205,0) 85%)',
          }}
        />

        {/* 4. Room cross-fades to the "closed" lighting */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CLOSED}
          alt=""
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          style={{ opacity: Math.pow(t, 0.9), clipPath: roomClip }}
          draggable={false}
        />

        {/* 5. The blind */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CLOSED}
          alt="Bedroom with the blind closed"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          style={{ clipPath: blindClip }}
          draggable={false}
        />
        {/* soft fold shading so the stacked fabric reads as pleats */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${edge}%`,
            width: `${WIN.right - edge}%`,
            top: `${WIN.top}%`,
            height: `${WIN.bottom - WIN.top}%`,
            background: 'linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0) 30%)',
            opacity: 1 - t * 0.6,
          }}
        />

        {/* 6. Lights out — the room goes dark once the window is sealed */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: 'radial-gradient(ellipse at 46% 45%, rgba(4,6,10,0.42), rgba(4,6,10,0.86))',
            opacity: Math.pow(Math.max(0, (t - 0.55) / 0.45), 1.6) * (closed ? 1 : 0.85),
          }}
        />

        {/* Leading-edge rail + handle */}
        <div
          className="absolute pointer-events-none"
          style={{ left: `${edge}%`, top: `${GLASS.top}%`, height: `${GLASS.bottom - GLASS.top}%`, transform: 'translateX(-50%)' }}
        >
          <div className="h-full w-[5px] rounded-sm bg-linear-to-r from-[#2c323b] via-[#4a525d] to-[#2c323b] shadow-[2px_0_6px_rgba(0,0,0,0.35)]" />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-md"
          >
            <Icon name="arrows" className="h-4 w-4" strokeWidth={2} />
          </div>
        </div>
      </div>

      {controls && (
      <div className="mt-4 flex items-center gap-4">
        <span className="text-[13px] text-muted">Open</span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(t * 100)}
          onChange={(e) => {
            stopAnim();
            setT(Number(e.target.value) / 100);
          }}
          className="flex-1 accent-primary h-1.5 cursor-pointer"
          aria-label="Blind position"
        />
        <span className="text-[13px] text-muted">Closed</span>
      </div>
      )}
      {controls && <p className="mt-2 text-center text-[13px] text-muted">Drag the blind or the slider to see the difference.</p>}
    </div>
  );
}
