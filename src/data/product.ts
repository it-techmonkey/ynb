// The one product this storefront sells — names, options and media taken from
// the live product page /product/non-driii-honeycomb-blackout-blinds.

const CDN = 'https://cdn.shopify.com/s/files/1/0729/6847/0563/files/';
// Progressive JPEG: Shopify's default modern format for these renders stalls
// some Chrome builds when the image is shown large.
export const cdn = (file: string, width = 1200) => `${CDN}${file}?width=${width}&format=pjpg`;

export const PRODUCT = {
  title: 'The Viral Honeycomb Complete Blackout Blinds – Insulating, Blockout Noise, Sleep Better',
  shortTitle: 'The Viral Honeycomb Complete Blackout Blinds',
  navLabel: 'Eclipse Complete Blackout Blinds',
  href: '/shop',
  /** Live product page dispatch window (working days). */
  dispatchDays: [8, 12] as [number, number],
  warrantyYears: 5,
};

export interface GalleryImage {
  file: string;
  alt: string;
}

/** Live Shopify gallery, in the same order as the live product page. */
export const GALLERY: GalleryImage[] = [
  { file: 'front_3.png', alt: 'Graphite honeycomb blackout blind, front view' },
  { file: 'Front_cb9f0f55-b39c-451b-b5e7-98036d3cfe0f.png', alt: 'White honeycomb blackout blind, front view' },
  { file: 'a_1kWR_cream1.png', alt: 'Cream honeycomb blackout blind, front view' },
  { file: 'a_Cps9_WhatsApp_20Image_202025-08-29_20at_201.06.11_20PM.jpg', alt: 'Blue honeycomb blackout blind, front view' },
  { file: 'lifestyle2.png', alt: 'Blind fully closed in a bedroom' },
  { file: 'lifestyle1.png', alt: 'Blind partly open in a bedroom' },
  { file: '3_2_9ce23adc-a439-4506-80f5-aaf24ebb9cf4.png', alt: 'Blind in its frame, perspective view' },
  { file: '2_bd4eaa38-7c2f-4ba0-ae0f-dcb77069ee03.png', alt: 'Blind half open inside the frame' },
  { file: '4_1.png', alt: 'Close-up of the honeycomb fabric and side channel' },
  { file: '1_6ec3ee85-4234-4328-bbb7-d194f7a194ba.png', alt: 'Close-up of the frame corner' },
  { file: 'perspective.png', alt: 'White blind half open, perspective view' },
  { file: 'closeup1.png', alt: 'White honeycomb fabric close-up' },
];

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  /** Index into GALLERY to show when this color is picked. */
  image?: number;
}

export const BLIND_COLORS: ColorOption[] = [
  { id: 'white', name: 'White', hex: '#ffffff', image: 1 },
  { id: 'cream', name: 'Cream', hex: '#E6E5DE', image: 2 },
  { id: 'graphite', name: 'Graphite', hex: '#53565b', image: 0 },
  { id: 'blue', name: 'Blue', hex: '#4A90D9', image: 3 },
];

export const FRAME_COLORS: ColorOption[] = [
  { id: 'white', name: 'White', hex: '#ffffff' },
  { id: 'graphite', name: 'Graphite', hex: '#53565b' },
];

export type OpeningId = 'left-to-right' | 'right-to-left' | 'top-down' | 'split';

export const OPENINGS: { id: OpeningId; name: string; price: number; image: string }[] = [
  { id: 'left-to-right', name: 'Left To Right', price: 0, image: '/img/opening/lefttoright-eclipsecore.webp' },
  { id: 'right-to-left', name: 'Right To Left', price: 0, image: '/img/opening/righttoleft-eclipsecore.webp' },
  { id: 'top-down', name: 'Top Down', price: 0, image: '/img/opening/topdown-eclipsecore.webp' },
  { id: 'split', name: 'Split', price: 35, image: '/img/opening/split-eclipsecore.webp' },
];

export const ROOM_TYPES = ['Bedroom', 'Family Room', 'Kitchen', 'Bathroom', 'Office', 'Dining Room', 'Living Room', 'Other'];

export const SIZE_LIMITS = {
  width: { min: 10, max: 138 },
  height: { min: 10, max: 79 },
};
