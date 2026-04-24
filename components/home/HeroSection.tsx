'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/LanguageContext'
import { isShopOpen } from '@/data'

export function HeroSection() {
  const { t } = useLanguage()
  const shopStatus = isShopOpen()

  return (
    <section className="bg-[#f7faf6] min-h-[88vh] flex items-center">
      <div className="container mx-auto px-4 py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — text */}
          <div className="space-y-7 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-[#c8e6c2] text-[#2d5a27] px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              <span className={`w-2 h-2 rounded-full ${shopStatus.isOpen ? 'bg-[#2d5a27] animate-pulse' : 'bg-red-400'}`} />
              {t('home.hero.badge')}
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[3.75rem] xl:text-7xl font-normal leading-[1.1] text-[#1a2e17]">
                {t('home.hero.title').split('\n').map((line, i) => (
                  <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                ))}
              </h1>
              <p className="text-lg text-[#5a7a54] leading-relaxed max-w-lg">
                {t('home.hero.subtitle')}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/boutique">
                <Button
                  size="lg"
                  className="bg-[#2d5a27] hover:bg-[#235020] text-white px-8 py-6 text-base rounded-full font-medium shadow-md hover:shadow-lg transition-all"
                >
                  {t('home.hero.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/recettes">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#2d5a27] text-[#2d5a27] hover:bg-[#edf4eb] px-8 py-6 text-base rounded-full font-medium"
                >
                  {t('home.hero.ctaRecipes')}
                </Button>
              </Link>
            </div>

            {/* Address + rating */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=33+rue+du+Moulin+1950+Kraainem+Belgique"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-[#5a7a54] hover:text-[#2d5a27] transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {t('home.hero.address')}
              </a>
              <span className="hidden sm:block text-stone-300">·</span>
              <span className="text-sm text-[#5a7a54]">{t('home.hero.rating')}</span>
            </div>
          </div>

          {/* Right — image */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-full aspect-[4/5]">
              {/* Organic blob shape */}
              <div
                className="w-full h-full overflow-hidden shadow-2xl"
                style={{ borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=700&h=875"
                  alt="Ferme des Hirondelles — Kraainem"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Google rating badge */}
              <div className="absolute bottom-8 -left-4 lg:-left-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-stone-100">
                <div className="w-9 h-9 rounded-full bg-[#edf4eb] flex items-center justify-center text-lg shrink-0">
                  ⭐
                </div>
                <div>
                  <p className="font-bold text-[#1a2e17] text-sm leading-none">4,8 / 5</p>
                  <p className="text-xs text-[#5a7a54] mt-0.5">Google Maps</p>
                </div>
              </div>

              {/* Decorative circle */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-30 -z-10"
                style={{ backgroundColor: '#e8c87a' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
