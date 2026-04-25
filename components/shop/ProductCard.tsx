'use client'

import React, { useState } from 'react'
import { Product } from '@/data'
import { useStore } from '@/context/StoreContext'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

const GRAM_STEP = 0.250

function formatWeight(kg: number): string {
  const grams = Math.round(kg * 1000)
  if (grams < 1000) return `${grams} g`
  const kgVal = grams / 1000
  if (kgVal % 1 === 0) return `${kgVal} kg`
  return `${kgVal.toFixed(3).replace(/\.?0+$/, '').replace('.', ',')} kg`
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useStore()
  const { t } = useLanguage()
  const isKg = product.unit === 'kg'
  const [quantity, setQuantity] = useState(isKg ? GRAM_STEP : 1)

  const nameKey = `products.${product.id}.name`
  const descKey = `products.${product.id}.description`
  const displayName = t(nameKey) === nameKey ? product.name : t(nameKey)
  const displayDescription = t(descKey) === descKey ? product.description : t(descKey)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(isKg ? GRAM_STEP : 1)
  }

  const decrement = () => {
    if (isKg) {
      const next = Math.round((quantity - GRAM_STEP) * 1000) / 1000
      if (next >= GRAM_STEP) setQuantity(next)
    } else {
      setQuantity(Math.max(1, quantity - 1))
    }
  }

  const increment = () => {
    if (isKg) setQuantity(Math.round((quantity + GRAM_STEP) * 1000) / 1000)
    else setQuantity(quantity + 1)
  }

  return (
    <div className="group bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold uppercase tracking-wider transform -rotate-12">
              {t('product.outOfStock')}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-1 rounded-sm">
            {product.category}
          </span>
          <span className="font-bold text-lg text-stone-900">
            {product.price.toFixed(2)}€ <span className="text-sm font-normal text-stone-500">/ {product.unit}</span>
          </span>
        </div>

        <h3 className="text-xl font-bold text-stone-900 mb-2">{displayName}</h3>
        <p className="text-stone-600 text-sm mb-6 flex-1 line-clamp-3">{displayDescription}</p>

        <div className="flex items-center gap-3 mt-auto">
          {product.inStock ? (
            <>
              <div className="flex items-center border border-stone-300 rounded-md">
                <button onClick={decrement} className="px-3 py-2 hover:bg-stone-100 text-stone-600">-</button>
                <span className="w-16 text-center font-medium text-sm">{isKg ? formatWeight(quantity) : quantity}</span>
                <button onClick={increment} className="px-3 py-2 hover:bg-stone-100 text-stone-600">+</button>
              </div>
              <Button onClick={handleAddToCart} className="flex-1 bg-green-700 hover:bg-green-800 text-white">
                <ShoppingCart className="mr-2 h-4 w-4" /> {t('product.addToCart')}
              </Button>
            </>
          ) : (
            <Button disabled className="w-full bg-stone-100 text-stone-400 border border-stone-200">{t('product.outOfStock')}</Button>
          )}
        </div>
      </div>
    </div>
  )
}
