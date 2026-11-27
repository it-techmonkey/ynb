import grid from '@/data/pricing.json';
import { OPENINGS, type OpeningId } from '@/data/product';
import { PROMO } from '@/data/content';

/** Price for a width × height in inches: rounds up to the next band, like the live site. */
export function bandPrice(widthIn: number, heightIn: number): number | null {
  const wi = grid.widths.findIndex((w) => w >= widthIn);
  const hi = grid.heights.findIndex((h) => h >= heightIn);
  if (wi === -1 || hi === -1) return null;
  return grid.prices[wi][hi];
}

export function bandLabel(widthIn: number, heightIn: number): string | null {
  const w = grid.widths.find((x) => x >= widthIn);
  const h = grid.heights.find((x) => x >= heightIn);
  return w && h ? `${w}" × ${h}"` : null;
}

export function unitPrice(widthIn: number, heightIn: number, opening: OpeningId): number | null {
  const base = bandPrice(widthIn, heightIn);
  if (base === null) return null;
  const extra = OPENINGS.find((o) => o.id === opening)?.price ?? 0;
  return Math.round((base + extra) * 100) / 100;
}

/** Same synthetic compare-at the live site shows (price ÷ (1 − 50%)). */
export function compareAt(price: number): number {
  return price / (1 - PROMO.flashSalePercent / 100);
}

export const FROM_PRICE = grid.prices[0][0];

export function formatUSD(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export const EIGHTHS = ['0', '1/8', '1/4', '3/8', '1/2', '5/8', '3/4', '7/8'];

function addWorkingDays(from: Date, days: number): Date {
  const d = new Date(from);
  let left = days;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) left -= 1;
  }
  return d;
}

/** Same format as the live "Estimated Dispatch Date" box, e.g. "Dec 9 - Dec 15". */
export function dispatchWindow(minDays: number, maxDays: number): string {
  const now = new Date();
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${fmt(addWorkingDays(now, minDays))} - ${fmt(addWorkingDays(now, maxDays))}`;
}

/** Time left until local midnight — the live promo bar's countdown. */
export function untilMidnight(now = new Date()): string {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  const s = Math.max(0, Math.floor((next.getTime() - now.getTime()) / 1000));
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}
