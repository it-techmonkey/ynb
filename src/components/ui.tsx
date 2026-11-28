import Link from 'next/link';
import type { CSSProperties, ReactNode, SVGProps } from 'react';
import { PROMO } from '@/data/content';
import { compareAt, formatUSD } from '@/lib/pricing';

export type IconName =
  | 'check' | 'star' | 'cart' | 'close' | 'plus' | 'minus' | 'arrow' | 'chevron' | 'moon' | 'shield'
  | 'ruler' | 'truck' | 'play' | 'menu' | 'lock' | 'sun' | 'badge' | 'pin' | 'info'
  | 'search' | 'user' | 'copy' | 'tag' | 'arrows' | 'tool' | 'thermo' | 'child' | 'wave' | 'chat'
  | 'phone' | 'mail' | 'download' | 'x-circle' | 'minus-circle';

const PATHS: Record<IconName, ReactNode> = {
  check: <path d="M5 13l4 4L19 7" />,
  star: <path d="M12 3.6l2.5 5.3 5.8.7-4.3 4 1.1 5.8L12 16.6l-5.1 2.8 1.1-5.8-4.3-4 5.8-.7z" fill="currentColor" stroke="none" />,
  cart: <><path d="M6 7h12l-1 12.2a1 1 0 01-1 .8H8a1 1 0 01-1-.8L6 7z" /><path d="M9 7V6a3 3 0 016 0v1" /></>,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  moon: <path d="M20.5 14.6A8.5 8.5 0 019.4 3.5a8.5 8.5 0 1011.1 11.1z" />,
  shield: <><path d="M12 3l7.5 3v5.6c0 4.4-3.1 8.2-7.5 9.4-4.4-1.2-7.5-5-7.5-9.4V6L12 3z" /><path d="M9 12.2l2.1 2.1L15 10.4" /></>,
  ruler: <><path d="M3 16.5L16.5 3 21 7.5 7.5 21z" /><path d="M7 12.5l1.5 1.5M10 9.5l1.5 1.5M13 6.5l1.5 1.5" /></>,
  truck: <><path d="M3 7h11v9H3z" /><path d="M14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17.5" cy="17.5" r="1.6" /></>,
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 018 0v3" /></>,
  sun: <><circle cx="12" cy="12" r="3.75" /><path d="M12 3v2.25M18.36 5.64l-1.59 1.59M21 12h-2.25M18.36 18.36l-1.59-1.59M12 18.75V21M7.23 16.77l-1.59 1.59M5.25 12H3M7.23 7.23L5.64 5.64" /></>,
  badge: <><circle cx="12" cy="9" r="5.5" /><path d="M9.5 9l1.8 1.8L14.6 7.5" /><path d="M8.5 13.8L7.5 21l4.5-2.2 4.5 2.2-1-7.2" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></>,
  copy: <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M15 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2h3" /></>,
  tag: <><path d="M3 12.6V4.5A1.5 1.5 0 014.5 3h8.1a1.5 1.5 0 011.06.44l7 7a1.5 1.5 0 010 2.12l-8.1 8.1a1.5 1.5 0 01-2.12 0l-7-7A1.5 1.5 0 013 12.6z" /><circle cx="8" cy="8" r="1.3" /></>,
  arrows: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />,
  tool: <path d="M14.7 6.3a4 4 0 00-5.4 5.2L3.8 17a1.6 1.6 0 002.3 2.3l5.5-5.5a4 4 0 005.2-5.4l-2.5 2.5-2.2-.4-.4-2.2 2.5-2.5z" />,
  thermo: <><path d="M10 4.5a2 2 0 014 0v9.2a4 4 0 11-4 0V4.5z" /><path d="M12 10v6.5" /><path d="M17 6h3M17 9.5h2" /></>,
  child: <><circle cx="12" cy="5" r="2.2" /><path d="M7 10.5l5-1.5 5 1.5M12 9v5.5M9.5 21l2.5-6.5 2.5 6.5" /></>,
  wave: <><path d="M4 9.5v5M8 7v10M12 4.5v15M16 7v10M20 9.5v5" /></>,
  chat: <><path d="M20 12a8 8 0 01-11.6 7.1L4 20l1-4.1A8 8 0 1120 12z" /><path d="M8.5 11h.01M12 11h.01M15.5 11h.01" strokeWidth={2.4} /></>,
  phone: <path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 005.3 5.3l1.4-2.2L19 14.5V18a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5L12 13l8.5-6.5" /></>,
  download: <><path d="M12 4v11M7 10.5l5 5 5-5" /><path d="M5 19.5h14" /></>,
  'x-circle': <><circle cx="12" cy="12" r="9" /><path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6" /></>,
  'minus-circle': <><circle cx="12" cy="12" r="9" /><path d="M8.5 12h7" /></>,
};

export function Icon({ name, className = 'w-5 h-5', ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
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

export function Stars({ value = 5, className = 'w-4 h-4', color = 'text-star' }: { value?: number; className?: string; color?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span key={i} className={`relative inline-block ${className}`}>
            <Icon name="star" className={`absolute inset-0 h-full w-full ${color} opacity-25`} />
            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Icon name="star" className={`${className} max-w-none ${color}`} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Your Next Blinds home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={light ? '/icons/logo-white.svg' : '/icons/logo.svg'} alt="" width={18} height={22} />
      <span className={`font-medium text-lg md:text-xl leading-tight whitespace-nowrap tracking-tight ${light ? 'text-white' : 'text-primary'}`}>
        Your <span className="italic">Next </span>Blinds
      </span>
    </Link>
  );
}

/** Wraps content so it fades/slides in as it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  variant,
  className = '',
  as: Tag = 'div',
  id,
}: {
  children: ReactNode;
  delay?: number;
  variant?: 'fade' | 'zoom';
  className?: string;
  as?: 'div' | 'li' | 'section' | 'figure' | 'article';
  id?: string;
}) {
  return (
    <Tag id={id} data-reveal={variant ?? ''} className={className} style={{ '--d': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

export function SectionHeading({
  title,
  sub,
  center = false,
  light = false,
  className = '',
  as: H = 'h2',
}: {
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
  light?: boolean;
  className?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <Reveal className={`${center ? 'mx-auto text-center max-w-2xl flex flex-col items-center' : 'max-w-xl'} ${className}`}>
      <H className={`heading-display text-[28px] md:text-[34px] lg:text-[40px] ${light ? 'text-white' : 'text-foreground'}`}>{title}</H>
      {sub && <p className={`mt-4 text-base md:text-[17px] leading-relaxed max-w-xl ${light ? 'text-white/65' : 'text-muted'}`}>{sub}</p>}
    </Reveal>
  );
}

const BUTTON_STYLES = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  outline: 'border border-foreground/20 text-foreground bg-white hover:border-foreground/50 hover:bg-linen',
  dark: 'bg-ink text-white hover:bg-ink-2',
  light: 'bg-white text-ink hover:bg-linen',
  outlineLight: 'border border-white/25 text-white hover:border-white/70 hover:bg-white/5',
} as const;

export type ButtonVariant = keyof typeof BUTTON_STYLES;

export const buttonClass = (variant: ButtonVariant = 'primary', className = '') =>
  `group inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-[15px] font-semibold transition-colors duration-200 ${BUTTON_STYLES[variant]} ${className}`;

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
      {arrow && <Icon name="arrow" className="w-4 h-4" />}
    </Link>
  );
}

/** Price with the struck-through compare-at and the sale saving. */
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
  const priceCls = { sm: 'text-base', md: 'text-2xl', lg: 'text-3xl md:text-[34px]' }[size];
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
      {from && <span className={`text-sm ${onDark ? 'text-white/60' : 'text-muted'}`}>From</span>}
      <span className={`${priceCls} font-semibold tracking-tight tabular-nums ${onDark ? 'text-white' : 'text-foreground'}`}>{formatUSD(price)}</span>
      <span className={`text-sm line-through tabular-nums ${onDark ? 'text-white/45' : 'text-muted/70'}`}>{formatUSD(compareAt(price))}</span>
      {size !== 'sm' && (
        <span className={`text-sm font-semibold ${onDark ? 'text-mint' : 'text-primary'}`}>
          Save {PROMO.flashSalePercent}%
        </span>
      )}
    </span>
  );
}

/** Plain check mark used in bullet lists. */
export function CheckDot({ light = false }: { light?: boolean }) {
  return <Icon name="check" className={`mt-0.5 w-4.5 h-4.5 shrink-0 ${light ? 'text-mint' : 'text-primary'}`} strokeWidth={2.2} />;
}
