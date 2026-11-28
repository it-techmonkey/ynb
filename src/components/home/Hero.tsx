import Link from 'next/link';
import type { CSSProperties } from 'react';
import RoomSlider from '../sections/RoomSlider';
import { ButtonLink, CheckDot, Icon, PriceTag, Stars } from '../ui';
import { HERO, RATING } from '@/data/content';
import { FROM_PRICE } from '@/lib/pricing';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linen">
      {/* soft ambient light */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[620px] w-[620px] rounded-full bg-white/70 blur-3xl animate-glow"
        aria-hidden="true"
      />
      <div className="site-container relative grid gap-12 lg:gap-16 py-12 md:py-16 lg:py-20 lg:grid-cols-[1.05fr_1fr] items-center">
        <div>
          <a href="#reviews" className="animate-fade-up inline-flex items-center gap-2.5 rounded-full bg-white px-3.5 py-1.5 shadow-sm ring-1 ring-line" style={d(0)}>
            <Stars value={RATING.score} className="w-3.5 h-3.5" />
            <span className="text-xs font-medium text-foreground/80">
              <span className="font-semibold text-foreground">{RATING.score}/5</span> · {RATING.label}
            </span>
          </a>

          <h1 className="animate-fade-up heading-display mt-6 text-[46px] sm:text-6xl md:text-7xl lg:text-[58px] xl:text-[72px] text-foreground" style={d(80)}>
            {HERO.title[0]}
            <br />
            <em className="text-primary">{HERO.title[1]}</em>
          </h1>

          <p className="animate-fade-up mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-xl" style={d(160)}>
            {HERO.body}
          </p>

          <div className="animate-fade-up mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6" style={d(240)}>
            <ButtonLink href="/shop" arrow className="sm:px-9 py-4">
              Customize Your Blind
            </ButtonLink>
            <Link href="/how-to-measure" className="group inline-flex items-center justify-center gap-2 text-[15px] font-semibold text-foreground">
              <Icon name="ruler" className="w-4 h-4 text-primary" />
              <span className="link-underline">How to measure</span>
            </Link>
          </div>

          <div className="animate-fade-up mt-7" style={d(300)}>
            <PriceTag price={FROM_PRICE} from />
          </div>

          <ul className="animate-fade-up mt-8 pt-7 border-t border-sand flex flex-wrap gap-x-6 gap-y-3" style={d(360)}>
            {HERO.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <CheckDot /> {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up relative" style={d(200)}>
          <RoomSlider className="w-full max-w-[600px] mx-auto lg:ml-auto lg:mr-0" />
          <div className="hidden xl:flex absolute -left-10 top-[38%] items-center gap-3 rounded-2xl bg-white/95 backdrop-blur px-4 py-3 shadow-xl ring-1 ring-line animate-fade-up" style={d(700)}>
            <span className="w-9 h-9 rounded-full bg-primary-soft text-primary flex items-center justify-center">
              <Icon name="tool" className="w-4.5 h-4.5" />
            </span>
            <span className="text-xs leading-tight">
              <span className="block font-semibold text-foreground">No drill. No damage.</span>
              <span className="text-muted">Press-fits in minutes</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
