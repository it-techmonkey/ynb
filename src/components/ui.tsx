import Link from 'next/link';
import type { ReactNode, SVGProps } from 'react';
import { PROMO } from '@/data/content';
import { compareAt, formatUSD } from '@/lib/pricing';

export type IconName =
  | 'check' | 'star' | 'cart' | 'close' | 'plus' | 'minus' | 'arrow' | 'chevron' | 'moon' | 'shield'
  | 'ruler' | 'truck' | 'play' | 'menu' | 'lock' | 'sun' | 'swatch' | 'badge' | 'pin' | 'info'
  | 'search' | 'user' | 'copy' | 'tag' | 'arrows';

const PATHS: Record<IconName, ReactNode> = {
  check: <path d="M5 13l4 4L19 7" />,
  star: <path d="M12 3.6l2.5 5.3 5.8.7-4.3 4 1.1 5.8L12 16.6l-5.1 2.8 1.1-5.8-4.3-4 5.8-.7z" fill="currentColor" stroke="none" />,
  cart: <><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17" /><circle cx="9" cy="20" r="1" /><circle cx="17" cy="20" r="1" /></>,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  moon: <path d="M21.75 15A9.72 9.72 0 0118 15.75c-5.39 0-9.75-4.37-9.75-9.75 0-1.33.27-2.6.75-3.75A9.75 9.75 0 003 11.25C3 16.64 7.37 21 12.75 21a9.75 9.75 0 009-6z" />,
  shield: <><path d="M12 2.7A12 12 0 013.6 6 12 12 0 003 9.75c0 5.6 3.82 10.3 9 11.62 5.18-1.33 9-6.03 9-11.62 0-1.31-.21-2.57-.6-3.75h-.15c-3.2 0-6.1-1.25-8.25-3.3z" /><path d="M9 12.75L11.25 15 15 9.75" /></>,
  ruler: <><path d="M3 16.5L16.5 3 21 7.5 7.5 21z" /><path d="M7 12.5l1.5 1.5M10 9.5l1.5 1.5M13 6.5l1.5 1.5" /></>,
  truck: <path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.38A1.13 1.13 0 012.25 17.6V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.13c.62 0 1.13-.5 1.09-1.12a17.9 17.9 0 00-3.21-9.2 2.06 2.06 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.18v-.96c0-.57-.42-1.05-.99-1.1a48.6 48.6 0 00-10.02 0c-.57.05-.99.53-.99 1.1v7.64m12-6.68v6.68m0 4.5v-4.5m0 0h-12" />,
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 018 0v3" /></>,
  sun: <><circle cx="12" cy="12" r="3.75" /><path d="M12 3v2.25M18.36 5.64l-1.59 1.59M21 12h-2.25M18.36 18.36l-1.59-1.59M12 18.75V21M7.23 16.77l-1.59 1.59M5.25 12H3M7.23 7.23L5.64 5.64" /></>,
  swatch: <><rect x="4" y="4" width="7" height="16" rx="1.5" /><path d="M11 8l5-3 3.5 6-8.5 5" /></>,
  badge: <><path d="M9 12.75L11.25 15 15 9.75" /><path d="M12 2.25l2.2 1.6 2.7-.1.8 2.6 2.2 1.6-.8 2.6.8 2.6-2.2 1.6-.8 2.6-2.7-.1L12 21.75l-2.2-1.6-2.7.1-.8-2.6-2.2-1.6.8-2.6-.8-2.6 2.2-1.6.8-2.6 2.7.1z" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></>,
  copy: <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />,
  tag: <path d="M7 7h.01M7 3h5.59a1 1 0 01.7.3l7.42 7.41a1 1 0 010 1.41l-8.59 8.59a1 1 0 01-1.41 0L3.3 13.3a1 1 0 01-.3-.71V7a4 4 0 014-4z" />,
  arrows: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />,
};

export function Icon({ name, className = 'w-5 h-5', ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}

/** Same star treatment as the live StarRating (brand green by default). */
export function Stars({ value = 5, className = 'w-4 h-4', color = 'text-[#00473c]' }: { value?: number; className?: string; color?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" className={`${className} ${i <= Math.round(value) ? color : 'text-gray-300'}`} />
      ))}
    </span>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Your Next Blinds home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={light ? '/icons/logo-white.svg' : '/icons/logo.svg'} alt="" width={18} height={22} />
      <span className={`font-medium text-lg md:text-xl leading-tight whitespace-nowrap ${light ? 'text-white' : 'text-[#00473c]'}`}>
        Your <span className="italic">Next </span>Blinds
      </span>
    </Link>
  );
}

export function SectionHeading({
  title,
  sub,
  center = false,
  light = false,
  eyebrow,
}: {
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
  light?: boolean;
  eyebrow?: string;
}) {
  return (
    <div className={`${center ? 'mx-auto text-center max-w-2xl' : 'max-w-xl'}`}>
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${light ? 'text-white/60' : 'text-[#00473c]'}`}>{eyebrow}</p>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold leading-tight ${light ? 'text-white' : 'text-black'}`}>{title}</h2>
      {sub && <p className={`mt-4 leading-relaxed ${light ? 'text-gray-300' : 'text-gray-600'}`}>{sub}</p>}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'dark' | 'light' | 'outlineLight';
  className?: string;
}) {
  const styles = {
    primary: 'bg-[#00473c] text-white hover:bg-[#003830] shadow-sm',
    outline: 'border border-[#00473c] text-[#00473c] bg-white hover:bg-[#00473c]/5',
    dark: 'bg-[#1a1a1a] text-white hover:bg-gray-800',
    light: 'bg-white text-black hover:bg-gray-100',
    outlineLight: 'border border-white/40 text-white hover:border-white hover:bg-white/5',
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-[15px] font-semibold transition-colors ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

/** Live price treatment: struck-through compare-at, price, "50% Off Flash Sale" badge. */
export function PriceTag({
  price,
  size = 'md',
  from = false,
  onDark = false,
}: {
  price: number;
  size?: 'sm' | 'md' | 'lg';
  from?: boolean;
  onDark?: boolean;
}) {
  const priceCls = { sm: 'text-base', md: 'text-xl md:text-2xl', lg: 'text-2xl md:text-3xl' }[size];
  return (
    <span className="inline-flex flex-wrap items-baseline gap-2">
      {from && <span className={`text-sm ${onDark ? 'text-white/70' : 'text-gray-500'}`}>From</span>}
      <span className={`text-sm font-medium line-through ${onDark ? 'text-white/50' : 'text-gray-400'}`}>{formatUSD(compareAt(price))}</span>
      <span className={`${priceCls} font-bold ${onDark ? 'text-white' : 'text-[#3a3a3a]'}`}>{formatUSD(price)}</span>
      {size !== 'sm' && (
        <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${onDark ? 'bg-white text-[#00473c]' : 'bg-[#00473c] text-white'}`}>
          {PROMO.flashSalePercent}% Off Flash Sale
        </span>
      )}
    </span>
  );
}

export function IconTile({ children }: { children: ReactNode }) {
  return <span className="shrink-0 w-10 h-10 rounded-lg bg-[#00473c]/10 text-[#00473c] flex items-center justify-center">{children}</span>;
}
