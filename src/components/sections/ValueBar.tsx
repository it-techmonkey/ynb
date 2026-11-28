import { Icon } from '../ui';
import { VALUE_PROPS } from '@/data/content';

/** Four key product promises in a quiet band. Left-aligned to the page grid. */
export default function ValueBar({ tone = 'linen' }: { tone?: 'linen' | 'white' }) {
  const linen = tone === 'linen';
  return (
    <section className={linen ? 'bg-linen border-y border-sand' : 'bg-white border-b border-line'} aria-label="Why customers choose EclipseCore">
      <ul className="site-container grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-7 py-8 lg:py-9">
        {VALUE_PROPS.map((v, i) => (
          <li key={v.title} className={`flex items-start gap-3.5 ${i > 0 ? `lg:border-l lg:pl-8 ${linen ? 'lg:border-sand' : 'lg:border-line'}` : ''}`}>
            <Icon name={v.icon} className="w-6 h-6 shrink-0 mt-0.5 text-primary" />
            <span>
              <span className="block text-[15px] font-semibold leading-snug">{v.title}</span>
              <span className="mt-0.5 block text-sm text-muted leading-snug">{v.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
