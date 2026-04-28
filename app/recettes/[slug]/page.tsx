'use client'

import React, { useState, useMemo } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, Users, ChefHat, Minus, Plus, ShoppingBasket, ArrowLeft, CheckCircle2, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RECETTES } from '@/lib/recettes'
import { PRODUCTS } from '@/data'
import { useStore } from '@/context/StoreContext'
import { useLanguage } from '@/context/LanguageContext'

const CAT_KEYS: Record<string, string> = {
  Viande: 'viande', Volaille: 'volaille', Mijoté: 'mijote',
  BBQ: 'bbq', Légumes: 'legumes', Soupe: 'soupe',
}
const DIFF_KEYS: Record<string, string> = {
  Facile: 'facile', Moyen: 'moyen', Difficile: 'difficile',
}
const UNIT_KEYS: Record<string, string> = {
  'c. à soupe': 'soupe',
  'tranche(s)': 'tranche',
  'pièce': 'piece',
  'pièce(s)': 'pieceS',
  'pièce (~1,5 kg)': 'pieceKg',
  'botte(s)': 'botte',
  'gousse(s)': 'gousse',
  'bouquet': 'bouquet',
  'feuille(s)': 'feuille',
  'branche(s)': 'branche',
  'au goût': 'auGout',
  'ml (1 boîte)': 'boite',
  'tête entière': 'teteEntiere',
}
const DIFFICULTE_COLOR: Record<string, string> = {
  Facile: 'text-green-700 bg-green-50 border-green-200',
  Moyen: 'text-amber-700 bg-amber-50 border-amber-200',
  Difficile: 'text-red-700 bg-red-50 border-red-200',
}

function roundQty(qty: number, unite: string): number {
  const u = unite.toLowerCase()
  if (u === 'kg') {
    const g = qty * 1000
    if (g < 10) return Math.round(g / 0.5) * 0.5 / 1000
    if (g < 100) return Math.round(g / 5) * 5 / 1000
    return Math.round(g / 10) * 10 / 1000
  }
  if (u === 'g') {
    if (qty < 10) return Math.round(qty / 0.5) * 0.5
    if (qty < 100) return Math.round(qty / 5) * 5
    return Math.round(qty / 10) * 10
  }
  if (u === 'ml' || u === 'cl' || u === 'l') return Math.round(qty)
  if (u.includes('pièce') || u === 'œuf' || u === 'oeufs') return Math.ceil(qty)
  if (u.includes('botte')) return Math.round(qty / 0.5) * 0.5
  return Math.round(qty * 10) / 10
}

function formatQty(qty: number, unite: string): string {
  const rounded = roundQty(qty, unite)
  if (unite === 'kg' && rounded < 1) return `${Math.round(rounded * 1000)} g`
  return Number.isInteger(rounded) ? `${rounded}` : `${rounded}`
}


export default function RecetteDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const { addToCart } = useStore()
  const { t } = useLanguage()

  const recette = RECETTES.find((r) => r.slug === slug)

  const [servings, setServings] = useState(recette?.personnagesBase ?? 4)
  const [added, setAdded] = useState(false)

  const tr = (subKey: string, fallback: string) => {
    const key = `recettes.${slug}.${subKey}`
    const val = t(key)
    return val === key ? fallback : val
  }
  const tp = (productId: string, fallback: string) => {
    const key = `products.${productId}.name`
    const val = t(key)
    return val === key ? fallback : val
  }
  const tUnit = (unite: string): string => {
    const unitKey = UNIT_KEYS[unite]
    if (!unitKey) return unite
    const val = t(`recipeUnits.${unitKey}`)
    return val === `recipeUnits.${unitKey}` ? unite : val
  }

  const farmIngredients = useMemo(
    () =>
      (recette?.ingredients ?? [])
        .filter((i) => i.productId)
        .map((i) => ({
          ...i,
          product: PRODUCTS.find((p) => String(p.id) === i.productId),
        }))
        .filter((i) => i.product),
    [recette]
  )

  if (!recette) return notFound()

  const ratio = servings / recette.personnagesBase

  const handleAddToCart = () => {
    farmIngredients.forEach(({ product, quantitePourBase, unite }) => {
      if (!product) return
      const rounded = roundQty(quantitePourBase * ratio, unite)
      addToCart(product, Math.max(1, Math.ceil(rounded)))
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 3000)
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Back */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/recettes" className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-green-700 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          {t('recipes.back')}
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left — Photo + meta */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <img src={recette.image} alt={recette.titre} className="w-full h-full object-cover" />
            </div>

            {/* Meta badges */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="space-y-1">
                  <Clock className="h-5 w-5 text-stone-400 mx-auto" />
                  <p className="text-xs text-stone-500">{t('recipes.prep')}</p>
                  <p className="font-semibold text-stone-800 text-sm">{recette.tempsPrepMinutes} min</p>
                </div>
                <div className="space-y-1">
                  <Timer className="h-5 w-5 text-stone-400 mx-auto" />
                  <p className="text-xs text-stone-500">{t('recipes.cooking')}</p>
                  <p className="font-semibold text-stone-800 text-sm">{recette.tempsCuissonMinutes} min</p>
                </div>
                <div className="space-y-1">
                  <ChefHat className="h-5 w-5 text-stone-400 mx-auto" />
                  <p className="text-xs text-stone-500">{t('recipes.difficulty')}</p>
                  <p className={`font-semibold text-sm px-2 py-0.5 rounded-full border ${DIFFICULTE_COLOR[recette.difficulte]}`}>
                    {t(`recipes.levels.${DIFF_KEYS[recette.difficulte]}`)}
                  </p>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {recette.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Farm products cart */}
            {farmIngredients.length > 0 && (
              <div className="bg-green-50 rounded-2xl border border-green-200 p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-green-900 flex items-center gap-2">
                    <ShoppingBasket className="h-4 w-4" />
                    {t('recipes.farmProductsTitle')}
                  </h3>
                  <p className="text-xs text-green-700 mt-0.5">{t('recipes.farmProductsSub')}</p>
                </div>

                {/* Servings selector */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-stone-700 flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {t('recipes.servings')}
                  </span>
                  <div className="flex items-center gap-2 bg-white rounded-full border border-stone-200 px-1 py-0.5">
                    <button
                      onClick={() => setServings((s) => Math.max(1, s - 1))}
                      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors disabled:opacity-40"
                      disabled={servings <= 1}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-stone-900">{servings}</span>
                    <button
                      onClick={() => setServings((s) => Math.min(20, s + 1))}
                      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors disabled:opacity-40"
                      disabled={servings >= 20}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Product list */}
                <ul className="space-y-2">
                  {farmIngredients.map(({ product, quantitePourBase, unite }) => {
                    const scaled = quantitePourBase * ratio
                    return (
                      <li key={product!.id} className="flex items-center justify-between text-sm">
                        <span className="text-stone-700">{tp(product!.id, product!.name)}</span>
                        <span className="font-medium text-green-800">
                          {formatQty(scaled, unite)}{(unite !== 'kg' || scaled >= 1) ? ` ${tUnit(unite)}` : ''}
                        </span>
                      </li>
                    )
                  })}
                </ul>

                <Button
                  onClick={handleAddToCart}
                  className={`w-full rounded-full font-semibold transition-all ${
                    added ? 'bg-green-500 hover:bg-green-500 text-white' : 'bg-green-700 hover:bg-green-800 text-white'
                  }`}
                >
                  {added ? (
                    <><CheckCircle2 className="mr-2 h-4 w-4" />{t('recipes.addedToCart')}</>
                  ) : (
                    <><ShoppingBasket className="mr-2 h-4 w-4" />{t('recipes.addToCart')}</>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Right — Title, ingredients, steps */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-3">
              <span className="text-green-700 font-bold uppercase tracking-wider text-xs">
                {t(`recipes.categories.${CAT_KEYS[recette.categorie]}`)}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 leading-tight">
                {tr('titre', recette.titre)}
              </h1>
              <p className="text-stone-600 text-lg leading-relaxed">{tr('description', recette.description)}</p>
            </div>

            {/* Ingredients */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
              <h2 className="font-serif font-bold text-stone-900 text-xl">{t('recipes.ingredients')}</h2>
              <p className="text-xs text-stone-400">
                {t('recipes.for')} {servings} {servings > 1 ? t('recipes.persons') : t('recipes.person')}
              </p>
              <ul className="divide-y divide-stone-100">
                {recette.ingredients.map((ing, idx) => {
                  const scaled = ing.quantitePourBase * ratio
                  return (
                    <li
                      key={idx}
                      className={`flex items-center justify-between py-2.5 text-sm ${ing.productId ? 'text-stone-800' : 'text-stone-500'}`}
                    >
                      <span className="flex items-center gap-2">
                        {ing.productId && <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />}
                        {tr(`ingredients.${idx}.nom`, ing.nom)}
                        {ing.note && <span className="text-xs text-stone-400 italic">({ing.note})</span>}
                      </span>
                      <span className={`font-medium tabular-nums ${ing.productId ? 'text-green-800' : ''}`}>
                        {formatQty(scaled, ing.unite)}{(ing.unite !== 'kg' || scaled >= 1) ? ` ${tUnit(ing.unite)}` : ''}
                      </span>
                    </li>
                  )
                })}
              </ul>
              {farmIngredients.length > 0 && (
                <p className="text-xs text-green-700 pt-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5" />
                  {t('recipes.available')}
                </p>
              )}
            </div>

            {/* Steps */}
            <div className="space-y-4">
              <h2 className="font-serif font-bold text-stone-900 text-xl">{t('recipes.preparation')}</h2>
              <ol className="space-y-4">
                {recette.etapes.map((etape, idx) => (
                  <li key={etape.numero} className="bg-white rounded-xl border border-stone-200 p-5 flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-700 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                      {etape.numero}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-stone-900">{tr(`etapes.${idx}.titre`, etape.titre)}</h3>
                        {etape.dureeMinutes && (
                          <span className="text-xs text-stone-400 flex items-center gap-1 shrink-0">
                            <Clock className="h-3 w-3" />
                            {etape.dureeMinutes} min
                          </span>
                        )}
                      </div>
                      <p className="text-stone-600 text-sm leading-relaxed">{tr(`etapes.${idx}.description`, etape.description)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Chef tip */}
            {recette.conseilChef && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
                <ChefHat className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 text-sm mb-1">{t('recipes.chefTip')}</p>
                  <p className="text-amber-800 text-sm leading-relaxed">{tr('conseilChef', recette.conseilChef ?? '')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
