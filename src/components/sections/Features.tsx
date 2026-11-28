import Image from 'next/image';
import { ButtonLink, Icon, IconTile, Reveal, SectionHeading } from '../ui';
import { FEATURES, FEATURES_INTRO } from '@/data/content';

/** Bento grid: two photo tiles plus the six product features. */
export default function Features({ ctaHref = '/shop' }: { ctaHref?: string }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading eyebrow={FEATURES_INTRO.eyebrow} title={FEATURES_INTRO.title} sub={FEATURES_INTRO.body} />
          <Reveal delay={100} className="shrink-0">
            <ButtonLink href={ctaHref} variant="outline" arrow>
              Shop EclipseCore
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto]">
          <Reveal variant="zoom" className="group relative min-h-[360px] md:min-h-[420px] md:col-span-2 lg:row-span-2 rounded-[28px] overflow-hidden bg-linen">
            <Image
              src="/img/eclipse/eclipseCore2.webp"
              alt="Hands clicking the EclipseCore frame together"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 p-7 md:p-9 text-white">
              <p className="heading-display text-3xl md:text-4xl">A frame that seals the edges.</p>
              <p className="mt-2 text-white/75 max-w-sm">The perimeter frame and seal foam close the gaps where ordinary blinds leak light.</p>
            </div>
          </Reveal>

          {FEATURES.map((f, i) => (
            <Reveal
              key={f.title}
              delay={(i % 2) * 90 + Math.floor(i / 2) * 60}
              className={`group rounded-[24px] border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_24px_48px_-28px_rgba(13,23,20,0.35)] ${
                i >= 4 ? 'lg:hidden' : ''
              }`}
            >
              <FeatureBody icon={f.icon} title={f.title} body={f.body} />
            </Reveal>
          ))}
        </div>

        {/* Last two features sit in a wider row on desktop */}
        <div className="hidden lg:grid mt-5 grid-cols-4 gap-5">
          {FEATURES.slice(4).map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 90}
              className="group rounded-[24px] border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_24px_48px_-28px_rgba(13,23,20,0.35)]"
            >
              <FeatureBody icon={f.icon} title={f.title} body={f.body} />
            </Reveal>
          ))}
          <Reveal delay={180} variant="zoom" className="group relative col-span-2 rounded-[24px] overflow-hidden bg-ink">
            <Image
              src="/img/eclipse/gallery/fabric-detail.webp"
              alt="Close-up of the honeycomb fabric"
              fill
              sizes="50vw"
              className="object-cover opacity-80 origin-left scale-[1.18] transition-transform duration-[1.4s] ease-out group-hover:scale-[1.22]"
            />
            <div className="relative h-full flex flex-col justify-end p-7 text-white bg-linear-to-r from-ink/85 via-ink/40 to-transparent">
              <p className="heading-display text-3xl">Honeycomb by design.</p>
              <p className="mt-1.5 text-sm text-white/70 max-w-xs">Air-trapping cells insulate, soften sound and block light — all in one fabric.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeatureBody({ icon, title, body }: { icon: (typeof FEATURES)[number]['icon']; title: string; body: string }) {
  return (
    <>
      <span className="inline-flex transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
        <IconTile>
          <Icon name={icon} className="w-5 h-5" />
        </IconTile>
      </span>
      <h3 className="mt-6 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
    </>
  );
}
