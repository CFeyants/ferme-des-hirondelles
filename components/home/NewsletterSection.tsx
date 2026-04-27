'use client'

import React, { useState } from 'react'
import { Mail, Leaf } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export function NewsletterSection() {
  const { t, locale } = useLanguage()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else if (res.status === 409) {
        setStatus('already')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-[#1a2e17] py-20">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 bg-green-800/50 text-green-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            <Leaf className="h-3.5 w-3.5" />
            {t('newsletter.tag')}
          </span>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl text-white font-normal mb-4">
          {t('newsletter.title')}
        </h2>
        <p className="text-stone-400 mb-10 max-w-lg mx-auto">
          {t('newsletter.subtitle')}
        </p>

        {status === 'success' ? (
          <div className="bg-green-800/40 border border-green-600/50 text-green-200 rounded-xl px-6 py-5 text-sm font-medium">
            ✓ {t('newsletter.success')}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-stone-500 rounded-xl focus:outline-none focus:border-green-400 focus:bg-white/15 transition-colors text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-green-600 hover:bg-green-500 disabled:opacity-60 text-white font-medium rounded-xl transition-colors text-sm shrink-0"
            >
              {status === 'loading' ? '...' : t('newsletter.button')}
            </button>
          </form>
        )}

        {status === 'already' && (
          <p className="mt-3 text-amber-400 text-sm">{t('newsletter.alreadySubscribed')}</p>
        )}
        {status === 'error' && (
          <p className="mt-3 text-red-400 text-sm">{t('newsletter.error')}</p>
        )}

        <p className="mt-5 text-xs text-stone-600">{t('newsletter.privacy')}</p>
      </div>
    </section>
  )
}
