import Image from 'next/image';
import { Reveal, Stars } from '../ui';
import { RATING, REVIEWS_INTRO, TESTIMONIALS } from '@/data/content';

export default function Reviews() {
  return (
    <section id="reviews" className="bg-linen py-20 md:py-28">
      <div className="site-container">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="heading-display text-[28px] md:text-[34px] lg:text-[40px]">{REVIEWS_INTRO.title}</h2>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-semibold tracking-tight">{RATING.score}</span>
            <div>
              <Stars value={RATING.score} className="w-4.5 h-4.5" />
              <p className="mt-1 text-sm text-muted">{RATING.label}</p>
            </div>
            <Image src="/img/review.png" alt="Trustpilot" width={120} height={60} className="ml-2 w-24 h-auto object-contain" />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((r, i) => (
            <Reveal key={r.author} as="figure" delay={i * 90} className="flex flex-col rounded-lg bg-white p-7 md:p-8">
              <Stars className="w-4 h-4" />
              <blockquote className="mt-5 text-[15px] md:text-base leading-relaxed flex-1">“{r.text}”</blockquote>
              <figcaption className="mt-6 text-sm font-semibold">{r.author}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
