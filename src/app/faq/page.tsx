import type { Metadata } from 'next';
import FaqList from '@/components/sections/FaqList';
import FinalCta from '@/components/sections/FinalCta';
import { FAQS } from '@/data/content';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Your Next Blinds',
};

export default function FaqPage() {
  return (
    <>
      <section className="bg-[#f8f9f8] border-b border-gray-100">
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">Frequently Asked Questions</h1>
        </div>
      </section>
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <FaqList items={FAQS} defaultOpen={0} />
          <div className="mt-10 rounded-xl border border-gray-100 bg-[#f8f9f8] p-6 text-center">
            <p className="font-semibold text-[#1a1a1a]">Still have questions?</p>
            <p className="mt-2 text-sm text-gray-600">
              <a href="tel:+18326706705" className="text-[#00473c] font-semibold">+1 832-670-6705</a>
              {' · '}
              <a href="mailto:enquiries@yournextblinds.com" className="text-[#00473c] font-semibold">enquiries@yournextblinds.com</a>
            </p>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
