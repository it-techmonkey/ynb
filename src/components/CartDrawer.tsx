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
      <div
        className={`absolute inset-0 bg-ink/50 backdrop-blur-[2px] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-[440px] bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
      >
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-line">
          <p className="heading-display text-[28px]">
            Your cart <span className="font-sans text-base text-muted">({count})</span>
          </p>
          <button onClick={() => setOpen(false)} className="p-2 -mr-2 rounded-full text-muted hover:text-foreground hover:bg-linen" aria-label="Close cart">
            <Icon name="close" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <span className="w-16 h-16 rounded-full bg-linen flex items-center justify-center text-primary">
                <Icon name="moon" className="w-7 h-7" />
              </span>
              <p className="mt-5 heading-display text-3xl">Your cart is empty</p>
              <p className="mt-2 text-sm text-muted max-w-[260px]">Build a blind made to your exact window size — it only takes a minute.</p>
              <Link href="/shop" onClick={() => setOpen(false)} className="mt-6 rounded-full bg-primary px-7 py-3.5 font-semibold text-white hover:bg-primary-dark">
                Customize Your Blind
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 pb-4 border-b border-line last:border-0 animate-fade-up">
                  <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-linen">
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
                    <div className="flex justify-between gap-3">
                      <p className="text-sm font-semibold leading-snug">{item.title}</p>
                      <p className="text-sm font-semibold whitespace-nowrap tabular-nums">{item.unitPrice === 0 ? 'Free' : formatUSD(item.unitPrice * item.qty)}</p>
                    </div>
                    <ul className="mt-1 text-xs text-muted leading-relaxed">
                      {item.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    <div className="mt-3 flex items-center justify-between">
                      {item.kind === 'blind' ? (
                        <div className="flex items-center rounded-full border border-line">
                          <button className="p-2 text-muted hover:text-foreground" onClick={() => setQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                            <Icon name="minus" className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm tabular-nums">{item.qty}</span>
                          <button className="p-2 text-muted hover:text-foreground" onClick={() => setQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                            <Icon name="plus" className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span />
                      )}
                      <button onClick={() => remove(item.id)} className="text-xs text-muted underline underline-offset-2 hover:text-foreground">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && !hasSample && (
            <div className="mt-2 rounded-2xl bg-linen p-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shrink-0">
                <Icon name="swatch" className="w-5 h-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold">Add free fabric samples</p>
                <p className="text-xs text-muted">See every color at home — on us.</p>
              </div>
              <button
                onClick={() => add({ kind: 'sample', title: 'Free Fabric Samples', details: ['White, Cream, Graphite, Blue'], unitPrice: 0 })}
                className="rounded-full border border-primary px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line px-6 pt-5 pb-6 bg-white">
            <div className="flex items-center gap-2 rounded-xl border border-dashed border-primary/30 bg-primary-soft/50 px-3 py-2.5 text-xs text-primary mb-4">
              <Icon name="tag" className="w-4 h-4 shrink-0" />
              <span>
                Use code <span className="font-bold tracking-wide">{PROMO.code}</span> at checkout for an extra {PROMO.codePercent}% off.
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-muted">Subtotal</span>
              <span className="font-semibold text-xl tabular-nums">{formatUSD(subtotal)}</span>
            </div>
            <p className="text-xs text-muted mt-1">Shipping and taxes calculated at checkout.</p>
            <button
              onClick={() => setNotice(true)}
              className="mt-4 w-full rounded-full bg-primary py-4 font-semibold text-white transition-colors hover:bg-primary-dark flex items-center justify-center gap-2"
            >
              <Icon name="lock" className="w-4 h-4" /> Secure Checkout
            </button>
            {notice && <p className="mt-2 text-center text-xs text-primary bg-primary-soft rounded-lg py-2">Design preview — checkout connects to Shopify at launch.</p>}
            <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-muted">
              <span className="flex items-center gap-1"><Icon name="shield" className="w-3.5 h-3.5 text-primary" /> Fit Guarantee</span>
              <span className="flex items-center gap-1"><Icon name="badge" className="w-3.5 h-3.5 text-primary" /> 5-year warranty</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
