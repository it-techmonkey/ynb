import Link from 'next/link';
import { Icon, Logo } from './ui';
import { CONTACT } from '@/data/content';

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'EclipseCore Blackout Blinds', href: '/shop' },
      { label: 'Compare', href: '/#compare' },
      { label: 'Reviews', href: '/#reviews' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'How to Measure', href: '/how-to-measure' },
      { label: 'Installation Guide', href: '/how-to-measure#install' },
      { label: 'Fit Guarantee', href: '/how-to-measure#guarantee' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'Shipping Policy', href: '#' },
      { label: 'Refund Policy', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
    ],
  },
];

const PAYMENTS = ['visa', 'mastercard', 'amex', 'paypal', 'apple-pay', 'google-pay'];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/65 text-sm">
      <div className="site-container pt-16 md:pt-20 pb-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr_1.5fr]">
          <div className="max-w-xs">
            <Logo light />
            <p className="mt-5 leading-relaxed">
              Made-to-measure blackout blinds that install without a drill. Designed in Texas for deeper, darker sleep.
            </p>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white">{c.title}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Talk to us</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Icon name="phone" className="w-4 h-4 text-mint" /> {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-white transition-colors [overflow-wrap:anywhere]">
                  <Icon name="mail" className="w-4 h-4 shrink-0 text-mint" /> {CONTACT.email}
                </a>
              </li>
              <li className="flex gap-2">
                <Icon name="pin" className="w-4 h-4 shrink-0 mt-0.5 text-mint" />
                <span>
                  {CONTACT.address[0]}
                  <br />
                  {CONTACT.address[1]}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-5 md:items-center md:justify-between text-xs text-white/45">
          <p>© {new Date().getFullYear()} Your Next Blinds. All rights reserved · Designed in Texas, USA</p>
          <div className="flex flex-wrap items-center gap-2">
            {PAYMENTS.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p} src={`/icons/payment/${p}.svg`} alt={p.replace('-', ' ')} className="h-6 w-auto rounded bg-white px-1" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
