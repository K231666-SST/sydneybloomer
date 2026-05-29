'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Leaf, Sun, Wind, Snowflake } from 'lucide-react'

const seasons = [
  { label: 'Spring',  icon: Leaf,      href: '/seasonal?season=spring',  desc: 'Peonies, Ranunculus, Tulips',  bg: 'from-emerald-50',   accent: '#3C6B50' },
  { label: 'Summer',  icon: Sun,       href: '/seasonal?season=summer',  desc: 'Dahlias, Roses, Wildflowers',  bg: 'from-amber-50',     accent: '#B8965C' },
  { label: 'Autumn',  icon: Wind,      href: '/seasonal?season=autumn',  desc: 'Proteas, Banksias, Orchids',   bg: 'from-orange-50',    accent: '#9A5C2C' },
  { label: 'Winter',  icon: Snowflake, href: '/seasonal?season=winter',  desc: 'Anemones, Hellebores, Lilies', bg: 'from-sky-50',       accent: '#2C4A6B' },
]

export default function SeasonalStrip() {
  return (
    <section className="bg-white border-y border-bloomer-border">
      <div className="container-bloomer">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-bloomer-border">
          {seasons.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={s.href}
                  className="group block px-6 lg:px-8 py-8 hover:bg-cream-50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={16} style={{ color: s.accent }} />
                    <span className="text-[10px] tracking-[0.2em] uppercase font-medium"
                          style={{ color: s.accent }}>
                      {s.label}
                    </span>
                  </div>
                  <p className="text-sm text-bloomer-muted leading-relaxed">{s.desc}</p>
                  <p className="text-[10px] tracking-[0.12em] uppercase text-bloomer-gold mt-3
                                opacity-0 group-hover:opacity-100 transition-opacity">
                    View Collection →
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
