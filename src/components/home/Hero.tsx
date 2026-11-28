import Link from 'next/link';
import type { CSSProperties } from 'react';
import RoomSlider from '../sections/RoomSlider';
import { ButtonLink, CheckDot, PriceTag, Stars } from '../ui';
import { HERO, RATING } from '@/data/content';
import { FROM_PRICE } from '@/lib/pricing';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section className="bg-linen">
      <div className="site-container grid gap-12 lg:gap-16 py-12 md:py-16 lg:py-20 lg:grid-cols-2 items-center">
        <div className="max-w-xl">
          <h1 className="animate-fade-up heading-display text-[36px] sm:text-5xl lg:text-[48px] xl:text-[54px] text-foreground" style={d(0)}>
            {HERO.title}
          </h1>
          <p className="animate-fade-up mt-5 text-base md:text-lg text-muted leading-relaxed" style={d(80)}>
            {HERO.body}
          </p>

          <div className="animate-fade-up mt-7" style={d(140)}>
            <PriceTag price={FROM_PRICE} from />
          </div>

          <div className="animate-fade-up mt-7 flex flex-col sm:flex-row gap-3" style={d(200)}>
            <ButtonLink href="/shop" className="sm:px-8">
              Customize Your Blind
            </ButtonLink>
            <ButtonLink href="/how-to-measure" variant="outline" className="sm:px-8">
              How to Measure
            </ButtonLink>
          </div>

          <div className="animate-fade-up mt-9 pt-7 border-t border-sand" style={d(260)}>
            <Link href="#reviews" className="inline-flex items-center gap-2.5 text-sm text-muted hover:text-foreground transition-colors">
              <Stars value={RATING.score} className="w-4 h-4" />
              <span>
                <span className="font-semibold text-foreground">{RATING.score} out of 5</span> on {RATING.source}
              </span>
            </Link>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {HERO.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckDot /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="animate-fade-in" style={d(120)}>
          <RoomSlider className="w-full max-w-[600px] mx-auto lg:ml-auto lg:mr-0" />
        </div>
      </div>
    </section>
  );
}
