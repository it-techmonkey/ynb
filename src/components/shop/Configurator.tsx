'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useCart } from '../CartContext';
import { Icon, IconTile, PriceTag, Stars } from '../ui';
import { MeasureReassurance } from '../sections/MeasureGuarantee';
import {
  BLIND_COLORS,
  FRAME_COLORS,
  GALLERY,
  OPENINGS,
  PRODUCT,
  ROOM_TYPES,
  SIZE_LIMITS,
  cdn,
  type OpeningId,
} from '@/data/product';
import { FIT_GUARANTEE } from '@/data/content';
import { EIGHTHS, FROM_PRICE, bandLabel, dispatchWindow, formatUSD, unitPrice } from '@/lib/pricing';

type Unit = 'in' | 'cm';
type Dim = { whole: string; eighth: number };

function inches(d: Dim, unit: Unit): number | null {
  const n = Number(d.whole);
  if (!d.whole || Number.isNaN(n)) return null;
  return unit === 'cm' ? n / 2.54 : n + d.eighth / 8;
}

function Panel({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-4 md:px-5 py-4 text-left" aria-expanded={open}>
        <span className="text-base font-semibold text-[#3a3a3a]">{title}</span>
        <span className="w-6 h-6 rounded-full bg-[#00473c] text-white flex items-center justify-center">
          <Icon name={open ? 'close' : 'plus'} className="w-3.5 h-3.5" strokeWidth={2.5} />
        </span>
      </button>
      {open && <div className="px-4 md:px-5 pb-5">{children}</div>}
    </div>
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
      <div className="grid grid-cols-2 gap-3">
        <label className={`block rounded-md border px-3 py-2 focus-within:border-[#00473c] ${error ? 'border-red-400' : 'border-gray-300'}`}>
          <span className="block text-[11px] text-gray-500">
            {label} ({unit === 'cm' ? 'cm' : 'inches'})
          </span>
          <input
            type="number"
            inputMode="decimal"
            placeholder={`${lo} - ${hi}`}
            value={value.whole}
            onChange={(e) => onChange({ ...value, whole: e.target.value.slice(0, 6) })}
            className="w-full text-sm font-medium outline-none bg-transparent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
        </label>
        {unit === 'in' ? (
          <label className="block rounded-md border border-gray-300 px-3 py-2 focus-within:border-[#00473c]">
            <span className="block text-[11px] text-gray-500">Fraction</span>
            <select
              value={value.eighth}
              onChange={(e) => onChange({ ...value, eighth: Number(e.target.value) })}
              className="w-full text-sm font-medium outline-none bg-transparent cursor-pointer"
            >
              {EIGHTHS.map((f, i) => (
                <option key={f} value={i}>
                  {f}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <span />
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Swatch({ hex, name, active, onClick }: { hex: string; name: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5" aria-pressed={active}>
      <span className={`w-14 h-14 md:w-16 md:h-16 rounded-md border-2 p-0.5 transition-colors ${active ? 'border-[#00473c]' : 'border-gray-200 hover:border-gray-400'}`}>
        <span className="block w-full h-full rounded-[4px] border border-black/5" style={{ background: hex }} />
      </span>
      <span className={`text-xs ${active ? 'font-semibold text-[#00473c]' : 'text-gray-600'}`}>{name}</span>
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
  const [color, setColor] = useState(BLIND_COLORS[2]);
  const [frame, setFrame] = useState(FRAME_COLORS[1]);
  const [opening, setOpening] = useState<OpeningId | null>(null);
  const [qty, setQty] = useState(1);
  const [slide, setSlide] = useState(0);
  const [openingPreview, setOpeningPreview] = useState<string | null>(null);
  const [measureOpen, setMeasureOpen] = useState(true);
  const [customizeOpen, setCustomizeOpen] = useState(true);
  const [touched, setTouched] = useState(false);
  const [dispatch, setDispatch] = useState('');
  const [sticky, setSticky] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

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

  const mainSrc = openingPreview ?? cdn(GALLERY[slide].file, 1400);
  const mainAlt = openingPreview ? `${openingOpt?.name} opening direction` : GALLERY[slide].alt;

  const sizeText = () =>
    unit === 'in'
      ? `${width.whole}${width.eighth ? ` ${EIGHTHS[width.eighth]}` : ''}" W × ${height.whole}${height.eighth ? ` ${EIGHTHS[height.eighth]}` : ''}" H`
      : `${width.whole} cm W × ${height.whole} cm H`;

  const addToCart = (buyNow = false) => {
    setTouched(true);
    if (!sizeValid || price === null) {
      setMeasureOpen(true);
      measureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!opening) {
      setCustomizeOpen(true);
      document.getElementById('opening-direction')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    add({
      kind: 'blind',
      title: PRODUCT.shortTitle,
      details: [
        sizeText(),
        ...(room || label ? [`Blind Name: ${[room, label].filter(Boolean).join(' – ')}`] : []),
        `Blind Color: ${color.name} · Frame Color: ${frame.name}`,
        `Opening Direction: ${openingOpt?.name}`,
      ],
      unitPrice: price,
      qty,
      image: cdn(GALLERY[color.image ?? 0].file, 300),
    });
    if (buyNow) setOpen(true);
  };

  const pickColor = (c: (typeof BLIND_COLORS)[number]) => {
    setColor(c);
    setOpeningPreview(null);
    if (c.image !== undefined) setSlide(c.image);
  };

  return (
    <>
      <div id="configure" className="site-container pt-2 pb-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Gallery */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-24 lg:self-start min-w-0">
          <div className="flex gap-3">
            <div className="hidden md:flex flex-col gap-2 w-16 shrink-0 max-h-[600px] overflow-y-auto scrollbar-hide">
              {GALLERY.map((g, i) => (
                <button
                  key={g.file}
                  onClick={() => {
                    setSlide(i);
                    setOpeningPreview(null);
                  }}
                  className={`relative w-16 h-16 shrink-0 rounded-md overflow-hidden border-2 bg-white ${!openingPreview && slide === i ? 'border-[#00473c]' : 'border-gray-200 hover:border-gray-400'}`}
                  aria-label={`Show ${g.alt}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cdn(g.file, 160)} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
            <div className="relative flex-1 aspect-square rounded-xl overflow-hidden bg-white ring-1 ring-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={mainSrc} src={mainSrc} alt={mainAlt} className="absolute inset-0 w-full h-full object-contain" />
              <button
                onClick={() => {
                  setOpeningPreview(null);
                  setSlide((s) => (s - 1 + GALLERY.length) % GALLERY.length);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-gray-200 shadow flex items-center justify-center"
                aria-label="Previous image"
              >
                <Icon name="arrow" className="w-4 h-4 rotate-180" />
              </button>
              <button
                onClick={() => {
                  setOpeningPreview(null);
                  setSlide((s) => (s + 1) % GALLERY.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-gray-200 shadow flex items-center justify-center"
                aria-label="Next image"
              >
                <Icon name="arrow" className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="md:hidden mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {GALLERY.map((g, i) => (
              <button
                key={g.file}
                onClick={() => {
                  setSlide(i);
                  setOpeningPreview(null);
                }}
                className={`relative w-16 h-16 shrink-0 rounded-md overflow-hidden border-2 bg-white ${!openingPreview && slide === i ? 'border-[#00473c]' : 'border-gray-200'}`}
                aria-label={`Show ${g.alt}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cdn(g.file, 160)} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Details + configurator */}
        <div className="w-full lg:w-1/2 min-w-0">
          <h1 className="text-2xl md:text-[28px] font-semibold text-[#3a3a3a] leading-snug">{PRODUCT.title}</h1>
          <div className="mt-2 flex items-center gap-3">
            <Stars value={0} className="w-4 h-4" />
            <a href="#reviews" className="text-xs text-gray-500 hover:text-[#00473c]">(No reviews yet)</a>
            <a href="#reviews" className="text-xs font-medium text-[#00473c] hover:underline">Write a review</a>
          </div>

          <div className="mt-5 flex items-center border border-gray-200 rounded-lg px-4 py-3">
            <span className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center text-[#00473c]">
              <Icon name="truck" className="w-6 h-6" strokeWidth={1.5} />
            </span>
            <div className="ml-3">
              <p className="text-xs text-gray-500">Estimated Dispatch Date</p>
              <p className="text-sm font-semibold text-[#00473c]">{dispatch || '…'}</p>
            </div>
          </div>

          <div className="mt-4 border border-gray-200 rounded-lg p-4 md:p-5">
            <PriceTag price={displayed} from={price === null} />
            {price !== null && w !== null && h !== null && <p className="mt-2 text-xs text-gray-400">Size: {bandLabel(w, h)}</p>}
            <Link href="/how-to-measure#guarantee" className="group mt-3 flex items-center gap-2 rounded-md bg-[#00473c]/5 px-3 py-2 hover:bg-[#00473c]/10">
              <Icon name="shield" className="h-4 w-4 shrink-0 text-[#00473c]" />
              <span className="text-xs leading-tight text-[#00473c]">
                <span className="font-semibold">{FIT_GUARANTEE.name}</span> — Measured wrong? We&apos;ll make it right.{' '}
                <span className="underline underline-offset-2">Learn more</span>
              </span>
            </Link>
          </div>

          <div className="mt-6" ref={measureRef}>
            <Panel title="Measure your windows" open={measureOpen} onToggle={() => setMeasureOpen((o) => !o)}>
              <MeasureReassurance />
              <div className="mt-5 flex justify-end">
                <div className="inline-flex rounded-md bg-gray-100 p-0.5 text-xs">
                  {(['in', 'cm'] as Unit[]).map((u) => (
                    <button
                      key={u}
                      onClick={() => {
                        setUnit(u);
                        setWidth({ whole: '', eighth: 0 });
                        setHeight({ whole: '', eighth: 0 });
                      }}
                      className={`rounded px-3 py-1.5 ${unit === u ? 'bg-white shadow-sm font-semibold text-[#00473c]' : 'text-gray-600'}`}
                    >
                      {u === 'in' ? 'Inches' : 'Centimeters'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-3 space-y-3">
                <DimField label="Width" value={width} onChange={setWidth} unit={unit} min={SIZE_LIMITS.width.min} max={SIZE_LIMITS.width.max} error={wErr} />
                <DimField label="Height" value={height} onChange={setHeight} unit={unit} min={SIZE_LIMITS.height.min} max={SIZE_LIMITS.height.max} error={hErr} />
              </div>
              <p className="mt-5 text-sm font-semibold text-[#3a3a3a]">Blind Name</p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <select value={room} onChange={(e) => setRoom(e.target.value)} className="rounded-md border border-gray-300 px-3 py-2.5 text-sm bg-white outline-none focus:border-[#00473c]">
                  <option value="">Select</option>
                  {ROOM_TYPES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <input
                  value={label}
                  onChange={(e) => setLabel(e.target.value.slice(0, 40))}
                  placeholder="Ex: West Wall"
                  className="rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#00473c]"
                />
              </div>
            </Panel>

            <Panel title="Customize your blind" open={customizeOpen} onToggle={() => setCustomizeOpen((o) => !o)}>
              <p className="text-sm font-semibold text-[#3a3a3a]">Blind Color</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {BLIND_COLORS.map((c) => (
                  <Swatch key={c.id} hex={c.hex} name={c.name} active={color.id === c.id} onClick={() => pickColor(c)} />
                ))}
              </div>

              <p className="mt-6 text-sm font-semibold text-[#3a3a3a]">Frame Color</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {FRAME_COLORS.map((c) => (
                  <Swatch key={c.id} hex={c.hex} name={c.name} active={frame.id === c.id} onClick={() => setFrame(c)} />
                ))}
              </div>

              <p id="opening-direction" className="mt-6 text-sm font-semibold text-[#3a3a3a]">
                Opening Direction
                {touched && !opening && <span className="ml-2 text-xs font-normal text-red-600">Please select an opening direction</span>}
              </p>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {OPENINGS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setOpening(o.id);
                      setOpeningPreview(o.image);
                    }}
                    className={`rounded-md border-2 overflow-hidden text-left bg-white transition-colors ${opening === o.id ? 'border-[#00473c]' : 'border-gray-200 hover:border-gray-400'}`}
                    aria-pressed={opening === o.id}
                  >
                    <span className="relative block aspect-[4/3]">
                      <Image src={o.image} alt="" fill sizes="160px" className="object-cover" />
                    </span>
                    <span className="block px-2 py-1.5 text-xs">
                      <span className={`block font-semibold ${opening === o.id ? 'text-[#00473c]' : 'text-[#3a3a3a]'}`}>{o.name}</span>
                      <span className="block text-gray-500">{o.price ? `+${formatUSD(o.price)}` : 'Included'}</span>
                    </span>
                  </button>
                ))}
              </div>
            </Panel>
          </div>

          <div ref={ctaRef}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm text-gray-600">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button className="px-2.5 py-1.5 text-gray-600" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  <Icon name="minus" className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm">{qty}</span>
                <button className="px-2.5 py-1.5 text-gray-600" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity">
                  <Icon name="plus" className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => addToCart(false)} className="rounded-md bg-[#00473c] py-3 font-semibold text-white hover:bg-[#003830]">
                Add to Cart
              </button>
              <button onClick={() => addToCart(true)} className="rounded-md border border-[#00473c] py-3 font-semibold text-[#00473c] hover:bg-[#00473c]/5">
                Buy Now
              </button>
            </div>
          </div>

          {/* Shop with confidence — live FitGuaranteeTrustBlock */}
          <section className="mt-5 rounded-lg border border-gray-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Shop with confidence</p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              <Link href="/how-to-measure#guarantee" className="group flex items-start gap-3 rounded-lg bg-[#00473c]/5 border border-[#00473c]/10 p-3">
                <IconTile><Icon name="shield" className="w-5 h-5" /></IconTile>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-[#00473c]">{FIT_GUARANTEE.name} ›</span>
                  <span className="block text-[13px] text-gray-500 leading-snug">Measured wrong? We&apos;ll make it right.*</span>
                </span>
              </Link>
              {[
                { icon: 'swatch' as const, t: 'Free Fabric Samples', d: 'See your color and fabric before ordering.' },
                { icon: 'badge' as const, t: '5-Year Warranty', d: 'Quality you can depend on.' },
                { icon: 'pin' as const, t: 'Made in Texas', d: 'Custom made for your windows.' },
              ].map((c) => (
                <div key={c.t} id={c.icon === 'swatch' ? 'samples' : undefined} className="flex items-start gap-3 rounded-lg border border-gray-100 p-3">
                  <IconTile><Icon name={c.icon} className="w-5 h-5" /></IconTile>
                  <span>
                    <span className="block text-sm font-semibold text-[#3a3a3a]">{c.t}</span>
                    <span className="block text-[13px] text-gray-500 leading-snug">{c.d}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 border-t border-gray-100 pt-3 text-[11px] text-gray-400">{FIT_GUARANTEE.disclaimer}</p>
          </section>

          <section className="mt-4 rounded-lg border border-gray-200 p-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['paypal', 'visa', 'mastercard', 'amex', 'apple-pay', 'google-pay'].map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={p} src={`/icons/payment/${p}.svg`} alt={p} className="h-6 w-auto" />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { img: '/img/warranty.webp', t: 'Warranty', d: '5 Years Warranty' },
                { img: '/img/easyAssembly.webp', t: 'Easy Assembly', d: 'Minimal no hassle assembly. All Fittings included' },
                { img: '/img/review.png', t: '4.5/5 Stars', d: 'Rated Excellent on Trustpilot' },
              ].map((b) => (
                <div key={b.t} className="flex flex-col items-center text-center p-3 border border-gray-100 rounded-lg">
                  <Image src={b.img} alt={b.t} width={64} height={40} className="w-10 h-10 object-contain mb-2" />
                  <span className="text-xs font-semibold text-gray-800 leading-tight">{b.t}</span>
                  <span className="text-xs text-gray-500 mt-0.5 leading-tight">{b.d}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Sticky bottom bar — same as live */}
      <div className={`fixed bottom-0 inset-x-0 z-30 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] transition-transform duration-300 ${sticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="site-container py-3 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-gray-500">{price !== null ? 'Your price' : 'From'}</p>
            <PriceTag price={displayed} size="sm" />
          </div>
          <button onClick={() => addToCart(false)} className="hidden sm:block rounded-md border border-[#00473c] px-8 py-2.5 text-sm font-semibold text-[#00473c]">
            Add to Cart
          </button>
          <button onClick={() => addToCart(true)} className="rounded-md bg-[#00473c] px-8 py-2.5 text-sm font-semibold text-white">
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}
