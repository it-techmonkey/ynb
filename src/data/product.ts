// The one product this storefront sells. Options and media match the live
// product page /product/non-driii-honeycomb-blackout-blinds; images are local
// 1280px copies of the live Shopify gallery (public/img/eclipse/gallery).

export const PRODUCT = {
  title: 'EclipseCore Honeycomb Blackout Blinds — Drill-Free, Made to Measure',
  shortTitle: 'EclipseCore Honeycomb Blackout Blinds',
  navLabel: 'EclipseCore Blackout Blinds',
  href: '/shop',
  /** Live product page dispatch window (working days). */
  dispatchDays: [8, 12] as [number, number],
  warrantyYears: 5,
};

const G = '/img/eclipse/gallery/';

export interface GalleryImage {
  src: string;
  alt: string;
}

/** Same order as the live product page gallery. */
export const GALLERY: GalleryImage[] = [
  { src: `${G}graphite.webp`, alt: 'Graphite honeycomb blackout blind, front view' },
  { src: `${G}white.webp`, alt: 'White honeycomb blackout blind, front view' },
  { src: `${G}cream.webp`, alt: 'Cream honeycomb blackout blind, front view' },
  { src: `${G}blue.webp`, alt: 'Blue honeycomb blackout blind, front view' },
  { src: `${G}room-closed.webp`, alt: 'Blind fully closed in a bedroom' },
  { src: `${G}room-open.webp`, alt: 'Blind partly open in a bedroom' },
  { src: `${G}frame-angle.webp`, alt: 'Blind in its frame, perspective view' },
  { src: `${G}half-open.webp`, alt: 'Blind half open inside the frame' },
  { src: `${G}fabric-detail.webp`, alt: 'Close-up of the honeycomb fabric and side channel' },
  { src: `${G}frame-corner.webp`, alt: 'Close-up of the frame and bottom channel' },
  { src: `${G}white-angle.webp`, alt: 'White blind half open, perspective view' },
  { src: `${G}white-detail.webp`, alt: 'White honeycomb fabric close-up' },
];

export const ROOM_OPEN = `${G}room-open.webp`;
export const ROOM_CLOSED = `${G}room-closed.webp`;

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  /** Index into GALLERY to show when this color is picked. */
  image?: number;
}

export const BLIND_COLORS: ColorOption[] = [
  { id: 'graphite', name: 'Graphite', hex: '#53565b', image: 0 },
  { id: 'white', name: 'White', hex: '#ffffff', image: 1 },
  { id: 'cream', name: 'Cream', hex: '#E6E5DE', image: 2 },
  { id: 'blue', name: 'Blue', hex: '#4A90D9', image: 3 },
];

export const FRAME_COLORS: ColorOption[] = [
  { id: 'graphite', name: 'Graphite', hex: '#53565b' },
  { id: 'white', name: 'White', hex: '#ffffff' },
];

export type OpeningId = 'left-to-right' | 'right-to-left' | 'top-down' | 'split';

export const OPENINGS: { id: OpeningId; name: string; price: number; image: string }[] = [
  { id: 'left-to-right', name: 'Left to right', price: 0, image: '/img/opening/lefttoright-eclipsecore.webp' },
  { id: 'right-to-left', name: 'Right to left', price: 0, image: '/img/opening/righttoleft-eclipsecore.webp' },
  { id: 'top-down', name: 'Top down', price: 0, image: '/img/opening/topdown-eclipsecore.webp' },
  { id: 'split', name: 'Split', price: 35, image: '/img/opening/split-eclipsecore.webp' },
];

export const ROOM_TYPES = ['Bedroom', 'Nursery', 'Family Room', 'Living Room', 'Kitchen', 'Bathroom', 'Office', 'Dining Room', 'Other'];

export const SIZE_LIMITS = {
  width: { min: 10, max: 138 },
  height: { min: 10, max: 79 },
};
