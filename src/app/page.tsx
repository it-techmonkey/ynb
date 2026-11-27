import Hero from '@/components/home/Hero';
import Install from '@/components/sections/Install';
import Comparison from '@/components/sections/Comparison';
import MeasureGuarantee from '@/components/sections/MeasureGuarantee';
import FaqList from '@/components/sections/FaqList';
import FinalCta from '@/components/sections/FinalCta';
import { Recharge, SleepStat, Testimonials, ThreeInOne, UspBar, WarrantyGuarantee } from '@/components/sections/Story';
import { SectionHeading } from '@/components/ui';
import { FAQS } from '@/data/content';

export default function Home() {
  return (
    <>
      <Hero />
      <UspBar />
      <SleepStat />
      <ThreeInOne />
      <Install />
      <Testimonials />
      <Recharge />
      <Comparison />
      <MeasureGuarantee />
      <WarrantyGuarantee />

      <section className="bg-[#f8f9f8] py-16 md:py-24">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading title="Frequently Asked Questions" />
            <p className="mt-4 text-sm text-gray-600 leading-loose">
              <a href="tel:+18326706705" className="font-semibold text-[#00473c] hover:underline">+1 832-670-6705</a>
              <br />
              <a href="mailto:enquiries@yournextblinds.com" className="font-semibold text-[#00473c] hover:underline">
                enquiries@yournextblinds.com
              </a>
            </p>
          </div>
          <div className="rounded-xl bg-white border border-gray-100 shadow-sm px-6">
            <FaqList items={FAQS} defaultOpen={0} bare />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
