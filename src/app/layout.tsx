import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import RevealObserver from '@/components/RevealObserver';

const inter = localFont({
  src: './fonts/inter.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
});

const serif = localFont({
  src: [
    { path: './fonts/instrument-serif.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-serif-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EclipseCore Honeycomb Blackout Blinds — Drill-Free & Made to Measure | Your Next Blinds',
  description:
    'Custom-made honeycomb blackout blinds that press-fit inside your window frame. 100% blackout, no drilling, thermal insulating, backed by our Fit Guarantee and a 5-year warranty.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <RevealObserver />
      </body>
    </html>
  );
}
