import Image from 'next/image';
import { ButtonLink, Eyebrow, Reveal, Stars } from '../ui';
import { RATING, REVIEWS_INTRO, TESTIMONIALS } from '@/data/content';

export default function Reviews({ ctaHref = '/shop' }: { ctaHref?: string }) {
  return (
    <section id="reviews" className="bg-linen py-20 md:py-28">
      <div className="site-container grid gap-12 lg:grid-cols-[0.85fr_2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{REVIEWS_INTRO.eyebrow}</Eyebrow>
          <h2 className="heading-display mt-5 text-[40px] md:text-5xl">{REVIEWS_INTRO.title}</h2>
          <div className="mt-8 flex items-end gap-4">
            <span className="heading-display text-7xl leading-none">{RATING.score}</span>
            <div className="pb-1.5">
              <Stars value={RATING.score} className="w-5 h-5" />
              <p className="mt-1.5 text-sm text-muted">{RATING.label}</p>
            </div>
          </div>
          <Image src="/img/review.png" alt="Trustpilot" width={120} height={60} className="mt-6 w-28 h-auto object-contain" />
          <ButtonLink href={ctaHref} arrow className="mt-8">
            Join them
          </ButtonLink>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((r, i) => (
            <Reveal
              key={r.author}
              as="figure"
              delay={(i % 2) * 120}
              className="flex flex-col rounded-[24px] bg-white p-7 md:p-8 shadow-[0_1px_0_rgba(13,23,20,0.04)] ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_24px_48px_-28px_rgba(13,23,20,0.3)]"
            >
              <Stars className="w-4 h-4" />
              <h3 className="heading-display mt-5 text-[26px] leading-tight">“{r.headline}”</h3>
              <blockquote className="mt-4 text-[15px] text-muted leading-relaxed flex-1">{r.text}</blockquote>
              <figcaption className="mt-7 flex items-center gap-3 text-sm">
                <span className="w-9 h-9 rounded-full bg-primary-soft text-primary flex items-center justify-center font-semibold">{r.author.charAt(0)}</span>
                <span className="font-semibold">{r.author}</span>
              </figcaption>
            </Reveal>
          ))}
          <Reveal delay={120} variant="zoom" className="group relative min-h-[320px] rounded-[24px] overflow-hidden bg-ink">
            <Image
              src="/img/eclipse/eclipseCore4.webp"
              alt="A customer closing two EclipseCore blinds in their bedroom"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-0 p-7 heading-display text-2xl text-white">Real homes. Real blackout.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
