'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

interface Flower {
  id: string
  name: string
  slug: string
  imageUrl: string
  price: number
  unit?: string
  origin?: string
  season?: string
  badge?: string
  color?: string[]
}

interface Props {
  flower: Flower
  size?: 'default' | 'large'
}

export default function FlowerCard({ flower, size = 'default' }: Props) {
  const [isWished, setIsWished] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: flower.id,
      name: flower.name,
      slug: flower.slug,
      imageUrl: flower.imageUrl,
      price: flower.price,
      unit: flower.unit ?? 'stem',
    })
  }

  const originLabel = flower.origin === 'LOCAL' ? 'Local Bloom' : 'Imported'
  const label = flower.badge ?? originLabel

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
    >
      <Link href={`/shop/${flower.slug}`} className="block">

        {/* Image */}
        <div className={`relative overflow-hidden bg-cream-200 ${size === 'large' ? 'aspect-[2/3]' : 'aspect-portrait'}`}>
          <Image
            src={flower.imageUrl}
            alt={flower.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className="badge-sage text-[9px]">{label}</span>
          </div>

          {/* Hover actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 right-4 flex gap-2
                          translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                          transition-all duration-300">
            <button
              onClick={handleAdd}
              className="flex-1 bg-white text-bloomer-dark text-[10px] tracking-[0.1em] uppercase
                         py-2.5 flex items-center justify-center gap-2 hover:bg-bloomer-gold hover:text-white transition-colors"
              aria-label={`Add ${flower.name} to cart`}
            >
              <ShoppingBag size={12} /> Add to Cart
            </button>
            <button
              onClick={e => { e.preventDefault(); setIsWished(v => !v) }}
              className="w-10 bg-white flex items-center justify-center hover:bg-rose-50 transition-colors"
              aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                size={14}
                className={isWished ? 'fill-rose-500 text-rose-500' : 'text-bloomer-muted'}
              />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="pt-4">
          <p className="text-[9px] tracking-[0.16em] uppercase text-bloomer-muted mb-1">{label}</p>
          <h3 className="font-serif text-lg leading-tight text-bloomer-dark group-hover:text-bloomer-gold
                         transition-colors mb-1.5">
            {flower.name}
          </h3>
          <p className="text-sm text-bloomer-muted">
            ${flower.price.toFixed(2)}
            <span className="text-[10px] ml-1 opacity-60">/{flower.unit ?? 'stem'}</span>
          </p>
        </div>
      </Link>
    </motion.article>
  )
}
