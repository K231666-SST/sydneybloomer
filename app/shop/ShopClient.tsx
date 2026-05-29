'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import FlowerCard from '@/components/ui/FlowerCard'

const ALL_FLOWERS = [
  { id: '1', name: 'Morning Blush Peony',     slug: 'morning-blush-peony',      imageUrl: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=700',   price: 18, unit: 'stem', origin: 'LOCAL',    season: 'SPRING', category: 'peonies',    color: ['pink'],        occasion: ['wedding','birthday'], badge: 'Seasonal Peak' },
  { id: '2', name: 'Dutch White Ranunculus',  slug: 'dutch-white-ranunculus',   imageUrl: 'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?auto=format&fit=crop&w=700&q=80',       price: 12, unit: 'stem', origin: 'IMPORTED', season: 'SPRING', category: 'ranunculus', color: ['white','cream'],occasion: ['wedding','corporate'], badge: 'Local Bloom' },
  { id: '3', name: 'Blue Anemone',            slug: 'blue-anemone',             imageUrl: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=700&q=80',       price: 15, unit: 'stem', origin: 'IMPORTED', season: 'WINTER', category: 'wildflowers', color: ['blue','indigo'],occasion: ['wedding','corporate'], badge: 'Local Bloom' },
  { id: '4', name: 'Phalaenopsis Orchid',     slug: 'phalaenopsis-orchid',      imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=700&q=80',           price: 45, unit: 'stem', origin: 'IMPORTED', season: 'ALL_YEAR', category: 'orchids',  color: ['purple','white'],occasion: ['corporate','luxury'], badge: 'Imported' },
  { id: '5', name: 'Apricot Garden Rose',     slug: 'garden-rose-apricot-charm',imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=700&q=80',           price: 8,  unit: 'stem', origin: 'IMPORTED', season: 'ALL_YEAR', category: 'roses',    color: ['apricot','peach'],occasion: ['wedding','birthday'], badge: 'Imported' },
  { id: '6', name: 'Parrot Flame Tulip',      slug: 'tulip-parrot-flame',       imageUrl: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=700&q=80',         price: 6,  unit: 'stem', origin: 'IMPORTED', season: 'SPRING', category: 'tulips',    color: ['red','gold'],  occasion: ['birthday','spring'], badge: 'Imported' },
  { id: '7', name: 'Meadow Whimsy Mix',       slug: 'meadow-whimsy-mix',        imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=700&q=80',         price: 9,  unit: 'stem', origin: 'LOCAL',    season: 'SUMMER', category: 'wildflowers',color: ['mixed'],       occasion: ['wedding','casual'], badge: 'Local Bloom' },
  { id: '8', name: 'Royal Protea Heirloom',   slug: 'royal-protea-heirloom',    imageUrl: 'https://images.pexels.com/photos/1166869/pexels-photo-1166869.jpeg?auto=compress&cs=tinysrgb&w=700',   price: 28, unit: 'stem', origin: 'LOCAL',    season: 'ALL_YEAR', category: 'proteas',  color: ['pink','rust'], occasion: ['wedding','corporate'], badge: 'Native' },
  { id: '9', name: 'White Daisy Garden Mix',  slug: 'white-daisy-garden-mix',   imageUrl: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=700',price: 5,  unit: 'stem', origin: 'LOCAL',    season: 'SUMMER', category: 'wildflowers',color: ['white','yellow'],occasion: ['birthday','casual'], badge: 'Local Bloom' },
  { id: '10',name: 'Twilight Velvet Orchid',  slug: 'twilight-velvet-orchid',   imageUrl: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=700&q=80',         price: 35, unit: 'stem', origin: 'IMPORTED', season: 'AUTUMN', category: 'orchids',   color: ['magenta','purple'],occasion: ['corporate','luxury'], badge: 'Imported' },
  { id: '11',name: 'Colombian Red Rose',      slug: 'colombian-red-rose',       imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=700&q=80',           price: 7,  unit: 'stem', origin: 'IMPORTED', season: 'ALL_YEAR', category: 'roses',    color: ['red'],         occasion: ['romance','wedding'], badge: 'Imported' },
  { id: '12',name: 'Autumn Banksia',          slug: 'autumn-banksia',           imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=700&q=80',         price: 22, unit: 'stem', origin: 'LOCAL',    season: 'AUTUMN', category: 'natives',   color: ['amber','gold'],occasion: ['wedding','corporate'], badge: 'Native' },
]

const SEASONS   = ['ALL_YEAR','SPRING','SUMMER','AUTUMN','WINTER']
const ORIGINS   = ['LOCAL','IMPORTED']
const OCCASIONS = ['wedding','corporate','birthday','romance','casual','luxury']
const COLORS    = ['pink','white','red','blue','purple','yellow','mixed','apricot','amber']
const TYPES     = ['roses','orchids','peonies','tulips','ranunculus','proteas','wildflowers','natives']

const SORT_OPTIONS = [
  { label: 'Newest Arrivals', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name A–Z', value: 'name-asc' },
]

export default function ShopClient() {
  const [filters, setFilters] = useState({
    season: [] as string[],
    origin: [] as string[],
    color: [] as string[],
    occasion: [] as string[],
    type: [] as string[],
  })
  const [sort, setSort]               = useState('newest')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [priceRange, setPriceRange]   = useState([0, 100])

  const toggle = (key: keyof typeof filters, val: string) =>
    setFilters(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(v => v !== val) : [...f[key], val],
    }))

  const activeCount = Object.values(filters).flat().length

  const filtered = useMemo(() => {
    let list = ALL_FLOWERS.filter(f => {
      if (filters.season.length   && !filters.season.includes(f.season))     return false
      if (filters.origin.length   && !filters.origin.includes(f.origin))     return false
      if (filters.type.length     && !filters.type.includes(f.category))     return false
      if (filters.color.length    && !f.color.some(c => filters.color.includes(c)))  return false
      if (filters.occasion.length && !f.occasion.some(o => filters.occasion.includes(o))) return false
      if (f.price < priceRange[0] || f.price > priceRange[1]) return false
      return true
    })
    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'name-asc')   list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [filters, sort, priceRange])

  const FilterSection = ({ title, options, filterKey }: {
    title: string, options: string[], filterKey: keyof typeof filters
  }) => (
    <div className="border-b border-bloomer-border pb-5 mb-5">
      <p className="text-[10px] tracking-[0.18em] uppercase font-medium text-bloomer-dark mb-3">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const active = filters[filterKey].includes(opt)
          return (
            <button
              key={opt}
              onClick={() => toggle(filterKey, opt)}
              className={`px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase border transition-colors
                ${active
                  ? 'bg-bloomer-gold text-white border-bloomer-gold'
                  : 'border-bloomer-border text-bloomer-muted hover:border-bloomer-gold hover:text-bloomer-gold'
                }`}
            >
              {opt.replace('_', ' ')}
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="pt-20 bg-bloomer-cream min-h-screen">

      {/* Page header */}
      <div className="bg-white border-b border-bloomer-border py-16 text-center">
        <p className="label mb-3">Sydney Bloomer Curation</p>
        <h1 className="font-serif text-4xl lg:text-6xl mb-4">
          The Botanist&apos;s<br /><em>Selection</em>
        </h1>
        <p className="text-bloomer-muted text-sm max-w-md mx-auto">
          Bespoke arrangements curated for the discerning eye, from Sydney&apos;s premier artisanal floral workshop.
        </p>
      </div>

      <div className="container-bloomer py-10">
        <div className="flex gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <FilterSection title="Season"     options={SEASONS}   filterKey="season"   />
            <FilterSection title="Flower Type"options={TYPES}     filterKey="type"     />
            <FilterSection title="Colour"     options={COLORS}    filterKey="color"    />
            <FilterSection title="Occasion"   options={OCCASIONS} filterKey="occasion" />
            <FilterSection title="Origin"     options={ORIGINS}   filterKey="origin"   />

            <div className="border-b border-bloomer-border pb-5 mb-5">
              <p className="text-[10px] tracking-[0.18em] uppercase font-medium text-bloomer-dark mb-3">
                Price Range
              </p>
              <div className="flex items-center gap-2 text-sm text-bloomer-muted">
                <span>${priceRange[0]}</span>
                <span>–</span>
                <span>${priceRange[1]}</span>
              </div>
              <input
                type="range" min={0} max={100} step={5}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full mt-2 accent-bloomer-gold"
              />
            </div>

            {activeCount > 0 && (
              <button
                onClick={() => setFilters({ season: [], origin: [], color: [], occasion: [], type: [] })}
                className="text-[10px] tracking-[0.12em] uppercase text-bloomer-muted hover:text-rose-500
                           flex items-center gap-1.5 transition-colors"
              >
                <X size={12} /> Clear all filters ({activeCount})
              </button>
            )}
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-7">
              <p className="text-sm text-bloomer-muted">
                Showing <span className="text-bloomer-dark font-medium">{filtered.length}</span> artisanal stems
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(v => !v)}
                  className="lg:hidden flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase
                             text-bloomer-muted hover:text-bloomer-dark"
                >
                  <SlidersHorizontal size={14} />
                  Filters {activeCount > 0 && `(${activeCount})`}
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-[0.1em] uppercase text-bloomer-muted hidden sm:block">
                    Sort by:
                  </span>
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="text-[11px] tracking-[0.06em] text-bloomer-dark bg-transparent
                               border-none outline-none cursor-pointer"
                  >
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-serif text-2xl text-bloomer-muted mb-3">No flowers found</p>
                <p className="text-sm text-bloomer-muted">Try adjusting your filters.</p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((flower, i) => (
                  <motion.div
                    key={flower.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <FlowerCard flower={flower} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
