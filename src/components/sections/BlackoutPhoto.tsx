import Image from 'next/image';
import { ROOM_CLOSED } from '@/data/product';

/**
 * The "blind closed" lifestyle render, shown the way a sealed window actually
 * looks: the room dark, no daylight anywhere, the blind still just visible.
 * Same treatment as the closed state of the open/close slider.
 */
export default function BlackoutPhoto({
  sizes = '(min-width: 768px) 50vw, 100vw',
  alt = 'Bedroom in total darkness with the honeycomb blackout blind closed',
}: {
  sizes?: string;
  alt?: string;
}) {
  return (
    <>
      <Image src={ROOM_CLOSED} alt={alt} fill sizes={sizes} className="object-cover" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 46% 45%, rgba(4,6,10,0.42), rgba(4,6,10,0.86))' }}
      />
    </>
  );
}
