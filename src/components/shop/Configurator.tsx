'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useCart } from '../CartContext';
import { Icon, Stars } from '../ui';
import Gallery, { type GalleryItem } from './Gallery';
import { BLIND_COLORS, FRAME_COLORS, GALLERY, OPENINGS, PRODUCT, ROOM_TYPES, SIZE_LIMITS, type OpeningId } from '@/data/product';
import { FIT_GUARANTEE, PROMO, RATING } from '@/data/content';
import { EIGHTHS, FROM_PRICE, compareAt, dispatchWindow, formatUSD, unitPrice } from '@/lib/pricing';

type Unit = 'in' | 'cm';
type Dim = { whole: string; eighth: number };

function inches(d: Dim, unit: Unit): number | null {
  const n = Number(d.whole);
  if (!d.whole || Number.isNaN(n)) return null;
  return unit === 'cm' ? n / 2.54 : n + d.eighth / 8;
}

/* Every product photo, then one preview per opening direction (so picking an opening jumps to it). */
const IMAGES: GalleryItem[] = [
  ...GALLERY,
  ...OPENINGS.map((o) => ({ src: o.image, alt: `${o.name} opening direction`, tag: `Opening: ${o.name}` })),
];
const OPENING_INDEX = (id: OpeningId) => GALLERY.length + OPENINGS.findIndex((o) => o.id === id);

/* ------------------------------------------------------------------ parts -- */

function Option({ label, value, children, id, aside }: { label: string; value?: ReactNode; children: ReactNode; id?: string; aside?: ReactNode }) {
  return (
    <div id={id} className="border-t border-line py-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-[15px]">
          <span className="font-semibold">{label}</span>
          {value && <span className="text-muted"> · {value}</span>}
        </p>
        {aside}
      </div>
      {children}
    </div>
  );
}

function Swatch({ hex, name, active, onClick }: { hex: string; name: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={name}
      title={name}
      className={`h-11 w-11 rounded-full p-[3px] transition-shadow ${active ? 'ring-2 ring-primary' : 'ring-1 ring-line hover:ring-foreground/30'}`}
    >
      <span className="block h-full w-full rounded-full border border-black/10" style={{ background: hex }} />
    </button>
  );
}

function SizeField({
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
      <span className="mb-1.5 block text-sm text-muted">{label}</span>
      <div
        className={`flex h-12 items-center overflow-hidden rounded-xl border bg-white transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary ${
          error ? 'border-red-400' : 'border-line hover:border-foreground/25'
        }`}
      >
        <input
          type="number"
          inputMode="decimal"
          aria-label={`${label} (${unit === 'cm' ? 'cm' : 'inches'})`}
          placeholder={`${lo}–${hi}`}
          value={value.whole}
          onChange={(e) => onChange({ ...value, whole: e.target.value.slice(0, 6) })}
          className="h-full min-w-0 flex-1 bg-transparent px-4 text-base font-medium outline-none placeholder:text-foreground/30 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        {unit === 'in' ? (
          <select
            value={value.eighth}
            onChange={(e) => onChange({ ...value, eighth: Number(e.target.value) })}
            aria-label={`${label} fraction`}
            className="h-full cursor-pointer border-l border-line bg-linen/60 px-3 text-sm outline-none"
          >
            {EIGHTHS.map((f, i) => (
              <option key={f} value={i}>
                {f === '0' ? '+ 0' : `+ ${f}`}
              </option>
            ))}
          </select>
        ) : (
          <span className="px-4 text-sm text-muted">cm</span>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

/* --------------------------------------------------------------- component -- */

export default function Configurator() {
  const { add, setOpen } = useCart();
  const [unit, setUnit] = useState<Unit>('in');
  const [width, setWidth] = useState<Dim>({ whole: '', eighth: 0 });
  const [height, setHeight] = useState<Dim>({ whole: '', eighth: 0 });
  const [room, setRoom] = useState('');
  const [label, setLabel] = useState('');
  const [naming, setNaming] = useState(false);
  const [color, setColor] = useState(BLIND_COLORS[0]);
  const [frame, setFrame] = useState(FRAME_COLORS[0]);
  const [opening, setOpening] = useState<OpeningId | null>(null);
  const [qty, setQty] = useState(1);
  const [touched, setTouched] = useState(false);
  const [dispatch, setDispatch] = useState('');
  const [sticky, setSticky] = useState(false);
  const [added, setAdded] = useState(false);
  const [slide, setSlide] = useState(0);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => setDispatch(dispatchWindow(PRODUCT.dispatchDays[0], PRODUCT.dispatchDays[1])), []);
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSticky(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

  const sizeText = () =>
    unit === 'in'
      ? `${width.whole}${width.eighth ? ` ${EIGHTHS[width.eighth]}` : ''}" W × ${height.whole}${height.eighth ? ` ${EIGHTHS[height.eighth]}` : ''}" H`
      : `${width.whole} cm W × ${height.whole} cm H`;

  const addToCart = (buyNow = false) => {
    setTouched(true);
    if (!opening) {
      document.getElementById('opening')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!sizeValid || price === null) {
      sizeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  return (
    <>
      <div id="configure" className="site-container grid gap-8 pb-16 pt-2 md:pb-24 lg:grid-cols-[1.2fr_1fr] lg:gap-14 xl:gap-20">
        {/* ---------------------------------------------------------- Gallery -- */}
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <Gallery images={IMAGES} active={slide} onChange={setSlide} />
        </div>

        {/* -------------------------------------------------------- Buy box -- */}
        <div className="min-w-0">
          <a href="#reviews" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors">
            <Stars value={RATING.score} className="w-4 h-4" />
            {RATING.score} · {RATING.label}
          </a>
          <h1 className="heading-display mt-3 text-[32px] md:text-[40px]">{PRODUCT.shortTitle}</h1>
          <p className="mt-3 text-[17px] text-muted leading-relaxed">Custom-fit blackout blind. Presses into your window frame, no drilling.</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            {price === null && <span className="text-sm text-muted">From</span>}
            <span className="text-[34px] font-semibold tracking-tight tabular-nums leading-none">{formatUSD(displayed)}</span>
            <span className="text-lg text-muted line-through tabular-nums">{formatUSD(compareAt(displayed))}</span>
            <span className="rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary">Save {PROMO.flashSalePercent}%</span>
          </div>
          <p className="mt-2.5 text-sm text-muted">
            {price === null ? 'Enter your size for your exact price. ' : ''}Extra {PROMO.codePercent}% off with{' '}
            <span className="font-semibold text-foreground">{PROMO.code}</span> at checkout.
          </p>

          <div className="mt-7">
            <Option label="Fabric" value={color.name}>
              <div className="flex flex-wrap gap-3">
                {BLIND_COLORS.map((c) => (
                  <Swatch key={c.id} hex={c.hex} name={c.name} active={color.id === c.id} onClick={() => {
                      setColor(c);
                      setSlide(c.image ?? 0);
                    }} />
                ))}
              </div>
            </Option>

            <Option label="Frame" value={frame.name}>
              <div className="flex flex-wrap gap-3">
                {FRAME_COLORS.map((c) => (
                  <Swatch key={c.id} hex={c.hex} name={c.name} active={frame.id === c.id} onClick={() => setFrame(c)} />
                ))}
              </div>
            </Option>

            <Option label="Opening" value={openingOpt?.name ?? 'Choose one'} id="opening">
              <div className="grid grid-cols-2 gap-2.5">
                {OPENINGS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setOpening(o.id);
                      setSlide(OPENING_INDEX(o.id));
                    }}
                    aria-pressed={opening === o.id}
                    className={`flex items-center gap-3 rounded-xl border p-2 pr-3 text-left transition-colors ${
                      opening === o.id ? 'border-primary bg-primary-soft/60' : 'border-line hover:border-foreground/30'
                    }`}
                  >
                    <span className="relative h-12 w-14 shrink-0 overflow-hidden rounded-lg bg-linen">
                      <Image src={o.image} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                    <span className="min-w-0 text-sm">
                      <span className="block font-medium leading-tight">{o.name}</span>
                      <span className="block text-xs text-muted">{o.price ? `+${formatUSD(o.price)}` : 'Included'}</span>
                    </span>
                  </button>
                ))}
              </div>
              {touched && !opening && <p className="mt-2 text-xs text-red-600">Please choose an opening direction.</p>}
            </Option>

            <div ref={sizeRef}>
              <Option
                label="Window size"
                aside={
                  <div className="inline-flex rounded-full bg-linen p-0.5 text-xs">
                    {(['in', 'cm'] as Unit[]).map((u) => (
                      <button
                        key={u}
                        onClick={() => {
                          setUnit(u);
                          setWidth({ whole: '', eighth: 0 });
                          setHeight({ whole: '', eighth: 0 });
                        }}
                        className={`rounded-full px-3.5 py-1.5 transition-colors ${unit === u ? 'bg-white font-semibold shadow-sm' : 'text-muted hover:text-foreground'}`}
                      >
                        {u === 'in' ? 'Inches' : 'cm'}
                      </button>
                    ))}
                  </div>
                }
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <SizeField label="Width" value={width} onChange={setWidth} unit={unit} min={SIZE_LIMITS.width.min} max={SIZE_LIMITS.width.max} error={wErr} />
                  <SizeField label="Height" value={height} onChange={setHeight} unit={unit} min={SIZE_LIMITS.height.min} max={SIZE_LIMITS.height.max} error={hErr} />
                </div>
                <p className="mt-3 text-sm text-muted">
                  Measure inside your window frame and use the smallest width and height.{' '}
                  <Link href="/how-to-measure" className="font-medium text-foreground underline underline-offset-4 decoration-foreground/25 hover:decoration-foreground">
                    How to measure
                  </Link>
                </p>

                <button
                  type="button"
                  onClick={() => setNaming((v) => !v)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
                  aria-expanded={naming}
                >
                  <Icon name={naming ? 'minus' : 'plus'} className="w-4 h-4" />
                  Add a room name (optional)
                </button>
                {naming && (
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    <select
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      className="h-12 rounded-xl border border-line bg-white px-4 text-sm outline-none focus:border-primary"
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
                      className="h-12 rounded-xl border border-line px-4 text-sm outline-none focus:border-primary placeholder:text-foreground/35"
                    />
                  </div>
                )}
              </Option>
            </div>
          </div>

          {/* Add to cart */}
          <div ref={ctaRef} className="border-t border-line pt-6">
            <div className="flex gap-3">
              <div className="flex h-14 items-center rounded-full border border-line">
                <button className="h-full px-4 text-muted hover:text-foreground" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  <Icon name="minus" className="w-4 h-4" />
                </button>
                <span className="w-5 text-center font-medium tabular-nums" aria-live="polite">
                  {qty}
                </span>
                <button className="h-full px-4 text-muted hover:text-foreground" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity">
                  <Icon name="plus" className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => addToCart(false)}
                className={`flex h-14 flex-1 items-center justify-center gap-2 rounded-full font-medium text-white transition-colors ${
                  added ? 'bg-primary-dark' : 'bg-primary hover:bg-primary-dark'
                }`}
              >
                {added ? (
                  <>
                    <Icon name="check" className="w-5 h-5" strokeWidth={2.4} /> Added to cart
                  </>
                ) : (
                  <>Add to cart · {formatUSD(displayed)}</>
                )}
              </button>
            </div>
            <button
              onClick={() => addToCart(true)}
              className="mt-3 h-14 w-full rounded-full border border-foreground/15 font-medium transition-colors hover:border-foreground/50"
            >
              Buy now
            </button>
            {!ready && <p className="mt-3 text-center text-sm text-muted">Choose an opening and enter your size to continue.</p>}
          </div>

          {/* Delivery & promises */}
          <ul className="mt-7 divide-y divide-line rounded-2xl bg-linen px-5 text-sm">
            <li className="flex items-center gap-3 py-4">
              <Icon name="truck" className="w-5 h-5 shrink-0 text-primary" />
              <span>
                <span className="font-medium">Estimated dispatch {dispatch || '…'}</span>
                <span className="text-muted"> · made to order</span>
              </span>
            </li>
            <li className="flex items-center gap-3 py-4">
              <Icon name="shield" className="w-5 h-5 shrink-0 text-primary" />
              <span>
                <span className="font-medium">Fit Guarantee.</span>{' '}
                <span className="text-muted">Measured wrong? We remake it.* </span>
                <Link href="/how-to-measure#guarantee" className="font-medium underline underline-offset-4 decoration-foreground/25 hover:decoration-foreground">
                  Details
                </Link>
              </span>
            </li>
            <li className="flex items-center gap-3 py-4">
              <Icon name="badge" className="w-5 h-5 shrink-0 text-primary" />
              <span>
                <span className="font-medium">5-year warranty</span>
                <span className="text-muted"> on the frame and fabric</span>
              </span>
            </li>
            <li className="flex flex-wrap items-center gap-3 py-4">
              <Icon name="lock" className="w-5 h-5 shrink-0 text-primary" />
              <span className="font-medium">Secure checkout</span>
              <span className="ml-auto flex flex-wrap gap-1.5">
                {['visa', 'mastercard', 'amex', 'paypal', 'apple-pay', 'google-pay'].map((p) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={p} src={`/icons/payment/${p}.svg`} alt={p.replace('-', ' ')} className="h-5 w-auto" />
                ))}
              </span>
            </li>
          </ul>
          <p className="mt-2 text-xs text-muted">{FIT_GUARANTEE.disclaimer}</p>
        </div>
      </div>

      {/* Sticky bar once the main button scrolls out of view */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur-xl transition-transform duration-500 ${
          sticky ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-hidden={!sticky}
      >
        <div className="site-container flex items-center gap-4 py-3">
          <div className="hidden min-w-0 flex-1 items-center gap-3 sm:flex">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-linen">
              <Image src={GALLERY[color.image ?? 0].src} alt="" fill sizes="44px" className="object-contain mix-blend-multiply" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{PRODUCT.shortTitle}</span>
              <span className="block text-xs text-muted">{price !== null ? sizeText() : 'Enter your size for your exact price'}</span>
            </span>
          </div>
          <div className="flex-1 sm:flex-none">
            <span className="text-lg font-semibold tabular-nums">{formatUSD(displayed)}</span>
            <span className="ml-2 text-sm text-muted line-through tabular-nums">{formatUSD(compareAt(displayed))}</span>
          </div>
          <button
            onClick={() => (ready ? addToCart(true) : document.getElementById('configure')?.scrollIntoView({ behavior: 'smooth' }))}
            tabIndex={sticky ? 0 : -1}
            className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            {ready ? 'Buy now' : 'Choose options'}
          </button>
        </div>
      </div>
    </>
  );
}
