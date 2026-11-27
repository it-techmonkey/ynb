import { ButtonLink, Icon, PriceTag } from '../ui';
import BlackoutPhoto from './BlackoutPhoto';
import { FROM_PRICE } from '@/lib/pricing';

export default function FinalCta() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="site-container">
        <div className="rounded-2xl bg-[#111] overflow-hidden grid md:grid-cols-2 items-stretch">
          <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Act now to reclaim your nights and wake up feeling your best.</h2>
            <div className="mt-6">
              <PriceTag price={FROM_PRICE} from onDark />
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <ButtonLink href="/shop" variant="light">
                Shop Now <Icon name="arrow" className="w-4 h-4" />
              </ButtonLink>
              <ButtonLink href="/how-to-measure" variant="outlineLight">
                How to Measure
              </ButtonLink>
            </div>
          </div>
          <div className="relative min-h-[280px] md:min-h-[420px]">
            <BlackoutPhoto width={1000} />
          </div>
        </div>
      </div>
    </section>
  );
}
