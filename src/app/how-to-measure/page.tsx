import type { Metadata } from 'next';
import Install from '@/components/sections/Install';
import MeasureGuarantee, { MeasureReassurance } from '@/components/sections/MeasureGuarantee';
import { ButtonLink, Icon } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Measure & Fit Guides | Your Next Blinds',
};

const GUIDES = [
  { title: 'EclipseCore – Drill-Free Measuring Guide', file: '/guides/eclipsecore_honeycomb_drillfree_measuring_guide.pdf', type: 'Measuring' },
  { title: 'Honeycomb & Cellular Shades – Measuring Guide', file: '/guides/honecomb-cellular-measuring-guide.pdf', type: 'Measuring' },
];

export default function MeasurePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#00473c] via-[#00594a] to-[#003a31] px-4 md:px-6 lg:px-20 py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Measure &amp; Fit Guides</h1>
          <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
            Download our free step-by-step guides to measure and install your blinds perfectly every time.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="site-container grid gap-8 lg:grid-cols-[1.2fr_1fr] items-start">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">EclipseCore Honeycomb Blinds</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {GUIDES.map((g) => (
                <a
                  key={g.file}
                  href={g.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#00473c]/30 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-lg bg-red-50 text-red-600 text-[11px] font-bold flex items-center justify-center shrink-0">PDF</span>
                    <div>
                      <span className="inline-block rounded-full bg-[#00473c]/10 px-2 py-0.5 text-[11px] font-semibold text-[#00473c]">{g.type}</span>
                      <p className="mt-1.5 text-sm font-semibold text-[#1a1a1a] leading-snug">{g.title}</p>
                    </div>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00473c]">
                    Download <Icon name="arrow" className="w-4 h-4 rotate-90" />
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="lg:pt-12 space-y-4">
            <MeasureReassurance />
            <ButtonLink href="/shop" className="w-full">Customize Your Blinds</ButtonLink>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100">
        <Install id="install" />
      </div>
      <MeasureGuarantee />
    </>
  );
}
