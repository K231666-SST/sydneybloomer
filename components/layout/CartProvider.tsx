'use client'
import CartSidebar from '@/components/ui/CartSidebar'

export default function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartSidebar />
    </>
  )
}
