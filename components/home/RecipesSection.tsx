'use client'

import React from 'react'
import Link from 'next/link'
import { Clock, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RECETTES } from '@/lib/recettes'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from '@/lib/hooks/useInView'

const CAT_KEYS: Record<string, string> = {
  Viande: 'viande', Volaille: 'volaille', Mijoté: 'mijote',
  BBQ: 'bbq', Légumes: 'legumes', Soupe: 'soupe',
}

export function RecipesSection() {
  const { t } = useLanguage()
  const { ref, inView } = useInView(0.1)
  const featured = RECETTES.slice(0, 3)

  return (
    <section className="bg-[#f7faf6] py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-3">
          <span className="text-[#2d5a27] font-bold uppercase tracking-widest text-xs">
            {t('home.inspiration.tag')}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1a2e17] font-normal">
            {t('home.inspiration.title')}
          </h2>
          <p className="text-[#5a7a54] max-w-xl mx-auto">{t('home.inspiration.subtitle')}</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featured.map((recette, idx) => {
            const farmCount = recette.ingredients.filter((i) => i.productId).length
            const totalTime = recette.tempsPrepMinutes + recette.tempsCuissonMinutes
            return (
              <Link
                key={recette.slug}
                href={`/recettes/${recette.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.5s ease ${idx * 0.1}s, transform 0.5s ease ${idx * 0.1}s`,
                }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={recette.image}
                    alt={recette.titre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-[#edf4eb] text-[#2d5a27] px-2.5 py-1 rounded-full font-medium">
                      {t(`recipes.categories.${CAT_KEYS[recette.categorie] ?? recette.categorie.toLowerCase()}`)}
                    </span>
                    <span className="text-xs text-stone-400">{recette.difficulte}</span>
                  </div>
                  <h3 className="font-serif text-stone-900 font-normal group-hover:text-[#2d5a27] transition-colors leading-snug">
                    {recette.titre}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {totalTime} min
                    </span>
                    {farmCount > 0 && (
                      <span className="text-[#2d5a27] font-medium">
                        🌿 {farmCount} {t('recipes.farmProducts')}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center">
          <Link href="/recettes">
            <Button
              variant="outline"
              className="border-[#2d5a27] text-[#2d5a27] hover:bg-[#2d5a27] hover:text-white rounded-full px-8"
            >
              {t('home.inspiration.viewAll')} <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
