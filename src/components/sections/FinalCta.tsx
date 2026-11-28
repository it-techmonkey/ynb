import { ButtonLink, Icon, PriceTag, Reveal } from '../ui';
import BlackoutPhoto from './BlackoutPhoto';
import { FROM_PRICE } from '@/lib/pricing';

export default function FinalCta({ ctaHref = '/shop' }: { ctaHref?: string }) {
  return (
    <section className="bg-white pb-16 md:pb-24 pt-4">
      <div className="site-container">
        <Reveal variant="zoom" className="relative rounded-[32px] bg-ink overflow-hidden grid md:grid-cols-2 items-stretch">
          <div
            className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/40 blur-3xl animate-glow"
            aria-hidden="true"
          />
          <div className="relative p-8 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-center text-white">
            <h2 className="heading-display text-[40px] md:text-5xl lg:text-6xl">
              Your darkest, <em className="text-brass">deepest</em> sleep starts tonight.
            </h2>
            <p className="mt-5 text-white/65 text-lg leading-relaxed max-w-md">
              Made for your exact window, installed in minutes and backed by our Fit Guarantee.
            </p>
            <div className="mt-8">
              <PriceTag price={FROM_PRICE} from onDark />
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <ButtonLink href={ctaHref} variant="light" arrow>
                Customize Your Blind
              </ButtonLink>
              <ButtonLink href="/how-to-measure" variant="outlineLight">
                How to Measure
              </ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              {['Free fabric samples', '5-year warranty', 'Designed in Texas'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Icon name="check" className="w-4 h-4 text-brass" strokeWidth={2.4} /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[300px] md:min-h-[520px]">
            <BlackoutPhoto />
            <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
              <Icon name="moon" className="w-3.5 h-3.5 text-brass" /> 100% blackout
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
