import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, ShoppingBasket, MapPin, CreditCard } from 'lucide-react'
import { isShopOpen } from '@/data'

export default function HomePage() {
  const shopStatus = isShopOpen()

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
            De notre ferme <br /> à votre assiette
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-stone-200">
            Viande de qualité et légumes de saison.
            Commandez en ligne et retirez vos produits frais à la ferme chaque semaine.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/boutique">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full">
                Commander maintenant <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/a-propos">
              <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 px-8 py-6 text-lg rounded-full">
                Notre histoire
              </Button>
            </Link>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 bg-stone-900/60 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-stone-700">
            <span className={`w-2 h-2 rounded-full ${shopStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
            {shopStatus.message}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">Comment ça marche ?</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Un système simple de Click & Collect pour vous garantir la fraîcheur maximale.
            Pas de gaspillage, juste le meilleur de la terre.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <ShoppingBasket className="h-8 w-8 text-green-600" />, title: "1. Commandez", desc: "Sélectionnez vos produits (viande, légumes) avant jeudi 23h59." },
            { icon: <CreditCard className="h-8 w-8 text-green-600" />, title: "2. Payez l'acompte", desc: "Payez 10€ par tranche de 50€ en ligne. Le solde se règle au retrait." },
            { icon: <Calendar className="h-8 w-8 text-green-600" />, title: "3. Préparez-vous", desc: "Nous préparons votre commande avec soin le vendredi matin." },
            {
              icon: <MapPin className="h-8 w-8 text-green-600" />, title: "4. Retirez",
              desc: (<span>Venez récupérer votre colis à la ferme vendredi soir ou samedi.<br />
                <a href="https://www.google.com/maps/search/?api=1&query=33+rue+du+Moulin+1950+Crainhem+Belgique" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-medium inline-block mt-2">📍 33 rue du Moulin, 1950 Crainhem</a>
              </span>)
            }
          ].map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow text-center space-y-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">{step.icon}</div>
              <h3 className="text-xl font-bold text-stone-900">{step.title}</h3>
              <p className="text-stone-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features / Values */}
      <section className="bg-stone-100 py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <div>
              <span className="text-green-700 font-bold uppercase tracking-wider text-sm">Ferme des Hirondelles</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-1">Authenticité & Circuit Court</h2>
            </div>
            <div className="space-y-4 text-lg text-stone-700">
              <p>À la Ferme des Hirondelles, nous croyons en une agriculture raisonnée, locale et respectueuse.</p>
              <p>Nous avons fait le choix du circuit court, afin de limiter au maximum les intermédiaires.</p>
              <div className="bg-white/50 p-4 rounded-lg border border-stone-200">
                <p className="font-bold text-stone-900 mb-2">En achetant chez nous, vous :</p>
                <ul className="list-disc list-inside space-y-1 ml-2 text-base">
                  <li>soutenez l'économie locale</li>
                  <li>redécouvrez le vrai goût des aliments</li>
                  <li>participez à un modèle agricole transparent et durable</li>
                </ul>
              </div>
            </div>
            <div className="pt-6">
              <Link href="/boutique">
                <Button size="lg" variant="default" className="bg-stone-900 text-white hover:bg-stone-800">Voir nos produits</Button>
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1670012015063-14a6f2102a50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Farmer holding vegetables" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  )
}
