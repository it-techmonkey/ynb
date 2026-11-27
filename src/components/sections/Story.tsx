import Image from 'next/image';
import Link from 'next/link';
import RoomSlider from './RoomSlider';
import { ButtonLink, Icon, IconTile, SectionHeading, Stars, type IconName } from '../ui';
import {
  KEY_FEATURE_CARDS,
  RECHARGE,
  SLEEP_STAT,
  SOLUTION,
  TESTIMONIALS,
  THREE_IN_ONE,
  USPS,
  WARRANTY,
} from '@/data/content';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Live homepage USP strip. */
const USP_ICONS: IconName[] = ['shield', 'swatch', 'badge', 'pin'];
export function UspBar() {
  return (
    <section className="bg-[#00473c]">
      <ul className="site-container py-5 md:py-6 grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-4 lg:divide-x lg:divide-white/15">
        {USPS.map((u, i) => (
          <li key={u.title} className="lg:px-6 first:lg:pl-0">
            <Link href={u.href} className="group flex items-center gap-3">
              <span className="w-10 h-10 shrink-0 rounded-full bg-white/10 text-white flex items-center justify-center">
                <Icon name={USP_ICONS[i]} className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm md:text-[15px] font-semibold text-white group-hover:underline underline-offset-2">{u.title}</span>
                <span className="block text-xs md:text-[13px] text-white/70">{u.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** "90% of adults…" with the photo-real open/close slider. */
export function SleepStat({ ctaHref = '/shop' }: { ctaHref?: string }) {
  return (
    <section className="bg-[#111] text-white py-16 md:py-24">
      <div className="site-container grid gap-10 md:gap-16 lg:grid-cols-[1fr_1.05fr] items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">100% Blackout</p>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-[42px] font-bold leading-[1.12]">{SLEEP_STAT.title}</h2>
          <p className="mt-5 text-gray-300 leading-relaxed max-w-xl">{SLEEP_STAT.body}</p>
          <div className="mt-8">
            <ButtonLink href={ctaHref} variant="light">
              Act Now <Icon name="arrow" className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>
        <RoomSlider className="w-full max-w-[600px] lg:ml-auto" />
      </div>
    </section>
  );
}

export function ThreeInOne() {
  return (
    <section className="bg-[#f8f9f8] py-16 md:py-24">
      <div className="site-container">
        <SectionHeading center title="A 3-in-1 Solution For All!" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {THREE_IN_ONE.map((c) => (
            <div key={c.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-[#f8f9f8] flex items-center justify-center">
                <div className="relative w-12 h-12">
                  <Image src={c.icon} alt="" fill className="object-contain" />
                </div>
              </div>
              <h3 className="mt-6 text-lg font-bold text-black">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{capitalize(c.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** "The Solution to your lack of sleep" — video block (product page). */
export function Solution({ ctaHref = '/shop' }: { ctaHref?: string }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="site-container grid gap-10 md:grid-cols-2 md:gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">{SOLUTION.title}</h2>
          <p className="mt-4 text-lg text-gray-800 font-medium">{SOLUTION.lead}</p>
          <p className="mt-3 text-gray-600 leading-relaxed max-w-lg">{SOLUTION.body}</p>
          <div className="mt-8">
            <ButtonLink href={ctaHref}>
              Shop Now <Icon name="arrow" className="w-4 h-4" />
            </ButtonLink>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-100 shadow-lg">
          <video src="/img/eclipse/eclipseCore1.mp4" className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline />
        </div>
      </div>
    </section>
  );
}

export function Recharge() {
  const [a, b, c, d] = RECHARGE.p1;
  const [e, f, g] = RECHARGE.p2;
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="site-container grid gap-10 md:grid-cols-2 md:gap-16 items-center">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg md:order-2">
          <Image src="/img/eclipse/eclipseCore4.webp" alt="Total darkness recharge anytime" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-black">{RECHARGE.title}</h2>
          <div className="mt-5 space-y-5 text-gray-600 leading-relaxed max-w-lg">
            <p>
              <span className="font-semibold text-gray-900">{a}</span>
              {b}
              <span className="font-semibold text-gray-900">{c}</span>
              {d}
            </p>
            <p>
              {e}
              <span className="font-semibold text-gray-900">{f}</span>
              {g}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function KeyFeatureCards() {
  return (
    <section className="bg-[#f8f9f8] border-t border-gray-100 py-10 md:py-14">
      <div className="site-container grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {KEY_FEATURE_CARDS.map((f) => (
          <div key={f.title} className="flex gap-4 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <IconTile>
              <Icon name={f.icon} className="w-5 h-5" />
            </IconTile>
            <div>
              <p className="text-sm font-semibold text-[#1a1a1a] mb-1">{f.title}</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function WarrantyBand() {
  return (
    <section className="bg-[#00473c]/5 border-y border-[#00473c]/10">
      <div className="site-container py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div className="flex items-center gap-3 shrink-0">
          <span className="w-10 h-10 rounded-full bg-[#00473c] text-white flex items-center justify-center">
            <Icon name="shield" className="w-5 h-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#00473c]">5-Year Guarantee</p>
            <p className="text-xs text-[#00473c]/70 font-medium">Manufacturer backed</p>
          </div>
        </div>
        <p className="text-sm text-[#484848] leading-relaxed">{WARRANTY.band}</p>
      </div>
    </section>
  );
}

/** Live "5 Years Warranty Guarantee" — as a calm card instead of a full-width band. */
export function WarrantyGuarantee() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="site-container">
        <div className="rounded-xl border border-gray-100 bg-[#f8f9f8] p-6 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="w-20 h-20 shrink-0 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center">
            <div className="relative w-11 h-11">
              <Image src="/img/warranty.webp" alt="" fill className="object-contain" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-black">{WARRANTY.title}</h2>
            <p className="mt-2 text-gray-600 leading-relaxed max-w-3xl">{WARRANTY.body}.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="bg-[#111] text-white py-16 md:py-24">
      <div className="site-container">
        <SectionHeading center light title="What Our Customers Say" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {TESTIMONIALS.map((r) => (
            <figure key={r.author} className="rounded-xl border border-white/10 bg-white/[0.04] p-7 md:p-8 flex flex-col">
              <div className="flex items-center justify-between">
                <Stars className="w-4 h-4" color="text-[#FFD700]" />
                <span className="font-serif text-5xl leading-none text-white/15" aria-hidden="true">&ldquo;</span>
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug">{r.headline}</h3>
              <blockquote className="mt-3 text-[15px] text-gray-300 leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">{r.author.charAt(0)}</span>
                <span className="font-semibold">{r.author}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
