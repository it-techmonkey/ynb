import Link from 'next/link';
import FaqList from './FaqList';
import { Icon, Reveal, SectionHeading } from '../ui';
import { CONTACT, type Faq } from '@/data/content';

export function ContactCard() {
  return (
    <div className="rounded-lg bg-linen p-7">
      <p className="font-semibold">Still have questions?</p>
      <p className="mt-1.5 text-sm text-muted leading-relaxed">Our US-based team can help with sizing, fitting and orders.</p>
      <div className="mt-5 space-y-3 text-sm">
        <a href={CONTACT.phoneHref} className="flex items-center gap-3 font-medium hover:text-primary transition-colors">
          <Icon name="phone" className="w-4.5 h-4.5 text-primary" />
          {CONTACT.phone}
        </a>
        <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 font-medium hover:text-primary transition-colors break-all">
          <Icon name="mail" className="w-4.5 h-4.5 shrink-0 text-primary" />
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
          <SectionHeading title="Frequently asked questions" />
          <Reveal className="mt-8 max-w-sm">
            <ContactCard />
          </Reveal>
        </div>
        <Reveal>
          <FaqList items={items} defaultOpen={0} />
          {more && (
            <Link href="/faq" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <span className="underline underline-offset-4 decoration-primary/30 hover:decoration-primary">See all questions</span>
              <Icon name="arrow" className="w-4 h-4" />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
