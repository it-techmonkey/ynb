'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { Icon, Logo } from './ui';
import { PROMO } from '@/data/content';
import { untilMidnight } from '@/lib/pricing';

const NAV = [
  { href: '/shop', label: 'Shop the Blind' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/how-to-measure', label: 'Measure/fit guides' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/faq', label: 'FAQ' },
];

/** Live PromoBar, non-seasonal state. */
function PromoBar() {
  const [left, setLeft] = useState('');
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const tick = () => setLeft(untilMidnight());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  const copy = () =>
    navigator.clipboard?.writeText(PROMO.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });

  return (
    <div className="bg-[#00473c] text-white">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-4 py-2 text-center sm:py-2.5 lg:flex-nowrap">
        <span className="flex items-center gap-1.5 whitespace-nowrap text-xs font-bold tracking-wide sm:text-sm">
          <Icon name="tag" className="h-3.5 w-3.5" strokeWidth={2} /> UP TO {PROMO.saleMaxPercent}% OFF
        </span>
        <span className="hidden text-white/40 sm:inline">|</span>
        <span className="flex items-center gap-1.5 whitespace-nowrap text-xs sm:text-sm">
          Extra {PROMO.codePercent}% Off with code
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1 rounded border border-white/50 bg-white/10 px-1.5 py-0.5 text-xs font-bold tracking-wider hover:bg-white/20"
            title="Click to copy"
          >
            {copied ? 'Copied!' : PROMO.code}
            <Icon name="copy" className="h-3 w-3" strokeWidth={2} />
          </button>
        </span>
        <span className="hidden text-white/40 sm:inline">|</span>
        <span className="hidden whitespace-nowrap text-xs sm:inline sm:text-sm">Today Only</span>
        <span className="hidden text-white/40 sm:inline">|</span>
        <span className="hidden whitespace-nowrap text-xs sm:inline sm:text-sm">While Supplies Last</span>
        <span className="hidden text-white/40 sm:inline">|</span>
        <span className="whitespace-nowrap text-xs sm:text-sm">
          Sale ends in <span className="font-bold tabular-nums">{left || '--:--:--'}</span>
        </span>
        <Link href="/shop" className="ml-1 whitespace-nowrap rounded-full bg-white px-4 py-1 text-xs font-bold tracking-wide text-[#00473c] hover:bg-gray-100 sm:text-sm">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
}

export default function Header() {
  const { count, setOpen } = useCart();
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <PromoBar />
      <header className={`sticky top-0 z-40 bg-white border-b transition-shadow ${scrolled ? 'border-transparent shadow-[0_2px_12px_rgba(0,0,0,0.06)]' : 'border-gray-200'}`}>
        <div className="site-container h-14 md:h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <button className="lg:hidden -ml-1 p-2" onClick={() => setMenu((m) => !m)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
              <Icon name={menu ? 'close' : 'menu'} className="w-6 h-6" />
            </button>
            <Logo />
          </div>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`text-sm font-medium transition-colors hover:text-[#00473c] ${n.href === pathname ? 'text-[#00473c]' : 'text-[#3a3a3a]'}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <Link
              href="/shop"
              className="hidden sm:inline-flex rounded-lg bg-[#00473c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#003830] mr-2"
            >
              Customize Your Blinds
            </Link>
            <button onClick={() => setOpen(true)} className="relative p-2 text-[#3a3a3a] hover:text-[#00473c]" aria-label={`Open cart, ${count} items`}>
              <Icon name="cart" className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute top-0.5 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-[#00473c] text-[11px] font-bold text-white flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-[max-height] duration-300 bg-white ${menu ? 'max-h-[420px] border-t border-gray-200' : 'max-h-0'}`}>
          <nav className="px-4 py-2 flex flex-col" aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="py-3.5 text-base font-medium border-b border-gray-100 last:border-0 text-[#3a3a3a]">
                {n.label}
              </Link>
            ))}
            <Link href="/shop" className="my-3 rounded-lg bg-[#00473c] py-3 text-center font-semibold text-white">
              Customize Your Blinds
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
