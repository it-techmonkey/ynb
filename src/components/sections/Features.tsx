import Image from 'next/image';
import Link from 'next/link';
import { Icon, Reveal, SectionHeading } from '../ui';
import { FEATURES, FEATURES_INTRO } from '@/data/content';

const PHOTOS = [
  {
    src: '/img/eclipse/eclipseCore2.webp',
    alt: 'Hands clicking the EclipseCore frame together',
    title: 'A frame that seals the edges',
    body: 'The perimeter frame and seal foam close the gaps where ordinary blinds leak light.',
    className: 'object-cover',
  },
  {
    src: '/img/eclipse/gallery/fabric-detail.webp',
    alt: 'Close-up of the honeycomb fabric',
    title: 'Honeycomb fabric',
    body: 'Air-trapping cells insulate the window, soften outside noise and block light.',
    className: 'object-cover origin-left scale-[1.18]',
  },
];

export default function Features({ ctaHref = '/shop' }: { ctaHref?: string }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading title={FEATURES_INTRO.title} sub={FEATURES_INTRO.body} />
          <Reveal className="shrink-0">
            <Link href={ctaHref} className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:text-primary-dark">
              <span className="underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Shop EclipseCore</span>
              <Icon name="arrow" className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 md:gap-6 md:grid-cols-2">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.src} as="figure" delay={i * 100}>
              <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-linen">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className={p.className} />
              </div>
              <figcaption className="mt-4">
                <p className="font-semibold">{p.title}</p>
                <p className="mt-1 text-[15px] text-muted">{p.body}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <ul className="mt-12 md:mt-16 grid grid-cols-2 gap-x-5 md:gap-x-10 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal as="li" key={f.title} delay={(i % 3) * 80} className="border-t border-line py-5 md:py-7">
              <Icon name={f.icon} className="w-6 h-6 text-primary" />
              <h3 className="mt-3 md:mt-4 text-[15px] md:text-base font-semibold leading-snug">{f.title}</h3>
              <p className="mt-1.5 text-[13px] md:text-[15px] leading-relaxed text-muted">{f.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
