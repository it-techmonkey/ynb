import type { Metadata } from 'next';
import Link from 'next/link';
import Configurator from '@/components/shop/Configurator';
import ProductDetails from '@/components/shop/ProductDetails';
import Install from '@/components/sections/Install';
import Comparison from '@/components/sections/Comparison';
import { KeyFeatureCards, SleepStat, Solution, Testimonials, ThreeInOne, WarrantyBand } from '@/components/sections/Story';
import { PRODUCT } from '@/data/product';

export const metadata: Metadata = {
  title: `${PRODUCT.title} | Your Next Blinds`,
};

/** In-page CTAs scroll back up to the configurator. */
const TO_CONFIGURATOR = '#configure';

export default function ShopPage() {
  return (
    <>
      <nav className="site-container py-4 text-xs text-gray-500 truncate" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#00473c]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{PRODUCT.title}</span>
      </nav>
      <Configurator />
      <KeyFeatureCards />
      <WarrantyBand />
      <ProductDetails />
      <Solution ctaHref={TO_CONFIGURATOR} />
      <SleepStat ctaHref={TO_CONFIGURATOR} />
      <ThreeInOne />
      <Install ctaHref={TO_CONFIGURATOR} />
      <Testimonials />
      <Comparison ctaHref={TO_CONFIGURATOR} />
    </>
  );
}
