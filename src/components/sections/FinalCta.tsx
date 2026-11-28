import Image from 'next/image';
import { ButtonLink, CheckDot, PriceTag, Reveal } from '../ui';
import { FROM_PRICE } from '@/lib/pricing';

const POINTS = ['Made to your exact window size', 'Fits in minutes, no drilling', 'Fit Guarantee and 5-year warranty'];

/** Closing call to action: copy on the left, a real room photo on the right. */
export default function FinalCta({ ctaHref = '/shop' }: { ctaHref?: string }) {
  return (
    <section className="bg-linen py-20 md:py-28">
      <div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
        <Reveal className="max-w-lg">
          <h2 className="heading-display text-[28px] md:text-[34px] lg:text-[40px]">Sleep in total darkness, starting tonight</h2>
          <p className="mt-5 text-muted text-base md:text-[17px] leading-relaxed">
            Close the gaps where light gets in. EclipseCore is made for your window, fits without tools and keeps the room dark from edge to edge.
          </p>
          <ul className="mt-7 space-y-2.5">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-[15px]">
                <CheckDot /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-7 border-t border-sand">
            <PriceTag price={FROM_PRICE} from />
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <ButtonLink href={ctaHref}>Customize Your Blind</ButtonLink>
            <ButtonLink href="/how-to-measure" variant="outline">
              How to Measure
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal variant="fade" delay={100}>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-ink">
            <Image
              src="/img/eclipse/eclipseCore4.webp"
              alt="Two EclipseCore blackout blinds being closed in a bedroom"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
