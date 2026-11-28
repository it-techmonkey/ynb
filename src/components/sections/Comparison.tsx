import { ButtonLink, Icon, Reveal, SectionHeading } from '../ui';
import { COMPARISON, type CompareValue } from '@/data/content';

function Mark({ value }: { value: CompareValue }) {
  if (value === 'yes')
    return (
      <>
        <Icon name="check" className="w-5 h-5 text-primary" strokeWidth={2.2} />
        <span className="sr-only">Yes</span>
      </>
    );
  if (value === 'partial') return <span className="text-[13px] text-muted">Partly</span>;
  return (
    <>
      <span className="block h-px w-3 bg-foreground/30" aria-hidden="true" />
      <span className="sr-only">No</span>
    </>
  );
}

export default function Comparison({ ctaHref = '/shop' }: { ctaHref?: string }) {
  const cols = COMPARISON.columns;
  return (
    <section id="compare" className="bg-white py-20 md:py-28">
      <div className="site-container">
        <SectionHeading center title={COMPARISON.title} sub={COMPARISON.body} />

        <Reveal className="mt-12 mx-auto max-w-4xl">
          <div className="relative overflow-x-auto scrollbar-hide">
            <table className="w-full border-collapse text-[13px] sm:text-sm md:text-[15px]">
              <thead>
                <tr className="border-b border-foreground/15">
                  <th className="w-[34%] sm:w-[40%] py-4 text-left font-normal text-muted">Feature</th>
                  {cols.map((c, i) => (
                    <th key={c} scope="col" className={`px-1.5 sm:px-3 py-4 text-center font-semibold leading-tight ${i === 0 ? 'bg-primary-soft text-primary' : 'text-foreground/70'}`}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((r) => (
                  <tr key={r.label} className="border-b border-line">
                    <th scope="row" className="py-4 pr-4 text-left font-normal text-foreground">
                      {r.label}
                    </th>
                    {r.values.map((v, i) => (
                      <td key={cols[i]} className={`py-4 px-1.5 sm:px-3 ${i === 0 ? 'bg-primary-soft/60' : ''}`}>
                        <span className="flex justify-center">
                          <Mark value={v} />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-xs text-muted">{COMPARISON.footnote}</p>
            <ButtonLink href={ctaHref}>Shop now</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
