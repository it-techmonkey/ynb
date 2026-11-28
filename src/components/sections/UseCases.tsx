import { ButtonLink, Eyebrow, Icon, Reveal } from '../ui';
import { USE_CASES } from '@/data/content';

/** "Sleep on your schedule" — product video + who it's for. */
export default function UseCases({ ctaHref = '/shop' }: { ctaHref?: string }) {
  return (
    <section className="bg-linen py-20 md:py-28 overflow-hidden">
      <div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
        <Reveal variant="zoom" className="relative">
          <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-[28px] overflow-hidden bg-ink shadow-[0_40px_80px_-40px_rgba(13,23,20,0.5)]">
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
          <div className="absolute -bottom-5 right-5 md:right-8 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-line">
            <span className="w-9 h-9 rounded-full bg-ink text-brass flex items-center justify-center">
              <Icon name="moon" className="w-4.5 h-4.5" />
            </span>
            <span className="text-xs leading-tight">
              <span className="block font-semibold">Dark in seconds</span>
              <span className="text-muted">Day or night</span>
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>{USE_CASES.eyebrow}</Eyebrow>
            <h2 className="heading-display mt-5 text-[40px] md:text-5xl lg:text-[56px]">{USE_CASES.title}</h2>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-lg">{USE_CASES.body}</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">Perfect for</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {USE_CASES.items.map((u) => (
                <li
                  key={u}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-foreground/80 ring-1 ring-line transition-colors hover:ring-primary/40 hover:text-primary"
                >
                  {u}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={200} className="mt-10">
            <ButtonLink href={ctaHref} arrow>
              Customize Your Blind
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
