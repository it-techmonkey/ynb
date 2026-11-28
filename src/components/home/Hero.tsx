import Link from 'next/link';
import type { CSSProperties } from 'react';
import RoomSlider from '../sections/RoomSlider';
import { ButtonLink, Stars } from '../ui';
import { HERO, RATING } from '@/data/content';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/** Rating first, a short promise, two clear actions. No price on the homepage. */
export default function Hero() {
  return (
    <section className="bg-linen">
      <div className="site-container grid gap-12 lg:gap-16 py-14 md:py-20 lg:py-24 lg:grid-cols-2 items-center">
        <div className="max-w-xl">
          <Link
            href="#reviews"
            className="animate-fade-up inline-flex items-center gap-2.5 text-sm text-muted hover:text-foreground transition-colors"
            style={d(0)}
          >
            <Stars value={RATING.score} className="w-4 h-4" />
            <span>
              <span className="font-semibold text-foreground">{RATING.score}/5</span> · {RATING.label}
            </span>
          </Link>
          <h1 className="animate-fade-up heading-display mt-5 text-[38px] sm:text-5xl lg:text-[48px] xl:text-[54px] text-foreground" style={d(70)}>
            {HERO.title}
          </h1>
          <p className="animate-fade-up mt-5 text-lg md:text-xl text-muted leading-relaxed" style={d(140)}>
            {HERO.body}
          </p>
          <div className="animate-fade-up mt-9 flex flex-col sm:flex-row gap-3" style={d(210)}>
            <ButtonLink href="/shop" className="sm:px-9">
              Shop now
            </ButtonLink>
            <ButtonLink href="/how-to-measure" variant="outline" className="sm:px-9">
              How to measure
            </ButtonLink>
          </div>
        </div>

        <div className="animate-fade-in" style={d(120)}>
          <RoomSlider className="w-full max-w-[600px] mx-auto lg:ml-auto lg:mr-0" />
        </div>
      </div>
    </section>
  );
}
