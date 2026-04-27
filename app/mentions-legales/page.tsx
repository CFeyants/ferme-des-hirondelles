import React from 'react'
import Link from 'next/link'

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Mentions Légales</h1>
      <p className="text-sm text-stone-500 mb-8">Ferme des Hirondelles — Dernière mise à jour : [DATE À COMPLÉTER]</p>

      <div className="prose prose-stone prose-green max-w-none space-y-10">

        <section>
          <h2 className="text-xl font-bold text-stone-900">1. Éditeur du site</h2>
          <p>
            <strong>Ferme des Hirondelles</strong><br />
            33 rue du Moulin, 1950 Crainhem (Kraainem), Belgique<br />
            Téléphone : +32 [À COMPLÉTER]<br />
            Email : [À COMPLÉTER]<br />
            Numéro d'entreprise (BCE) : [À COMPLÉTER]<br />
            Numéro de TVA : BE [À COMPLÉTER]<br />
            Forme juridique : [À COMPLÉTER : entreprise individuelle / SRL / SC / etc.]<br />
            Numéro AFSCA : [À COMPLÉTER si applicable]
          </p>
          <p><strong>Directeur de la publication :</strong> [Nom du gérant ou de la personne physique responsable]</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">2. Hébergeur du site</h2>
          <p>
            <strong>Vercel Inc.</strong><br />
            340 Pine Street, Suite 701, San Francisco, CA 94104, USA<br />
            Site : <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">vercel.com</a>
          </p>
          <p className="mt-2">
            <strong>Supabase Inc.</strong> (base de données)<br />
            970 Toa Payoh North #07-04, Singapore 318992<br />
            Site : <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">supabase.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">3. Conception et développement</h2>
          <p>Site conçu et développé par : [À COMPLÉTER : nom du studio / prestataire / mention « réalisé en interne »]</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">4. Propriété intellectuelle</h2>

          <h3 className="text-lg font-semibold text-stone-800 mt-6">4.1. Protection du contenu du site</h3>
          <p>L'ensemble du contenu présent sur le site — notamment la structure, l'arborescence, la charte graphique, les textes, photographies, illustrations, logos, marques, recettes, vidéos, mises en page, bases de données et tout autre élément composant le Site — est la propriété exclusive de la Ferme des Hirondelles ou fait l'objet d'une licence ou d'une autorisation d'utilisation accordée à son profit.</p>
          <p>Ces éléments sont protégés par le droit d'auteur, le droit des marques et, plus généralement, par l'ensemble des dispositions belges, européennes et internationales relatives à la propriété intellectuelle, notamment par le <strong>Livre XI du Code de droit économique belge</strong> ainsi que la <strong>Directive 2001/29/CE</strong>.</p>

          <h3 className="text-lg font-semibold text-stone-800 mt-6">4.2. Droits accordés à l'utilisateur</h3>
          <p>L'utilisateur est autorisé à consulter le Site et à reproduire les contenus pour son <strong>usage strictement personnel et privé</strong>, à l'exclusion de toute utilisation à des fins commerciales ou publicitaires.</p>

          <h3 className="text-lg font-semibold text-stone-800 mt-6">4.3. Utilisations interdites</h3>
          <p>Sauf autorisation écrite et préalable de la Ferme des Hirondelles, sont <strong>strictement interdits</strong> :</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>la reproduction, représentation, diffusion, modification, traduction, adaptation, exploitation, extraction ou réutilisation, totale ou partielle, du contenu du Site, par quelque procédé que ce soit ;</li>
            <li>la création d'œuvres dérivées à partir des éléments du Site ;</li>
            <li>l'extraction systématique ou répétée d'éléments de la base de données du Site (article XI.306 du Code de droit économique) ;</li>
            <li>l'utilisation des marques, logos et signes distinctifs de la Ferme des Hirondelles ;</li>
            <li>l'utilisation des contenus du Site pour l'entraînement d'algorithmes ou de modèles d'intelligence artificielle, sauf autorisation préalable et écrite — le présent Site fait expressément usage du droit de réservation prévu par l'<strong>article XI.190/1 du Code de droit économique</strong> (transposition de l'article 4 de la Directive (UE) 2019/790 sur le droit d'auteur dans le marché unique numérique).</li>
          </ul>
          <p>Toute utilisation non autorisée constitue une <strong>contrefaçon</strong> susceptible d'engager la responsabilité civile et pénale de son auteur, conformément aux articles XI.293 et suivants du Code de droit économique.</p>

          <h3 className="text-lg font-semibold text-stone-800 mt-6">4.4. Photographies et images</h3>
          <p>Certaines photographies illustrant les produits peuvent provenir de banques d'images sous licence (notamment Unsplash). Elles sont utilisées dans le respect des conditions de licence applicables et restent la propriété de leurs auteurs respectifs.</p>

          <h3 className="text-lg font-semibold text-stone-800 mt-6">4.5. Marques</h3>
          <p>La dénomination « Ferme des Hirondelles », son logo et tout signe distinctif associé constituent des marques [déposées / non déposées : à préciser] de la Ferme des Hirondelles. Toute utilisation non autorisée est interdite et peut faire l'objet de poursuites.</p>

          <h3 className="text-lg font-semibold text-stone-800 mt-6">4.6. Liens hypertextes</h3>
          <p>La création de liens hypertextes pointant vers le Site est autorisée à condition qu'ils ne soient pas utilisés à des fins commerciales, qu'ils ne portent pas atteinte à l'image de la Ferme des Hirondelles, et que la source soit clairement identifiée.</p>
          <p>Le Site peut contenir des liens vers des sites tiers. La Ferme des Hirondelles n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.</p>

          <h3 className="text-lg font-semibold text-stone-800 mt-6">4.7. Signalement d'une atteinte</h3>
          <p>Toute personne constatant une atteinte à la propriété intellectuelle (contrefaçon, copie illicite, utilisation non autorisée) peut nous le signaler à : [À COMPLÉTER].</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">5. Limitation de responsabilité</h2>
          <p>La Ferme des Hirondelles s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le Site. Toutefois, elle ne peut garantir l'exactitude, la précision ou l'exhaustivité de ces informations et décline toute responsabilité quant aux conséquences directes ou indirectes d'éventuelles erreurs, omissions ou inexactitudes.</p>
          <p>La Ferme des Hirondelles ne saurait être tenue responsable d'une indisponibilité technique du Site, quelle qu'en soit la cause.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">6. Données personnelles et cookies</h2>
          <p>Le traitement des données personnelles est détaillé dans notre <Link href="/confidentialite" className="text-green-600 hover:underline">Politique de Confidentialité</Link>, conforme au RGPD.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">7. Droit applicable et juridiction</h2>
          <p>Les présentes mentions légales sont régies par le <strong>droit belge</strong>. Tout litige relatif à leur interprétation ou exécution relève de la compétence exclusive des tribunaux de l'arrondissement judiciaire de Bruxelles.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">8. Contact</h2>
          <p>
            Pour toute question relative au Site ou aux présentes mentions légales :<br />
            Email : [À COMPLÉTER]<br />
            Téléphone : +32 [À COMPLÉTER]
          </p>
        </section>

      </div>

      <div className="mt-10 pt-6 border-t border-stone-200 flex gap-6 text-sm">
        <Link href="/cgv" className="text-green-600 hover:underline">CGV</Link>
        <Link href="/confidentialite" className="text-green-600 hover:underline">Politique de Confidentialité</Link>
        <Link href="/" className="text-stone-500 hover:underline">← Retour à l'accueil</Link>
      </div>
    </div>
  )
}
