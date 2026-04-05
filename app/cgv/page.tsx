import React from 'react'
import Link from 'next/link'

export default function CGVPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Conditions Générales de Vente</h1>
      <div className="prose prose-stone prose-green max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold text-stone-900">1. Identité du vendeur</h2>
          <p><strong>Ferme des Hirondelles</strong><br />Adresse : 33 rue du Moulin, 1950 Crainhem (Kraainem), Belgique<br />Email : [adresse email à compléter]</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">2. Champ d'application</h2>
          <p>Les présentes CGV régissent l'ensemble des ventes de produits effectuées via le site internet de la Ferme des Hirondelles. Toute commande implique l'acceptation pleine et entière des présentes CGV.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">5. Commandes</h2>
          <p><strong>Clôture des commandes : jeudi à 23h59.</strong> Toute commande passée après cette échéance ne sera pas prise en compte.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">7. Paiement</h2>
          <p>Moyens acceptés : Carte bancaire (Bancontact, Visa, Mastercard), Virement bancaire, Wero.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">8. Retrait (Click &amp; Collect)</h2>
          <p>Les commandes sont à retirer vendredi soir ou samedi en journée à la Ferme des Hirondelles, 33 rue du Moulin, 1950 Crainhem.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">9. Absence de droit de rétractation</h2>
          <p>Conformément à l'article VI.53 du Code de droit économique belge, le droit de rétractation ne s'applique pas aux denrées alimentaires et produits périssables.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">15. Médiation</h2>
          <p><strong>Service de Médiation pour le Consommateur</strong><br />Boulevard du Roi Albert II 8, 1000 Bruxelles<br />
            <a href="mailto:contact@mediationconsommateur.be" className="text-green-600 hover:underline">contact@mediationconsommateur.be</a>
          </p>
        </section>
      </div>
    </div>
  )
}
