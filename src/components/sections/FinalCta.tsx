import Image from 'next/image';
import { ButtonLink, Reveal } from '../ui';

/** Closing call to action: short copy on the left, a real room photo on the right. No price. */
export default function FinalCta({ ctaHref = '/shop' }: { ctaHref?: string }) {
  return (
    <section className="bg-linen py-20 md:py-28">
      <div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
        <Reveal className="max-w-lg">
          <h2 className="heading-display text-[30px] md:text-[38px] lg:text-[44px]">Ready for darker, deeper sleep?</h2>
          <p className="mt-5 text-muted text-lg leading-relaxed">Made for your window. Fitted in minutes.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <ButtonLink href={ctaHref} className="sm:px-9">
              Shop now
            </ButtonLink>
            <ButtonLink href="/how-to-measure" variant="outline" className="sm:px-9">
              How to measure
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal variant="fade" delay={100}>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-ink">
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
