'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Flower, ShoppingBag, Inbox,
  Users, Image, FileText, BarChart2, Settings,
  LogOut, ChevronRight
} from 'lucide-react'
import BlooomerMark from '@/components/ui/BlooomerMark'

const navItems = [
  { label: 'Dashboard',    href: '/admin',              icon: LayoutDashboard },
  { label: 'Flowers',      href: '/admin/flowers',       icon: Flower },
  { label: 'Orders',       href: '/admin/orders',        icon: ShoppingBag },
  { label: 'Inquiries',    href: '/admin/inquiries',     icon: Inbox },
  { label: 'Customers',    href: '/admin/customers',     icon: Users },
  { label: 'Gallery',      href: '/admin/gallery',       icon: Image },
  { label: 'Blog',         href: '/admin/blog',          icon: FileText },
  { label: 'Analytics',    href: '/admin/analytics',     icon: BarChart2 },
  { label: 'Settings',     href: '/admin/settings',      icon: Settings },
]

interface Props {
  title: string
  children: React.ReactNode
}

export default function AdminShell({ title, children }: Props) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-[#F7F6F3] pt-0">

      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-bloomer-dark flex-shrink-0 fixed top-0 left-0 bottom-0 z-40">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-6 py-6 border-b border-white/10">
          <BlooomerMark className="h-8 text-gold-400" />
          <div>
            <p className="font-serif text-sm text-white tracking-[0.06em] leading-none">SYDNEY BLOOMER</p>
            <p className="text-[8px] text-white/35 tracking-[0.2em] uppercase mt-0.5">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 px-3 mb-3">Navigation</p>
          {navItems.map(item => {
            const Icon = item.icon
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm mb-0.5 transition-colors rounded-sm
                  ${active
                    ? 'bg-bloomer-gold/20 text-bloomer-gold'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon size={15} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/40 hover:text-white transition-colors"
          >
            <LogOut size={15} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="bg-white border-b border-bloomer-border px-6 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 text-sm text-bloomer-muted">
            <Link href="/admin" className="hover:text-bloomer-dark transition-colors">Admin</Link>
            {title !== 'Dashboard' && (
              <>
                <ChevronRight size={14} />
                <span className="text-bloomer-dark">{title}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-bloomer-dark">Admin User</p>
              <p className="text-[10px] text-bloomer-muted">admin@sydneybloomer.com.au</p>
            </div>
            <div className="w-8 h-8 bg-bloomer-gold text-white flex items-center justify-center text-sm font-medium">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-6 lg:px-8 py-8">
          <h1 className="font-serif text-3xl mb-7">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  )
}
