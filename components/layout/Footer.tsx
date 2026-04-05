import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Facebook, Clock, Tractor } from 'lucide-react'
import { Separator } from '@/src/app/components/ui/separator'

export const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-stone-100">
              <Tractor className="h-6 w-6" />
              <span className="font-serif text-xl font-bold">Ferme des Hirondelles</span>
            </div>
            <p className="text-sm text-stone-400">
              Produits locaux, frais et de saison.
              Directement du producteur au consommateur.
              Authenticité et qualité garanties.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/people/Ferme-des-hirondelles/100057047996643/" target="_blank" rel="noreferrer" className="hover:text-green-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-stone-100 text-lg">Nous trouver</h3>
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
              <p>+32 0 00 00 00 00</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-stone-100 text-lg">Retrait des commandes</h3>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 mt-1 shrink-0 text-green-600" />
              <div className="space-y-1 text-sm">
                <p><span className="font-semibold text-white">Vendredi :</span> Soir (Heures à confirmer)</p>
                <p><span className="font-semibold text-white">Samedi :</span> En journée</p>
                <Separator className="my-2 bg-stone-700" />
                <p className="text-orange-300">Commandes ouvertes jusqu'au Jeudi 23h59</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-stone-800" />

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} Ferme des Hirondelles. Tous droits réservés.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-stone-300 cursor-pointer">Mentions Légales</span>
            <Link href="/cgv" className="hover:text-stone-300 cursor-pointer">CGV</Link>
            <span className="hover:text-stone-300 cursor-pointer">Vie Privée</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
