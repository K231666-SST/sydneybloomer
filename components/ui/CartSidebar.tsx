'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, total } = useCartStore()
  const sub = subtotal()
  const tot = total()
  const delivery = tot - sub

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-bloomer-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-bloomer-gold" />
                <h2 className="font-serif text-xl">Your Cart</h2>
                {items.length > 0 && (
                  <span className="text-[10px] tracking-[0.1em] uppercase text-bloomer-muted ml-1">
                    ({items.reduce((n, i) => n + i.quantity, 0)} items)
                  </span>
                )}
              </div>
              <button onClick={closeCart} className="text-bloomer-muted hover:text-bloomer-dark transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
                  <ShoppingBag size={40} className="text-bloomer-border" />
                  <div>
                    <p className="font-serif text-xl text-bloomer-muted mb-2">Your cart is empty</p>
                    <p className="text-sm text-bloomer-muted">Discover our curated seasonal collection.</p>
                  </div>
                  <button onClick={closeCart} className="btn-outline-gold mt-4">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="p-6 flex flex-col gap-5">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 relative flex-shrink-0 bg-cream-200 overflow-hidden">
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-base leading-tight text-bloomer-dark truncate">{item.name}</p>
                        <p className="text-[11px] text-bloomer-muted mt-0.5">${item.price.toFixed(2)}/{item.unit}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-bloomer-border">
                            <button onClick={() => updateQty(item.id, item.quantity - 1)}
                                    className="w-7 h-7 flex items-center justify-center hover:bg-cream-100 transition-colors">
                              <Minus size={11} />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, item.quantity + 1)}
                                    className="w-7 h-7 flex items-center justify-center hover:bg-cream-100 transition-colors">
                              <Plus size={11} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-bloomer-dark">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button onClick={() => removeItem(item.id)}
                                    className="text-bloomer-muted hover:text-rose-500 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer summary */}
            {items.length > 0 && (
              <div className="border-t border-bloomer-border p-6">
                <div className="flex flex-col gap-2 mb-5">
                  <div className="flex justify-between text-sm text-bloomer-muted">
                    <span>Subtotal</span><span>${sub.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-bloomer-muted">
                    <span>Delivery</span>
                    <span>{delivery === 0 ? <span className="text-bloomer-sage">Free</span> : `$${delivery.toFixed(2)}`}</span>
                  </div>
                  {sub < 120 && (
                    <p className="text-[10px] text-bloomer-muted">
                      Add ${(120 - sub).toFixed(2)} more for free delivery.
                    </p>
                  )}
                  <div className="flex justify-between font-medium text-bloomer-dark pt-2 border-t border-bloomer-border">
                    <span className="font-serif text-base">Total</span>
                    <span>${tot.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout" onClick={closeCart} className="btn-gold w-full justify-center">
                  Proceed to Checkout
                </Link>
                <button onClick={closeCart} className="w-full text-center text-[11px] tracking-[0.08em] uppercase
                                                        text-bloomer-muted hover:text-bloomer-dark mt-3 transition-colors">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
