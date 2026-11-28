'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useCart } from '../CartContext';
import { CheckDot, Icon, PriceTag, Stars } from '../ui';
import { MeasureReassurance } from '../sections/MeasureGuarantee';
import { BLIND_COLORS, FRAME_COLORS, GALLERY, OPENINGS, PRODUCT, ROOM_TYPES, SIZE_LIMITS, type OpeningId } from '@/data/product';
import { FIT_GUARANTEE, PRODUCT_BULLETS, PROMO, RATING } from '@/data/content';
import { EIGHTHS, FROM_PRICE, bandLabel, compareAt, dispatchWindow, formatUSD, unitPrice } from '@/lib/pricing';

type Unit = 'in' | 'cm';
type Dim = { whole: string; eighth: number };

function inches(d: Dim, unit: Unit): number | null {
  const n = Number(d.whole);
  if (!d.whole || Number.isNaN(n)) return null;
  return unit === 'cm' ? n / 2.54 : n + d.eighth / 8;
}

function Step({ n, title, done, aside, children, id }: { n: number; title: string; done: boolean; aside?: ReactNode; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="py-7 border-t border-line first:border-t-0 first:pt-0">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 text-lg font-semibold tracking-tight">
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-300 ${
              done ? 'bg-primary text-white' : 'bg-linen text-foreground ring-1 ring-line'
            }`}
          >
            {done ? <Icon name="check" className="w-4 h-4" strokeWidth={2.6} /> : n}
          </span>
          {title}
        </h2>
        {aside}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function DimField({
  label,
  value,
  onChange,
  unit,
  min,
  max,
  error,
}: {
  label: string;
  value: Dim;
  onChange: (d: Dim) => void;
  unit: Unit;
  min: number;
  max: number;
  error?: string;
}) {
  const lo = unit === 'cm' ? Math.round(min * 2.54) : min;
  const hi = unit === 'cm' ? Math.round(max * 2.54) : max;
  return (
    <div>
      <div className={`grid gap-2.5 ${unit === 'in' ? 'grid-cols-[1fr_120px]' : 'grid-cols-1'}`}>
        <label
          className={`block rounded-md border bg-white px-4 py-2.5 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary ${
            error ? 'border-red-400' : 'border-line hover:border-foreground/30'
          }`}
        >
          <span className="block text-xs text-muted">
            {label} ({unit === 'cm' ? 'cm' : 'inches'})
          </span>
          <input
            type="number"
            inputMode="decimal"
            placeholder={`${lo} – ${hi}`}
            value={value.whole}
            onChange={(e) => onChange({ ...value, whole: e.target.value.slice(0, 6) })}
            className="w-full text-base font-medium outline-none bg-transparent placeholder:text-foreground/30 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
        </label>
        {unit === 'in' && (
          <label className="block rounded-md border border-line bg-white px-4 py-2.5 transition-colors hover:border-foreground/30 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
            <span className="block text-xs text-muted">Fraction</span>
            <select
              value={value.eighth}
              onChange={(e) => onChange({ ...value, eighth: Number(e.target.value) })}
              className="w-full text-base font-medium outline-none bg-transparent cursor-pointer"
            >
              {EIGHTHS.map((f, i) => (
                <option key={f} value={i}>
                  {f === '0' ? '—' : `${f}"`}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Swatch({ hex, name, active, onClick }: { hex: string; name: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group flex flex-col items-center gap-2" aria-pressed={active} aria-label={name}>
      <span
        className={`w-14 h-14 rounded-full p-1 transition-all duration-300 ${
          active ? 'ring-2 ring-primary ring-offset-2' : 'ring-1 ring-line group-hover:ring-foreground/40'
        }`}
      >
        <span className="block w-full h-full rounded-full border border-black/10 transition-transform duration-300 group-hover:scale-95" style={{ background: hex }} />
      </span>
      <span className={`text-xs ${active ? 'font-semibold text-primary' : 'text-muted'}`}>{name}</span>
    </button>
  );
}

export default function Configurator() {
  const { add, setOpen } = useCart();
  const [unit, setUnit] = useState<Unit>('in');
  const [width, setWidth] = useState<Dim>({ whole: '', eighth: 0 });
  const [height, setHeight] = useState<Dim>({ whole: '', eighth: 0 });
  const [room, setRoom] = useState('');
  const [label, setLabel] = useState('');
  const [color, setColor] = useState(BLIND_COLORS[0]);
  const [frame, setFrame] = useState(FRAME_COLORS[0]);
  const [opening, setOpening] = useState<OpeningId | null>(null);
  const [qty, setQty] = useState(1);
  const [slide, setSlide] = useState(0);
  const [openingPreview, setOpeningPreview] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [dispatch, setDispatch] = useState('');
  const [sticky, setSticky] = useState(false);
  const [added, setAdded] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const thumbs = useRef<HTMLDivElement>(null);

  useEffect(() => setDispatch(dispatchWindow(PRODUCT.dispatchDays[0], PRODUCT.dispatchDays[1])), []);
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSticky(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // Keep the active thumbnail in view (scrolls the strip only, never the page).
  useEffect(() => {
    const strip = thumbs.current;
    const t = strip?.children[slide] as HTMLElement | undefined;
    if (!strip || !t) return;
    const left = t.offsetLeft; // strip is position:relative, so this is strip-relative
    if (left < strip.scrollLeft || left + t.offsetWidth > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({ left: left - 8, behavior: 'smooth' });
    }
  }, [slide]);

  const w = inches(width, unit);
  const h = inches(height, unit);
  const range = (v: number | null, lim: { min: number; max: number }, name: string) => {
    if (v === null) return touched ? `Please enter the ${name.toLowerCase()}` : undefined;
    if (v < lim.min || v > lim.max) {
      return unit === 'cm'
        ? `${name} must be between ${Math.round(lim.min * 2.54)} and ${Math.round(lim.max * 2.54)} cm`
        : `${name} must be between ${lim.min}" and ${lim.max}"`;
    }
    return undefined;
  };
  const wErr = range(w, SIZE_LIMITS.width, 'Width');
  const hErr = range(h, SIZE_LIMITS.height, 'Height');
  const sizeValid = w !== null && h !== null && !wErr && !hErr;
  const price = useMemo(() => (sizeValid ? unitPrice(w!, h!, opening ?? 'left-to-right') : null), [sizeValid, w, h, opening]);
  const displayed = (price ?? FROM_PRICE) * qty;
  const openingOpt = OPENINGS.find((o) => o.id === opening);
  const ready = sizeValid && !!opening;

  const mainSrc = openingPreview ?? GALLERY[slide].src;
  const mainAlt = openingPreview ? `${openingOpt?.name} opening direction` : GALLERY[slide].alt;

  const sizeText = () =>
    unit === 'in'
      ? `${width.whole}${width.eighth ? ` ${EIGHTHS[width.eighth]}` : ''}" W × ${height.whole}${height.eighth ? ` ${EIGHTHS[height.eighth]}` : ''}" H`
      : `${width.whole} cm W × ${height.whole} cm H`;

  const go = (i: number) => {
    setOpeningPreview(null);
    setSlide((i + GALLERY.length) % GALLERY.length);
  };

  const addToCart = (buyNow = false) => {
    setTouched(true);
    if (!sizeValid || price === null) {
      measureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!opening) {
      document.getElementById('opening-direction')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    add({
      kind: 'blind',
      title: PRODUCT.shortTitle,
      details: [
        sizeText(),
        ...(room || label ? [`Blind name: ${[room, label].filter(Boolean).join(' – ')}`] : []),
        `Fabric: ${color.name} · Frame: ${frame.name}`,
        `Opening: ${openingOpt?.name}`,
      ],
      unitPrice: price,
      qty,
      image: GALLERY[color.image ?? 0].src,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
    if (buyNow) setOpen(true);
  };

  const addSamples = () => add({ kind: 'sample', title: 'Free Fabric Samples', details: ['White, Cream, Graphite, Blue'], unitPrice: 0 });

  const pickColor = (c: (typeof BLIND_COLORS)[number]) => {
    setColor(c);
    setOpeningPreview(null);
    if (c.image !== undefined) setSlide(c.image);
  };

  return (
    <>
      <div id="configure" className="site-container pt-2 pb-16 md:pb-24 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start min-w-0">
          <div className="group relative aspect-square rounded-lg overflow-hidden bg-linen">
            <Image
              key={mainSrc}
              src={mainSrc}
              alt={mainAlt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              preload={slide === 0 && !openingPreview}
              className="object-contain animate-fade-in"
            />
            <button
              onClick={() => go(slide - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <Icon name="arrow" className="w-4 h-4 rotate-180" />
            </button>
            <button
              onClick={() => go(slide + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <Icon name="arrow" className="w-4 h-4" />
            </button>
            <span className="absolute bottom-4 right-4 rounded bg-white/90 px-2 py-0.5 text-xs text-foreground/70 tabular-nums">
              {openingPreview ? 'Opening preview' : `${slide + 1} / ${GALLERY.length}`}
            </span>
          </div>
          <div ref={thumbs} className="relative mt-2 flex gap-2.5 overflow-x-auto scrollbar-hide p-1 -mx-1">
            {GALLERY.map((g, i) => (
              <button
                key={g.src}
                onClick={() => go(i)}
                className={`relative w-[72px] h-[72px] shrink-0 rounded-md overflow-hidden bg-linen transition-opacity ${
                  !openingPreview && slide === i ? 'ring-2 ring-primary' : 'ring-1 ring-line opacity-70 hover:opacity-100'
                }`}
                aria-label={`Show ${g.alt}`}
              >
                <Image src={g.src} alt="" fill sizes="72px" className="object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Details + configurator */}
        <div className="min-w-0">
          <h1 className="heading-display text-3xl md:text-[36px]">{PRODUCT.shortTitle}</h1>
          <a href="#reviews" className="mt-4 inline-flex items-center gap-2.5 text-sm">
            <Stars value={RATING.score} className="w-4 h-4" />
            <span className="text-muted">
              <span className="font-semibold text-foreground">{RATING.score} out of 5</span> on {RATING.source}
            </span>
          </a>
          <ul className="mt-6 space-y-2.5">
            {PRODUCT_BULLETS.map((b) => (
              <li key={b} className="flex gap-2.5 text-[15px]">
                <CheckDot /> {b}
              </li>
            ))}
          </ul>

          {/* Price card */}
          <div className="mt-7 rounded-lg bg-linen p-5 md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <PriceTag price={displayed} size="lg" from={price === null} />
              {price !== null && (
                <span className="text-sm font-medium text-primary">You save {formatUSD(compareAt(displayed) - displayed)}</span>
              )}
            </div>
            <p className="mt-2 text-xs text-muted">
              {price !== null && w !== null && h !== null ? `Price for size band ${bandLabel(w, h)}. ` : 'Enter your size for an exact price. '}
              Extra {PROMO.codePercent}% off with <span className="font-semibold text-foreground">{PROMO.code}</span> at checkout.
            </p>
            <div className="mt-4 pt-4 border-t border-sand grid sm:grid-cols-2 gap-3 text-sm">
              <span className="flex items-center gap-2.5">
                <Icon name="truck" className="w-5 h-5 text-primary" />
                <span>
                  <span className="block text-xs text-muted">Estimated dispatch</span>
                  <span className="font-semibold">{dispatch || '…'}</span>
                </span>
              </span>
              <Link href="/how-to-measure#guarantee" className="group flex items-center gap-2.5">
                <Icon name="shield" className="w-5 h-5 text-primary" />
                <span>
                  <span className="block text-xs text-muted">Measured wrong?</span>
                  <span className="font-semibold underline underline-offset-4 decoration-foreground/30">We’ll remake it*</span>
                </span>
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <div ref={measureRef}>
              <Step
                n={1}
                title="Enter your window size"
                done={sizeValid}
                aside={
                  <div className="inline-flex rounded-md border border-line p-0.5 text-xs">
                    {(['in', 'cm'] as Unit[]).map((u) => (
                      <button
                        key={u}
                        onClick={() => {
                          setUnit(u);
                          setWidth({ whole: '', eighth: 0 });
                          setHeight({ whole: '', eighth: 0 });
                        }}
                        className={`rounded px-3.5 py-1.5 transition-colors ${unit === u ? 'bg-primary font-semibold text-white' : 'text-muted hover:text-foreground'}`}
                      >
                        {u === 'in' ? 'Inches' : 'cm'}
                      </button>
                    ))}
                  </div>
                }
              >
                <div className="space-y-3">
                  <DimField label="Width" value={width} onChange={setWidth} unit={unit} min={SIZE_LIMITS.width.min} max={SIZE_LIMITS.width.max} error={wErr} />
                  <DimField label="Height" value={height} onChange={setHeight} unit={unit} min={SIZE_LIMITS.height.min} max={SIZE_LIMITS.height.max} error={hErr} />
                </div>
                <div className="mt-4">
                  <MeasureReassurance />
                </div>
                <p className="mt-6 text-sm font-medium">
                  Name this blind <span className="font-normal text-muted">(optional, useful when ordering for several windows)</span>
                </p>
                <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                  <select
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="rounded-md border border-line px-4 py-3 text-sm bg-white outline-none transition-colors hover:border-foreground/30 focus:border-primary"
                    aria-label="Room"
                  >
                    <option value="">Room</option>
                    {ROOM_TYPES.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                  <input
                    value={label}
                    onChange={(e) => setLabel(e.target.value.slice(0, 40))}
                    placeholder="e.g. West wall"
                    aria-label="Window label"
                    className="rounded-md border border-line px-4 py-3 text-sm outline-none transition-colors hover:border-foreground/30 focus:border-primary placeholder:text-foreground/35"
                  />
                </div>
              </Step>
            </div>

            <Step n={2} title="Choose your colors" done>
              <p className="text-sm">
                <span className="text-muted">Fabric:</span> <span className="font-semibold">{color.name}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                {BLIND_COLORS.map((c) => (
                  <Swatch key={c.id} hex={c.hex} name={c.name} active={color.id === c.id} onClick={() => pickColor(c)} />
                ))}
              </div>
              <p className="mt-6 text-sm">
                <span className="text-muted">Frame:</span> <span className="font-semibold">{frame.name}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                {FRAME_COLORS.map((c) => (
                  <Swatch key={c.id} hex={c.hex} name={c.name} active={frame.id === c.id} onClick={() => setFrame(c)} />
                ))}
              </div>
              <button onClick={addSamples} className="mt-6 text-sm font-semibold text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary">
                Not sure? Order free fabric samples
              </button>
            </Step>

            <Step n={3} title="Pick an opening direction" done={!!opening} id="opening-direction">
              {touched && !opening && <p className="-mt-2 mb-3 text-xs text-red-600">Please choose how you’d like the blind to open.</p>}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {OPENINGS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setOpening(o.id);
                      setOpeningPreview(o.image);
                    }}
                    className={`rounded-md overflow-hidden text-left bg-white transition-shadow ${
                      opening === o.id ? 'ring-2 ring-primary' : 'ring-1 ring-line hover:ring-foreground/30'
                    }`}
                    aria-pressed={opening === o.id}
                  >
                    <span className="relative block aspect-[5/4] bg-linen overflow-hidden">
                      <Image src={o.image} alt="" fill sizes="160px" className="object-cover" />
                    </span>
                    <span className="block px-3 py-2.5 text-xs">
                      <span className={`block font-semibold ${opening === o.id ? 'text-primary' : ''}`}>{o.name}</span>
                      <span className="block text-muted">{o.price ? `+${formatUSD(o.price)}` : 'Included'}</span>
                    </span>
                  </button>
                ))}
              </div>
            </Step>
          </div>

          {/* Add to cart */}
          <div ref={ctaRef} className="pt-7 border-t border-line">
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-md border border-line h-14">
                <button className="px-4 h-full text-muted hover:text-foreground" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  <Icon name="minus" className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-medium tabular-nums" aria-live="polite">
                  {qty}
                </span>
                <button className="px-4 h-full text-muted hover:text-foreground" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity">
                  <Icon name="plus" className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => addToCart(false)}
                className={`flex-1 h-14 rounded-md font-semibold text-white transition-colors flex items-center justify-center gap-2 ${
                  added ? 'bg-primary-dark' : 'bg-primary hover:bg-primary-dark'
                }`}
              >
                {added ? (
                  <>
                    <Icon name="check" className="w-5 h-5" strokeWidth={2.4} /> Added to cart
                  </>
                ) : (
                  <>
                    Add to Cart <span className="opacity-60">·</span> <span className="tabular-nums">{formatUSD(displayed)}</span>
                  </>
                )}
              </button>
            </div>
            <button
              onClick={() => addToCart(true)}
              className="mt-3 w-full h-14 rounded-md border border-foreground/20 font-semibold transition-colors hover:border-foreground/50"
            >
              Buy Now
            </button>
            {!ready && <p className="mt-3 text-center text-xs text-muted">Complete steps 1 and 3 to add your blind to the cart.</p>}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {['visa', 'mastercard', 'amex', 'paypal', 'apple-pay', 'google-pay'].map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={p} src={`/icons/payment/${p}.svg`} alt={p.replace('-', ' ')} className="h-6 w-auto" />
              ))}
            </div>
          </div>

          {/* Shop with confidence */}
          <ul className="mt-8 border-t border-line divide-y divide-line text-sm">
            <li className="flex items-start gap-3.5 py-4">
              <Icon name="shield" className="w-5 h-5 shrink-0 text-primary" />
              <span>
                <span className="font-semibold">{FIT_GUARANTEE.name}.</span>{' '}
                <span className="text-muted">Measured wrong? We’ll remake it to the corrected size.* </span>
                <Link href="/how-to-measure#guarantee" className="font-semibold text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary">
                  Details
                </Link>
              </span>
            </li>
            <li id="samples" className="flex items-start gap-3.5 py-4">
              <Icon name="swatch" className="w-5 h-5 shrink-0 text-primary" />
              <span>
                <span className="font-semibold">Free fabric samples.</span> <span className="text-muted">Up to 10, delivered free. </span>
                <button onClick={addSamples} className="font-semibold text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary">
                  Add to cart
                </button>
              </span>
            </li>
            <li className="flex items-start gap-3.5 py-4">
              <Icon name="badge" className="w-5 h-5 shrink-0 text-primary" />
              <span>
                <span className="font-semibold">5-year warranty.</span> <span className="text-muted">Covers components and fabric.</span>
              </span>
            </li>
            <li className="flex items-start gap-3.5 py-4">
              <Icon name="truck" className="w-5 h-5 shrink-0 text-primary" />
              <span>
                <span className="font-semibold">Made to order in 3–5 business days.</span> <span className="text-muted">Most orders arrive within 7–12 business days.</span>
              </span>
            </li>
          </ul>
          <p className="mt-1 text-[11px] text-muted">{FIT_GUARANTEE.disclaimer}</p>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div
        className={`fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-xl border-t border-line shadow-[0_-8px_24px_-16px_rgba(13,23,20,0.3)] transition-transform duration-500 ${
          sticky ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-hidden={!sticky}
      >
        <div className="site-container py-3 flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 flex-1 min-w-0">
            <span className="relative w-11 h-11 rounded-md overflow-hidden bg-linen shrink-0">
              <Image src={GALLERY[color.image ?? 0].src} alt="" fill sizes="44px" className="object-contain" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold truncate">{PRODUCT.shortTitle}</span>
              <span className="block text-xs text-muted">{price !== null ? sizeText() : 'Enter your size for an exact price'}</span>
            </span>
          </div>
          <div className="flex-1 sm:flex-none">
            <PriceTag price={displayed} size="sm" from={price === null} />
          </div>
          <button
            onClick={() => (ready ? addToCart(true) : addToCart(false))}
            tabIndex={sticky ? 0 : -1}
            className="rounded-md bg-primary px-7 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            {ready ? 'Buy Now' : 'Finish Customizing'}
          </button>
        </div>
      </div>
    </>
  );
}
