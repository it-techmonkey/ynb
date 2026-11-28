import { Icon } from '../ui';
import { VALUE_PROPS } from '@/data/content';

/** Four key product promises in a quiet, static row under the hero. */
export default function ValueBar() {
  return (
    <section className="bg-white border-b border-line" aria-label="Why customers choose EclipseCore">
      <ul className="site-container grid grid-cols-2 lg:grid-cols-4">
        {VALUE_PROPS.map((v, i) => (
          <li
            key={v.title}
            className={`flex items-center gap-3.5 py-6 lg:py-7 lg:justify-center ${i % 2 === 1 ? 'pl-5' : ''} ${i > 0 ? 'lg:pl-5 lg:border-l lg:border-line' : ''} ${i < 2 ? 'border-b border-line lg:border-b-0' : ''}`}
          >
            <Icon name={v.icon} className="w-6 h-6 shrink-0 text-primary" />
            <span>
              <span className="block text-sm font-semibold">{v.title}</span>
              <span className="block text-[13px] text-muted">{v.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
