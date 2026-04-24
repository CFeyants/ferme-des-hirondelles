'use client'

import React from 'react'
import { ShoppingBasket, CreditCard, ChefHat, MapPin } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from '@/lib/hooks/useInView'

const ICONS = [
  <ShoppingBasket key="basket" className="h-7 w-7" />,
  <CreditCard key="card" className="h-7 w-7" />,
  <ChefHat key="chef" className="h-7 w-7" />,
  <MapPin key="pin" className="h-7 w-7" />,
]

export function HowItWorksSection() {
  const { t, ta } = useLanguage()
  const steps = ta('home.howItWorks.steps') as { title: string; desc: string }[]
  const { ref, inView } = useInView(0.1)

  const stepDescs = [
    steps[0]?.desc,
    steps[1]?.desc,
    steps[2]?.desc,
    <span key="step4">
      {steps[3]?.desc}{' '}
      <a
        href="https://www.google.com/maps/search/?api=1&query=33+rue+du+Moulin+1950+Kraainem+Belgique"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#2d5a27] underline underline-offset-2 font-medium"
      >
        33 rue du Moulin, Kraainem
      </a>
    </span>,
  ]

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-3">
          <h2 className="font-serif text-3xl md:text-4xl text-[#1a2e17] font-normal">
            {t('home.howItWorks.title')}
          </h2>
          <p className="text-[#5a7a54] max-w-xl mx-auto">{t('home.howItWorks.subtitle')}</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center text-center px-6"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.5s ease ${idx * 0.12}s, transform 0.5s ease ${idx * 0.12}s`,
              }}
            >
              {/* Connector line (desktop) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] right-0 h-px bg-[#c8e6c2] z-0" />
              )}

              {/* Number + icon circle */}
              <div className="relative z-10 mb-5">
                <div className="w-16 h-16 rounded-full bg-[#edf4eb] border-2 border-[#c8e6c2] flex items-center justify-center text-[#2d5a27] mb-0">
                  {ICONS[idx]}
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#2d5a27] text-white text-[10px] font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
              </div>

              <h3 className="font-serif text-lg text-[#1a2e17] font-normal mb-2">{step.title}</h3>
              <p className="text-sm text-[#5a7a54] leading-relaxed">{stepDescs[idx]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
