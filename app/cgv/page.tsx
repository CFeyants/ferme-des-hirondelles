import React from 'react'
import Link from 'next/link'

export default function CGVPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Conditions Générales de Vente</h1>
      <p className="text-sm text-stone-500 mb-8">Ferme des Hirondelles — Dernière mise à jour : [DATE À COMPLÉTER]</p>

      <div className="prose prose-stone prose-green max-w-none space-y-10">

        <section>
          <h2 className="text-xl font-bold text-stone-900">1. Identité du vendeur</h2>
          <p>
            <strong>Ferme des Hirondelles</strong><br />
            Adresse : 33 rue du Moulin, 1950 Crainhem (Kraainem), Belgique<br />
            Téléphone : +32 [À COMPLÉTER]<br />
            Email : [À COMPLÉTER]<br />
            Numéro d'entreprise (BCE) : [À COMPLÉTER]<br />
            Numéro de TVA : BE [À COMPLÉTER]<br />
            Numéro AFSCA : [À COMPLÉTER si applicable]
          </p>
          <p>Le site web <code>https://cedstudiolab.com</code> (ci-après le « Site ») est exploité par la Ferme des Hirondelles (ci-après « le Vendeur », « nous »).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">2. Champ d'application</h2>
          <p>Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent l'ensemble des ventes de produits effectuées via le Site. Toute commande implique l'acceptation pleine, entière et sans réserve des présentes CGV par l'acheteur (ci-après « le Client »).</p>
          <p>Le Vendeur se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur au jour de la passation de la commande.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">3. Produits</h2>
          <p>Les produits proposés à la vente sont ceux figurant sur le Site au jour de la consultation par le Client, dans la limite des stocks disponibles.</p>
          <p>Nos produits sont des denrées alimentaires fraîches d'origine fermière (viandes, œufs, fruits, légumes). Les photographies illustrant les produits ont une valeur indicative ; elles n'engagent pas le Vendeur quant à l'aspect exact du produit livré (les produits naturels présentent des variations de calibre, couleur et texture).</p>
          <p>Les poids indiqués sont des poids approximatifs : les produits étant pesés à la préparation, le poids final peut varier de ±10 %. Le prix facturé sera ajusté en conséquence sur la base du poids réel.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">4. Prix</h2>
          <p>Les prix sont indiqués en euros (€), toutes taxes comprises (TTC), TVA belge en vigueur incluse au taux légal applicable (6 % pour la plupart des denrées alimentaires).</p>
          <p>Les prix peuvent être exprimés au kilogramme, à la pièce, à la botte, au bocal, à la boîte ou au panier, selon le produit. Le prix final exigible est calculé sur base du poids ou de la quantité réellement préparé(e) lors du retrait.</p>
          <p>Le Vendeur se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix appliqué à la commande sera celui en vigueur au moment de la validation de celle-ci.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">5. Commandes</h2>
          <p><strong>Clôture des commandes : jeudi à 23h59.</strong> Toute commande passée après cette échéance sera traitée pour la semaine suivante.</p>
          <p>La commande s'effectue exclusivement en ligne via le Site. Les étapes sont les suivantes :</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Sélection des produits dans la boutique en ligne ;</li>
            <li>Validation du panier ;</li>
            <li>Identification du Client (création ou connexion à un compte) ;</li>
            <li>Choix du mode de paiement et règlement ;</li>
            <li>Confirmation de la commande par email.</li>
          </ul>
          <p>La confirmation par email vaut acceptation de la commande par le Vendeur, sous réserve de disponibilité effective des produits. En cas d'indisponibilité d'un produit après validation, le Vendeur en informera le Client dans les meilleurs délais et procédera au remboursement ou proposera un équivalent.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">6. Formation du contrat</h2>
          <p>Le contrat de vente est définitivement formé lors de l'envoi par le Vendeur de l'email de confirmation de commande. Le Client reconnaît et accepte que cet email, contenant le récapitulatif de la commande, constitue la preuve de la conclusion et du contenu du contrat.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">7. Paiement</h2>
          <p>Les moyens de paiement acceptés sont :</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Carte bancaire (Bancontact, Visa, Mastercard) ;</li>
            <li>Virement bancaire ;</li>
            <li>Wero (paiement instantané européen).</li>
          </ul>
          <p>Le paiement est exigible à la commande. La commande n'est définitivement enregistrée et préparée qu'après réception effective du paiement. En cas de virement, le Client doit veiller à ce que le paiement soit reçu avant la clôture des commandes (jeudi 23h59).</p>
          <p>Les transactions par carte bancaire sont sécurisées par le prestataire de paiement [À COMPLÉTER]. Le Vendeur n'a accès à aucune donnée de paiement sensible.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">8. Retrait (Click &amp; Collect)</h2>
          <p>Les commandes sont à retirer <strong>exclusivement</strong> à la Ferme des Hirondelles, 33 rue du Moulin, 1950 Crainhem :</p>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Vendredi de 16h00 à 19h00</strong></li>
            <li><strong>Samedi de 10h00 à 17h30</strong></li>
          </ul>
          <p>Aucune livraison à domicile n'est proposée. Toute commande non retirée à la fin du créneau du samedi pourra, après contact infructueux, être considérée comme abandonnée. Les denrées périssables ne pourront être restituées ni remboursées en cas de non-retrait.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">9. Absence de droit de rétractation</h2>
          <p>Conformément à <strong>l'article VI.53 du Code de droit économique belge</strong> (transposant la Directive 2011/83/UE), le droit de rétractation prévu pour les contrats à distance ne s'applique <strong>pas</strong> :</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>aux biens susceptibles de se détériorer ou de se périmer rapidement (denrées alimentaires fraîches, viandes, fruits, légumes) ;</li>
            <li>aux biens confectionnés selon les spécifications du Client ;</li>
            <li>aux biens scellés et descellés après livraison, ne pouvant être renvoyés pour des raisons d'hygiène.</li>
          </ul>
          <p>L'ensemble des produits proposés relevant de ces catégories, <strong>aucun droit de rétractation ne pourra être exercé</strong> sur les commandes passées via le Site.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">10. Conformité, qualité et réclamations</h2>
          <p>Le Vendeur s'engage à livrer des produits frais, sains et conformes à la commande, dans le respect des normes sanitaires belges et européennes (AFSCA, Règlement (CE) n° 178/2002, Règlement (CE) n° 852/2004).</p>
          <p>Toute réclamation doit être formulée :</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>de préférence <strong>immédiatement lors du retrait</strong> en présence du Vendeur ;</li>
            <li>ou par email à [À COMPLÉTER] dans un délai maximal de <strong>24 heures</strong> suivant le retrait, avec photographies si possible.</li>
          </ul>
          <p>En cas de réclamation justifiée, le Vendeur procédera au remplacement du produit ou au remboursement intégral.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">11. Garantie légale de conformité</h2>
          <p>Conformément aux articles 1649bis et suivants du Code civil belge, le Client bénéficie de la garantie légale de conformité. Compte tenu de la nature périssable des produits, cette garantie s'exerce concrètement par les mécanismes décrits à l'article 10 ci-dessus.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">12. Responsabilité</h2>
          <p>Le Vendeur ne pourra être tenu responsable des dommages résultant d'une mauvaise conservation des produits après retrait, d'une utilisation non conforme, d'allergies non signalées, ou de cas de force majeure. La responsabilité du Vendeur est en tout état de cause limitée au montant de la commande concernée.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">13. Force majeure</h2>
          <p>Aucune des parties ne pourra être tenue responsable de l'inexécution ou du retard dans l'exécution de ses obligations contractuelles en cas de force majeure, telle que définie par la jurisprudence belge.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">14. Données personnelles</h2>
          <p>Le traitement des données personnelles du Client est régi par notre <Link href="/confidentialite" className="text-green-600 hover:underline">Politique de Confidentialité</Link>, conforme au Règlement (UE) 2016/679 (RGPD) et à la loi belge du 30 juillet 2018.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">15. Médiation et règlement des litiges</h2>
          <p>En cas de litige, le Client est invité à contacter en priorité le Vendeur pour rechercher une solution amiable. À défaut d'accord, le Client (consommateur) peut recourir gratuitement au :</p>
          <p>
            <strong>Service de Médiation pour le Consommateur</strong><br />
            Boulevard du Roi Albert II, 8 boîte 1 — 1000 Bruxelles<br />
            Tél. : +32 (0)2 702 52 20<br />
            Email : <a href="mailto:contact@mediationconsommateur.be" className="text-green-600 hover:underline">contact@mediationconsommateur.be</a><br />
            Site : <a href="https://mediationconsommateur.be" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">mediationconsommateur.be</a>
          </p>
          <p>Le Client peut également utiliser la plateforme européenne de Règlement en Ligne des Litiges (RLL) : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">ec.europa.eu/consumers/odr</a></p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">16. Droit applicable et juridiction compétente</h2>
          <p>Les présentes CGV sont régies par le <strong>droit belge</strong>. À défaut de résolution amiable, tout litige sera de la compétence exclusive des <strong>tribunaux de l'arrondissement judiciaire de Bruxelles</strong>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">17. Dispositions diverses</h2>
          <p>Si l'une quelconque des clauses des présentes CGV venait à être déclarée nulle ou inapplicable, les autres clauses conserveraient leur pleine validité.</p>
        </section>

      </div>

      <div className="mt-10 pt-6 border-t border-stone-200 flex gap-6 text-sm">
        <Link href="/mentions-legales" className="text-green-600 hover:underline">Mentions Légales</Link>
        <Link href="/confidentialite" className="text-green-600 hover:underline">Politique de Confidentialité</Link>
        <Link href="/" className="text-stone-500 hover:underline">← Retour à l'accueil</Link>
      </div>
    </div>
  )
}
