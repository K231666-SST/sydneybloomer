'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bloomer-dark">

      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85"
          alt="Luxury floral arrangement"
          fill
          priority
          className="object-cover object-center scale-[1.04] animate-[heroZoom_9s_ease_forwards]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-bloomer relative z-10 py-32">
        <div className="max-w-xl">

          <motion.p
            custom={0} variants={variants} initial="hidden" animate="visible"
            className="text-[10px] tracking-[0.28em] uppercase text-white/55 mb-6"
          >
            Sydney Bloomer Curation
          </motion.p>

          <motion.h1
            custom={1} variants={variants} initial="hidden" animate="visible"
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.02] mb-6"
          >
            Elevated Artistry<br />
            <em>for Grand<br />Occasions</em>
          </motion.h1>

          <motion.p
            custom={2} variants={variants} initial="hidden" animate="visible"
            className="text-white/65 text-base leading-relaxed mb-10 max-w-sm"
          >
            From intimate corporate gatherings to grand weddings, Sydney Bloomer transforms spaces into living botanical masterpieces with curated floral installations.
          </motion.p>

          <motion.div
            custom={3} variants={variants} initial="hidden" animate="visible"
            className="flex flex-wrap gap-4"
          >
            <Link href="/events#inquiry" className="btn-gold gap-2 group">
              Enquire Now
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/events" className="btn-ghost text-white/80 hover:text-white border-b border-white/30 pb-0.5 rounded-none px-0 py-0">
              View Lookbook
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Right feature image block */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block w-[38%] h-[70%] mr-16"
      >
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=900&q=80"
            alt="Bespoke floral installation"
            fill
            className="object-cover"
            sizes="40vw"
          />
          <div className="absolute bottom-5 left-5 glass px-4 py-3">
            <p className="text-[10px] tracking-[0.15em] uppercase text-bloomer-muted">Bespoke Event Styling</p>
            <p className="font-serif text-sm text-bloomer-dark mt-0.5">Grand Hyatt, Sydney</p>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-10">
        <div className="w-px h-12 bg-white/20 overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 w-full bg-white/60"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-[9px] tracking-[0.2em] uppercase">Scroll</span>
      </div>
    </section>
  )
}
