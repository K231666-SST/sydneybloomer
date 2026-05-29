'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import BlooomerMark from '@/components/ui/BlooomerMark'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'CUSTOMER' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    setLoading(true); setError('')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role }),
    })
    setLoading(false)
    if (!res.ok) { const d = await res.json(); setError(d.message ?? 'Registration failed.'); return }
    router.push('/auth/login?registered=1')
  }

  return (
    <div className="min-h-screen bg-bloomer-cream flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center gap-3 mb-10">
          <BlooomerMark className="h-9 text-bloomer-gold" />
          <p className="font-serif text-xl tracking-[0.08em]">SYDNEY BLOOMER</p>
        </div>

        <h1 className="font-serif text-4xl mb-2">Create your account.</h1>
        <p className="text-bloomer-muted text-sm mb-10">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-bloomer-gold hover-underline">Sign in</Link>
        </p>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 mb-5">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Full Name</label>
            <input name="name" required value={form.name} onChange={handle} placeholder="Your name" className="input-field" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Email</label>
            <input name="email" type="email" required value={form.email} onChange={handle} placeholder="you@email.com" className="input-field" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Account Type</label>
            <select name="role" value={form.role} onChange={handle} className="select-field">
              <option value="CUSTOMER">Customer — Individual or gift orders</option>
              <option value="WHOLESALE">Wholesale — Business bulk orders</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Password</label>
            <div className="relative">
              <input name="password" type={showPw ? 'text' : 'password'} required
                     value={form.password} onChange={handle} placeholder="Min. 8 characters" className="input-field pr-12" />
              <button type="button" onClick={() => setShowPw(v => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-bloomer-muted hover:text-bloomer-dark">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Confirm Password</label>
            <input name="confirm" type="password" required value={form.confirm} onChange={handle} placeholder="Repeat password" className="input-field" />
          </div>
          <button type="submit" disabled={loading} className="btn-gold w-full gap-2 mt-2 group">
            {loading ? 'Creating account…' : 'Create Account'}
            {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
          </button>
          <p className="text-[10px] text-center text-bloomer-muted leading-relaxed">
            By creating an account you agree to our{' '}
            <Link href="/terms" className="underline">Terms</Link> and{' '}
            <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </form>
      </motion.div>
    </div>
  )
}
