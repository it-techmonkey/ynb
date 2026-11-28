'use client';

import { useState, type ReactNode } from 'react';
import { Icon, Reveal, SectionHeading } from '../ui';
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
        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
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
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="details" className="bg-white py-20 md:py-28">
      <div className="site-container grid gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
        <SectionHeading eyebrow="The details" title="Everything you need to know." className="lg:sticky lg:top-28 lg:self-start" />
        <Reveal delay={80}>
          <ul className="divide-y divide-line border-y border-line">
            {SECTIONS.map((s, i) => {
              const isOpen = open === i;
              return (
                <li key={s.title}>
                  <button onClick={() => setOpen(isOpen ? null : i)} className="group w-full flex items-center justify-between py-5 text-left" aria-expanded={isOpen}>
                    <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-primary' : 'group-hover:text-primary'}`}>{s.title}</span>
                    <span
                      className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen ? 'bg-primary text-white rotate-45' : 'bg-linen group-hover:bg-sand'
                      }`}
                    >
                      <Icon name="plus" className="w-4 h-4" strokeWidth={2} />
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="pb-7">{s.body}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
