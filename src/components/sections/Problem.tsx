import Image from 'next/image';
import { Eyebrow, Icon, Reveal } from '../ui';
import { PROBLEM } from '@/data/content';

/** The problem: ordinary coverings leak light. Ends on the before/after pair. */
export default function Problem() {
  const { before, after } = PROBLEM;
  return (
    <section className="relative bg-ink text-white py-20 md:py-28 overflow-hidden">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20 items-center">
          <div>
            <Reveal>
              <Eyebrow light>{PROBLEM.eyebrow}</Eyebrow>
              <h2 className="heading-display mt-5 text-[40px] md:text-5xl lg:text-[58px]">{PROBLEM.title}</h2>
              <p className="mt-6 text-lg text-white/65 leading-relaxed max-w-lg">{PROBLEM.body}</p>
            </Reveal>
            <Reveal delay={120} className="mt-10 flex items-center gap-5 border-t border-white/10 pt-8">
              <span className="heading-display text-6xl md:text-7xl text-brass">{PROBLEM.stat.value}</span>
              <span className="text-sm md:text-base text-white/70 max-w-[220px] leading-snug">{PROBLEM.stat.label}</span>
            </Reveal>
          </div>

          <Reveal variant="zoom" className="relative aspect-[3/2] rounded-[28px] overflow-hidden ring-1 ring-white/10">
            <Image src="/img/eclipse/eclipseCore3.webp" alt="A man lying awake at night as streetlight shines through his blinds" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-ink/50 to-transparent" />
          </Reveal>
        </div>

        {/* Before / after */}
        <div className="mt-20 md:mt-28 grid gap-5 md:grid-cols-2">
          {[before, after].map((v, i) => (
            <Reveal key={v.label} delay={i * 120} as="figure" className="group relative aspect-[4/3] md:aspect-[5/4] rounded-[28px] overflow-hidden ring-1 ring-white/10">
              <Image src={v.image} alt={`${v.label}: ${v.caption}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]" />
              {i === 1 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="moon" className="w-14 h-14 text-white/10" />
                </div>
              )}
              <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-linear-to-t from-black/80 via-black/40 to-transparent">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    i === 0 ? 'bg-white/15 text-white' : 'bg-primary text-white'
                  }`}
                >
                  <Icon name={i === 0 ? 'x-circle' : 'check'} className="w-3.5 h-3.5" strokeWidth={2} />
                  {v.label}
                </span>
                <p className="mt-3 text-lg md:text-xl text-white/90 max-w-sm leading-snug">{v.caption}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
