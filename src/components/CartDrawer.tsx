'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { Icon } from './ui';
import { PROMO } from '@/data/content';
import { formatUSD } from '@/lib/pricing';

export default function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotal, add, count } = useCart();
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  const hasSample = items.some((i) => i.kind === 'sample');

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-label="Your cart"
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-200">
          <p className="text-lg font-semibold text-[#1a1a1a]">
            Your Cart <span className="text-gray-500 font-normal text-base">({count})</span>
          </p>
          <button onClick={() => setOpen(false)} className="p-2 -mr-2 text-gray-500 hover:text-black" aria-label="Close cart">
            <Icon name="close" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-16">
              <Icon name="cart" className="w-10 h-10 text-gray-300" />
              <p className="text-lg font-semibold text-[#1a1a1a]">Your cart is empty</p>
              <Link href="/shop" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-[#00473c] px-6 py-3 font-semibold text-white">
                Customize Your Blinds
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 rounded-lg border border-gray-200 p-3">
                  <div className="w-20 h-20 shrink-0 rounded-md overflow-hidden bg-gray-50 border border-gray-100">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt="" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full grid grid-cols-2">
                        {['#ffffff', '#E6E5DE', '#53565b', '#4A90D9'].map((c) => (
                          <span key={c} style={{ background: c }} />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <p className="text-sm font-semibold leading-snug text-[#1a1a1a]">{item.title}</p>
                      <p className="text-sm font-semibold whitespace-nowrap">{item.unitPrice === 0 ? 'Free' : formatUSD(item.unitPrice * item.qty)}</p>
                    </div>
                    <ul className="mt-1 text-xs text-gray-500 leading-relaxed">
                      {item.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    <div className="mt-2 flex items-center justify-between">
                      {item.kind === 'blind' ? (
                        <div className="flex items-center rounded-md border border-gray-200">
                          <button className="p-1.5" onClick={() => setQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                            <Icon name="minus" className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.qty}</span>
                          <button className="p-1.5" onClick={() => setQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                            <Icon name="plus" className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span />
                      )}
                      <button onClick={() => remove(item.id)} className="text-xs text-gray-500 underline hover:text-black">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && !hasSample && (
            <div className="mt-4 rounded-lg bg-[#00473c]/5 border border-[#00473c]/15 p-4 flex items-center gap-3">
              <Icon name="swatch" className="w-5 h-5 text-[#00473c] shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#3a3a3a]">Free Fabric Samples</p>
                <p className="text-xs text-gray-600">Up to 10, delivered free</p>
              </div>
              <button
                onClick={() => add({ kind: 'sample', title: 'Free Fabric Samples', details: ['White, Cream, Graphite, Blue'], unitPrice: 0 })}
                className="rounded-full border border-[#00473c] px-3 py-1 text-xs font-semibold text-[#00473c] hover:bg-[#00473c] hover:text-white"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 px-5 pt-4 pb-5">
            <div className="rounded-lg border border-dashed border-[#00473c]/40 px-3 py-2 text-xs text-[#00473c] mb-3">
              Use code <span className="font-bold">{PROMO.code}</span> at checkout for an extra {PROMO.codePercent}% off.
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-lg text-[#1a1a1a]">{formatUSD(subtotal)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Shipping and taxes calculated at checkout.</p>
            <button
              onClick={() => setNotice(true)}
              className="mt-4 w-full rounded-lg bg-[#00473c] py-3.5 font-semibold text-white hover:bg-[#003830] flex items-center justify-center gap-2"
            >
              <Icon name="lock" className="w-4 h-4" /> Checkout
            </button>
            {notice && <p className="mt-2 text-center text-xs text-[#00473c] bg-[#00473c]/5 rounded py-2">Design preview — checkout connects to Shopify at launch.</p>}
          </div>
        )}
      </aside>
    </div>
  );
}
