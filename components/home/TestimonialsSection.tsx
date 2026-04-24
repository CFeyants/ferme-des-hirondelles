'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface Review {
  name: string
  text: string
}

const ROW1: Review[] = [
  { name: 'Valérie D.', text: "Super endroit pour acheter des légumes frais directement à la ferme. Personnel accueillant et très sympathique." },
  { name: 'Thomas B.', text: "La viande est incomparable avec ce qu'on trouve en supermarché. Les saucisses artisanales sont vraiment excellentes." },
  { name: 'Sophie L.', text: "Le click & collect c'est très pratique. On commande le mercredi, on récupère le samedi. Toujours impeccable." },
  { name: 'Marc V.', text: "Les saucisses et le rôti de porc sont un must. Mes enfants les réclament chaque semaine." },
]

const ROW2: Review[] = [
  { name: 'Isabelle R.', text: "Prix honnêtes, produits de qualité. On sait exactement d'où ça vient et ça change tout." },
  { name: 'Pierre M.', text: "Le poulet fermier est exceptionnel. Dense, goûteux, rien à voir avec l'industriel." },
  { name: 'Nathalie K.', text: "J'adore l'idée du panier anti-gaspillage. Bon pour le porte-monnaie et pour la planète." },
  { name: 'Jean-Paul F.', text: "Les œufs de ferme sont délicieux ! On sent la différence avec les œufs du supermarché. Je ne peux plus m'en passer." },
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
        <span className="text-xs text-stone-400">Google</span>
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
