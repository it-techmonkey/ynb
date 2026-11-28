import Image from 'next/image';
import { ButtonLink, Reveal, SectionHeading } from '../ui';
import { EASY_FIT, HOW_IT_WORKS } from '@/data/content';

/** Six install steps — swipeable on mobile, a 3×2 grid on desktop. */
export default function Install({ id = 'how-it-works', ctaHref = '/shop' }: { id?: string; ctaHref?: string }) {
  return (
    <section id={id} className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading eyebrow={EASY_FIT.eyebrow} title={EASY_FIT.title} sub={EASY_FIT.body} className="max-w-2xl" />
          <Reveal delay={100} className="shrink-0">
            <ButtonLink href={ctaHref} arrow>
              Shop Now
            </ButtonLink>
          </Reveal>
        </div>

        <ol className="mt-14 -mx-5 px-5 md:mx-0 md:px-0 flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-5 md:gap-y-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide">
          {HOW_IT_WORKS.map((s, i) => (
            <Reveal as="li" key={s.image} delay={(i % 3) * 100} className="group shrink-0 w-[78%] sm:w-[46%] md:w-auto snap-start">
              <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-linen">
                <Image
                  src={s.image}
                  alt={`Step ${i + 1}: ${s.title}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 80vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute top-4 left-4 heading-display flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-xl text-primary shadow-md">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-1.5 text-[15px] text-muted leading-relaxed">{s.text}</p>
            </Reveal>
          ))}
        </ol>
        <p className="md:hidden mt-4 text-center text-xs text-muted">Swipe to see all 6 steps →</p>
      </div>
    </section>
  );
}
