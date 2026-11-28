'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { Icon, Logo } from './ui';
import { CONTACT, PROMO } from '@/data/content';

const NAV = [
  { href: '/shop', label: 'The Blind' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/how-to-measure', label: 'Measuring' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/faq', label: 'FAQ' },
];

function PromoBar() {
  return (
    <div className="bg-ink text-white/80 text-[13px]">
      <div className="site-container flex h-10 items-center justify-center gap-x-6">
        <span className="hidden md:inline">Up to {PROMO.saleMaxPercent}% off made-to-measure blinds</span>
        <span>
          Extra {PROMO.codePercent}% off with code <span className="font-semibold text-white">{PROMO.code}</span>
        </span>
        <Link href="/how-to-measure" className="hidden lg:inline underline underline-offset-4 decoration-white/30 hover:decoration-white">
          How to measure
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
  }, [menu]);

  return (
    <>
      <PromoBar />
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 border-b ${
          scrolled || menu ? 'bg-white border-line' : 'bg-white border-transparent'
        }`}
      >
        <div className="site-container h-16 md:h-[72px] flex items-center justify-between gap-6">
          <div className="flex items-center gap-1">
            <button
              className="lg:hidden -ml-2 p-2 text-foreground"
              onClick={() => setMenu((m) => !m)}
              aria-label={menu ? 'Close menu' : 'Open menu'}
              aria-expanded={menu}
            >
              <Icon name={menu ? 'close' : 'menu'} className="w-6 h-6" />
            </button>
            <Logo />
          </div>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
            {NAV.map((n) => {
              const active = n.href === pathname;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`py-2 text-[15px] transition-colors border-b ${
                    active ? 'text-foreground border-foreground' : 'text-foreground/70 border-transparent hover:text-foreground'
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <a
              href={CONTACT.phoneHref}
              className="hidden xl:inline-flex items-center gap-2 px-3 text-sm font-medium text-foreground/75 hover:text-foreground"
            >
              <Icon name="phone" className="w-4 h-4" /> {CONTACT.phone}
            </a>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Shop Now
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="relative p-2.5 -mr-2 text-foreground transition-colors hover:text-primary"
              aria-label={`Open cart, ${count} items`}
            >
              <Icon name="cart" className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute top-1 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-[11px] font-semibold text-white flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden absolute inset-x-0 top-full h-[calc(100dvh-4rem)] bg-white border-t border-line transition-opacity duration-200 ${
            menu ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={!menu}
        >
          <nav className="site-container flex h-full flex-col pt-4 pb-16 overflow-y-auto" aria-label="Mobile">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                tabIndex={menu ? 0 : -1}
                className="flex items-center justify-between border-b border-line py-4 text-lg font-medium text-foreground"
              >
                {n.label}
                <Icon name="chevron" className="w-5 h-5 -rotate-90 text-foreground/40" />
              </Link>
            ))}
            <Link href="/shop" tabIndex={menu ? 0 : -1} className="mt-8 rounded-md bg-primary py-4 text-center font-semibold text-white">
              Customize Your Blind
            </Link>
            <div className="mt-auto pt-8 space-y-2 text-sm text-muted">
              <a href={CONTACT.phoneHref} tabIndex={menu ? 0 : -1} className="flex items-center gap-2">
                <Icon name="phone" className="w-4 h-4" /> {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} tabIndex={menu ? 0 : -1} className="flex items-center gap-2">
                <Icon name="mail" className="w-4 h-4" /> {CONTACT.email}
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
