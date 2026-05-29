'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import BlooomerMark from '@/components/ui/BlooomerMark'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { ...form, redirect: false })
    setLoading(false)
    if (res?.error) { setError('Invalid email or password.'); return }
    router.push('/')
  }

  const googleLogin = () => signIn('google', { callbackUrl: '/' })

  return (
    <div className="min-h-screen bg-bloomer-cream flex">

      {/* Left panel — decorative */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-bloomer-dark">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1200')" }}
        />
        <div className="relative z-10 flex flex-col justify-between h-full p-16">
          <div className="flex items-center gap-3">
            <BlooomerMark className="h-10 text-gold-400" />
            <div>
              <p className="font-serif text-xl text-white tracking-[0.08em]">SYDNEY BLOOMER</p>
              <p className="text-[9px] tracking-[0.25em] uppercase text-white/40 mt-0.5">Floral Atelier</p>
            </div>
          </div>
          <div>
            <blockquote className="font-serif text-3xl italic text-white leading-relaxed mb-6">
              &ldquo;Every flower is a soul blossoming in nature.&rdquo;
            </blockquote>
            <p className="text-white/40 text-sm">Gérard de Nerval</p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <BlooomerMark className="h-9 text-bloomer-gold" />
            <p className="font-serif text-xl tracking-[0.08em]">SYDNEY BLOOMER</p>
          </div>

          <h1 className="font-serif text-4xl mb-2">Welcome back.</h1>
          <p className="text-bloomer-muted text-sm mb-10">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-bloomer-gold hover-underline">Create one</Link>
          </p>

          {/* Google SSO */}
          <button
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-3 border border-bloomer-border
                       bg-white py-3.5 text-sm text-bloomer-dark hover:bg-cream-100 transition-colors mb-6"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-bloomer-border" />
            <span className="text-[11px] text-bloomer-muted uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-bloomer-border" />
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Email</label>
              <input name="email" type="email" required value={form.email} onChange={handle}
                     placeholder="you@email.com" className="input-field" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-bloomer-muted mb-1.5">Password</label>
              <div className="relative">
                <input name="password" type={showPw ? 'text' : 'password'} required
                       value={form.password} onChange={handle}
                       placeholder="••••••••" className="input-field pr-12" />
                <button type="button" onClick={() => setShowPw(v => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-bloomer-muted hover:text-bloomer-dark">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <Link href="/auth/forgot-password" className="text-[11px] text-bloomer-muted hover:text-bloomer-gold">
                Forgot password?
              </Link>
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full gap-2 mt-2 group">
              {loading ? 'Signing in…' : 'Sign In'}
              {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
