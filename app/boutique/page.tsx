'use client'

import React, { useState } from 'react'
import { useStore } from '@/context/StoreContext'
import { useLanguage } from '@/context/LanguageContext'
import { ProductCard } from '@/components/shop/ProductCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Category } from '@/data'
import { Search } from 'lucide-react'
import { OrderCountdown } from '@/components/shop/OrderCountdown'

export default function ShopPage() {
  const { products } = useStore()
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <OrderCountdown />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">{t('shop.title')}</h1>
          <p className="text-stone-600">{t('shop.subtitle')}</p>
        </div>
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <Input
            placeholder={t('shop.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-stone-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {(['all', 'viande', 'legumes'] as const).map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? 'default' : 'outline'}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? 'bg-green-700 hover:bg-green-800' : 'text-stone-600'}
          >
            {cat === 'all' ? t('shop.all') : cat === 'viande' ? t('shop.meat') : t('shop.veggies')}
          </Button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 rounded-lg border border-dashed border-stone-200">
          <p className="text-lg text-stone-500">{t('shop.noResults')}</p>
          <Button variant="link" onClick={() => { setActiveCategory('all'); setSearchQuery('') }} className="text-green-600">
            {t('shop.resetFilters')}
          </Button>
        </div>
      )}
    </div>
  )
}
