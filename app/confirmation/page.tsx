'use client'

import React from 'react'
import Link from 'next/link'
import { useStore } from '@/context/StoreContext'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { CheckCircle, MapPin, Calendar, Printer } from 'lucide-react'

export default function ConfirmationPage() {
  const { lastOrder: order } = useStore()
  const { t } = useLanguage()

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('common.error')}</h2>
        <p>{t('confirmation.error')}</p>
        <Link href="/"><Button className="mt-4">{t('common.backHome')}</Button></Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center space-y-6 mb-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">{t('confirmation.title')}</h1>
        <p className="text-lg text-stone-600">
          {t('confirmation.subtitle')} <span className="font-mono font-bold text-stone-900">{order.id}</span>
        </p>
        <p className="text-stone-500 text-sm">{t('confirmation.emailSent')} {order.customerEmail}.</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-stone-50 border-b border-stone-200 flex justify-between items-center">
          <h2 className="font-bold text-lg">{t('confirmation.pickupDetails')}</h2>
          <Button variant="ghost" size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" /> {t('confirmation.print')}
          </Button>
        </div>
        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-2">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <p className="font-bold">{t('confirmation.location')}</p>
                  <p>Ferme des Hirondelles</p>
                  <p>33 rue du Moulin, 1950 Crainhem</p>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <p className="font-bold">{t('confirmation.pickupDate')}</p>
                  <p className="capitalize">{order.pickupDate}</p>
                  <p className="text-sm text-stone-500">
                    {order.pickupDate === 'vendredi' ? t('confirmation.fridayTime') : t('confirmation.saturdayTime')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t pt-6">
            <h3 className="font-bold mb-4">{t('confirmation.products')}</h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-mono">{(item.price * item.quantity).toFixed(2)}€</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
              <span>{t('confirmation.total')}</span>
              <span>{order.total.toFixed(2)}€</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/"><Button variant="outline" className="mr-4">{t('confirmation.backHome')}</Button></Link>
        <Link href="/boutique"><Button>{t('confirmation.newOrder')}</Button></Link>
      </div>
    </div>
  )
}
