'use client'

import { useLanguage } from '@/context/LanguageContext'

export const ConstructionBanner = () => {
  const { t } = useLanguage()
  return (
    <div className="bg-amber-500 text-white text-center py-2.5 px-4 text-sm font-semibold">
      {t('layout.construction')}
    </div>
  )
}
