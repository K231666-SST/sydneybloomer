'use client'

import Link from 'next/link'
import { Instagram, Facebook, ArrowRight } from 'lucide-react'
import BlooomerMark from '@/components/ui/BlooomerMark'

const PinterestIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.27-5.37 1.27-5.37s-.32-.65-.32-1.61c0-1.51.88-2.64 1.97-2.64.93 0 1.38.7 1.38 1.54 0 .94-.6 2.34-.91 3.64-.26 1.09.54 1.97 1.6 1.97 1.92 0 3.4-2.02 3.4-4.94 0-2.58-1.86-4.39-4.51-4.39-3.07 0-4.87 2.3-4.87 4.68 0 .93.36 1.92.8 2.46.09.11.1.2.07.31-.08.34-.27 1.09-.3 1.24-.05.2-.17.24-.38.15-1.42-.66-2.3-2.76-2.3-4.44 0-3.6 2.62-6.91 7.56-6.91 3.97 0 7.05 2.83 7.05 6.61 0 3.94-2.48 7.1-5.93 7.1-1.16 0-2.25-.6-2.62-1.31l-.71 2.65c-.26.99-.95 2.23-1.42 2.98.07.02.13.04.2.04z"/>
  </svg>
)

const footerLinks = {
  explore: [
    { label: 'Shop All Flowers', href: '/shop' },
    { label: 'Seasonal Collection', href: '/seasonal' },
    { label: 'Imported Rarities', href: '/seasonal?origin=imported' },
    { label: 'Care Guide', href: '/care-guide' },
    { label: 'Journal', href: '/blog' },
  ],
  services: [
    { label: 'Wedding Floristry', href: '/events?type=wedding' },
    { label: 'Corporate Events', href: '/events?type=corporate' },
    { label: 'Hotel & Hospitality', href: '/events?type=hospitality' },
    { label: 'Subscriptions', href: '/subscriptions' },
    { label: 'Wholesale Portal', href: '/wholesale' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-bloomer-dark text-white">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="container-bloomer py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="section-label before:bg-white/40" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Stay in bloom
            </p>
            <h3 className="font-serif text-2xl mt-2 text-white">
              Seasonal updates & exclusive offers
            </h3>
          </div>
          <form className="flex w-full md:w-auto gap-0 max-w-md" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 min-w-[220px] bg-white/8 border border-white/15 px-4 py-3
                         text-sm text-white placeholder:text-white/40
                         focus:outline-none focus:border-bloomer-gold transition-colors"
            />
            <button
              type="submit"
              className="bg-bloomer-gold text-white px-5 py-3 hover:bg-yellow-700
                         transition-colors flex-shrink-0"
              aria-label="Subscribe"
            >
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-bloomer py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <BlooomerMark className="h-10 text-bloomer-gold" />
              <div>
                <p className="font-serif text-xl tracking-[0.08em] text-white leading-none">SYDNEY BLOOMER</p>
                <p className="text-[9px] tracking-[0.25em] uppercase text-white/40 mt-0.5">Floral Atelier</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Elevating Sydney's floral landscape through curated botanical design and global sourcing. Serving Australia's finest events since 2015.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 border border-white/15 flex items-center justify-center
                            text-white/40 hover:text-white hover:border-white/40 transition-colors"
                 aria-label="Instagram">
                <Instagram size={15} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 border border-white/15 flex items-center justify-center
                            text-white/40 hover:text-white hover:border-white/40 transition-colors"
                 aria-label="Pinterest">
                <PinterestIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 border border-white/15 flex items-center justify-center
                            text-white/40 hover:text-white hover:border-white/40 transition-colors"
                 aria-label="Facebook">
                <Facebook size={15} />
              </a>
            </div>

            {/* Contact */}
            <div className="mt-8 flex flex-col gap-1.5 text-sm text-white/40">
              <p>42 Crown St, Surry Hills NSW 2010</p>
              <a href="https://wa.me/61416757654" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 hover:text-green-400 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                0416 757 654
              </a>
              <a href="mailto:hello@sydneybloomer.com.au"
                 className="hover:text-bloomer-gold transition-colors">
                hello@sydneybloomer.com.au
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-5">Explore</p>
            <ul className="flex flex-col gap-3">
              {footerLinks.explore.map(l => (
                <li key={l.href}>
                  <Link href={l.href}
                        className="text-sm text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-5">Services</p>
            <ul className="flex flex-col gap-3">
              {footerLinks.services.map(l => (
                <li key={l.href}>
                  <Link href={l.href}
                        className="text-sm text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-5">Legal</p>
            <ul className="flex flex-col gap-3">
              {footerLinks.legal.map(l => (
                <li key={l.href}>
                  <Link href={l.href}
                        className="text-sm text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-bloomer py-5 flex flex-col sm:flex-row items-center justify-between gap-3
                        text-[11px] text-white/28 tracking-wide">
          <p>&copy; {new Date().getFullYear()} Sydney Bloomer Australia. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white/60 transition-colors" aria-label="Share">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white/60 transition-colors" aria-label="Language">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
