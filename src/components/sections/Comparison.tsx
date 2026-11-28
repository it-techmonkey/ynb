import { ButtonLink, Icon, Reveal, SectionHeading } from '../ui';
import { COMPARISON, type CompareValue } from '@/data/content';

function Mark({ value, featured }: { value: CompareValue; featured: boolean }) {
  if (value === 'yes')
    return (
      <span className={`w-7 h-7 rounded-full flex items-center justify-center ${featured ? 'bg-white text-primary' : 'bg-primary-soft text-primary'}`}>
        <Icon name="check" className="w-4 h-4" strokeWidth={2.6} />
        <span className="sr-only">Yes</span>
      </span>
    );
  if (value === 'partial')
    return (
      <span className="flex flex-col items-center gap-0.5 text-muted">
        <Icon name="minus-circle" className="w-6 h-6 opacity-70" />
        <span className="text-[10px] font-medium uppercase tracking-wider">Some</span>
      </span>
    );
  return (
    <span className="text-foreground/25">
      <Icon name="x-circle" className="w-6 h-6" />
      <span className="sr-only">No</span>
    </span>
  );
}

export default function Comparison({ ctaHref = '/shop' }: { ctaHref?: string }) {
  const cols = COMPARISON.columns;
  return (
    <section id="compare" className="bg-white py-20 md:py-28">
      <div className="site-container">
        <SectionHeading center eyebrow={COMPARISON.eyebrow} title={COMPARISON.title} sub={COMPARISON.body} />

        <Reveal delay={100} className="mt-14 mx-auto max-w-4xl">
          <div className="relative overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[560px] border-separate border-spacing-0 text-sm md:text-[15px]">
              <thead>
                <tr>
                  <th className="w-[40%] p-0" />
                  {cols.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`px-3 pt-6 pb-5 text-center align-bottom font-semibold ${
                        i === 0 ? 'bg-primary text-white rounded-t-[20px] heading-display text-2xl font-normal' : 'text-foreground/70'
                      }`}
                    >
                      {i === 0 && <span className="block text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-brass mb-1">Our pick</span>}
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((r, ri) => {
                  const last = ri === COMPARISON.rows.length - 1;
                  return (
                    <tr key={r.label}>
                      <th scope="row" className="py-4 pr-4 text-left font-medium text-foreground border-t border-line">
                        {r.label}
                      </th>
                      {r.values.map((v, i) => (
                        <td
                          key={cols[i]}
                          className={`py-4 px-3 border-t ${i === 0 ? `bg-primary border-white/10 ${last ? 'rounded-b-[20px]' : ''}` : 'border-line'}`}
                        >
                          <span className="flex justify-center">
                            <Mark value={v} featured={i === 0} />
                          </span>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-xs text-muted">{COMPARISON.footnote}</p>
            <ButtonLink href={ctaHref} arrow>
              Customize Your Blind
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
