import Hero from '@/components/home/Hero';
import ValueBar from '@/components/sections/ValueBar';
import Problem from '@/components/sections/Problem';
import Features from '@/components/sections/Features';
import Install from '@/components/sections/Install';
import Reviews from '@/components/sections/Reviews';
import Comparison from '@/components/sections/Comparison';
import { MeasureSteps } from '@/components/sections/MeasureGuarantee';
import FaqSection from '@/components/sections/FaqSection';
import FinalCta from '@/components/sections/FinalCta';
import { HOME_FAQS } from '@/data/content';

/*
 * Short and simple, following the reference sites: rating and promise (hero)
 * → key promises → the problem → the product → installing → reviews →
 * comparison → measuring with the Fit Guarantee → FAQ → closing call to
 * action. No prices on the homepage; they live on the product page.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ValueBar tone="white" />
      <Problem />
      <Features />
      <Install />
      <Reviews />
      <Comparison />
      <MeasureSteps />
      <FaqSection items={HOME_FAQS} />
      <FinalCta />
    </>
  );
}
