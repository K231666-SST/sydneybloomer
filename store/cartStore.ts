import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  slug: string
  imageUrl: string
  price: number
  quantity: number
  unit: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  total: () => number
  subtotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item, qty = 1) =>
        set(state => {
          const existing = state.items.find(i => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
              ),
              isOpen: true,
            }
          }
          return { items: [...state.items, { ...item, quantity: qty }], isOpen: true }
        }),

      removeItem: id =>
        set(state => ({ items: state.items.filter(i => i.id !== id) })),

      updateQty: (id, qty) =>
        set(state => ({
          items: qty <= 0
            ? state.items.filter(i => i.id !== id)
            : state.items.map(i => (i.id === id ? { ...i, quantity: qty } : i)),
        })),

      clearCart: () => set({ items: [] }),
      openCart:  () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      subtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
      total: () => {
        const sub = get().subtotal()
        const delivery = sub >= 120 ? 0 : 12
        return sub + delivery
      },
    }),
    { name: 'sydney-bloomer-cart' }
  )
)
