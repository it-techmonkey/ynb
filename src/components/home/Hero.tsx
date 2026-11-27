import Image from 'next/image';
import { ButtonLink, Icon, PriceTag } from '../ui';
import BlackoutPhoto from '../sections/BlackoutPhoto';
import { PRODUCT, cdn } from '@/data/product';
import { SOLUTION } from '@/data/content';
import { FROM_PRICE } from '@/lib/pricing';

const BULLETS = [
  '100% blackout performance — blocks outside light completely when closed',
  'Drill-free installation — no tools, screws, or professional help required',
  'Custom made to your exact window measurements for a perfect fit',
];

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="site-container py-10 md:py-16 grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
        <div>
          <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-[#00473c]">{PRODUCT.shortTitle}</p>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.08] text-black">{SOLUTION.title}</h1>
          <p className="mt-5 text-lg text-gray-700 font-medium">{SOLUTION.lead}</p>
          <p className="mt-2 text-gray-600 leading-relaxed max-w-xl">{SOLUTION.body}</p>

          <ul className="mt-6 space-y-2.5">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-[#3a3a3a]">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#00473c] text-white flex items-center justify-center shrink-0">
                  <Icon name="check" className="w-3 h-3" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <PriceTag price={FROM_PRICE} from />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <ButtonLink href="/shop" className="sm:min-w-[200px]">
              Shop Now <Icon name="arrow" className="w-4 h-4" />
            </ButtonLink>
            <ButtonLink href="/how-to-measure" variant="outline">
              <Icon name="ruler" className="w-4 h-4" /> How to Measure
            </ButtonLink>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
            <Image src="/img/review.png" alt="Trustpilot reviews" width={96} height={48} className="w-24 h-auto object-contain" />
            <div className="text-sm leading-tight">
              <p className="font-semibold text-gray-900">4.5/5 Stars</p>
              <p className="text-gray-500">Rated Excellent on Trustpilot</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            <BlackoutPhoto />
            <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-md bg-[#00473c] px-3 py-1.5 text-xs font-semibold text-white shadow">
              <Icon name="moon" className="w-3.5 h-3.5" /> After — 100% Blackout
            </span>
          </div>
          <div className="absolute -bottom-6 -left-3 md:-left-8 w-36 md:w-44 rounded-xl bg-white p-1.5 shadow-xl border border-gray-100">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cdn('lifestyle1.png', 400)} alt="The same bedroom with the window uncovered" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <p className="px-1 pt-1.5 pb-0.5 text-xs font-semibold text-[#1a1a1a] flex items-center gap-1">
              <Icon name="sun" className="w-3.5 h-3.5 text-amber-500" /> Before
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
