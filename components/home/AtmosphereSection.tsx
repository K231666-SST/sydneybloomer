'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function AtmosphereSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-bloomer">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: content + mint card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-emerald-50 p-10 lg:p-12">
              <p className="section-label mb-3" style={{ color: '#3C6B50' }}>
                <span className="block w-7 h-px bg-bloomer-sage mr-3 inline-block align-middle" />
                Hospitality & Hotel
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl mt-4 mb-6 text-bloomer-dark leading-tight">
                Establish a Signature<br /><em>Atmosphere</em>
              </h2>
              <ul className="flex flex-col gap-4 mb-8">
                {[
                  { title: 'Weekly Fresh Rotations',    desc: 'Consistently fresh arrangements delivered every Monday morning.' },
                  { title: 'Bespoke Visual Sourcing',   desc: 'Curated selection of styles and scents needs to match your interiors.' },
                  { title: 'Priority Guest Support',    desc: 'Exclusive access to rare blooms for special bookings and seasonal fare blooms.' },
                ].map(item => (
                  <li key={item.title} className="flex gap-3">
                    <CheckCircle2 size={18} className="text-bloomer-sage flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-bloomer-dark">{item.title}</p>
                      <p className="text-sm text-bloomer-muted mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/events?type=hospitality" className="btn-outline-dark inline-flex">
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Right: trust + image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="section-label mb-3">Trusted by Sydney's Finest</p>
              <p className="text-bloomer-muted text-sm leading-relaxed max-w-sm">
                We partner with luxury hotels, fine-dining establishments, and boutiques to maintain an environment of perpetual elegance. Our subscription service is designed to be invisible and impeccable.
              </p>
              {/* Client logos placeholder */}
              <div className="flex items-center gap-6 mt-6 opacity-30">
                {['Park Hyatt', 'The Langham', 'Quay'].map(name => (
                  <span key={name} className="text-xs tracking-[0.12em] uppercase font-medium text-bloomer-dark">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=900&q=80"
                alt="Hotel floral arrangement"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
