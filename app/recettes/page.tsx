'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Clock, Users, ChefHat } from 'lucide-react'
import { RECETTES, CategorieRecette } from '@/lib/recettes'
import { useLanguage } from '@/context/LanguageContext'

const CAT_KEYS: Record<CategorieRecette | 'Tous', string> = {
  Tous: 'all',
  Viande: 'viande',
  Volaille: 'volaille',
  Mijoté: 'mijote',
  BBQ: 'bbq',
  Légumes: 'legumes',
  Soupe: 'soupe',
}

const DIFF_KEYS: Record<string, string> = {
  Facile: 'facile',
  Moyen: 'moyen',
  Difficile: 'difficile',
}

const DIFFICULTE_COLOR: Record<string, string> = {
  Facile: 'text-green-700 bg-green-50',
  Moyen: 'text-amber-700 bg-amber-50',
  Difficile: 'text-red-700 bg-red-50',
}

const ALL_CATEGORIES: (CategorieRecette | 'Tous')[] = [
  'Tous', 'Viande', 'Volaille', 'Mijoté', 'BBQ', 'Légumes', 'Soupe',
]

function farmProductCount(recette: (typeof RECETTES)[0]): number {
  return recette.ingredients.filter((i) => i.productId).length
}

export default function RecettesPage() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<CategorieRecette | 'Tous'>('Tous')

  const filtered =
    activeCategory === 'Tous'
      ? RECETTES
      : RECETTES.filter((r) => r.categorie === activeCategory)

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 py-12 text-center space-y-3">
          <span className="text-green-700 font-bold uppercase tracking-wider text-sm">
            {t('recipes.tag')}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
            {t('recipes.title')}
          </h1>
          <p className="text-stone-500 max-w-xl mx-auto">
            {t('recipes.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? 'bg-green-700 text-white border-green-700'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-green-600 hover:text-green-700'
              }`}
            >
              {t(`recipes.categories.${CAT_KEYS[cat]}`)}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-stone-400 py-20">{t('recipes.noResults')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((recette) => {
              const totalTime = recette.tempsPrepMinutes + recette.tempsCuissonMinutes
              const farmCount = farmProductCount(recette)

              return (
                <Link
                  key={recette.slug}
                  href={`/recettes/${recette.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={recette.image}
                      alt={recette.titre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs bg-white/90 text-green-800 px-2.5 py-1 rounded-full font-semibold shadow-sm">
                        {t(`recipes.categories.${CAT_KEYS[recette.categorie]}`)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <div>
                      <h2 className="font-serif font-bold text-stone-900 text-lg group-hover:text-green-700 transition-colors leading-snug">
                        {recette.titre}
                      </h2>
                      <p className="text-stone-500 text-sm mt-1 line-clamp-2">{recette.description}</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-stone-500 mt-auto pt-3 border-t border-stone-100">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {totalTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {recette.personnagesBase} pers.
                      </span>
                      <span className={`flex items-center gap-1 ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${DIFFICULTE_COLOR[recette.difficulte]}`}>
                        <ChefHat className="h-3 w-3" />
                        {t(`recipes.levels.${DIFF_KEYS[recette.difficulte]}`)}
                      </span>
                    </div>

                    {farmCount > 0 && (
                      <p className="text-xs text-green-700 font-medium">
                        🌿 {farmCount} {t('recipes.farmProducts')}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
