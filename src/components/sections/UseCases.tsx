import { ButtonLink, Reveal } from '../ui';
import { USE_CASES } from '@/data/content';

/** Product video + who it's for. */
export default function UseCases({ ctaHref = '/shop' }: { ctaHref?: string }) {
  return (
    <section className="bg-linen py-20 md:py-28">
      <div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
        <Reveal variant="fade">
          <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-lg overflow-hidden bg-ink">
            <video
              src="/img/eclipse/eclipseCore1.mp4"
              poster="/img/eclipse/eclipseCore4.webp"
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Video of the EclipseCore blind being closed"
            />
          </div>
        </Reveal>

        <Reveal className="max-w-lg">
          <h2 className="heading-display text-[28px] md:text-[34px] lg:text-[40px]">{USE_CASES.title}</h2>
          <p className="mt-5 text-base md:text-[17px] text-muted leading-relaxed">{USE_CASES.body}</p>
          <p className="mt-9 text-sm font-semibold">Popular for</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 border-t border-sand">
            {USE_CASES.items.map((u) => (
              <li key={u} className="py-3 border-b border-sand text-[15px] text-foreground/80">
                {u}
              </li>
            ))}
          </ul>
          <ButtonLink href={ctaHref} className="mt-9">
            Customize Your Blind
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
