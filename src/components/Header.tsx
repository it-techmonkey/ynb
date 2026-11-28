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
  const [copied, setCopied] = useState(false);
  const copy = () =>
    navigator.clipboard?.writeText(PROMO.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });

  return (
    <div className="bg-ink text-white/85 text-[12.5px] sm:text-[13px]">
      <div className="site-container flex h-10 items-center justify-center gap-x-5">
        <span className="hidden md:inline">
          <span className="font-semibold text-white">Up to {PROMO.saleMaxPercent}% off</span> made-to-measure blinds
        </span>
        <span className="hidden md:inline h-3 w-px bg-white/20" aria-hidden="true" />
        <span className="flex items-center gap-2">
          Extra {PROMO.codePercent}% off with code
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-brass/70 px-2.5 py-0.5 font-semibold tracking-wider text-brass transition-colors hover:bg-brass/10"
            aria-label={`Copy discount code ${PROMO.code}`}
          >
            {copied ? 'Copied' : PROMO.code}
            <Icon name={copied ? 'check' : 'copy'} className="h-3 w-3" strokeWidth={2} />
          </button>
        </span>
        <span className="hidden lg:inline h-3 w-px bg-white/20" aria-hidden="true" />
        <Link href="/shop#samples" className="hidden lg:inline link-underline">
          Free fabric samples
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
          scrolled || menu ? 'bg-white/90 backdrop-blur-xl border-line shadow-[0_6px_24px_-18px_rgba(13,23,20,0.35)]' : 'bg-white border-transparent'
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

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {NAV.map((n) => {
              const active = n.href === pathname;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`relative rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors ${
                    active ? 'text-primary' : 'text-foreground/75 hover:text-foreground hover:bg-linen'
                  }`}
                >
                  {n.label}
                  {active && <span className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />}
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
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
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
                <span className="absolute top-1 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-[11px] font-bold text-white flex items-center justify-center animate-fade-in">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden absolute inset-x-0 top-full h-[calc(100dvh-4rem)] bg-white border-t border-line transition-[opacity,transform] duration-300 ${
            menu ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-2'
          }`}
          aria-hidden={!menu}
        >
          <nav className="site-container flex h-full flex-col pt-4 pb-16 overflow-y-auto" aria-label="Mobile">
            {NAV.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                tabIndex={menu ? 0 : -1}
                className={`heading-display flex items-center justify-between border-b border-line py-4 text-[32px] text-foreground transition-all duration-500 ${
                  menu ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                }`}
                style={{ transitionDelay: menu ? `${80 + i * 50}ms` : '0ms' }}
              >
                {n.label}
                <Icon name="arrow" className="w-5 h-5 text-foreground/30" />
              </Link>
            ))}
            <Link href="/shop" tabIndex={menu ? 0 : -1} className="mt-8 rounded-full bg-primary py-4 text-center font-semibold text-white">
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
