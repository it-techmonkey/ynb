'use client';

import { useState, type ReactNode } from 'react';
import { Icon } from '../ui';
import {
  CHILD_SAFETY,
  EASY_MAINTENANCE,
  KEY_FEATURES,
  PERFECT_FOR,
  PRODUCT_DETAILS,
  SPECIFICATIONS,
  WHATS_IN_THE_BOX,
} from '@/data/content';

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((i) => (
      <li key={i} className="flex gap-3 text-sm text-[#484848]">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#00473c] shrink-0" />
        {i}
      </li>
    ))}
  </ul>
);

const SECTIONS: { title: string; body: ReactNode }[] = [
  {
    title: 'Product Details',
    body: (
      <div className="space-y-4 text-sm text-[#484848] leading-relaxed">
        {PRODUCT_DETAILS.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="font-semibold text-[#1a1a1a] pt-2">Key Features</p>
        <List items={KEY_FEATURES} />
      </div>
    ),
  },
  {
    title: 'Specifications',
    body: (
      <dl className="grid sm:grid-cols-2 gap-x-10">
        {SPECIFICATIONS.map((s) => (
          <div key={s.label} className="flex justify-between gap-6 py-3 border-b border-gray-100 text-sm">
            <dt className="text-gray-500">{s.label}</dt>
            <dd className="font-medium text-[#1a1a1a] text-right">{s.value}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  { title: 'Perfect For', body: <List items={PERFECT_FOR} /> },
  { title: 'What’s in the Box?', body: <List items={WHATS_IN_THE_BOX} /> },
  { title: 'Easy Maintenance', body: <List items={EASY_MAINTENANCE} /> },
  {
    title: 'Child Safety',
    body: (
      <div className="space-y-3 text-sm text-[#484848] leading-relaxed">
        {CHILD_SAFETY.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    ),
  },
];

/** Live CategoryInfoSection accordions. */
export default function ProductDetails() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="details" className="bg-white py-12 md:py-16">
      <div className="site-container grid gap-8 lg:grid-cols-[1fr_2.2fr]">
        <h2 className="text-2xl md:text-3xl font-bold text-black">Product Information</h2>
        <ul className="divide-y divide-gray-200 border-y border-gray-200">
          {SECTIONS.map((s, i) => (
            <li key={s.title}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between py-4 text-left" aria-expanded={open === i}>
                <span className="font-semibold text-[#1a1a1a]">{s.title}</span>
                <Icon name={open === i ? 'minus' : 'plus'} className="w-4 h-4 text-gray-500" />
              </button>
              {open === i && <div className="pb-6">{s.body}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
