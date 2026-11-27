import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });

export const metadata: Metadata = {
  title: 'The Viral Honeycomb Complete Blackout Blinds – Insulating, Blockout Noise, Sleep Better | Your Next Blinds',
  description:
    'Our honeycomb blackout blinds not only blocks 100% of light but also helps insulate your room, keeping it cool and quiet. Perfect for a restful, dark environment!',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
