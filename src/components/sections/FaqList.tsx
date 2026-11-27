'use client';

import { useState } from 'react';
import { Icon } from '../ui';
import type { Faq } from '@/data/content';

export default function FaqList({ items, defaultOpen = null, bare = false }: { items: Faq[]; defaultOpen?: number | null; bare?: boolean }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <ul className={`divide-y divide-gray-200 ${bare ? '' : 'border-y border-gray-200'}`}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q}>
            <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-6 py-5 text-left" aria-expanded={isOpen}>
              <span className="font-semibold text-[#1a1a1a]">{f.q}</span>
              <Icon name={isOpen ? 'minus' : 'plus'} className="w-5 h-5 shrink-0 text-gray-500" />
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="pb-5 pr-10 text-gray-600 leading-relaxed">{f.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
