'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface Review {
  name: string
  text: string
}

const ROW1: Review[] = [
  { name: 'Véronique Brusselman', text: "Beau choix et fraîcheur assurée !" },
  { name: 'Charline Degavre', text: "Un réel délice! En plus d'un service super agréable! Nous recommandons sans hésiter!!" },
  { name: 'Claudine Vande Wal Schmidt', text: "Top, personnes charmantes et beau projet" },
  { name: 'Cécile De Maeyer Pastorek', text: "Produits de saison frais et délicieux. On retrouve le goût authentique des aliments qui sont cultivés de manière naturelle. Et quel bonheur d'acheter directement au producteur dans une charmante Ferme 😍" },
]

const ROW2: Review[] = [
  { name: 'Suzanne Christmas', text: "Super endroit pour des produits frais et naturels avec des gens super sympathiques." },
  { name: 'Olivier Joris', text: "des produits frais et un service au top !" },
  { name: 'Véronique Brusselman', text: "Beau choix et fraîcheur assurée !" },
  { name: 'Charline Degavre', text: "Un réel délice! En plus d'un service super agréable! Nous recommandons sans hésiter!!" },
]

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="shrink-0 w-72 bg-white rounded-2xl border border-stone-100 shadow-sm p-5 mx-2 space-y-3">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">"{review.text}"</p>
      <div className="flex items-center justify-between pt-1 border-t border-stone-50">
        <span className="font-semibold text-stone-800 text-sm">{review.name}</span>
        <span className="text-xs text-stone-400">Facebook</span>
      </div>
    </div>
  )
}

function MarqueeRow({ reviews, reverse }: { reviews: Review[]; reverse: boolean }) {
  const doubled = [...reviews, ...reviews]
  return (
    <div className="flex overflow-hidden py-2">
      <div
        className={reverse ? 'animate-marquee-reverse flex' : 'animate-marquee flex'}
        style={{ minWidth: 'max-content' }}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="container mx-auto px-4 mb-10 text-center space-y-3">
        <h2 className="font-serif text-3xl md:text-4xl text-[#1a2e17] font-normal">
          {t('home.reviews.title')}
        </h2>
        <p className="text-[#5a7a54]">{t('home.reviews.subtitle')}</p>
      </div>

      <div className="space-y-4">
        <MarqueeRow reviews={ROW1} reverse={false} />
        <MarqueeRow reviews={ROW2} reverse={true} />
      </div>

      <div className="text-center mt-10">
        <p className="text-sm text-stone-400">
          {t('home.reviews.average')}{' '}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Zwaluwenboerderij+Ferme+des+Hirondelles+Kraainem"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2d5a27] hover:underline font-medium"
          >
            {t('home.reviews.viewOnGoogle')}
          </a>
        </p>
      </div>
    </section>
  )
}
