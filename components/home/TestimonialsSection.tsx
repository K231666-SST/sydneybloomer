'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Olivia Harrington',
    role: 'Event Director',
    company: 'The Grounds of Alexandria',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80',
    quote: 'Sydney Bloomer elevated our entire venue. The seasonal installations are consistently breathtaking and our guests always ask who does our flowers. Worth every cent.',
    rating: 5,
  },
  {
    name: 'James & Sophie Chen',
    role: 'Wedding Clients',
    company: '',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    quote: 'We trusted Sydney Bloomer with our entire wedding floristry and they exceeded every expectation. From the bridal bouquet to the last centrepiece — absolute perfection.',
    rating: 5,
  },
  {
    name: 'Marcus Webb',
    role: 'General Manager',
    company: 'Park Hyatt Sydney',
    avatarUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=100&q=80',
    quote: 'Three years of flawless weekly deliveries. Sydney Bloomer understands luxury hospitality and delivers arrangements that match our five-star standard without fail.',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="section-pad bg-bloomer-dark">
      <div className="container-bloomer">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] tracking-[0.22em] uppercase text-white/40 mb-3">Client Stories</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-white">
            Trusted by<br /><em className="text-gold-400">Sydney's Finest</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="bg-white/5 border border-white/10 p-8 flex flex-col"
            >
              <div className="flex gap-0.5 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} className="fill-bloomer-gold text-bloomer-gold" />
                ))}
              </div>
              <blockquote className="font-serif text-lg italic text-white/80 leading-relaxed flex-1 mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                <Image
                  src={t.avatarUrl}
                  alt={t.name}
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-[11px] text-white/40">
                    {t.role}{t.company ? ` · ${t.company}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
