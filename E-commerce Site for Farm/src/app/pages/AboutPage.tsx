import React from 'react';

export const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">À propos de la Ferme des Hirondelles</h1>
          <div className="w-20 h-1 bg-green-600 mx-auto rounded-full" />
        </div>

        <img 
          src="https://images.unsplash.com/photo-1670012015063-14a6f2102a50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
          alt="La ferme"
          className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
        />

        <div className="prose prose-stone prose-lg max-w-none">
          <p>
            Bienvenue à la Ferme des Hirondelles, située au cœur de Kraainem. 
            Nous sommes une exploitation familiale passionnée par l'agriculture durable et le respect de la nature.
          </p>
          
          <h3>Notre Histoire</h3>
          <p>
            Depuis plusieurs générations, nous cultivons la terre avec amour. 
            Ce qui a commencé comme une petite exploitation est devenu un lieu de rencontre pour tous les amateurs de produits frais et locaux.
          </p>

          <h3>Nos Valeurs</h3>
          <ul>
            <li><strong>Qualité :</strong> Nous ne vendons que ce que nous produisons ou sélectionnons rigoureusement chez nos partenaires locaux.</li>
            <li><strong>Transparence :</strong> Vous savez exactement d'où vient ce que vous mangez.</li>
            <li><strong>Environnement :</strong> Nous pratiquons une agriculture raisonnée pour préserver la biodiversité de notre région.</li>
          </ul>

          <h3>Pourquoi le Click & Collect ?</h3>
          <p>
            Pour garantir une fraîcheur absolue et éviter le gaspillage, nous fonctionnons uniquement sur commande. 
            Cela nous permet de récolter et de préparer vos colis juste avant votre venue. 
            C'est aussi l'occasion de se rencontrer lors du retrait !
          </p>
        </div>
      </div>
    </div>
  );
};
