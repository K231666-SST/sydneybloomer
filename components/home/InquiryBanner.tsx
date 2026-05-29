'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function InquiryBanner() {
  return (
    <section className="section-pad bg-bloomer-cream">
      <div className="container-bloomer text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <p className="label mb-4">Start Your Journey</p>
          <h2 className="font-serif text-4xl lg:text-5xl mb-6 leading-tight">
            Event Inquiry
          </h2>
          <p className="text-bloomer-muted text-base leading-relaxed mb-10">
            Please provide your event details below. Our creative director will reach out within 24 hours to schedule a consultation.
          </p>

          {/* Mini inline form */}
          <form
            className="bg-white border border-bloomer-border p-8 lg:p-10 text-left"
            onSubmit={e => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">
                  Full Name
                </label>
                <input type="text" placeholder="Alexandra Thompson" className="input-field" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">
                  Email Address
                </label>
                <input type="email" placeholder="your@email.com" className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">
                  Event Date
                </label>
                <input type="date" className="input-field" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">
                  Event Type
                </label>
                <select className="select-field">
                  <option value="">Select type...</option>
                  <option>Wedding</option>
                  <option>Corporate</option>
                  <option>Birthday</option>
                  <option>Hotel / Hospitality</option>
                  <option>Real Estate</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">
                  Estimated Budget
                </label>
                <input type="text" placeholder="e.g. $2,000–$5,000" className="input-field" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">
                  Venue (optional)
                </label>
                <input type="text" placeholder="Venue name or suburb" className="input-field" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">
                Vision & Details
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your vision, colour palette, style preferences, or anything that inspires you..."
                className="input-field resize-none"
              />
            </div>
            <button type="submit" className="btn-gold w-full gap-2 group">
              Send Event Proposal Request
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
