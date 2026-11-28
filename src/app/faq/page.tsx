import type { Metadata } from 'next';
import FaqList from '@/components/sections/FaqList';
import FinalCta from '@/components/sections/FinalCta';
import { ContactCard } from '@/components/sections/FaqSection';
import { Eyebrow } from '@/components/ui';
import { FAQS } from '@/data/content';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Your Next Blinds',
  description: 'Answers about fitting, measuring, delivery, samples and the Fit Guarantee for EclipseCore drill-free blackout blinds.',
};

export default function FaqPage() {
  return (
    <>
      <section className="bg-linen">
        <div className="site-container py-16 md:py-24 text-center flex flex-col items-center">
          <Eyebrow className="animate-fade-up">Help center</Eyebrow>
          <h1 className="animate-fade-up heading-display mt-5 text-5xl md:text-6xl lg:text-7xl" style={{ '--d': '80ms' } as React.CSSProperties}>
            Questions, answered.
          </h1>
          <p className="animate-fade-up mt-5 text-lg text-muted max-w-xl" style={{ '--d': '160ms' } as React.CSSProperties}>
            Everything you need to know about fitting, measuring, delivery and our guarantees.
          </p>
        </div>
      </section>
      <section className="bg-white py-16 md:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[1.8fr_1fr] lg:gap-16 items-start">
          <div className="animate-fade-up" style={{ '--d': '220ms' } as React.CSSProperties}>
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
