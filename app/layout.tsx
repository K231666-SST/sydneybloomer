import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/components/layout/AuthProvider'
import CartProvider from '@/components/layout/CartProvider'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Sydney Bloomer — Floral Atelier',
    template: '%s | Sydney Bloomer',
  },
  description:
    'Sydney\'s premier luxury floral atelier. Bespoke arrangements, seasonal blooms, wholesale ordering, and event floristry across Australia.',
  keywords: [
    'Sydney florist', 'luxury flowers', 'wedding floristry', 'corporate flowers',
    'wholesale flowers', 'seasonal blooms', 'Australian native flowers', 'event styling',
  ],
  metadataBase: new URL('https://sydneybloomer.com.au'),
  openGraph: {
    title: 'Sydney Bloomer — Floral Atelier',
    description: 'Sydney\'s premier luxury floral atelier.',
    images: ['/og-image.jpg'],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-bloomer-cream">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
