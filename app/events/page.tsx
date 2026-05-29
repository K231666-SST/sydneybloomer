'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

const services = [
  {
    title: 'Wedding Floristry',
    href: '?type=wedding',
    desc: 'Complete floral curation for your special day, including bridal parties and venue transformations.',
    imageUrl: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800',
    includes: ['Bridal bouquet & buttonholes', 'Ceremony arch & aisle', 'Reception centrepieces', 'On-the-day coordination'],
  },
  {
    title: 'Corporate Events',
    href: '?type=corporate',
    desc: 'Elevate your brand presence with sophisticated arrangements for product launches and gala dinners.',
    imageUrl: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=800&q=80',
    includes: ['Stage & registration florals', 'Table centrepieces', 'Brand colour matching', 'Venue walkthroughs'],
  },
  {
    title: 'Real Estate Styling',
    href: '?type=real-estate',
    desc: 'Strategic floral styling for high-end properties to enhance visual appeal and buyer connection.',
    imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=800&q=80',
    includes: ['Property-matched palettes', 'Auction day florals', 'Photography shoots', 'Delivery & retrieval'],
  },
]

const portfolio = [
  { title: 'The Carnivale Wedding', venue: 'Establishment Hotel, Sydney', imageUrl: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800', type: 'Wedding' },
  { title: 'Atlassian Product Launch', venue: 'Sydney Showground', imageUrl: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=800&q=80', type: 'Corporate' },
  { title: 'Vaucluse Penthouse', venue: 'Sydney Eastern Suburbs', imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=800&q=80', type: 'Real Estate' },
  { title: 'Park Hyatt Grand Gala', venue: 'The Rocks, Sydney', imageUrl: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=800&q=80', type: 'Corporate' },
]

export default function EventsPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '',
    eventType: '', eventDate: '', guestCount: '', venue: '', budget: '', description: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setSubmitted(true)
    } catch { setSubmitted(true) }
  }

  return (
    <div className="pt-20 bg-bloomer-cream min-h-screen">

      {/* Hero split */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-20">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="label mb-4">Bespoke Event Styling</p>
              <h1 className="font-serif text-5xl lg:text-6xl leading-[1.02] mb-6">
                Elevated Artistry<br /><em>for Grand<br />Occasions.</em>
              </h1>
              <p className="text-bloomer-muted text-base leading-relaxed max-w-sm mb-10">
                From intimate corporate gatherings to grand weddings, Sydney Bloomer transforms spaces into living botanical masterpieces with curated floral installations.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href="#inquiry" className="btn-gold">Enquire Now <ArrowRight size={14} /></a>
                <a href="#portfolio" className="btn-outline-dark">View Lookbook</a>
              </div>
            </motion.div>
          </div>
          <div className="relative min-h-[400px] lg:min-h-0 overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Event floral styling"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-pad">
        <div className="container-bloomer">
          <div className="text-center mb-14">
            <p className="label mb-3">Our Bespoke Services</p>
            <h2 className="font-serif text-4xl lg:text-5xl">What We Do</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-bloomer-border group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={s.imageUrl} alt={s.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" sizes="33vw" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl mb-2">{s.title}</h3>
                  <p className="text-sm text-bloomer-muted mb-5 leading-relaxed">{s.desc}</p>
                  <ul className="flex flex-col gap-2 mb-6">
                    {s.includes.map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-bloomer-muted">
                        <Check size={13} className="text-bloomer-sage flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={s.href} className="text-[10px] tracking-[0.14em] uppercase text-bloomer-gold hover-underline">
                    Request Proposal →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="section-pad bg-white" id="portfolio">
        <div className="container-bloomer">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="label mb-3">Past Work</p>
              <h2 className="font-serif text-4xl">Event Portfolio</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {portfolio.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden aspect-square cursor-pointer"
              >
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-106 transition-transform duration-700" sizes="25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="badge-dark text-[9px]">{item.type}</span>
                  <p className="font-serif text-white text-sm mt-1">{item.title}</p>
                  <p className="text-white/60 text-[11px] mt-0.5">{item.venue}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="section-pad bg-bloomer-cream" id="inquiry">
        <div className="container-bloomer max-w-3xl">
          <div className="text-center mb-12">
            <p className="label mb-3">Start Your Journey</p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-4">Event Inquiry</h2>
            <p className="text-bloomer-muted text-sm leading-relaxed">
              Please provide your event details below. Our creative director will reach out within 24 hours to schedule a consultation.
            </p>
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-white border border-bloomer-border p-12 text-center">
              <div className="w-16 h-16 bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                <Check size={28} className="text-bloomer-sage" />
              </div>
              <h3 className="font-serif text-2xl mb-3">Thank you for your inquiry.</h3>
              <p className="text-bloomer-muted text-sm">Our creative director will be in touch within 24 hours. We look forward to creating something beautiful with you.</p>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="bg-white border border-bloomer-border p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Full Name *</label>
                  <input name="name" required value={formData.name} onChange={handle} placeholder="Alexandra Thompson" className="input-field" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Email Address *</label>
                  <input name="email" type="email" required value={formData.email} onChange={handle} placeholder="your@email.com" className="input-field" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Phone</label>
                  <input name="phone" value={formData.phone} onChange={handle} placeholder="+61 4xx xxx xxx" className="input-field" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Company (if applicable)</label>
                  <input name="company" value={formData.company} onChange={handle} placeholder="Your company" className="input-field" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Event Date</label>
                  <input name="eventDate" type="date" value={formData.eventDate} onChange={handle} className="input-field" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Event Type *</label>
                  <select name="eventType" required value={formData.eventType} onChange={handle} className="select-field">
                    <option value="">Select...</option>
                    <option>Wedding</option>
                    <option>Corporate</option>
                    <option>Birthday</option>
                    <option>Hotel / Hospitality</option>
                    <option>Real Estate</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Estimated Budget</label>
                  <input name="budget" value={formData.budget} onChange={handle} placeholder="e.g. $5,000–$10,000" className="input-field" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Venue & Location</label>
                  <input name="venue" value={formData.venue} onChange={handle} placeholder="Venue name or suburb" className="input-field" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Vision & Details</label>
                <textarea name="description" rows={5} value={formData.description} onChange={handle}
                          placeholder="Tell us about your vision, colour palette, and any inspirations..."
                          className="input-field resize-none" />
              </div>
              <button type="submit" className="btn-gold w-full gap-2 group">
                Send Event Proposal Request
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-bloomer-muted text-center mt-4 tracking-wide">
                We respond within 24 hours &nbsp;·&nbsp;{' '}
                <a href="https://wa.me/61416757654" target="_blank" rel="noopener noreferrer"
                   className="text-green-600 hover:underline">
                  WhatsApp 0416 757 654
                </a>
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
