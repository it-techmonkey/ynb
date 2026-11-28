'use client';

import { useState } from 'react';
import { Icon } from '../ui';
import type { Faq } from '@/data/content';

export default function FaqList({ items, defaultOpen = null }: { items: Faq[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="group w-full flex items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className={`text-base md:text-lg font-medium transition-colors ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>{f.q}</span>
              <span
                className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen ? 'bg-primary text-white rotate-45' : 'bg-linen text-foreground group-hover:bg-sand'
                }`}
              >
                <Icon name="plus" className="w-4 h-4" strokeWidth={2} />
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <p className="pb-6 pr-12 text-[15px] md:text-base text-muted leading-relaxed">{f.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
