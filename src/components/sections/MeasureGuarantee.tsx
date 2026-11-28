import Link from 'next/link';
import { ButtonLink, CheckDot, Eyebrow, Icon, Reveal, SectionHeading } from '../ui';
import { FIT_GUARANTEE, MEASURE_INTRO, MEASURE_REQUIREMENTS, MEASURE_STEPS, MEASURE_TIPS } from '@/data/content';

export const MEASURE_GUIDE_PDF = '/guides/eclipsecore_honeycomb_drillfree_measuring_guide.pdf';

/** Compact reassurance box used inside the configurator. */
export function MeasureReassurance() {
  return (
    <div className="rounded-2xl bg-linen p-4 flex gap-3.5">
      <span className="w-9 h-9 shrink-0 rounded-full bg-white text-primary flex items-center justify-center">
        <Icon name="shield" className="w-4.5 h-4.5" />
      </span>
      <div className="text-sm">
        <p className="font-semibold">Not sure about your measurements?</p>
        <p className="mt-1 text-muted leading-relaxed">
          Measure the inside of your frame and use the smallest width and height. Made a mistake? Our{' '}
          <Link href="/how-to-measure#guarantee" className="font-medium text-primary underline underline-offset-2">
            Fit Guarantee
          </Link>{' '}
          has you covered.
        </p>
        <Link href="/how-to-measure" className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group">
          <span className="link-underline">Read the 3-step guide</span>
          <Icon name="arrow" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

/** Simple line diagrams for the three measuring steps. */
function MeasureDiagram({ kind }: { kind: 'width' | 'height' | 'depth' }) {
  const arrow = 'stroke-primary';
  if (kind === 'depth') {
    return (
      <svg viewBox="0 0 160 110" className="w-full h-full" aria-hidden="true" fill="none" strokeLinecap="round">
        <rect x="20" y="10" width="40" height="90" className="fill-sand" />
        <rect x="60" y="10" width="70" height="14" className="fill-sand" />
        <rect x="60" y="86" width="70" height="14" className="fill-sand" />
        <line x1="130" y1="24" x2="130" y2="86" className="stroke-sky-300" strokeWidth="4" />
        <path d="M66 55h58M66 55l6-5M66 55l6 5M124 55l-6-5M124 55l-6 5" className={arrow} strokeWidth="2" />
        <text x="95" y="47" textAnchor="middle" className="fill-primary text-[10px] font-semibold">1.5–2″</text>
        <text x="135" y="105" className="fill-muted text-[8px]">glass</text>
      </svg>
    );
  }
  const lines = [0.25, 0.5, 0.75];
  return (
    <svg viewBox="0 0 160 110" className="w-full h-full" aria-hidden="true" fill="none" strokeLinecap="round">
      <rect x="28" y="8" width="104" height="94" rx="3" className="stroke-foreground/25" strokeWidth="6" />
      <rect x="31" y="11" width="98" height="88" className="fill-sky-50" />
      {kind === 'width'
        ? lines.map((f) => {
            const y = 11 + 88 * f;
            return <path key={f} d={`M37 ${y}h86M37 ${y}l5-4M37 ${y}l5 4M123 ${y}l-5-4M123 ${y}l-5 4`} className={arrow} strokeWidth="2" />;
          })
        : lines.map((f) => {
            const x = 31 + 98 * f;
            return <path key={f} d={`M${x} 17v76M${x} 17l-4 5M${x} 17l4 5M${x} 93l-4-5M${x} 93l4-5`} className={arrow} strokeWidth="2" />;
          })}
    </svg>
  );
}

const KINDS = ['width', 'height', 'depth'] as const;

/** "Measure once. Fit perfectly." — 3 steps, requirements and the guarantee. */
export function MeasureSteps({ full = false }: { full?: boolean }) {
  return (
    <section id="measure" className="bg-linen py-20 md:py-28">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading eyebrow={MEASURE_INTRO.eyebrow} title={MEASURE_INTRO.title} sub={MEASURE_INTRO.body} as={full ? 'h1' : 'h2'} />
          <Reveal delay={100} className="shrink-0">
            <a href={MEASURE_GUIDE_PDF} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white px-6 py-3 text-sm font-semibold hover:border-foreground/40 transition-colors">
              <Icon name="download" className="w-4 h-4 text-primary transition-transform group-hover:translate-y-0.5" />
              Download the PDF guide
            </a>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {MEASURE_STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 110} className="rounded-[24px] bg-white p-7 ring-1 ring-line">
              <div className="aspect-[16/11] rounded-2xl bg-linen/60 p-4">
                <MeasureDiagram kind={KINDS[i]} />
              </div>
              <p className="mt-6 flex items-baseline gap-3">
                <span className="heading-display text-3xl text-primary">0{i + 1}</span>
                <span className="text-lg font-semibold tracking-tight">{s.title}</span>
              </p>
              <p className="mt-2 text-[15px] text-muted leading-relaxed">{s.body}</p>
            </Reveal>
          ))}
        </ol>

        <div className={`mt-5 grid gap-5 ${full ? 'lg:grid-cols-2' : 'lg:grid-cols-[1fr_1.2fr]'}`}>
          <Reveal className="rounded-[24px] bg-white p-7 md:p-9 ring-1 ring-line">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">Before you measure</p>
            <ul className="mt-5 space-y-3">
              {MEASURE_REQUIREMENTS.map((r) => (
                <li key={r} className="flex gap-3 text-[15px]">
                  <CheckDot /> {r}
                </li>
              ))}
            </ul>
          </Reveal>

          {full ? (
            <Reveal delay={100} className="rounded-[24px] bg-white p-7 md:p-9 ring-1 ring-line">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">Pro tips</p>
              <ul className="mt-5 space-y-3">
                {MEASURE_TIPS.map((r) => (
                  <li key={r} className="flex gap-3 text-[15px]">
                    <Icon name="info" className="w-5 h-5 shrink-0 text-brass mt-0.5" /> {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : (
            <Reveal delay={100} className="relative overflow-hidden rounded-[24px] bg-primary p-7 md:p-9 text-white">
              <Icon name="shield" className="absolute -right-8 -bottom-8 w-48 h-48 text-white/[0.06]" strokeWidth={1} />
              <Eyebrow light>{FIT_GUARANTEE.name}</Eyebrow>
              <p className="heading-display mt-4 text-4xl">{FIT_GUARANTEE.headline}</p>
              <p className="mt-4 text-white/75 leading-relaxed max-w-lg">{FIT_GUARANTEE.intro}</p>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <ButtonLink href="/shop" variant="light" arrow>
                  Start Measuring
                </ButtonLink>
                <Link href="/how-to-measure#guarantee" className="text-sm font-semibold text-white/85 link-underline">
                  How the guarantee works
                </Link>
              </div>
              <p className="mt-6 text-xs text-white/45">{FIT_GUARANTEE.disclaimer}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/** Full Fit Guarantee explainer with the five claim steps. */
export default function FitGuarantee() {
  return (
    <section id="guarantee" className="bg-white py-20 md:py-28">
      <div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
        <Reveal className="lg:sticky lg:top-28">
          <span className="inline-flex w-14 h-14 rounded-full bg-primary text-white items-center justify-center">
            <Icon name="shield" className="w-7 h-7" />
          </span>
          <Eyebrow className="mt-7 flex">{FIT_GUARANTEE.name}</Eyebrow>
          <h2 className="heading-display mt-4 text-[40px] md:text-5xl lg:text-[56px]">{FIT_GUARANTEE.headline}</h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">{FIT_GUARANTEE.intro}</p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-3">
            {FIT_GUARANTEE.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[15px]">
                <CheckDot /> {b}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-semibold text-primary">{FIT_GUARANTEE.reassurance}</p>
          <p className="mt-2 text-xs text-muted">{FIT_GUARANTEE.disclaimer}</p>
        </Reveal>

        <ol className="relative">
          <span className="absolute left-[23px] top-6 bottom-6 w-px bg-line" aria-hidden="true" />
          {FIT_GUARANTEE.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className="relative flex gap-6 pb-10 last:pb-0">
              <span className="relative z-10 heading-display w-12 h-12 shrink-0 rounded-full bg-white ring-1 ring-line text-primary text-xl flex items-center justify-center">
                {i + 1}
              </span>
              <div className="pt-2.5">
                <p className="text-lg font-semibold tracking-tight">{s.title}</p>
                <p className="mt-1.5 text-[15px] text-muted leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
