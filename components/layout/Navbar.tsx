'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import BlooomerMark from '@/components/ui/BlooomerMark'

const navLinks = [
  { label: 'Shop',     href: '/shop',     sub: [
    { label: 'All Flowers',    href: '/shop' },
    { label: 'Roses',          href: '/shop?category=roses' },
    { label: 'Orchids',        href: '/shop?category=orchids' },
    { label: 'Peonies',        href: '/shop?category=peonies' },
    { label: 'Native Flowers', href: '/shop?category=natives' },
    { label: 'Wholesale',      href: '/shop?type=wholesale' },
  ]},
  { label: 'Seasonal', href: '/seasonal', sub: [
    { label: 'Spring Collection', href: '/seasonal?season=spring' },
    { label: 'Summer Collection', href: '/seasonal?season=summer' },
    { label: 'Autumn Collection', href: '/seasonal?season=autumn' },
    { label: 'Winter Collection', href: '/seasonal?season=winter' },
    { label: 'Imported Rarities', href: '/seasonal?origin=imported' },
  ]},
  { label: 'Events',   href: '/events',   sub: [
    { label: 'Wedding Floristry',    href: '/events?type=wedding' },
    { label: 'Corporate Events',     href: '/events?type=corporate' },
    { label: 'Real Estate Styling',  href: '/events?type=real-estate' },
    { label: 'Hospitality & Hotels', href: '/events?type=hospitality' },
    { label: 'Request a Quote',      href: '/events#inquiry' },
  ]},
  { label: 'About',    href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const cartCount = useCartStore(s => s.items.reduce((n, i) => n + i.quantity, 0))

  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const navBase = isHome && !scrolled
    ? 'text-white'
    : 'text-bloomer-dark'

  const bgClass = scrolled || !isHome
    ? 'bg-bloomer-cream/95 backdrop-blur-md border-b border-bloomer-border shadow-sm'
    : 'bg-transparent'

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${bgClass}`}
        style={{ padding: scrolled ? '12px 0' : '20px 0' }}
      >
        <div className="container-bloomer flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <BlooomerMark
              className={`h-9 w-auto transition-colors duration-300 ${
                isHome && !scrolled ? 'text-gold-400' : 'text-bloomer-gold'
              }`}
            />
            <div className={`leading-none transition-colors duration-300 ${navBase}`}>
              <p className="font-serif text-lg tracking-[0.08em] leading-none">SYDNEY BLOOMER</p>
              <p className={`text-[9px] tracking-[0.25em] uppercase mt-0.5 ${
                isHome && !scrolled ? 'text-white/60' : 'text-bloomer-muted'
              }`}>Floral Atelier</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-[11px] tracking-[0.12em] uppercase font-medium
                    hover-underline transition-colors duration-200
                    ${navBase}
                    ${pathname.startsWith(link.href) && link.href !== '/'
                      ? 'after:w-full' : ''}`}
                >
                  {link.label}
                  {link.sub && <ChevronDown size={12} className="mt-px opacity-60" />}
                </Link>

                {link.sub && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 pt-4 w-52"
                      >
                        <div className="bg-bloomer-cream border border-bloomer-border shadow-xl py-2">
                          {link.sub.map(sub => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block px-5 py-2.5 text-[11px] tracking-[0.08em] uppercase
                                         text-bloomer-muted hover:text-bloomer-dark hover:bg-cream-100
                                         transition-colors duration-150"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              className={`hidden lg:block transition-colors duration-200 hover:text-bloomer-gold ${navBase}`}
            >
              <Search size={18} />
            </button>

            <Link
              href="/account"
              aria-label="Account"
              className={`hidden lg:block transition-colors duration-200 hover:text-bloomer-gold ${navBase}`}
            >
              <User size={18} />
            </Link>

            <Link
              href="/cart"
              aria-label={`Cart (${cartCount} items)`}
              className={`relative transition-colors duration-200 hover:text-bloomer-gold ${navBase}`}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full
                                 bg-bloomer-gold text-white text-[9px] font-medium
                                 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              className={`lg:hidden transition-colors duration-200 hover:text-bloomer-gold ${navBase}`}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bloomer-cream pt-20 overflow-y-auto"
          >
            <div className="container-bloomer py-8">
              {navLinks.map(link => (
                <div key={link.href} className="border-b border-bloomer-border last:border-0">
                  <Link
                    href={link.href}
                    className="block py-4 font-serif text-2xl text-bloomer-dark hover:text-bloomer-gold"
                  >
                    {link.label}
                  </Link>
                  {link.sub && (
                    <div className="pb-3 pl-4 flex flex-col gap-2">
                      {link.sub.map(sub => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="text-[11px] tracking-[0.1em] uppercase text-bloomer-muted hover:text-bloomer-gold"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-8 flex flex-col gap-4">
                <Link href="/auth/login" className="btn-outline-dark w-full text-center">
                  Sign In
                </Link>
                <Link href="/events#inquiry" className="btn-gold w-full text-center">
                  Request a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
