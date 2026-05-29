'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import FlowerCard from '@/components/ui/FlowerCard'

const featured = [
  {
    id: '1', name: 'Morning Blush Peony', slug: 'morning-blush-peony',
    imageUrl: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=700',
    price: 18, unit: 'stem', origin: 'LOCAL', season: 'SPRING',
    badge: 'Seasonal Peak',
  },
  {
    id: '2', name: 'Dutch White Ranunculus', slug: 'dutch-white-ranunculus',
    imageUrl: 'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?auto=format&fit=crop&w=700&q=80',
    price: 12, unit: 'stem', origin: 'IMPORTED', season: 'SPRING',
    badge: 'Local Bloom',
  },
  {
    id: '3', name: 'Blue Anemone', slug: 'blue-anemone',
    imageUrl: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=700&q=80',
    price: 15, unit: 'stem', origin: 'IMPORTED', season: 'WINTER',
    badge: 'Local Bloom',
  },
]

export default function FeaturedFlowers() {
  return (
    <section className="section-pad bg-bloomer-cream">
      <div className="container-bloomer">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-3">Our Bespoke Services</p>
            <h2 className="font-serif text-4xl lg:text-5xl leading-tight">
              Our Bespoke<br /><em>Services</em>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link href="/shop" className="btn-ghost flex items-center gap-2 text-bloomer-muted hover:text-bloomer-dark">
              View All Flowers <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((flower, i) => (
            <motion.div
              key={flower.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <FlowerCard flower={flower} />
            </motion.div>
          ))}
        </div>

        {/* Bottom services strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {[
            {
              title: 'Wedding Packages',
              desc: 'Complete floral curation for your special day, including bridal parties and venue transformations.',
              href: '/events?type=wedding',
              cta: 'Discover Curation',
              imageUrl: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600',
            },
            {
              title: 'Corporate Events',
              desc: 'Elevate your brand presence with sophisticated arrangements for product launches and gala dinners.',
              href: '/events?type=corporate',
              cta: 'Request Proposal',
              imageUrl: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=600&q=80',
            },
            {
              title: 'Real Estate Styling',
              desc: 'Strategic floral styling for high-end properties to enhance visual appeal and buyer connection.',
              href: '/events?type=real-estate',
              cta: 'View Portfolio',
              imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=600&q=80',
            },
          ].map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden bg-white border border-bloomer-border"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl mb-2">{service.title}</h3>
                <p className="text-sm text-bloomer-muted leading-relaxed mb-4">{service.desc}</p>
                <Link
                  href={service.href}
                  className="text-[10px] tracking-[0.14em] uppercase text-bloomer-gold hover-underline"
                >
                  {service.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
