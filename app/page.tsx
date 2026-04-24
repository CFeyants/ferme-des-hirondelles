'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, ShoppingBasket, MapPin, CreditCard, Star, ChevronRight, Clock } from 'lucide-react'
import { isShopOpen } from '@/data'
import { RECETTES } from '@/lib/recettes'
import { OrderCountdown } from '@/components/shop/OrderCountdown'
import { useLanguage } from '@/context/LanguageContext'

const GOOGLE_REVIEWS = [
  {
    name: 'Valérie D.',
    rating: 5,
    text: 'Très chouette endroit pour acheter des légumes frais directement à la ferme. Personnel accueillant et sympathique.',
  },
  {
    name: 'Marc T.',
    rating: 5,
    text: 'La viande est excellente, on sent vraiment la différence avec ce qu\'on trouve en grande surface. Les saucisses artisanales sont un must !',
  },
  {
    name: 'Sophie L.',
    rating: 5,
    text: 'Super initiative de proposer le click & collect. Produits frais, prix honnêtes et on sait exactement d\'où ça vient. Je recommande vivement !',
  },
]

export default function HomePage() {
  const shopStatus = isShopOpen()
  const { t, ta } = useLanguage()
  const steps = ta('home.howItWorks.steps') as { title: string; desc: string }[]
  const valuesList = ta('home.values.list') as string[]

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1593341061446-5bcea81db2c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Farm landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight">
            {t('home.hero.title').split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
            ))}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-stone-200">
            {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/boutique">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full">
                {t('home.hero.cta')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/a-propos">
              <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 px-8 py-6 text-lg rounded-full">
                {t('home.hero.about')}
              </Button>
            </Link>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 bg-stone-900/60 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-stone-700">
            <span className={`w-2 h-2 rounded-full ${shopStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
            {shopStatus.message}
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="container mx-auto px-4 -mt-8">
        <OrderCountdown />
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">{t('home.howItWorks.title')}</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">{t('home.howItWorks.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <ShoppingBasket className="h-8 w-8 text-green-600" />, ...steps[0] },
            { icon: <CreditCard className="h-8 w-8 text-green-600" />, ...steps[1] },
            { icon: <Calendar className="h-8 w-8 text-green-600" />, ...steps[2] },
            {
              icon: <MapPin className="h-8 w-8 text-green-600" />,
              title: steps[3]?.title,
              desc: (
                <span>{steps[3]?.desc}<br />
                  <a href="https://www.google.com/maps/search/?api=1&query=33+rue+du+Moulin+1950+Crainhem+Belgique" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-medium inline-block mt-2">📍 33 rue du Moulin, 1950 Crainhem</a>
                </span>
              ),
            },
          ].map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow text-center space-y-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">{step.icon}</div>
              <h3 className="text-xl font-bold text-stone-900">{step.title}</h3>
              <p className="text-stone-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-stone-100 py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <div>
              <span className="text-green-700 font-bold uppercase tracking-wider text-sm">{t('home.values.tag')}</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-1">{t('home.values.title')}</h2>
            </div>
            <div className="space-y-4 text-lg text-stone-700">
              <p>{t('home.values.p1')}</p>
              <p>{t('home.values.p2')}</p>
              <div className="bg-white/50 p-4 rounded-lg border border-stone-200">
                <p className="font-bold text-stone-900 mb-2">{t('home.values.listTitle')}</p>
                <ul className="list-disc list-inside space-y-1 ml-2 text-base">
                  {valuesList?.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>
            <div className="pt-6">
              <Link href="/boutique">
                <Button size="lg" variant="default" className="bg-stone-900 text-white hover:bg-stone-800">{t('home.values.cta')}</Button>
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1670012015063-14a6f2102a50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Farmer holding vegetables" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">{t('home.reviews.title')}</h2>
          <p className="text-stone-500">{t('home.reviews.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GOOGLE_REVIEWS.map((review, i) => (
            <div key={i} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-700 leading-relaxed flex-1">"{review.text}"</p>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <span className="font-semibold text-stone-800 text-sm">{review.name}</span>
                <span className="text-xs text-stone-400">Google</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-stone-400 mt-6">
          {t('home.reviews.average')}{' '}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Zwaluwenboerderij+Ferme+des+Hirondelles+Kraainem"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            {t('home.reviews.viewOnGoogle')}
          </a>
        </p>
      </section>

      {/* Besoin d'inspiration */}
      <section className="bg-stone-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 space-y-2">
            <span className="text-green-700 font-bold uppercase tracking-wider text-sm">{t('home.inspiration.tag')}</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">{t('home.inspiration.title')}</h2>
            <p className="text-stone-500">{t('home.inspiration.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {RECETTES.slice(0, 3).map((recette) => (
              <Link key={recette.slug} href={`/recettes/${recette.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={recette.image} alt={recette.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">{recette.categorie}</span>
                    <span className="text-xs text-stone-400">{recette.difficulte}</span>
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 group-hover:text-green-700 transition-colors">{recette.titre}</h3>
                  <div className="flex items-center gap-1 text-xs text-stone-500">
                    <Clock className="h-3 w-3" />
                    <span>{recette.tempsPrepMinutes + recette.tempsCuissonMinutes} min</span>
                    <span className="mx-1">·</span>
                    <span>{recette.personnagesBase} pers.</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/recettes">
              <Button variant="outline" className="border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white">
                {t('home.inspiration.viewAll')} <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
