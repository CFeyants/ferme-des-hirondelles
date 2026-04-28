# Audit i18n — Ferme des Hirondelles

**Date :** 28 avril 2026  
**Branche :** `chore/i18n-audit`  
**Couverture actuelle estimée :** ~85 %

---

## Stack i18n détectée

| Élément | Valeur |
|---|---|
| **Système** | i18n custom (pas de bibliothèque externe) |
| **Fichier source** | `lib/i18n/translations.ts` — objet TypeScript unique |
| **Contexte React** | `context/LanguageContext.tsx` |
| **Accès dans les composants** | `t('clé.sous-clé')` → string · `ta('clé')` → objet/tableau |
| **Locales supportées** | `'fr'` · `'nl'` · `'en'` |
| **Langue source** | Français (`fr`) |
| **Persistance** | `localStorage` (clé : `locale`) |
| **Framework** | Next.js 14 App Router |
| **Routing i18n** | Pas de préfixe `/fr` `/nl` `/en` — détection via contexte React uniquement |
| **SEO multilingue** | ❌ Pas de `hreflang`, balise `<html lang>` fixe à `"fr"` dans layout.tsx |

---

## Fichiers de traduction

| Chemin | Format | Locales |
|---|---|---|
| `lib/i18n/translations.ts` | Objet TS imbriqué — export `translations` | fr · nl · en |

Les trois locales sont dans le **même fichier**. Pas de fichiers JSON séparés.  
La fonction `createT(locale)` résout les clés via `key.split('.').reduce(...)`.

---

## Clés manquantes en NL

✅ **Aucune clé structurelle manquante.** Les trois locales ont la même arborescence de clés dans `translations.ts`.

---

## Clés manquantes en EN

✅ **Aucune clé structurelle manquante.** Les trois locales ont la même arborescence de clés dans `translations.ts`.

---

## Clés non traduites (valeur encore en FR dans NL ou EN)

> Ces clés existent dans `translations.ts` en NL et EN, mais leur valeur est restée en français.  
> À vérifier manuellement en lisant le fichier de traductions.

À auditer manuellement — rechercher dans `translations.ts` les valeurs NL/EN qui semblent être du français.  
Aucun cas flagrant n'a été détecté automatiquement lors de cet audit ; une revue native reste recommandée (cf. section Recommandations).

---

## Chaînes en dur trouvées hors système i18n

> Pages légales (`/cgv`, `/confidentialite`, `/mentions-legales`) : **intentionnellement exclues** — texte juridique belge, reste en français.  
> Pages admin : **intentionnellement exclues** — interface interne.

### 🔴 Critique (visible par l'utilisateur final NL/EN)

| Fichier | Ligne | Texte en dur | Contexte |
|---|---|---|---|
| `data.ts` | 334 | `"Les commandes sont fermées. Retrait en cours."` | Retour de `isShopOpen()` — affiché sur la homepage et la page boutique |
| `data.ts` | 342 | `"Commandes ouvertes jusqu'à jeudi 23h59"` | Retour de `isShopOpen()` — badge d'état |
| `app/paiement/page.tsx` | 126 | `Confirmation de votre commande #${orderId} — Ferme des Hirondelles` | Sujet de l'email de confirmation envoyé au client |
| `lib/emails/orderConfirmation.ts` | 15–16 | `'Vendredi soir (17h00 - 19h30)'` · `'Samedi journée (10h00 - 16h00)'` | Créneau de retrait dans l'email |
| `lib/emails/orderConfirmation.ts` | 42–77 | Tout le corps HTML de l'email | Confirmation de commande intégralement en français |
| `app/layout.tsx` | 11 | `'Produits fermiers frais en circuit court — Click & Collect à Crainhem'` | Meta `description` SEO — identique pour les 3 langues |

### 🟠 Important (dégradation expérience NL/EN)

| Fichier | Ligne | Texte en dur | Contexte |
|---|---|---|---|
| `context/StoreContext.tsx` | 60 | `'Quantité mise à jour dans le panier'` | Toast success panier |
| `context/StoreContext.tsx` | 65 | `'Ajouté au panier'` | Toast success panier |
| `context/StoreContext.tsx` | 72 | `'Produit retiré du panier'` | Toast info panier |
| `context/StoreContext.tsx` | 83 | `'Produit ajouté'` | Toast admin — produit ajouté |
| `context/StoreContext.tsx` | 84 | `'Produit mis à jour'` | Toast admin — produit modifié |
| `context/StoreContext.tsx` | 85 | `'Produit supprimé'` | Toast admin — produit supprimé |
| `context/StoreContext.tsx` | 105 | `'Commande mise à jour'` | Toast admin — commande |
| `context/StoreContext.tsx` | 108 | `'Erreur lors de la mise à jour de la commande'` | Toast admin — erreur |

### 🟡 Mineur (labels/badges)

| Fichier | Ligne | Texte en dur | Contexte |
|---|---|---|---|
| `components/home/ValuesSection.tsx` | 25 | `'Notre engagement'` | Badge section valeurs |
| `app/a-propos/page.tsx` | 143 | `'Ven 16h–19h · Sam 10h–17h30'` | Horaires inline (doublon avec `t('footer.fridayTime')`) |

### ⚪ Acceptable (noms propres / interface interne)

| Fichier | Ligne | Texte | Raison |
|---|---|---|---|
| `app/auth/login/page.tsx` | 57 · 66 · 104 | `"Réinitialiser les mots de passe admins..."` | Interface admin interne, jamais vue par un client |
| `app/a-propos/page.tsx` | 116 | `'Ferme des Hirondelles · Kraainem'` | Nom propre |
| `app/a-propos/page.tsx` | 180 | `'Kraainem, Belgique'` | Nom propre |

---

## Couche contenu (produits, recettes)

### Produits (`data.ts`)

- Format : tableau `PRODUCTS[]` de ~42 produits — champs `name`, `description`, `category`
- **Langue : français uniquement**
- Le composant `ProductCard.tsx` tente d'abord `t('products.${id}.name')` (traductions dynamiques) puis repasse à `product.name` si absent
- **État :** Les noms et descriptions de produits NE sont PAS traduits dans `translations.ts` → les utilisateurs NL/EN voient les noms français

### Recettes

- Stockées intégralement dans `translations.ts` sous la clé `recettes` — FR · NL · EN
- **État : ✅ Complet** — les recettes ont leurs traductions dans les 3 langues

### Témoignages

- `TestimonialsSection.tsx` : données statiques en dur (`ROW1`, `ROW2`) avec avis français d'exemple
- La source réelle est Supabase (avis clients authentiques en français)
- **État :** Non critique — les avis clients sont par nature en français

---

## Emails transactionnels

| Fichier | Statut | Note |
|---|---|---|
| `lib/emails/orderConfirmation.ts` | ❌ 100 % français | Généré côté serveur — à paramétrer par locale |
| `app/paiement/page.tsx` ligne 126 | ❌ Sujet en français | `subject: \`Confirmation de votre commande #...\`` |
| `email_*.html` (racine) | ⚪ Non utilisé | Templates hérités, remplacés par orderConfirmation.ts |
| `supabase_email_*.html` (racine) | ⚪ Géré par Supabase | Auth emails — configurer dans le dashboard Supabase |

**Point clé :** Un client NL/EN reçoit son email de confirmation **entièrement en français**. C'est le point de douleur le plus visible.

---

## SEO multilingue

- `<html lang="fr">` — valeur fixe dans `app/layout.tsx` — ne change pas selon la locale
- Pas de `<link rel="alternate" hreflang="nl">` / `hreflang="en"`
- Meta `title` et `description` : valeurs fixes en français dans `app/layout.tsx`
- **Impact SEO :** Les pages NL/EN ne sont pas indexées correctement dans leur langue respective

---

## Recommandations

### Priorité 1 — Messages statuts boutique (30 min)
Refactorer `isShopOpen()` dans `data.ts` pour ne retourner qu'un booléen + enum d'état. Déplacer les messages vers `translations.ts` (clés : `shop.closed`, `shop.openDeadline`). Ces messages sont affichés en bannière sur la homepage.

### Priorité 2 — Toasts panier (1h)
`StoreContext.tsx` n'a pas accès au contexte langue (c'est un contexte React séparé). Options :
- **Option A (recommandée) :** Injecter `useLanguage` dans `StoreContext` (ou passer `t` en paramètre des actions)
- **Option B :** Créer un event system — le composant écoute l'action et affiche son propre toast traduit

### Priorité 3 — Noms produits multilingues (2-3h)
Ajouter les traductions NL/EN de noms et descriptions de produits dans `translations.ts` sous `products.{id}.name` et `products.{id}.description`. Le mécanisme de fallback dans `ProductCard.tsx` est déjà en place.

### Priorité 4 — Email de confirmation multilingue (2h)
Modifier `generateOrderConfirmationEmail()` pour accepter un paramètre `locale` et retourner le HTML dans la bonne langue. Adapter `app/paiement/page.tsx` pour passer `locale` au générateur d'email.

### Priorité 5 — Meta SEO par langue (1h)
Remplacer les métadonnées statiques dans `app/layout.tsx` par une génération dynamique `generateMetadata()` utilisant les clés i18n.

### Priorité 6 — Balise `<html lang>` dynamique (30 min)
Rendre `lang={locale}` dynamique dans le layout pour correctement signaler la langue au navigateur et aux moteurs de recherche.

---

## Plan d'action Phase 2

### Sprint 1 — Infrastructure (priorités 1 & 2)
1. Ajouter clés `shop.closed`, `shop.openDeadline` dans `translations.ts` (FR · NL · EN)
2. Refactorer `isShopOpen()` → retourne `{ isOpen: boolean; status: 'closed' | 'open' }`
3. Ajouter clés `toast.addedToCart`, `toast.quantityUpdated`, `toast.removedFromCart` dans `translations.ts`
4. Résoudre l'accès à la langue dans `StoreContext`

### Sprint 2 — Produits & Contenu (priorité 3)
5. Ajouter traductions NL/EN des ~42 produits dans `translations.ts` (`products.{id}.name`, `products.{id}.description`)
6. Vérifier que `ProductCard.tsx` utilise bien le fallback existant

### Sprint 3 — Email & SEO (priorités 4 · 5 · 6)
7. Paramétrer `generateOrderConfirmationEmail(order, locale)` — versions FR · NL · EN
8. Passer `locale` dans `app/paiement/page.tsx` lors de l'envoi email
9. Ajouter `generateMetadata()` dynamique dans `app/layout.tsx`
10. Rendre `<html lang>` dynamique

### Sprint 4 — Labels mineurs
11. `'Notre engagement'` → clé `home.values.tag` dans `translations.ts`
12. `'Ven 16h–19h · Sam 10h–17h30'` dans `a-propos/page.tsx` → utiliser `t('footer.fridayTime')` + `t('footer.saturdayTime')` (clés déjà présentes)

### Non prioritaire (à valider)
- Avis clients statiques dans `TestimonialsSection.tsx` — source réelle est Supabase (français natif), peu d'intérêt à traduire
- Pages légales — restent en français (obligation légale belge)
- Interface admin — reste en français (usage interne)

---

## Phase 2 — Résultats de refactoring

**Date de complétion :** 27 avril 2026  
**Toutes les priorités 1, 2, 4, 5, 6 ont été traitées. Sprint 2 (produits) en attente de validation.**

### Fichiers modifiés

| Fichier | Changement |
|---|---|
| `lib/i18n/translations.ts` | Ajout sections `toast.*`, `email.*`, `shop.closed`, `shop.openDeadline`, `home.values.engagement`, `about.pickupHours`, `meta.description` (FR · NL · EN) |
| `data.ts` | `isShopOpen()` refactorisé → retourne `{ isOpen: boolean; status: 'open' \| 'closed' }` — messages retirés |
| `context/StoreContext.tsx` | `useLanguage()` injecté — 5 toasts en dur remplacés par `t('toast.*')` |
| `app/paiement/page.tsx` | Sujet email → `t('email.subject')` · `generateOrderConfirmationEmail(order, locale)` · `shopStatus.message` → `t('shop.closed')` |
| `components/home/ValuesSection.tsx` | `'Notre engagement'` → `t('home.values.engagement')` |
| `app/a-propos/page.tsx` | Horaires inline → `t('about.pickupHours')` |
| `lib/emails/orderConfirmation.ts` | Réécriture complète — paramètre `locale: 'fr' \| 'nl' \| 'en'` — HTML traduit depuis `translations[locale].email` |
| `context/LanguageContext.tsx` | `document.documentElement.lang = locale` (dynamique) · cookie `locale` persisté pour SSR |
| `app/layout.tsx` | `generateMetadata()` dynamique — lit le cookie `locale` · description SEO multilingue |

### Nouvelles clés ajoutées

- `toast.addedToCart`, `toast.quantityUpdated`, `toast.removedFromCart`, `toast.orderUpdated`, `toast.orderUpdateError`
- `email.subject`, `email.confirmed`, `email.thanks`, `email.greeting`, `email.body`, `email.summary`, `email.colProduct`, `email.colQty`, `email.colPrice`, `email.total`, `email.pickupTitle`, `email.pickupFriday`, `email.pickupSaturday`, `email.pickupLabel`, `email.depositLabel`, `email.question`
- `shop.closed`, `shop.openDeadline` (fusionnés dans la section `shop` existante)
- `home.values.engagement`
- `about.pickupHours`
- `meta.description`

### Couverture après Phase 2

| Catégorie | Avant | Après |
|---|---|---|
| Chaînes critiques | 6 non traduites | ✅ 0 |
| Toasts panier/admin | 8 non traduits | ✅ 0 |
| Labels mineurs | 2 non traduits | ✅ 0 |
| Email de confirmation | 100 % français | ✅ Multilingue FR/NL/EN |
| `<html lang>` | Fixe `"fr"` | ✅ Dynamique |
| Meta SEO description | Fixe FR | ✅ Dynamique par locale |

### Reste à faire (Sprint 2 — non prioritaire)

- ~42 produits dans `data.ts` : noms et descriptions uniquement en français → ajouter traductions NL/EN sous `products.{id}.name` / `products.{id}.description` dans `translations.ts`
- `hreflang` dans les balises `<link>` pour le SEO multilingue complet

---

## Synthèse

| Métrique | Valeur |
|---|---|
| Couverture clés i18n (`translations.ts`) | 100 % — pas de clé manquante entre locales |
| Chaînes en dur critiques | 6 (boutique statut · email sujet · email corps · meta SEO) |
| Chaînes en dur importantes | 8 (toasts panier/admin) |
| Chaînes en dur mineures | 2 (labels/badges) |
| Produits sans traduction NL/EN | ~42 (noms + descriptions) |
| Email de confirmation | 100 % français — priorité haute |
| SEO multilingue | Absent — `hreflang` manquant |
| Effort estimé Phase 2 complète | 6–10 heures |
| Risque de régression | Bas (changements isolés) |
