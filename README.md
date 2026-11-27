# Your Next Blinds: single-product preview (The Viral Honeycomb Complete Blackout Blinds)

This is a frontend-only design preview of yournextblinds.com rebuilt around one product. It is separate from the
live `Yournextblinds` repo and uses the same stack (Next.js 16, React 19, Tailwind 4) and the same theme.

## Run it

```bash
npm install
npm run dev -- -p 3100   # http://localhost:3100
```

## Pages

| Route             | What it shows                                                                    |
| ----------------- | -------------------------------------------------------------------------------- |
| `/`               | Landing page made from the live EclipseCore product-page sections, plus a photo-real open/close slider |
| `/shop`           | Product page with the same layout, options, price display and copy as the live one |
| `/how-to-measure` | Measure & Fit Guides (the live PDFs), How It Works and the Fit Guarantee          |
| `/faq`            | The live FAQ                                                                     |

## Where the content comes from (all live)

- **Wording:** `src/data/content.ts`, copied from the live site (`categoryContent.ts` 'eclipsecore-shades', the
  EclipseCore page sections, the home FAQ, UspBar, PromoBar, `fitGuarantee.ts` and the footer).
- **Product:** the title, options and gallery in `src/data/product.ts`. The gallery images load from the live
  Shopify CDN.
- **Pricing:** `src/data/pricing.json` holds the live EclipseCore price band (from $163.43). The struck-through
  price and "50% Off Flash Sale" badge work exactly as on the live site. Split costs +$35, the dispatch estimate is
  8–12 working days, and the FINAL10 promo bar is the live non-Black-Friday version.
- **Reviews:** these match the live site: "(No reviews yet)" by the title, the three "What Our Customers Say"
  testimonials, and the Trustpilot 4.5/5 badge.

The cart is a working drawer stored in localStorage. The checkout button does not do anything yet.
# ynb
