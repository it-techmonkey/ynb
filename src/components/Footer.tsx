import Link from 'next/link';
import { Logo } from './ui';

const POLICIES = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Shipping Policy', href: '#' },
  { label: 'Refund Policy', href: '#' },
  { label: 'Fit Guarantee', href: '/how-to-measure#guarantee' },
  { label: 'Terms & Conditions', href: '#' },
];

const PAYMENTS = ['visa', 'mastercard', 'amex', 'paypal', 'apple-pay', 'google-pay'];

export default function Footer() {
  return (
    <footer className="bg-[#f8f9f8] border-t border-gray-200 text-sm text-[#484848]">
      <div className="site-container pt-12 pb-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-medium text-[#1a1a1a]">
              <Link href="/how-to-measure" className="hover:text-[#00473c]">Measure Guides.</Link>
              <Link href="/how-to-measure#guarantee" className="hover:text-[#00473c]">Fit Guarantee.</Link>
              <a href="mailto:enquiries@yournextblinds.com" className="hover:text-[#00473c]">Contact.</a>
            </div>
          </div>
          <div>
            <p className="font-semibold text-[#1a1a1a]">Shop</p>
            <ul className="mt-3 space-y-2">
              <li><Link href="/shop" className="hover:text-[#00473c]">Eclipse Complete Blackout Blinds</Link></li>
              <li><Link href="/shop#samples" className="hover:text-[#00473c]">Free Fabric Samples</Link></li>
              <li><Link href="/faq" className="hover:text-[#00473c]">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#1a1a1a]">Contact</p>
            <ul className="mt-3 space-y-2">
              <li><a href="tel:+18326706705" className="hover:text-[#00473c]">+1 832-670-6705</a></li>
              <li><a href="mailto:enquiries@yournextblinds.com" className="hover:text-[#00473c]">enquiries@yournextblinds.com</a></li>
              <li>8102 Fry Rd, Ste A #1010</li>
              <li>Cypress, TX 77433 United States</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#1a1a1a]">Policies</p>
            <ul className="mt-3 space-y-2">
              {POLICIES.map((p) => (
                <li key={p.label}><Link href={p.href} className="hover:text-[#00473c]">{p.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Your Next Blinds. All Rights reserved · Made in Texas, USA</p>
          <div className="flex items-center gap-2">
            {PAYMENTS.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p} src={`/icons/payment/${p}.svg`} alt={p} className="h-6 w-auto rounded border border-gray-200 bg-white px-1" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
