import Link from 'next/link';
import { Icon, IconTile, Reveal } from '../ui';
import { GUARANTEES } from '@/data/content';

/** Risk-reversal band: guarantee, warranty, samples, support. */
export default function Guarantees() {
  return (
    <section className="bg-ink text-white py-16 md:py-20">
      <div className="site-container">
        <Reveal className="text-center">
          <h2 className="heading-display text-4xl md:text-5xl">Buy with total confidence.</h2>
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[24px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map((g, i) => {
            const body = (
              <>
                <IconTile light>
                  <Icon name={g.icon} className="w-5 h-5" />
                </IconTile>
                <p className="mt-6 font-semibold flex items-center gap-1.5">
                  {g.title}
                  {g.href && <Icon name="arrow" className="w-3.5 h-3.5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-brass" />}
                </p>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{g.body}</p>
              </>
            );
            return (
              <Reveal as="li" key={g.title} delay={i * 90} className="bg-ink">
                {g.href ? (
                  <Link href={g.href} className="group block h-full p-7 md:p-8 transition-colors hover:bg-ink-2">
                    {body}
                  </Link>
                ) : (
                  <div className="h-full p-7 md:p-8">{body}</div>
                )}
              </Reveal>
            );
          })}
        </ul>
        <p className="mt-6 text-center text-xs text-white/40">*Fit Guarantee terms, eligibility and limitations apply.</p>
      </div>
    </section>
  );
}
