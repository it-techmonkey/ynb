import { Icon } from '../ui';
import { TRUST_POINTS } from '@/data/content';

/** Slow, infinite strip of product promises. Pauses on hover. */
export default function TrustMarquee({ tone = 'green' }: { tone?: 'green' | 'light' }) {
  const dark = tone === 'green';
  const list = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {TRUST_POINTS.map((p) => (
        <li key={p.label} className="flex items-center gap-2.5 px-7 md:px-9 whitespace-nowrap">
          <Icon name={p.icon} className={`w-4.5 h-4.5 ${dark ? 'text-brass' : 'text-primary'}`} />
          <span className={`text-sm font-medium ${dark ? 'text-white/90' : 'text-foreground/80'}`}>{p.label}</span>
          <span className={`ml-7 md:ml-9 h-1 w-1 rounded-full ${dark ? 'bg-white/25' : 'bg-foreground/20'}`} aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <section className={`marquee overflow-hidden py-4 md:py-5 ${dark ? 'bg-primary' : 'bg-white border-y border-line'}`} aria-label="Why customers choose us">
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track">
          {list(false)}
          {list(true)}
        </div>
      </div>
    </section>
  );
}
