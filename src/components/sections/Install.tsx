import Image from 'next/image';
import { ButtonLink, Icon } from '../ui';
import { EASY_FIT, HOW_IT_WORKS } from '@/data/content';

/** Live "How It Works" — Easy Fit intro, install video and the six steps. */
export default function Install({ id = 'how-it-works', ctaHref = '/shop' }: { id?: string; ctaHref?: string }) {
  return (
    <section id={id} className="bg-white py-16 md:py-24">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00473c]">How It Works</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-black leading-tight">{EASY_FIT.title}</h2>
            <p className="mt-4 text-gray-600 leading-relaxed max-w-lg">{EASY_FIT.body}</p>
            <div className="mt-8">
              <ButtonLink href={ctaHref}>
                Shop Now <Icon name="arrow" className="w-4 h-4" />
              </ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 shadow-lg">
            <Image src="/img/eclipse/eclipseCore2.webp" alt="Easy Fit blinds design details" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>

        <ol className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {HOW_IT_WORKS.map((s, i) => (
            <li key={s.image}>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <Image src={s.image} alt={`Installation step ${i + 1}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="mt-4 flex gap-3">
                <span className="w-7 h-7 shrink-0 rounded-full bg-[#00473c] text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] mb-1">Step {i + 1}</span>
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
