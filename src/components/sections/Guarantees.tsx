import Link from 'next/link';
import { Icon, Reveal } from '../ui';
import { GUARANTEES } from '@/data/content';

/** Risk-reversal row: guarantee, warranty, samples, support. */
export default function Guarantees() {
  return (
    <section className="bg-white border-y border-line py-16 md:py-20">
      <div className="site-container">
        <Reveal>
          <h2 className="heading-display text-2xl md:text-[28px]">Shop with confidence</h2>
        </Reveal>
        <ul className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map((g, i) => (
            <Reveal as="li" key={g.title} delay={i * 80}>
              <Icon name={g.icon} className="w-6 h-6 text-primary" />
              <p className="mt-4 font-semibold">{g.title}</p>
              <p className="mt-1.5 text-[15px] text-muted leading-relaxed">{g.body}</p>
              {g.href && (
                <Link href={g.href} className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary">
                  Learn more
                </Link>
              )}
            </Reveal>
          ))}
        </ul>
        <p className="mt-10 text-xs text-muted">*Fit Guarantee terms, eligibility and limitations apply.</p>
      </div>
    </section>
  );
}
