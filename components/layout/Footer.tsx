'use client'

import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Facebook, Clock, Tractor } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useLanguage } from '@/context/LanguageContext'

export const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="bg-stone-900 text-stone-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-stone-100">
              <Tractor className="h-6 w-6" />
              <span className="font-serif text-xl font-bold">Ferme des Hirondelles</span>
            </div>
            <p className="text-sm text-stone-400">{t('footer.tagline')}</p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/people/Ferme-des-hirondelles/100057047996643/" target="_blank" rel="noreferrer" className="hover:text-green-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-stone-100 text-lg">{t('footer.findUs')}</h3>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 mt-1 shrink-0 text-green-600" />
              <div>
                <p>33 rue du Moulin</p>
                <p>1950 Crainhem (Kraainem)</p>
                <p>Belgique</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-green-600" />
              {/* TODO: remplacer par le vrai numéro de téléphone */}
              <p>+32 [PHONE]</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-stone-100 text-lg">{t('footer.pickup')}</h3>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 mt-1 shrink-0 text-green-600" />
              <div className="space-y-1 text-sm">
                <p><span className="font-semibold text-white">{t('footer.tuesday')}</span> {t('footer.tuesdayTime')}</p>
                <p><span className="font-semibold text-white">{t('footer.friday')}</span> {t('footer.fridayTime')} <span className="text-green-400 text-xs">{t('footer.pickupOnly')}</span></p>
                <p><span className="font-semibold text-white">{t('footer.saturday')}</span> {t('footer.saturdayTime')}</p>
                <Separator className="my-2 bg-stone-700" />
                <p className="text-orange-300">{t('footer.deadline')}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-stone-800" />

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} Ferme des Hirondelles. {t('footer.rights')}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/mentions-legales" className="hover:text-stone-300 transition-colors">{t('footer.legal')}</Link>
            <Link href="/cgv" className="hover:text-stone-300 transition-colors">{t('footer.cgv')}</Link>
            <Link href="/confidentialite" className="hover:text-stone-300 transition-colors">{t('footer.privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
