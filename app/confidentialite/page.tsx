import React from 'react'
import Link from 'next/link'

export default function ConfidentialitePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Politique de Confidentialité</h1>
      <p className="text-sm text-stone-500 mb-8">Ferme des Hirondelles — Dernière mise à jour : [DATE À COMPLÉTER]</p>

      <p className="text-stone-700 mb-8">
        La présente Politique de Confidentialité décrit la manière dont la Ferme des Hirondelles collecte, utilise et protège vos données à caractère personnel lorsque vous visitez notre site ou y passez commande. Elle est conforme au <strong>Règlement (UE) 2016/679 (RGPD)</strong> et à la <strong>loi belge du 30 juillet 2018</strong> relative à la protection des données personnelles.
      </p>

      <div className="prose prose-stone prose-green max-w-none space-y-10">

        <section>
          <h2 className="text-xl font-bold text-stone-900">1. Responsable du traitement</h2>
          <p>
            <strong>Ferme des Hirondelles</strong><br />
            33 rue du Moulin, 1950 Crainhem (Kraainem), Belgique<br />
            Téléphone : +32 [À COMPLÉTER]<br />
            Email : [À COMPLÉTER]<br />
            Numéro d'entreprise (BCE) : [À COMPLÉTER]
          </p>
          <p className="text-sm text-stone-500 italic">La désignation d'un Délégué à la Protection des Données (DPO) n'est pas obligatoire pour notre activité au regard de l'article 37 RGPD. Pour toute question relative à vos données, contactez-nous à l'adresse ci-dessus.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">2. Données collectées</h2>
          <p><strong>Données fournies par vous lors de la création d'un compte ou d'une commande :</strong></p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Nom et prénom ;</li>
            <li>Adresse email ;</li>
            <li>Numéro de téléphone ;</li>
            <li>Mot de passe (stocké de manière chiffrée et irréversible) ;</li>
            <li>Historique des commandes.</li>
          </ul>
          <p className="mt-4"><strong>Données collectées automatiquement :</strong></p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Adresse IP ;</li>
            <li>Type de navigateur et système d'exploitation ;</li>
            <li>Pages visitées et durée de consultation ;</li>
            <li>Données techniques liées aux cookies (voir section 8).</li>
          </ul>
          <p className="mt-4"><strong>Données de paiement :</strong><br />
          Les données bancaires sont traitées <strong>directement par notre prestataire de paiement</strong> [À COMPLÉTER], certifié PCI-DSS. Nous n'avons <strong>jamais accès</strong> à vos données bancaires complètes.</p>
          <p>Nous ne collectons <strong>aucune donnée sensible</strong> au sens de l'article 9 du RGPD.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">3. Finalités et bases juridiques du traitement</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-stone-200">
              <thead>
                <tr className="bg-stone-100">
                  <th className="border border-stone-200 px-3 py-2 text-left">Finalité</th>
                  <th className="border border-stone-200 px-3 py-2 text-left">Base juridique (art. 6 RGPD)</th>
                  <th className="border border-stone-200 px-3 py-2 text-left">Durée de conservation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-stone-200 px-3 py-2">Gestion de votre compte client</td>
                  <td className="border border-stone-200 px-3 py-2">Exécution du contrat (art. 6.1.b)</td>
                  <td className="border border-stone-200 px-3 py-2">Tant que le compte est actif + 3 ans après inactivité</td>
                </tr>
                <tr className="bg-stone-50">
                  <td className="border border-stone-200 px-3 py-2">Traitement et suivi des commandes</td>
                  <td className="border border-stone-200 px-3 py-2">Exécution du contrat (art. 6.1.b)</td>
                  <td className="border border-stone-200 px-3 py-2">Durée de la relation commerciale</td>
                </tr>
                <tr>
                  <td className="border border-stone-200 px-3 py-2">Facturation et obligations comptables</td>
                  <td className="border border-stone-200 px-3 py-2">Obligation légale (art. 6.1.c)</td>
                  <td className="border border-stone-200 px-3 py-2"><strong>7 ans</strong> à compter de la date de facturation</td>
                </tr>
                <tr className="bg-stone-50">
                  <td className="border border-stone-200 px-3 py-2">Réponse à vos demandes et réclamations</td>
                  <td className="border border-stone-200 px-3 py-2">Intérêt légitime (art. 6.1.f)</td>
                  <td className="border border-stone-200 px-3 py-2">3 ans</td>
                </tr>
                <tr>
                  <td className="border border-stone-200 px-3 py-2">Communications commerciales (newsletter)</td>
                  <td className="border border-stone-200 px-3 py-2">Consentement (art. 6.1.a)</td>
                  <td className="border border-stone-200 px-3 py-2">Jusqu'au retrait du consentement</td>
                </tr>
                <tr className="bg-stone-50">
                  <td className="border border-stone-200 px-3 py-2">Statistiques et amélioration du site</td>
                  <td className="border border-stone-200 px-3 py-2">Intérêt légitime (art. 6.1.f)</td>
                  <td className="border border-stone-200 px-3 py-2">13 mois maximum</td>
                </tr>
                <tr>
                  <td className="border border-stone-200 px-3 py-2">Sécurité (lutte contre la fraude)</td>
                  <td className="border border-stone-200 px-3 py-2">Intérêt légitime (art. 6.1.f)</td>
                  <td className="border border-stone-200 px-3 py-2">12 mois</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-stone-500 mt-2">À l'expiration de ces durées, vos données sont supprimées ou anonymisées de manière irréversible.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">4. Destinataires des données</h2>
          <p>Vos données ne sont <strong>jamais vendues</strong> à des tiers. Elles ne sont communiquées qu'aux destinataires suivants :</p>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Personnel autorisé</strong> de la Ferme des Hirondelles ;</li>
            <li><strong>Prestataire de paiement</strong> : [À COMPLÉTER] ;</li>
            <li><strong>Hébergeur du site</strong> : Vercel / Supabase ;</li>
            <li><strong>Prestataire d'envoi d'emails</strong> : Resend ;</li>
            <li><strong>Comptable / expert-comptable</strong> dans le cadre des obligations légales ;</li>
            <li><strong>Autorités administratives ou judiciaires</strong> sur réquisition légale.</li>
          </ul>
          <p>Chacun de nos sous-traitants est lié par un contrat conforme à l'article 28 RGPD.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">5. Transferts hors de l'EEE</h2>
          <p>Nos données sont en principe hébergées au sein de l'Espace Économique Européen. Si certains de nos prestataires devaient transférer des données hors EEE, ce transfert serait encadré par une décision d'adéquation ou des clauses contractuelles types approuvées par la Commission européenne (art. 46 RGPD).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">6. Vos droits</h2>
          <p>Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Droit d'accès</strong> : obtenir copie des données vous concernant.</li>
            <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes.</li>
            <li><strong>Droit à l'effacement</strong> (« droit à l'oubli ») : demander la suppression, sous réserve des obligations légales de conservation.</li>
            <li><strong>Droit à la limitation</strong> du traitement, dans certaines circonstances.</li>
            <li><strong>Droit d'opposition</strong> au traitement fondé sur l'intérêt légitime et à toute prospection commerciale.</li>
            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré et lisible par machine.</li>
            <li><strong>Droit de retirer votre consentement</strong> à tout moment (newsletter notamment).</li>
          </ul>
          <p className="mt-4">Pour exercer vos droits, adressez votre demande (avec copie d'un document d'identité si nécessaire) à :<br />
          Email : [À COMPLÉTER]<br />
          Courrier : Ferme des Hirondelles, 33 rue du Moulin, 1950 Crainhem, Belgique</p>
          <p>Nous vous répondrons dans un délai d'<strong>un mois</strong>, susceptible d'être prolongé de deux mois en cas de demande complexe.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">7. Droit d'introduire une réclamation</h2>
          <p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de l'autorité de contrôle belge :</p>
          <p>
            <strong>Autorité de Protection des Données (APD)</strong><br />
            Rue de la Presse 35, 1000 Bruxelles<br />
            Tél. : +32 (0)2 274 48 00<br />
            Email : <a href="mailto:contact@apd-gba.be" className="text-green-600 hover:underline">contact@apd-gba.be</a><br />
            Site : <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">autoriteprotectiondonnees.be</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">8. Cookies</h2>
          <p><strong>Cookies strictement nécessaires</strong> (déposés sans consentement) :</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Cookie de session (panier, connexion) ;</li>
            <li>Cookie de sécurité ;</li>
            <li>Cookie de mémorisation de vos préférences cookies.</li>
          </ul>
          <p className="mt-4"><strong>Cookies soumis à consentement</strong> (déposés uniquement avec votre accord préalable) :</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Cookies de mesure d'audience [À COMPLÉTER si applicable] ;</li>
            <li>Cookies de réseaux sociaux [le cas échéant].</li>
          </ul>
          <p className="mt-4">Vous pouvez à tout moment modifier vos préférences via le bandeau de gestion des cookies présent sur le site, ou via les paramètres de votre navigateur. La durée de vie maximale des cookies déposés est de <strong>13 mois</strong>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">9. Sécurité</h2>
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement des connexions (HTTPS/TLS), hachage des mots de passe (via Supabase, certifié SOC 2 Type II), accès limité aux personnes habilitées, sauvegardes régulières.</p>
          <p>En cas de violation de données susceptible d'engendrer un risque pour vos droits et libertés, nous notifierons l'incident à l'APD dans un délai de 72 heures (art. 33 et 34 RGPD).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">10. Mineurs</h2>
          <p>Notre site n'est pas destiné aux mineurs de moins de 16 ans. Nous ne collectons pas sciemment de données de mineurs sans le consentement préalable du titulaire de l'autorité parentale.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">11. Modifications de la présente politique</h2>
          <p>Cette Politique de Confidentialité peut être mise à jour pour refléter des évolutions légales, techniques ou organisationnelles. La version en vigueur est toujours celle publiée sur le Site. En cas de modification substantielle, vous serez informé par email ou via une notification visible sur le Site.</p>
        </section>

      </div>

      <div className="mt-10 pt-6 border-t border-stone-200 flex gap-6 text-sm">
        <Link href="/cgv" className="text-green-600 hover:underline">CGV</Link>
        <Link href="/mentions-legales" className="text-green-600 hover:underline">Mentions Légales</Link>
        <Link href="/" className="text-stone-500 hover:underline">← Retour à l'accueil</Link>
      </div>
    </div>
  )
}
