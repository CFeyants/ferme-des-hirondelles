'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Locale, translations, createT } from '@/lib/i18n/translations'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  ta: (key: string) => any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale
    if (saved && ['fr', 'nl', 'en'].includes(saved)) {
      setLocaleState(saved)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    document.cookie = `locale=${newLocale};path=/;max-age=31536000;SameSite=Lax`
  }

  const t = createT(locale)

  // For accessing arrays/objects (e.g. steps array)
  const ta = (key: string): any => {
    return key.split('.').reduce((acc: any, k) => acc?.[k], translations[locale])
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, ta }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
