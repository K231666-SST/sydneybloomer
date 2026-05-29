'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Calendar, ArrowRight, MapPin } from 'lucide-react'
import FlowerCard from '@/components/ui/FlowerCard'

const SEASON_TABS = [
  { label: 'Spring',  value: 'SPRING',   months: 'Sept – Nov' },
  { label: 'Summer',  value: 'SUMMER',   months: 'Dec – Feb' },
  { label: 'Autumn',  value: 'AUTUMN',   months: 'Mar – May' },
  { label: 'Winter',  value: 'WINTER',   months: 'Jun – Aug' },
]

const FLOWERS_BY_SEASON: Record<string, any[]> = {
  SPRING: [
    { id: '1', name: 'Morning Blush Peony',    slug: 'morning-blush-peony',      imageUrl: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=700',    price: 18, unit: 'stem', origin: 'LOCAL',    badge: 'Local Bloom', color: ['pink'] },
    { id: '2', name: 'Dutch White Ranunculus', slug: 'dutch-white-ranunculus',   imageUrl: 'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?auto=format&fit=crop&w=700&q=80',        price: 12, unit: 'stem', origin: 'IMPORTED', badge: 'Local Bloom', color: ['white'] },
    { id: '6', name: 'Parrot Flame Tulip',     slug: 'tulip-parrot-flame',       imageUrl: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=700&q=80',          price: 6,  unit: 'stem', origin: 'IMPORTED', badge: 'Imported', color: ['red'] },
  ],
  SUMMER: [
    { id: '7', name: 'Meadow Whimsy Mix',      slug: 'meadow-whimsy-mix',        imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=700&q=80',          price: 9,  unit: 'stem', origin: 'LOCAL',    badge: 'Local Bloom', color: ['mixed'] },
    { id: '9', name: 'White Daisy Garden Mix', slug: 'white-daisy-garden-mix',   imageUrl: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=700', price: 5,  unit: 'stem', origin: 'LOCAL',    badge: 'Local Bloom', color: ['white'] },
    { id: '5', name: 'Apricot Garden Rose',    slug: 'garden-rose-apricot-charm',imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=700&q=80',             price: 8,  unit: 'stem', origin: 'IMPORTED', badge: 'Imported', color: ['apricot'] },
  ],
  AUTUMN: [
    { id: '10',name: 'Twilight Velvet Orchid', slug: 'twilight-velvet-orchid',   imageUrl: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=700&q=80',          price: 35, unit: 'stem', origin: 'IMPORTED', badge: 'Imported', color: ['magenta'] },
    { id: '12',name: 'Autumn Banksia',         slug: 'autumn-banksia',           imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=700&q=80',          price: 22, unit: 'stem', origin: 'LOCAL',    badge: 'Native', color: ['amber'] },
    { id: '8', name: 'Royal Protea Heirloom',  slug: 'royal-protea-heirloom',    imageUrl: 'https://images.pexels.com/photos/1166869/pexels-photo-1166869.jpeg?auto=compress&cs=tinysrgb&w=700',   price: 28, unit: 'stem', origin: 'LOCAL',    badge: 'Native', color: ['pink'] },
  ],
  WINTER: [
    { id: '3', name: 'Blue Anemone',           slug: 'blue-anemone',             imageUrl: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=700&q=80',          price: 15, unit: 'stem', origin: 'IMPORTED', badge: 'Imported', color: ['blue'] },
    { id: '4', name: 'Phalaenopsis Orchid',    slug: 'phalaenopsis-orchid',      imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=700&q=80',              price: 45, unit: 'stem', origin: 'IMPORTED', badge: 'Imported', color: ['purple'] },
    { id: '11',name: 'Colombian Red Rose',     slug: 'colombian-red-rose',       imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=700&q=80',             price: 7,  unit: 'stem', origin: 'IMPORTED', badge: 'Imported', color: ['red'] },
  ],
}

const IMPORTED = [
  { name: 'Phalaenopsis Orchid', origin: 'Kyoto, Japan', arrives: 'Arriving Wednesday', imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=700&q=80', desc: 'Specially sourced from Kyoto, Japan.', price: 45, slug: 'phalaenopsis-orchid' },
  { name: 'Apricot Garden Rose', origin: 'Ecuador',      arrives: 'Arriving Monday',    imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=700&q=80', desc: 'Premium long-stem roses from Bogotá highlands.', price: 8, slug: 'garden-rose-apricot-charm' },
  { name: 'Parrot Flame Tulip',  origin: 'Netherlands',  arrives: 'Arriving Tuesday',   imageUrl: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=700&q=80', desc: 'Holland\'s finest parrot tulips.', price: 6, slug: 'tulip-parrot-flame' },
]

export default function SeasonalPage() {
  const [activeSeason, setActiveSeason] = useState('SPRING')

  const currentTab = SEASON_TABS.find(t => t.value === activeSeason)!

  return (
    <div className="pt-20 bg-bloomer-cream min-h-screen">

      {/* Header */}
      <section className="bg-white border-b border-bloomer-border py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="label mb-4">Sydney Bloomer Curation</p>
          <h1 className="font-serif text-5xl lg:text-6xl mb-5 leading-tight">
            Seasonal Rhythms &amp;<br /><em>Botanical Treasures</em>
          </h1>
          <p className="text-bloomer-muted text-base max-w-md mx-auto leading-relaxed">
            A living calendar of the finest local blooms and rare international imports, curated for the discerning eye.
          </p>
        </motion.div>

        {/* Controls row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4
                        max-w-3xl mx-auto mt-10 px-6">
          <div className="flex gap-2">
            {['Retail', 'Wholesale'].map((t, i) => (
              <button
                key={t}
                className={`px-5 py-2 text-[11px] tracking-[0.1em] uppercase border transition-colors ${
                  i === 0 ? 'bg-bloomer-sage text-white border-bloomer-sage' : 'border-bloomer-border text-bloomer-muted hover:border-bloomer-dark'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 border border-bloomer-border px-4 py-2.5 min-w-[200px]">
            <Calendar size={14} className="text-bloomer-muted" />
            <input
              type="date"
              className="flex-1 bg-transparent text-sm text-bloomer-muted focus:outline-none"
              placeholder="Check Availability"
            />
          </div>
        </div>
      </section>

      {/* Season tabs */}
      <section className="bg-white sticky top-16 z-30 border-b border-bloomer-border">
        <div className="container-bloomer">
          <div className="flex gap-0">
            {SEASON_TABS.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveSeason(tab.value)}
                className={`relative px-6 py-4 text-[11px] tracking-[0.1em] uppercase font-medium
                             transition-colors duration-200 ${
                  activeSeason === tab.value
                    ? 'text-bloomer-dark border-b-2 border-bloomer-gold'
                    : 'text-bloomer-muted hover:text-bloomer-dark border-b-2 border-transparent'
                }`}
              >
                {tab.label}
                <span className="hidden sm:inline ml-2 text-[9px] opacity-50">({tab.months})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Season content */}
      <section className="section-pad">
        <div className="container-bloomer">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSeason}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {FLOWERS_BY_SEASON[activeSeason].map((flower, i) => (
                  <motion.div
                    key={flower.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <FlowerCard flower={flower} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Imported Rarities */}
      <section className="section-pad bg-white">
        <div className="container-bloomer">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="label mb-3">International Selection</p>
              <h2 className="font-serif text-4xl lg:text-5xl">
                Imported<br /><em>Rarities</em>
              </h2>
              <p className="text-bloomer-muted text-sm mt-4 max-w-sm leading-relaxed">
                Sourced from the premium markets of Holland, Japan, and Ecuador. These specimens are flown in weekly under climate-controlled conditions.
              </p>
            </div>
            <Link href="/seasonal?origin=imported" className="btn-ghost flex items-center gap-2 text-bloomer-muted hover:text-bloomer-dark text-[11px] tracking-[0.1em] uppercase">
              View Arrival Schedule <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {IMPORTED.map((flower, i) => (
              <motion.div
                key={flower.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden"
              >
                <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                  <Image src={flower.imageUrl} alt={flower.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="33vw" />

                  {i === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                      <span className="badge-sage text-[9px] mb-2 block w-fit">{flower.arrives}</span>
                      <h3 className="font-serif text-white text-2xl">{flower.name}</h3>
                      <p className="text-white/70 text-xs mt-1">{flower.desc}</p>
                    </div>
                  )}
                </div>
                {i > 0 && (
                  <div className="pt-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-bloomer-muted mb-1">
                      <MapPin size={10} />
                      <span className="tracking-[0.1em] uppercase">{flower.origin}</span>
                    </div>
                    <p className="font-serif text-lg">{flower.name}</p>
                    <p className="text-sm text-bloomer-muted">${flower.price}/stem</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing request */}
      <section className="section-pad-sm bg-cream-200">
        <div className="container-bloomer">
          <div className="bg-white border border-bloomer-border p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <h3 className="font-serif text-2xl mb-2">In Search of Something Specific?</h3>
              <p className="text-bloomer-muted text-sm">Our concierge team can source rare varieties for your events. Connect with our procurement specialist.</p>
            </div>
            <div className="flex gap-0 w-full lg:w-auto">
              <input type="text" placeholder="Flower Variety" className="input-field lg:w-64 border-r-0" />
              <button className="btn-gold flex-shrink-0 px-6">Request</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
