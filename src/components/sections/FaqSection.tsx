import Link from 'next/link';
import FaqList from './FaqList';
import { Icon, Reveal, SectionHeading } from '../ui';
import { CONTACT, type Faq } from '@/data/content';

export function ContactCard() {
  return (
    <div className="rounded-[24px] bg-linen p-7">
      <p className="font-semibold">Still have questions?</p>
      <p className="mt-1.5 text-sm text-muted leading-relaxed">Our US-based team can help with sizing, fitting and orders.</p>
      <div className="mt-5 space-y-2.5 text-sm">
        <a href={CONTACT.phoneHref} className="flex items-center gap-2.5 font-medium hover:text-primary transition-colors">
          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary">
            <Icon name="phone" className="w-4 h-4" />
          </span>
          {CONTACT.phone}
        </a>
        <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 font-medium hover:text-primary transition-colors break-all">
          <span className="w-8 h-8 shrink-0 rounded-full bg-white flex items-center justify-center text-primary">
            <Icon name="mail" className="w-4 h-4" />
          </span>
          {CONTACT.email}
        </a>
      </div>
    </div>
  );
}

export default function FaqSection({ items, more = true }: { items: Faq[]; more?: boolean }) {
  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="FAQ" title="Questions, answered." sub="Everything you need to know before you order." />
          <Reveal delay={100} className="mt-8 max-w-sm">
            <ContactCard />
          </Reveal>
        </div>
        <Reveal delay={80}>
          <FaqList items={items} defaultOpen={0} />
          {more && (
            <Link href="/faq" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <span className="link-underline">See all questions</span>
              <Icon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
