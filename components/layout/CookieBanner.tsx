'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

const STORAGE_KEY = 'cookie_consent'

export const CookieBanner = () => {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-stone-900 border-t border-stone-700 shadow-2xl">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-stone-300 flex-1">
          {t('cookies.message')}{' '}
          <Link href="/confidentialite" className="text-green-400 hover:text-green-300 underline">
            {t('cookies.learnMore')}
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-stone-400 hover:text-stone-200 border border-stone-600 hover:border-stone-400 rounded transition-colors"
          >
            {t('cookies.decline')}
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-500 text-white rounded transition-colors"
          >
            {t('cookies.accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
