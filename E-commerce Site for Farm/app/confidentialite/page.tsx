import React from 'react'
import Link from 'next/link'

export default function ConfidentialitePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Politique de Confidentialité</h1>
      <div className="prose prose-stone prose-green max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold text-stone-900">1. Responsable du traitement</h2>
          <p><strong>Ferme des Hirondelles</strong><br />33 rue du Moulin, 1950 Crainhem (Kraainem), Belgique<br />Email : cedricfeyants@gmail.com</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">2. Données collectées</h2>
          <p>Lors de la création de votre compte et de vos commandes, nous collectons :</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Adresse postale</li>
            <li>Historique des commandes</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">3. Finalités du traitement</h2>
          <p>Vos données sont utilisées exclusivement pour :</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>La gestion de votre compte client</li>
            <li>Le traitement et la confirmation de vos commandes</li>
            <li>La communication relative à vos commandes (confirmation, retrait)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">4. Durée de conservation</h2>
          <p>Vos données sont conservées pendant la durée de votre relation commerciale avec la Ferme des Hirondelles, et au maximum 3 ans après la dernière commande.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">5. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits d'accès, de rectification, d'effacement et de portabilité de vos données. Pour exercer ces droits, contactez-nous à <a href="mailto:cedricfeyants@gmail.com" className="text-green-600 hover:underline">cedricfeyants@gmail.com</a>.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">6. Sécurité</h2>
          <p>Vos données sont stockées de manière sécurisée via Supabase (infrastructure certifiée SOC 2 Type II). Les mots de passe sont chiffrés et ne sont jamais stockés en clair.</p>
        </section>
      </div>
      <div className="mt-8">
        <Link href="/auth/register" className="text-green-600 hover:underline text-sm">← Retour à l'inscription</Link>
      </div>
    </div>
  )
}
