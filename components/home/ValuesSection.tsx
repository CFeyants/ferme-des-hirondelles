'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from '@/lib/hooks/useInView'

export function ValuesSection() {
  const { t, ta } = useLanguage()
  const { ref, inView } = useInView(0.1)
  const valuesList = ta('home.values.list') as string[]

  const fadeIn = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  })

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-3">
          <span className="text-[#2d5a27] font-bold uppercase tracking-widest text-xs">
            Notre engagement
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1a2e17] font-normal">
            {t('home.values.title')}
          </h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Tile A — grande, vert clair — valeurs de la ferme */}
          <div
            className="md:col-span-2 rounded-3xl p-7 flex flex-col justify-between min-h-[220px]"
            style={{ backgroundColor: '#edf4eb', ...fadeIn(0) }}
          >
            <div className="w-10 h-10 rounded-2xl bg-white/70 flex items-center justify-center text-xl mb-5">
              🌿
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-[#3a5c35] leading-relaxed">{t('home.values.p1')}</p>
              <p className="text-[#3a5c35] leading-relaxed">{t('home.values.p2')}</p>
              <div className="pt-1">
                <p className="font-semibold text-[#1a2e17] mb-1.5">{t('home.values.listTitle')}</p>
                <ul className="space-y-1">
                  {valuesList?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#3a5c35]">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#2d5a27] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tile B — photo + adresse en overlay */}
          <div
            className="rounded-3xl overflow-hidden relative min-h-[220px]"
            style={fadeIn(0.08)}
          >
            <img
              src="/PhotoPointdevente.png"
              alt="Point de vente — Ferme des Hirondelles"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <p className="font-serif text-lg font-normal leading-tight">{t('home.bento.b.title')}</p>
              <p className="text-sm text-white/80 mt-0.5">{t('home.bento.b.text')}</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=33+rue+du+Moulin+1950+Kraainem+Belgique"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full border border-white/30 backdrop-blur-sm transition-colors"
              >
                {t('home.bento.b.badge')}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Tile C — note Google */}
          <div
            className="rounded-3xl p-7 flex flex-col justify-between min-h-[180px]"
            style={{ backgroundColor: '#fdf6e3', ...fadeIn(0.16) }}
          >
            <div className="text-2xl mb-3">⭐</div>
            <div>
              <p className="font-serif text-4xl text-[#1a2e17] font-normal leading-none">
                {t('home.bento.c.title')}
              </p>
              <p className="text-[#5a7a54] font-medium text-sm mt-1">{t('home.bento.c.text')}</p>
              <p className="text-[#5a7a54]/60 text-xs mt-0.5">{t('home.bento.c.sub')}</p>
            </div>
          </div>

          {/* Tile D — grande, vert foncé */}
          <div
            className="md:col-span-2 rounded-3xl p-7 flex flex-col justify-between text-white min-h-[180px]"
            style={{ backgroundColor: '#2d5a27', ...fadeIn(0.24) }}
          >
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl mb-5">
              ♻️
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-normal">{t('home.bento.d.title')}</h3>
              <p className="text-white/75 text-sm leading-relaxed max-w-md">
                {t('home.bento.d.text')}
              </p>
              <Link
                href="/boutique"
                className="inline-flex items-center gap-1 text-xs font-medium text-white border border-white/40 hover:bg-white/10 px-4 py-2 rounded-full transition-colors"
              >
                {t('home.bento.d.cta')} <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
