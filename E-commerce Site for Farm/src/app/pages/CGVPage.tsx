import React from 'react';

export const CGVPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Conditions Générales de Vente</h1>
      
      <div className="prose prose-stone prose-green max-w-none space-y-8">
        
        <section>
          <h2 className="text-xl font-bold text-stone-900">1. Identité du vendeur</h2>
          <p>
            <strong>Ferme des Hirondelles</strong><br />
            Forme juridique : [Indépendant personne physique / SRL / autre – à compléter]<br />
            Adresse : 33 rue du Moulin, 1950 Crainhem (Kraainem), Belgique<br />
            Email : [adresse email à compléter]<br />
            Téléphone : [numéro à compléter]<br />
            Numéro d’entreprise (BCE) : [à compléter]<br />
            TVA : soit Assujetti à la TVA – n° [à compléter] soit Régime de franchise de TVA – TVA non applicable
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">2. Champ d’application</h2>
          <p>
            Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent l’ensemble des ventes de produits effectuées via le site internet de la Ferme des Hirondelles (ci-après « le Site »).
          </p>
          <p>
            Toute commande passée sur le Site implique l’acceptation pleine et entière des présentes CGV par le client.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">3. Produits</h2>
          <p>
            Les produits proposés à la vente sont :
          </p>
          <ul className="list-disc pl-5">
            <li>des viandes</li>
            <li>des fruits et légumes frais</li>
            <li>des paniers de produits</li>
          </ul>
          <p>
            Les produits sont issus de productions locales et peuvent varier selon :
          </p>
          <ul className="list-disc pl-5">
            <li>la saison</li>
            <li>la disponibilité</li>
            <li>les conditions de production</li>
          </ul>
          <p>
            Les descriptions et photographies des produits sont fournies à titre indicatif et ne sont pas contractuelles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">4. Création de compte client</h2>
          <p>
            La création d’un compte client est obligatoire pour pouvoir passer commande sur le Site.
          </p>
          <p>
            Le client s’engage à fournir des informations exactes et complètes. Il est responsable de la confidentialité de ses identifiants.
          </p>
          <p>
            La Ferme des Hirondelles ne saurait être tenue responsable de toute utilisation frauduleuse du compte client.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">5. Commandes et conclusion du contrat</h2>
          
          <h3 className="text-lg font-bold text-stone-800 mt-4">5.1 Modalités de commande</h3>
          <p>
            Les commandes sont ouvertes chaque semaine.
          </p>
          <p>
            <strong>Clôture des commandes : jeudi à 23h59.</strong>
          </p>
          <p>
            Toute commande passée après cette échéance ne sera pas prise en compte.
          </p>

          <h3 className="text-lg font-bold text-stone-800 mt-4">5.2 Conclusion du contrat</h3>
          <p>
            Le contrat de vente est conclu lorsque :
          </p>
          <ul className="list-disc pl-5">
            <li>le client valide sa commande sur le Site, et</li>
            <li>reçoit un email de confirmation de commande.</li>
          </ul>
          <p>
            La Ferme des Hirondelles se réserve le droit de refuser ou d’annuler toute commande en cas de :
          </p>
          <ul className="list-disc pl-5">
            <li>indisponibilité d’un produit</li>
            <li>erreur manifeste de prix</li>
            <li>problème de paiement</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">6. Prix</h2>
          <p>
            Les prix sont indiqués en euros (€).
          </p>
          <p>
            Ils sont :
          </p>
          <ul className="list-disc pl-5">
            <li>TVA comprise, si applicable</li>
            <li>ou exprimés sous le régime de la franchise de TVA, le cas échéant</li>
          </ul>
          <p>
            La Ferme des Hirondelles se réserve le droit de modifier ses prix à tout moment. Les prix applicables sont ceux en vigueur au moment de la validation de la commande.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">7. Paiement</h2>
          <p>
            Le paiement est obligatoire au moment de la commande.
          </p>
          <p>
            Moyens de paiement acceptés :
          </p>
          <ul className="list-disc pl-5">
            <li>Carte bancaire (Bancontact, Visa, Mastercard)</li>
            <li>Virement bancaire</li>
            <li>Wero</li>
          </ul>
          <p>
            Aucune commande ne sera préparée sans paiement effectif.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">8. Livraison et retrait des commandes</h2>
          
          <h3 className="text-lg font-bold text-stone-800 mt-4">8.1 Livraison</h3>
          <p>
            ➡️ <strong>Aucune livraison à domicile n’est proposée.</strong>
          </p>

          <h3 className="text-lg font-bold text-stone-800 mt-4">8.2 Retrait (Click & Collect)</h3>
          <p>
            Les commandes sont à retirer :
          </p>
          <ul className="list-disc pl-5">
            <li>Vendredi soir</li>
            <li>Samedi en journée</li>
          </ul>
          <p>
            <strong>Lieu de retrait :</strong><br />
            Ferme des Hirondelles<br />
            33 rue du Moulin<br />
            1950 Crainhem (Kraainem), Belgique
          </p>
          <p>
            Le client est tenu de respecter les créneaux de retrait communiqués.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">9. Absence de droit de rétractation</h2>
          <p>
            Conformément à l’article VI.53 du Code de droit économique belge, le droit de rétractation ne s’applique pas aux :
          </p>
          <ul className="list-disc pl-5">
            <li>denrées alimentaires</li>
            <li>produits périssables</li>
          </ul>
          <p>
            En conséquence, aucune annulation, modification ou remboursement n’est possible après validation de la commande, sauf erreur imputable à la Ferme des Hirondelles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">10. Non-retrait des commandes</h2>
          <p>
            En cas de non-retrait de la commande aux dates prévues :
          </p>
          <ul className="list-disc pl-5">
            <li>aucun remboursement ne pourra être exigé</li>
            <li>la commande sera considérée comme perdue</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">11. Responsabilité</h2>
          <p>
            La Ferme des Hirondelles ne pourra être tenue responsable :
          </p>
          <ul className="list-disc pl-5">
            <li>d’une mauvaise conservation des produits après retrait</li>
            <li>d’une utilisation inappropriée des produits</li>
            <li>d’un retard ou empêchement dû à un cas de force majeure (intempéries, problème sanitaire, panne, etc.)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">12. Réclamations</h2>
          <p>
            Toute réclamation doit être adressée par email à :<br />
            📧 [adresse email à compléter]
          </p>
          <p>
            dans un délai de 48 heures après le retrait, accompagnée, le cas échéant, de preuves (photos).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">13. Données personnelles – RGPD</h2>
          <p>
            Les données personnelles collectées sont utilisées exclusivement pour :
          </p>
          <ul className="list-disc pl-5">
            <li>la gestion des commandes</li>
            <li>la relation client</li>
          </ul>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), le client dispose d’un droit d’accès, de rectification et de suppression de ses données.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">14. Propriété intellectuelle</h2>
          <p>
            L’ensemble des contenus du Site (textes, images, logos, graphismes) est la propriété exclusive de la Ferme des Hirondelles et ne peut être reproduit sans autorisation préalable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">15. Médiation et règlement des litiges</h2>
          <p>
            En cas de litige, le consommateur peut s’adresser gratuitement au :
          </p>
          <p>
            <strong>Service de Médiation pour le Consommateur</strong><br />
            Boulevard du Roi Albert II 8<br />
            1000 Bruxelles<br />
            📧 <a href="mailto:contact@mediationconsommateur.be" className="text-green-600 hover:underline">contact@mediationconsommateur.be</a><br />
            🌐 <a href="https://www.mediationconsommateur.be" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">www.mediationconsommateur.be</a>
          </p>
          <p>
            Le consommateur peut également recourir à la plateforme européenne de règlement en ligne des litiges (ODR) :<br />
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">https://ec.europa.eu/consumers/odr</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-900">16. Droit applicable et juridiction compétente</h2>
          <p>
            Les présentes CGV sont soumises au droit belge.
          </p>
          <p>
            En cas de litige, les tribunaux belges territorialement compétents seront seuls compétents, sauf disposition impérative contraire.
          </p>
        </section>

      </div>
    </div>
  );
};
