import { cdn } from '@/data/product';

/**
 * The live "blind closed" lifestyle render, shown the way a sealed window
 * actually looks: the room dark, no daylight anywhere, the blind still just
 * visible. Same treatment as the closed state of the open/close slider.
 */
export default function BlackoutPhoto({ width = 1400, alt = 'Bedroom in total darkness with the honeycomb blackout blind closed' }: { width?: number; alt?: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cdn('lifestyle2.png', width)} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 46% 45%, rgba(4,6,10,0.42), rgba(4,6,10,0.86))' }}
      />
    </>
  );
}
