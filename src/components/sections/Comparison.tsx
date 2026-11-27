import { ButtonLink, Icon } from '../ui';
import { COMPARISON } from '@/data/content';

/** Live "Your Next Blinds vs Blinds" comparison table. */
export default function Comparison({ ctaHref = '/shop' }: { ctaHref?: string }) {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="site-container flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="flex w-full max-w-[600px] text-xs md:text-base font-medium text-center">
            <div className="flex-[1.5] flex flex-col pt-[72px] border border-gray-200 border-r-0 rounded-l-2xl overflow-hidden bg-white">
              {COMPARISON.rows.map((r) => (
                <div key={r} className="h-14 flex items-center justify-start px-4 md:px-6 text-left border-b border-gray-100 last:border-0 text-gray-800 leading-tight">
                  {r}
                </div>
              ))}
            </div>
            <div className="w-[110px] sm:w-[130px] md:w-[200px] bg-[#00473c] text-white rounded-2xl shadow-2xl z-10 relative -my-4 pb-4 flex flex-col items-center">
              <div className="h-[88px] flex items-center justify-center w-full border-b border-white/10 px-2">
                <span className="font-bold text-sm md:text-lg leading-tight">Your Next Blinds</span>
              </div>
              {COMPARISON.rows.map((r) => (
                <div key={r} className="h-14 w-full flex items-center justify-center border-b border-white/10 last:border-0">
                  <span className="w-6 h-6 bg-white text-[#00473c] rounded-full flex items-center justify-center">
                    <Icon name="check" className="w-4 h-4" strokeWidth={3} />
                  </span>
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col bg-white border border-gray-200 border-l-0 rounded-r-2xl overflow-hidden">
              <div className="h-[72px] flex items-center justify-center">
                <span className="text-gray-900 font-bold text-lg">Blinds</span>
              </div>
              {COMPARISON.rows.map((r) => (
                <div key={r} className="h-14 flex items-center justify-center border-b border-gray-100 last:border-0">
                  <span className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center">
                    <Icon name="close" className="w-3 h-3" strokeWidth={3} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">{COMPARISON.title}</h2>
          <p className="text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">{COMPARISON.body}</p>
          <ButtonLink href={ctaHref}>Customize Your Blinds</ButtonLink>
        </div>
      </div>
    </section>
  );
}
