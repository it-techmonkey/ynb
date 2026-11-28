import type { Metadata } from 'next';
import Link from 'next/link';
import Configurator from '@/components/shop/Configurator';
import ProductDetails from '@/components/shop/ProductDetails';
import TrustMarquee from '@/components/sections/TrustMarquee';
import Problem from '@/components/sections/Problem';
import Features from '@/components/sections/Features';
import Install from '@/components/sections/Install';
import Reviews from '@/components/sections/Reviews';
import Comparison from '@/components/sections/Comparison';
import Guarantees from '@/components/sections/Guarantees';
import FaqSection from '@/components/sections/FaqSection';
import { PRODUCT } from '@/data/product';
import { FAQS } from '@/data/content';

export const metadata: Metadata = {
  title: `${PRODUCT.title} | Your Next Blinds`,
};

/** In-page CTAs scroll back up to the configurator. */
const TO_CONFIGURATOR = '#configure';

export default function ShopPage() {
  return (
    <>
      <nav className="site-container py-5 text-xs text-muted truncate" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-foreground/80">{PRODUCT.shortTitle}</span>
      </nav>
      <Configurator />
      <TrustMarquee />
      <ProductDetails />
      <Problem />
      <Features ctaHref={TO_CONFIGURATOR} />
      <Install ctaHref={TO_CONFIGURATOR} />
      <Reviews ctaHref={TO_CONFIGURATOR} />
      <Comparison ctaHref={TO_CONFIGURATOR} />
      <Guarantees />
      <FaqSection items={FAQS.slice(0, 6)} />
    </>
  );
}
