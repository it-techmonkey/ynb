import type { Metadata } from 'next';
import FaqList from '@/components/sections/FaqList';
import FinalCta from '@/components/sections/FinalCta';
import { ContactCard } from '@/components/sections/FaqSection';
import { FAQS } from '@/data/content';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Your Next Blinds',
  description: 'Answers about fitting, measuring, delivery and the Fit Guarantee for EclipseCore drill-free blackout blinds.',
};

export default function FaqPage() {
  return (
    <>
      <section className="bg-linen">
        <div className="site-container py-14 md:py-20">
          <h1 className="animate-fade-up heading-display text-[34px] md:text-[42px]">Frequently asked questions</h1>
          <p className="animate-fade-up mt-4 text-base md:text-lg text-muted max-w-xl" style={{ '--d': '80ms' } as React.CSSProperties}>
            Fitting, measuring, delivery and our guarantees.
          </p>
        </div>
      </section>
      <section className="bg-white py-14 md:py-20">
        <div className="site-container grid gap-12 lg:grid-cols-[1.8fr_1fr] lg:gap-16 items-start">
          <div className="animate-fade-up" style={{ '--d': '140ms' } as React.CSSProperties}>
            <FaqList items={FAQS} defaultOpen={0} />
          </div>
          <div className="lg:sticky lg:top-28">
            <ContactCard />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
