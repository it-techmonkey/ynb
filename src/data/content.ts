// Storefront copy. Product facts (sizes, measuring rules, guarantee terms,
// warranty, delivery times, promo) mirror the live Your Next Blinds site and
// the EclipseCore measuring guide in /public/guides. Change wording freely,
// but update the facts only when the live policies change.

import type { IconName } from '@/components/ui';

export const PROMO = {
  code: 'FINAL10',
  codePercent: 10,
  saleMaxPercent: 60,
  flashSalePercent: 50,
};

export const CONTACT = {
  phone: '+1 832-670-6705',
  phoneHref: 'tel:+18326706705',
  email: 'enquiries@yournextblinds.com',
  address: ['8102 Fry Rd, Ste A #1010', 'Cypress, TX 77433, United States'],
};

export const RATING = {
  score: 4.5,
  source: 'Trustpilot',
  label: 'Rated Excellent on Trustpilot',
};

/* ------------------------------------------------------------------ Home -- */

export const HERO = {
  eyebrow: 'EclipseCore Honeycomb Blackout Blinds',
  title: ['Total darkness.', 'Whenever you need it.'],
  body: 'Made-to-measure honeycomb blinds that press-fit inside your window frame. No drilling, no light leaking around the edges — just deep, uninterrupted sleep.',
  points: ['Free fabric samples', 'Fit Guarantee', '5-year warranty'],
};

export const TRUST_POINTS: { icon: IconName; label: string }[] = [
  { icon: 'moon', label: '100% blackout' },
  { icon: 'tool', label: 'Drill-free install' },
  { icon: 'ruler', label: 'Made to measure' },
  { icon: 'thermo', label: 'Thermal insulating' },
  { icon: 'shield', label: 'Fit Guarantee' },
  { icon: 'badge', label: '5-year warranty' },
  { icon: 'swatch', label: 'Free fabric samples' },
  { icon: 'child', label: 'Cordless & child-safe' },
  { icon: 'pin', label: 'Designed in Texas' },
];

export const PROBLEM = {
  eyebrow: 'Why you’re waking up tired',
  title: 'Ordinary blinds and curtains let light in.',
  body: 'Streetlights, headlights and 5 a.m. sunrises slip around the edges of ordinary blinds and straight through curtains. Even a sliver of light is enough to pull you out of deep sleep — so you wake up groggy, irritable and tired before the day has started.',
  stat: { value: '90%', label: 'of adults say outdoor light disrupts their sleep' },
  before: { image: '/img/eclipse/eclipseCore-yourblinds.webp', label: 'Blackout curtains', caption: 'Light glows through the fabric and floods in around every edge.' },
  after: { image: '/img/eclipse/eclipseCore-ourblinds.webp', label: 'EclipseCore', caption: 'A sealed frame and blackout fabric. Nothing gets through.' },
};

export const FEATURES_INTRO = {
  eyebrow: 'Engineered for deeper sleep',
  title: 'Small details. Total darkness.',
  body: 'Every EclipseCore blind is built around one idea: if light can’t find a gap, it can’t wake you up.',
};

export const FEATURES: { icon: IconName; title: string; body: string }[] = [
  { icon: 'moon', title: '100% blackout', body: 'Blackout honeycomb fabric inside a foam-sealed frame — no gaps for light to creep around the edges.' },
  { icon: 'tool', title: 'Drill-free install', body: 'Press-fits inside your window recess. No tools, no screws, no damage — ideal for renters.' },
  { icon: 'thermo', title: 'Thermal insulating', body: 'Honeycomb cells trap air to help keep rooms cooler in summer and warmer in winter.' },
  { icon: 'wave', title: 'Quieter rooms', body: 'The cellular fabric softens outside noise for a calmer, more restful space.' },
  { icon: 'child', title: 'Cordless & child-safe', body: 'No cords or chains to tangle or pull. Simply glide the handle to open and close.' },
  { icon: 'ruler', title: 'Made to measure', body: 'Built to your exact window size, to the nearest 1/8 inch, in four fabrics and two frame finishes.' },
];

export const USE_CASES = {
  eyebrow: 'Sleep on your schedule',
  title: 'Rest deeply, at any hour of the day.',
  body: 'Whether you work nights, nap with a newborn or just want a proper lie-in, EclipseCore turns any room dark in seconds — and it’s light and easy to handle every day.',
  items: ['Bedrooms', 'Nurseries', 'Night-shift sleepers', 'Home theaters', 'Rentals & apartments', 'Home offices'],
};

export const EASY_FIT = {
  eyebrow: 'How it works',
  title: 'Installed in minutes. No drill required.',
  body: 'The frame clicks together by hand and press-fits inside your window recess. No tools, no screws and no wall damage — so it works just as well in a rental as it does at home.',
};

export const HOW_IT_WORKS = [
  { image: '/img/eclipse/howitworks-1.jpg', title: 'Click the frame together', text: 'Slot the frame pieces together by hand — each side clicks into place.' },
  { image: '/img/eclipse/howitworks-2.webp', title: 'Apply the seal foam', text: 'Peel the backing off the foam strips and press them onto the frame.' },
  { image: '/img/eclipse/howitworks-3.webp', title: 'Press-fit into the window', text: 'Push the frame into your window recess so every edge sits snug. This is what keeps light out.' },
  { image: '/img/eclipse/howitworks-4.webp', title: 'Add screws (optional)', text: 'For extra stability, pre-made holes on the sides let you add screws if you want them.' },
  { image: '/img/eclipse/howitworks-5.webp', title: 'Set the tension', text: 'Lift the clip, adjust the blind until the tension feels right, then close the clip.' },
  { image: '/img/eclipse/howitworks-6.webp', title: 'Glide to total darkness', text: 'Take the handle and gently pull the blind closed. Lights out.' },
];

export const REVIEWS_INTRO = {
  eyebrow: 'Customer reviews',
  title: 'Darker rooms. Better mornings.',
};

export const TESTIMONIALS = [
  {
    headline: 'The room forgot what light felt like.',
    author: 'Sarah J.',
    text: "I never realised how much early morning light was waking me up. These blinds made a huge difference — the bedroom stays dark until we're actually ready to get up.",
  },
  {
    headline: 'No drilling, no damage, no light.',
    author: 'David M.',
    text: "Ordered on Tuesday, installed by Friday. The Easy Fit system really does work without drilling — perfect as we're renting. Solid quality for the price.",
  },
  {
    headline: 'Nap time finally works.',
    author: 'Emma R.',
    text: "We got these for our toddler's room and the difference is night and day (literally). Nap times have been so much easier since the room is actually dark.",
  },
];

export type CompareValue = 'yes' | 'partial' | 'no';

export const COMPARISON = {
  eyebrow: 'Compare',
  title: 'How EclipseCore compares.',
  body: 'An honest side-by-side with the window coverings most people try first.',
  columns: ['EclipseCore', 'Standard blinds', 'Blackout curtains'],
  rows: [
    { label: '100% blackout, no edge gaps', values: ['yes', 'no', 'no'] },
    { label: 'Installs without drilling', values: ['yes', 'no', 'no'] },
    { label: 'Made to your exact window size', values: ['yes', 'partial', 'no'] },
    { label: 'Thermal insulation', values: ['yes', 'partial', 'partial'] },
    { label: 'Reduces outside noise', values: ['yes', 'no', 'partial'] },
    { label: 'Cordless & child-safe', values: ['yes', 'partial', 'yes'] },
    { label: 'Renter-friendly, no wall damage', values: ['yes', 'no', 'no'] },
  ] as { label: string; values: CompareValue[] }[],
  footnote: 'Based on typical product characteristics.',
};

/* --------------------------------------------------------------- Measure -- */

export const MEASURE_INTRO = {
  eyebrow: 'Measuring made simple',
  title: 'Measure once. Fit perfectly.',
  body: 'You only need a steel tape measure and five minutes. Give us the exact size of your window opening — we take care of the rest.',
};

export const MEASURE_STEPS = [
  {
    title: 'Measure the width',
    body: 'Measure the inside width of the frame at the top, middle and bottom. Use the smallest of the three.',
  },
  {
    title: 'Measure the height',
    body: 'Measure the inside height on the left, center and right. Again, use the smallest measurement.',
  },
  {
    title: 'Check the depth',
    body: 'Measure from the front edge of the frame to the glass. You need at least 1.5–2 inches of depth.',
  },
];

export const MEASURE_REQUIREMENTS = [
  'A square or rectangular window frame',
  'At least 1.5–2 inches of frame depth',
  'No handles or obstacles inside the frame',
  'A flat, even inside frame surface',
  'Inside-mount installation only',
];

export const MEASURE_TIPS = [
  'Measure each window individually',
  'Use a steel tape measure, in inches',
  'Round to the nearest 1/8 inch',
  'Enter the exact opening size — don’t add or subtract anything',
  'Never measure your old blinds',
];

export const GUARANTEES: { icon: IconName; title: string; body: string; href?: string }[] = [
  { icon: 'shield', title: 'Your Next Fit Guarantee™', body: 'Made a genuine measuring mistake? We’ll remake your blind to the corrected size.*', href: '/how-to-measure#guarantee' },
  { icon: 'badge', title: '5-year warranty', body: 'Every blind is covered against manufacturing defects on components and fabric.' },
  { icon: 'swatch', title: 'Free fabric samples', body: 'See and feel the fabric at home first. Up to 10 samples, delivered free.', href: '/shop#samples' },
  { icon: 'chat', title: 'Real people, in Texas', body: 'Questions about sizing or fitting? Our US-based team is happy to help.', href: '/faq' },
];

export const FIT_GUARANTEE = {
  name: 'Your Next Fit Guarantee™',
  headline: 'Measured wrong? We’ll make it right.',
  intro:
    "Ordering custom blinds shouldn't feel risky. If you make a genuine measuring mistake and your eligible blind doesn't fit your window, we'll remake it to your corrected measurements, subject to the guarantee terms.",
  reassurance: 'Measure with confidence. We’ve got you covered.',
  benefits: [
    'Protection against genuine measuring mistakes',
    'Replacement made to corrected measurements',
    'Simple claim process — just send photos',
    'Available on eligible custom-made blinds',
  ],
  steps: [
    { title: 'Measure and order', body: 'Follow our measuring guide and place your order.' },
    { title: 'Something doesn’t fit?', body: 'If you’ve made a genuine measuring mistake, contact us within 30 calendar days of receiving your order.' },
    { title: 'Show us the problem', body: 'We’ll ask for your order details and may request photos of the blind, the window opening and your corrected measurements.' },
    { title: 'We review your claim', body: 'Once approved under the Your Next Fit Guarantee™, we arrange a remake using the corrected measurements.' },
    { title: 'Install your replacement', body: 'Your new blind is made to the corrected size so you can finish your window.' },
  ],
  disclaimer: '*Terms, eligibility and limitations apply.',
  measureNote: 'Follow our simple measuring guide before entering your sizes. The Your Next Fit Guarantee™ covers genuine measuring mistakes on eligible products.',
};

/* ---------------------------------------------------------- Product page -- */

export const PRODUCT_BULLETS = [
  'Blocks 100% of outside light when closed',
  'Drill-free — press-fits inside your window frame',
  'Custom made to your exact measurements',
];

export const PRODUCT_DETAILS = [
  'Experience complete darkness with effortless installation. EclipseCore honeycomb blinds are designed for maximum light blocking and an easy setup — creating the perfect environment for sleeping, relaxing or watching movies.',
  "Unlike traditional blinds, they use a drill-free installation system, so you don't need tools, screws or professional help. Simply press-fit them inside your square or rectangular window frame for a secure, snug fit.",
  'Every blind is custom made to measure, so you get excellent light-blocking performance, a clean modern look and lasting comfort.',
];

export const KEY_FEATURES = [
  '100% blackout performance — blocks outside light completely when closed',
  'Drill-free installation — no tools, screws or professional help required',
  'Perfect for renters and apartments — no damage to window frames',
  'Honeycomb cellular design traps air for improved insulation and energy efficiency',
  'Helps reduce heat in summer and retain warmth in winter',
  'Custom made to your exact window measurements for a perfect fit',
  'Quick installation — most customers finish in just a few minutes',
  'Suitable for bedrooms, nurseries, media rooms and apartments',
];

export const SPECIFICATIONS = [
  { label: 'Product type', value: 'Blackout honeycomb blind' },
  { label: 'Light control', value: '100% blackout' },
  { label: 'Fabric', value: 'Honeycomb cellular fabric' },
  { label: 'Installation', value: 'Drill-free — no tools required' },
  { label: 'Insulation', value: 'Honeycomb cells trap air for thermal efficiency' },
  { label: 'Mounting', value: 'Inside square or rectangular window frame' },
  { label: 'Min. frame depth', value: '1.5–2 inches' },
  { label: 'Width range', value: '10" – 138"' },
  { label: 'Height range', value: '10" – 79"' },
  { label: 'Manufacturing', value: 'Custom made to measure' },
];

export const PERFECT_FOR = [
  'Bedrooms',
  'Nurseries',
  'Media rooms and home theaters',
  'Apartments and rental properties',
  'Living rooms',
  'Offices',
  'Any room requiring complete darkness',
];

export const WHATS_IN_THE_BOX = [
  'Custom-made blackout honeycomb blind',
  'Drill-free frame with seal foam',
  'All necessary mounting hardware',
  'Installation instructions',
];

export const EASY_MAINTENANCE = [
  'Lightly dust the honeycomb cells with a soft brush or cloth',
  'Spot clean gently with a damp cloth for marks or stains',
  'Avoid soaking or machine washing the fabric',
  'The cellular fabric is designed for long-term durability and performance',
];

export const CHILD_SAFETY = [
  'At Your Next Blinds, safety is a top priority. All of our blinds are designed in accordance with modern child safety standards.',
  'EclipseCore is fully cordless — there are no cords or chains to tangle or pull.',
];

/* ------------------------------------------------------------------- FAQ -- */

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'Will EclipseCore fit my window?',
    a: 'EclipseCore fits inside square or rectangular window frames with at least 1.5–2 inches of depth, a flat inside surface and no handles or obstacles inside the frame. We make widths from 10" to 138" and heights from 10" to 79".',
  },
  {
    q: 'How do I measure my windows?',
    a: 'Measure the inside width at the top, middle and bottom, and the inside height on the left, center and right. Use the smallest of each and enter the exact opening size — don’t add or subtract anything. Our measuring guide walks you through it step by step.',
  },
  {
    q: 'What if I measure wrong?',
    a: 'You’re covered by the Your Next Fit Guarantee™. If you make a genuine measuring mistake, contact us within 30 days of receiving your order and we’ll remake your eligible blind to the corrected measurements. Terms apply.',
  },
  {
    q: 'Do I really not need to drill?',
    a: 'Correct. The frame clicks together by hand and press-fits inside your window recess, held by tension and seal foam. Optional screw holes are there if you ever want extra stability, but most windows don’t need them.',
  },
  {
    q: 'Can I order free samples before buying?',
    a: 'Yes. We send up to 10 fabric samples to your door, free of charge, so you can see and feel the colors before you order.',
  },
  {
    q: 'How long will delivery take?',
    a: 'Every blind is made to measure. Manufacturing typically takes 3–5 business days, and most orders arrive within 7–12 business days of purchase. Your estimated dispatch date is shown on the product page.',
  },
  {
    q: `How do I use my ${PROMO.codePercent}% off code?`,
    a: `Add your blinds to the cart and enter ${PROMO.code} in the discount field at checkout to take an extra ${PROMO.codePercent}% off. It applies on top of current sale pricing. One discount code per order.`,
  },
  {
    q: 'How do I clean my blinds?',
    a: 'Lightly dust the honeycomb cells with a soft brush or cloth, and spot clean marks with a damp cloth. Avoid soaking or machine washing the fabric.',
  },
];

export const HOME_FAQS = FAQS.slice(0, 6);
