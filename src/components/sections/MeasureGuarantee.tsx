import Link from 'next/link';
import { Icon } from '../ui';
import { FIT_GUARANTEE } from '@/data/content';

/** Live MeasureReassurance box. */
export function MeasureReassurance() {
  return (
    <div className="rounded-lg border border-[#00473c]/15 bg-[#00473c]/5 p-4">
      <div className="flex gap-3">
        <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-[#00473c]" />
        <div>
          <p className="text-sm font-semibold text-[#3a3a3a]">Not sure about your measurements?</p>
          <p className="mt-1 text-sm text-gray-600">{FIT_GUARANTEE.measureNote}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 pl-8">
        <Link href="/how-to-measure" className="rounded-full bg-[#00473c] px-4 py-2 text-xs font-semibold text-white hover:bg-[#003830]">
          HOW TO MEASURE
        </Link>
        <Link href="/how-to-measure#guarantee" className="rounded-full border border-[#00473c] px-4 py-2 text-xs font-semibold text-[#00473c] hover:bg-[#00473c]/5">
          FIT GUARANTEE
        </Link>
      </div>
    </div>
  );
}

/** Live Fit Guarantee section copy (src/data/fitGuarantee.ts). */
export default function MeasureGuarantee() {
  return (
    <section id="guarantee" className="bg-[#f8f9f8] py-16 md:py-24">
      <div className="site-container grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00473c]">{FIT_GUARANTEE.name}</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-black leading-tight">{FIT_GUARANTEE.headline}</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">{FIT_GUARANTEE.intro}</p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {FIT_GUARANTEE.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-[#3a3a3a]">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#00473c] text-white flex items-center justify-center shrink-0">
                  <Icon name="check" className="w-3 h-3" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-semibold text-[#00473c]">{FIT_GUARANTEE.reassurance}</p>
          <p className="mt-2 text-xs text-gray-400">{FIT_GUARANTEE.disclaimer}</p>
        </div>
        <ol className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          {FIT_GUARANTEE.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 p-5">
              <span className="w-8 h-8 shrink-0 rounded-full bg-[#00473c]/10 text-[#00473c] text-sm font-bold flex items-center justify-center">{i + 1}</span>
              <div>
                <p className="font-semibold text-[#1a1a1a]">{s.title}</p>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
