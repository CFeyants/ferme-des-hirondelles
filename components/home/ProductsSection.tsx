'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/shop/ProductCard'
import { PRODUCTS } from '@/data'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from '@/lib/hooks/useInView'

// IDs des produits mis en avant : Colis porc, Poulet entier, Saucisses
const FEATURED_IDS = ['127', '130', '120']

export function ProductsSection() {
  const { t } = useLanguage()
  const { ref, inView } = useInView(0.1)

  const featured = FEATURED_IDS
    .map((id) => PRODUCTS.find((p) => String(p.id) === id))
    .filter(Boolean) as typeof PRODUCTS

  return (
    <section className="bg-[#f7faf6] py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-3">
          <span className="text-[#2d5a27] font-bold uppercase tracking-widest text-xs">
            Click &amp; Collect
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1a2e17] font-normal">
            {t('home.products.title')}
          </h2>
          <p className="text-[#5a7a54] max-w-xl mx-auto">{t('home.products.subtitle')}</p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          {featured.map((product, idx) => (
            <div
              key={product.id}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.5s ease ${idx * 0.1}s, transform 0.5s ease ${idx * 0.1}s`,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/boutique">
            <Button
              variant="outline"
              className="border-[#2d5a27] text-[#2d5a27] hover:bg-[#2d5a27] hover:text-white rounded-full px-8"
            >
              {t('home.products.viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
