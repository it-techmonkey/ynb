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
  { title: 'EclipseCore drill-free measuring guide', file: '/guides/eclipsecore_honeycomb_drillfree_measuring_guide.pdf', meta: 'PDF, 2 pages' },
  { title: 'Honeycomb & cellular shades measuring guide', file: '/guides/honecomb-cellular-measuring-guide.pdf', meta: 'PDF' },
];

export default function MeasurePage() {
  return (
    <>
      <MeasureSteps full />

      <section className="bg-white pt-16 md:pt-20">
        <div className="site-container">
          <Reveal className="border-y border-line py-8 grid gap-6 lg:grid-cols-[1fr_1.4fr] items-center">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Printable measuring guides</h2>
              <p className="mt-1.5 text-[15px] text-muted">Keep a copy next to the window while you measure.</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {GUIDES.map((g) => (
                <li key={g.file}>
                  <a
                    href={g.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 rounded-md border border-line p-4 transition-colors hover:border-foreground/40"
                  >
                    <Icon name="download" className="w-5 h-5 shrink-0 text-primary" />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold leading-snug">{g.title}</span>
                      <span className="block text-xs text-muted mt-0.5">{g.meta}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
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
