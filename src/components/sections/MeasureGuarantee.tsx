import Image from 'next/image';
import Link from 'next/link';
import { ButtonLink, CheckDot, Icon, Reveal, SectionHeading } from '../ui';
import { FIT_GUARANTEE, MEASURE_INTRO, MEASURE_REQUIREMENTS, MEASURE_STEPS, MEASURE_TIPS } from '@/data/content';

export const MEASURE_GUIDE_PDF = '/guides/eclipsecore_honeycomb_drillfree_measuring_guide.pdf';

/*
 * Real window photos with dimension lines drawn on top. Coordinates are in a
 * 500×400 box that matches the 5:4 crop of /img/measure/window.webp, where
 * the inside of the window frame runs from x 78–422 and y 28–370.
 */
const OPENING = { left: 78, right: 422, top: 28, bottom: 370 };

function DimLine({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label: string }) {
  const vertical = x1 === x2;
  const cap = 9;
  const caps = vertical
    ? `M${x1 - cap} ${y1}h${cap * 2}M${x2 - cap} ${y2}h${cap * 2}`
    : `M${x1} ${y1 - cap}v${cap * 2}M${x2} ${y2 - cap}v${cap * 2}`;
  const d = `M${x1} ${y1}L${x2} ${y2}${caps}`;
  const lx = vertical ? x1 : (x1 + x2) / 2;
  const ly = vertical ? (y1 + y2) / 2 : y1 - 9;
  return (
    <g>
      <path d={d} stroke="white" strokeWidth="7" strokeLinecap="round" opacity="0.9" />
      <path d={d} className="stroke-primary" strokeWidth="3" strokeLinecap="round" />
      <text
        x={lx}
        y={ly}
        textAnchor="middle"
        dominantBaseline={vertical ? 'middle' : 'auto'}
        transform={vertical ? `rotate(-90 ${lx} ${ly})` : undefined}
        dy={vertical ? -12 : 0}
        className="fill-primary text-[15px] font-semibold"
        stroke="white"
        strokeWidth="4"
        paintOrder="stroke"
      >
        {label}
      </text>
    </g>
  );
}

function MeasurePhoto({ kind }: { kind: 'width' | 'height' | 'depth' }) {
  if (kind === 'depth') {
    return (
      <div className="relative aspect-5/4 rounded-md overflow-hidden bg-linen">
        <Image src="/img/measure/depth.webp" alt="A blind frame sitting inside a window recess" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
        <span className="absolute left-3 bottom-3 rounded bg-white/95 px-2.5 py-1 text-xs font-semibold text-primary shadow-sm">Min. depth 1.5–2 in</span>
      </div>
    );
  }
  const o = OPENING;
  const lines =
    kind === 'width'
      ? [
          { y: 70, label: 'Top' },
          { y: 200, label: 'Middle' },
          { y: 330, label: 'Bottom' },
        ].map((l) => <DimLine key={l.label} x1={o.left} y1={l.y} x2={o.right} y2={l.y} label={l.label} />)
      : [
          { x: 140, label: 'Left' },
          { x: 250, label: 'Center' },
          { x: 360, label: 'Right' },
        ].map((l) => <DimLine key={l.label} x1={l.x} y1={o.top} x2={l.x} y2={o.bottom} label={l.label} />);
  return (
    <div className="relative aspect-5/4 rounded-md overflow-hidden bg-linen">
      <Image
        src="/img/measure/window.webp"
        alt={kind === 'width' ? 'Window showing where to measure the inside width' : 'Window showing where to measure the inside height'}
        fill
        sizes="(min-width: 768px) 30vw, 100vw"
        className="object-cover"
      />
      <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        {lines}
      </svg>
    </div>
  );
}

const KINDS = ['width', 'height', 'depth'] as const;

/** Three measuring steps, requirements and the guarantee. */
export function MeasureSteps({ full = false }: { full?: boolean }) {
  return (
    <section id="measure" className="bg-linen py-20 md:py-28">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading title={MEASURE_INTRO.title} sub={MEASURE_INTRO.body} as={full ? 'h1' : 'h2'} />
          <Reveal className="shrink-0">
            <a href={MEASURE_GUIDE_PDF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-white px-6 py-3.5 text-[15px] font-semibold hover:border-foreground/50 transition-colors">
              <Icon name="download" className="w-4 h-4 text-primary" />
              Download PDF guide
            </a>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {MEASURE_STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className="rounded-2xl bg-white p-6 md:p-7">
              <MeasurePhoto kind={KINDS[i]} />
              <p className="mt-6 text-sm font-medium text-muted">Step {i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[15px] text-muted leading-relaxed">{s.body}</p>
            </Reveal>
          ))}
        </ol>

        <div className={`mt-5 grid gap-5 ${full ? 'lg:grid-cols-2' : ''}`}>
          {full && (
            <Reveal className="rounded-lg bg-white p-7 md:p-9">
              <h3 className="font-semibold">Before you measure</h3>
              <ul className="mt-5 space-y-3">
                {MEASURE_REQUIREMENTS.map((r) => (
                  <li key={r} className="flex gap-3 text-[15px]">
                    <CheckDot /> {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {full ? (
            <Reveal delay={80} className="rounded-lg bg-white p-7 md:p-9">
              <h3 className="font-semibold">Measuring tips</h3>
              <ul className="mt-5 space-y-3">
                {MEASURE_TIPS.map((r) => (
                  <li key={r} className="flex gap-3 text-[15px]">
                    <Icon name="info" className="w-5 h-5 shrink-0 text-primary mt-0.5" /> {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : (
            <Reveal delay={80} className="rounded-2xl bg-primary p-7 md:p-10 text-white md:flex md:items-center md:justify-between md:gap-10">
              <div>
                <p className="text-sm font-medium text-white/70">{FIT_GUARANTEE.name}</p>
                <h3 className="heading-display mt-2 text-2xl md:text-[30px]">{FIT_GUARANTEE.headline}</h3>
                <p className="mt-3 text-white/75 max-w-lg">Made a genuine measuring mistake? We remake your blind to the corrected size.*</p>
              </div>
              <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-5 shrink-0">
                <ButtonLink href="/how-to-measure" variant="light">
                  Measuring guide
                </ButtonLink>
                <Link href="/how-to-measure#guarantee" className="text-sm font-semibold text-white underline underline-offset-4 decoration-white/40 hover:decoration-white">
                  How it works
                </Link>
              </div>
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
          <p className="text-sm font-medium text-muted">{FIT_GUARANTEE.name}</p>
          <h2 className="heading-display mt-3 text-[28px] md:text-[34px] lg:text-[40px]">{FIT_GUARANTEE.headline}</h2>
          <p className="mt-5 text-base md:text-[17px] text-muted leading-relaxed">{FIT_GUARANTEE.intro}</p>
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
          <span className="absolute left-[17px] top-5 bottom-5 w-px bg-line" aria-hidden="true" />
          {FIT_GUARANTEE.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="relative flex gap-5 pb-9 last:pb-0">
              <span className="relative z-10 w-9 h-9 shrink-0 rounded-full bg-white ring-1 ring-foreground/20 text-sm font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <div className="pt-1.5">
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
