import type { Metadata } from 'next';
import Install from '@/components/sections/Install';
import FitGuarantee, { MeasureSteps } from '@/components/sections/MeasureGuarantee';
import FinalCta from '@/components/sections/FinalCta';
import { Icon, Reveal } from '@/components/ui';

export const metadata: Metadata = {
  title: 'How to Measure & Install | Your Next Blinds',
  description: 'Measure your window for EclipseCore drill-free blackout blinds in three simple steps, then install in minutes. Backed by our Fit Guarantee.',
};

const GUIDES = [
  { title: 'EclipseCore drill-free measuring guide', file: '/guides/eclipsecore_honeycomb_drillfree_measuring_guide.pdf', pages: '2 pages' },
  { title: 'Honeycomb & cellular shades measuring guide', file: '/guides/honecomb-cellular-measuring-guide.pdf', pages: 'PDF' },
];

export default function MeasurePage() {
  return (
    <>
      <MeasureSteps full />

      <section className="bg-white pt-16 md:pt-20">
        <div className="site-container">
          <Reveal className="rounded-[28px] bg-ink text-white p-7 md:p-10 grid gap-8 lg:grid-cols-[1fr_1.4fr] items-center">
            <div>
              <p className="heading-display text-3xl md:text-4xl">Prefer it on paper?</p>
              <p className="mt-3 text-white/60">Download a printable guide to keep next to the window while you measure.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {GUIDES.map((g) => (
                <a
                  key={g.file}
                  href={g.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 transition-colors hover:bg-white/10"
                >
                  <span className="w-11 h-11 shrink-0 rounded-xl bg-brass/15 text-brass flex items-center justify-center">
                    <Icon name="download" className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold leading-snug">{g.title}</span>
                    <span className="block text-xs text-white/50 mt-0.5">{g.pages}</span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Install id="install" />
      <div className="border-t border-line">
        <FitGuarantee />
      </div>
      <FinalCta />
    </>
  );
}
