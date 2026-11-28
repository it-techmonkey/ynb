'use client';

import { useState, type ReactNode } from 'react';
import { Reveal, SectionHeading } from '../ui';
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
  <ul className="space-y-2.5">
    {items.map((i) => (
      <li key={i} className="flex gap-3 text-[15px] text-muted">
        <span className="mt-2.5 w-1 h-1 rounded-full bg-foreground/40 shrink-0" />
        {i}
      </li>
    ))}
  </ul>
);

const SECTIONS: { title: string; body: ReactNode }[] = [
  {
    title: 'Product details',
    body: (
      <div className="space-y-4 text-[15px] text-muted leading-relaxed">
        {PRODUCT_DETAILS.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="font-semibold text-foreground pt-2">Key features</p>
        <List items={KEY_FEATURES} />
      </div>
    ),
  },
  {
    title: 'Specifications',
    body: (
      <dl className="grid sm:grid-cols-2 gap-x-10">
        {SPECIFICATIONS.map((s) => (
          <div key={s.label} className="flex justify-between gap-6 py-3 border-b border-line text-sm">
            <dt className="text-muted">{s.label}</dt>
            <dd className="font-medium text-right">{s.value}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  { title: 'Perfect for', body: <List items={PERFECT_FOR} /> },
  { title: 'What’s in the box', body: <List items={WHATS_IN_THE_BOX} /> },
  { title: 'Care & maintenance', body: <List items={EASY_MAINTENANCE} /> },
  {
    title: 'Child safety',
    body: (
      <div className="space-y-3 text-[15px] text-muted leading-relaxed">
        {CHILD_SAFETY.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    ),
  },
];

export default function ProductDetails() {
  const [tab, setTab] = useState(0);
  return (
    <section id="details" className="bg-white py-20 md:py-28">
      <div className="site-container">
        <SectionHeading title="Product information" />
        <Reveal className="mt-10">
          <div className="-mx-5 overflow-x-auto px-5 scrollbar-hide" role="tablist" aria-label="Product information">
            <div className="flex w-max gap-2">
              {SECTIONS.map((s, i) => (
                <button
                  key={s.title}
                  role="tab"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    tab === i ? 'bg-foreground text-white' : 'bg-linen text-foreground/75 hover:text-foreground'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
          <div key={tab} role="tabpanel" className="mt-8 max-w-3xl animate-fade-in">
            {SECTIONS[tab].body}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
