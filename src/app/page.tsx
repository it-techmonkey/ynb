import Hero from '@/components/home/Hero';
import ValueBar from '@/components/sections/ValueBar';
import Problem from '@/components/sections/Problem';
import Features from '@/components/sections/Features';
import UseCases from '@/components/sections/UseCases';
import Install from '@/components/sections/Install';
import Reviews from '@/components/sections/Reviews';
import Comparison from '@/components/sections/Comparison';
import { MeasureSteps } from '@/components/sections/MeasureGuarantee';
import Guarantees from '@/components/sections/Guarantees';
import FaqSection from '@/components/sections/FaqSection';
import FinalCta from '@/components/sections/FinalCta';
import { HOME_FAQS } from '@/data/content';

/*
 * Page flow: promise + proof (hero) → the problem → how EclipseCore solves it
 * → who it's for → how easy it is → social proof → comparison → removing the
 * measuring risk → guarantees → remaining objections (FAQ) → final CTA.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ValueBar />
      <Problem />
      <Features />
      <UseCases />
      <Install />
      <Reviews />
      <Comparison />
      <MeasureSteps />
      <Guarantees />
      <FaqSection items={HOME_FAQS} />
      <FinalCta />
    </>
  );
}
