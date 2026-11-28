import Image from 'next/image';
import { Reveal } from '../ui';
import { PROBLEM } from '@/data/content';

/** The problem: ordinary coverings leak light. */
export default function Problem() {
  return (
    <section className="bg-ink text-white py-20 md:py-28">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <Reveal className="max-w-lg">
            <h2 className="heading-display text-[28px] md:text-[34px] lg:text-[40px]">{PROBLEM.title}</h2>
            <p className="mt-5 text-base md:text-[17px] text-white/65 leading-relaxed">{PROBLEM.body}</p>
            <ul className="mt-8 border-t border-white/10">
              {PROBLEM.points.map((p) => (
                <li key={p.title} className="border-b border-white/10 py-4">
                  <p className="font-semibold">{p.title}</p>
                  <p className="mt-1 text-[15px] text-white/60">{p.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="fade" className="relative aspect-[3/2] rounded-lg overflow-hidden">
            <Image
              src="/img/eclipse/eclipseCore3.webp"
              alt="A man lying awake at night as streetlight shines through his blinds"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
