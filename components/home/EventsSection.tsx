'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const events = [
  {
    title: 'Spring Bridal Ceremony',
    category: 'Wedding',
    imageUrl: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800',
    span: 'col-span-2 row-span-2',
  },
  {
    title: 'Gala Dinner Installation',
    category: 'Corporate',
    imageUrl: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=600&q=80',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Hotel Lobby Display',
    category: 'Hospitality',
    imageUrl: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=600&q=80',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Penthouse Styling',
    category: 'Real Estate',
    imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=600&q=80',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Birthday Garden Party',
    category: 'Private Events',
    imageUrl: 'https://images.pexels.com/photos/1166869/pexels-photo-1166869.jpeg?auto=compress&cs=tinysrgb&w=600',
    span: 'col-span-1 row-span-1',
  },
]

export default function EventsSection() {
  return (
    <section className="section-pad bg-bloomer-cream">
      <div className="container-bloomer">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="label mb-3">Our Work</p>
            <h2 className="font-serif text-4xl lg:text-5xl">Past Event<br /><em>Styling</em></h2>
          </motion.div>
          <Link href="/events" className="btn-ghost flex items-center gap-2 text-bloomer-muted hover:text-bloomer-dark text-[11px] tracking-[0.1em] uppercase">
            View All Projects <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3 h-[480px] lg:h-[560px]">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              className={`relative overflow-hidden group cursor-pointer ${event.span}`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4
                              translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                              transition-all duration-300">
                <span className="badge-dark text-[9px]">{event.category}</span>
                <p className="font-serif text-white text-sm mt-1">{event.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
