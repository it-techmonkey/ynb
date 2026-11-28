'use client';

import { useState } from 'react';
import { Icon } from '../ui';
import type { Faq } from '@/data/content';

export default function FaqList({ items, defaultOpen = null }: { items: Faq[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <ul className="border-t border-foreground/15">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className="border-b border-line">
            <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-6 py-5 text-left" aria-expanded={isOpen}>
              <span className="text-base md:text-[17px] font-medium">{f.q}</span>
              <Icon name={isOpen ? 'minus' : 'plus'} className="w-5 h-5 shrink-0 text-foreground/60" />
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="pb-6 pr-10 text-[15px] md:text-base text-muted leading-relaxed">{f.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
