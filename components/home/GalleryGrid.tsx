'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const images = [
  'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?auto=format&fit=crop&w=600&q=80',
  'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80',
  'https://images.pexels.com/photos/1166869/pexels-photo-1166869.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=600&q=80',
]

export default function GalleryGrid() {
  return (
    <section className="bg-white">
      <div className="container-bloomer section-pad-sm">
        <div className="text-center mb-10">
          <p className="label mb-2">Journal</p>
          <h2 className="font-serif text-3xl lg:text-4xl">From the Studio</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-0.5">
        {images.map((url, i) => (
          <motion.div
            key={url}
            className="relative aspect-square overflow-hidden group"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
          >
            <Image
              src={url}
              alt={`Gallery image ${i + 1}`}
              fill
              className="object-cover group-hover:scale-108 transition-transform duration-600"
              sizes="(max-width: 640px) 33vw, 16vw"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
