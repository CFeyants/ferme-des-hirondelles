export type Ingredient = {
  nom: string
  quantitePourBase: number
  unite: string
  productId?: string // ID du produit dans data.ts
  note?: string
}

export type Etape = {
  numero: number
  titre: string
  description: string
  dureeMinutes?: number
}

export type CategorieRecette = 'Viande' | 'Légumes' | 'Soupe' | 'BBQ' | 'Mijoté' | 'Volaille'

export type Recette = {
  slug: string
  titre: string
  description: string
  image: string
  personnagesBase: number
  tempsPrepMinutes: number
  tempsCuissonMinutes: number
  difficulte: 'Facile' | 'Moyen' | 'Difficile'
  categorie: CategorieRecette
  tags: string[]
  ingredients: Ingredient[]
  etapes: Etape[]
  conseilChef?: string
}

// Correspondance productId → produit de la boutique
// 120=Saucisses, 121=Côtes de porc, 122=Haché de porc, 123=Lard
// 125=Rôti de porc, 130=Poulet entier
// 201=Pommes de terre, 202=Carottes, 203=Poireaux, 204=Oignons
// 206=Salade, 207=Tomates

export const RECETTES: Recette[] = [
  {
    slug: 'cotes-de-porc-a-la-biere',
    titre: 'Côtes de porc à la bière brune',
    description:
      'Un mijoté belge réconfortant : des côtes de porc fermier cuites longuement dans une bière brune avec thym et laurier. Simple, généreux, parfait en hiver.',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    personnagesBase: 4,
    tempsPrepMinutes: 20,
    tempsCuissonMinutes: 90,
    difficulte: 'Moyen',
    categorie: 'Mijoté',
    tags: ['belge', 'hiver', 'famille', 'porc', 'bière'],
    ingredients: [
      { nom: 'Côtes de porc', quantitePourBase: 0.8, unite: 'kg', productId: '121' },
      { nom: 'Oignons', quantitePourBase: 0.3, unite: 'kg', productId: '204' },
      { nom: 'Bière brune belge', quantitePourBase: 330, unite: 'ml' },
      { nom: 'Bouillon de viande', quantitePourBase: 200, unite: 'ml' },
      { nom: 'Moutarde', quantitePourBase: 1, unite: 'c. à soupe' },
      { nom: 'Pain d\'épices', quantitePourBase: 2, unite: 'tranche(s)' },
      { nom: 'Thym', quantitePourBase: 2, unite: 'branche(s)' },
      { nom: 'Laurier', quantitePourBase: 2, unite: 'feuille(s)' },
      { nom: 'Huile', quantitePourBase: 2, unite: 'c. à soupe' },
    ],
    etapes: [
      {
        numero: 1,
        titre: 'Saisir la viande',
        description:
          'Dans une cocotte, chauffer l\'huile à feu vif. Saisir les côtes de porc sur toutes les faces jusqu\'à coloration dorée. Réserver.',
        dureeMinutes: 10,
      },
      {
        numero: 2,
        titre: 'Faire revenir les oignons',
        description:
          'Dans la même cocotte, faire revenir les oignons émincés à feu moyen jusqu\'à légère coloration.',
        dureeMinutes: 8,
      },
      {
        numero: 3,
        titre: 'Déglacer à la bière',
        description:
          'Remettre la viande, verser la bière brune et le bouillon. Ajouter thym, laurier et les tranches de pain d\'épices tartinées de moutarde. Porter à ébullition.',
      },
      {
        numero: 4,
        titre: 'Mijoter longuement',
        description:
          'Couvrir et laisser mijoter à feu très doux jusqu\'à ce que la viande soit fondante. Remuer de temps en temps.',
        dureeMinutes: 75,
      },
      {
        numero: 5,
        titre: 'Ajuster et servir',
        description:
          'Retirer le laurier et le thym. Rectifier l\'assaisonnement. Servir avec des frites ou des pommes de terre vapeur de la ferme.',
      },
    ],
    conseilChef:
      'Préparez ce plat la veille — il est encore meilleur réchauffé. Une pincée de sucre brun équilibre l\'amertume de la bière.',
  },

  {
    slug: 'roti-de-porc-du-dimanche',
    titre: 'Rôti de porc du dimanche',
    description:
      'Un classique intemporel : le rôti de porc fermier doré en croûte, servi avec les légumes de la ferme rôtis au four. Généreux et sans chichi.',
    image:
      'https://images.unsplash.com/photo-1546069901-eacef0df6022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    personnagesBase: 6,
    tempsPrepMinutes: 15,
    tempsCuissonMinutes: 75,
    difficulte: 'Facile',
    categorie: 'Viande',
    tags: ['dimanche', 'famille', 'porc', 'facile'],
    ingredients: [
      { nom: 'Rôti de porc', quantitePourBase: 1.2, unite: 'kg', productId: '125' },
      { nom: 'Carottes', quantitePourBase: 2, unite: 'botte(s)', productId: '202' },
      { nom: 'Pommes de terre', quantitePourBase: 0.8, unite: 'kg', productId: '201' },
      { nom: 'Oignons', quantitePourBase: 0.3, unite: 'kg', productId: '204' },
      { nom: 'Ail', quantitePourBase: 4, unite: 'gousse(s)' },
      { nom: 'Thym, romarin', quantitePourBase: 1, unite: 'bouquet' },
      { nom: 'Beurre', quantitePourBase: 30, unite: 'g' },
      { nom: 'Huile d\'olive', quantitePourBase: 2, unite: 'c. à soupe' },
    ],
    etapes: [
      {
        numero: 1,
        titre: 'Sortir la viande à l\'avance',
        description:
          'Sortir le rôti du réfrigérateur 1h avant la cuisson pour qu\'il soit à température ambiante. Préchauffer le four à 220°C.',
      },
      {
        numero: 2,
        titre: 'Préparer les légumes',
        description:
          'Éplucher et couper les carottes et pommes de terre en gros morceaux. Émincer les oignons. Disposer dans un plat allant au four avec l\'ail en chemise, assaisonner et arroser d\'huile.',
      },
      {
        numero: 3,
        titre: 'Saisir le rôti',
        description:
          'Dans une poêle très chaude, faire dorer le rôti avec le beurre et l\'huile sur toutes les faces.',
        dureeMinutes: 5,
      },
      {
        numero: 4,
        titre: 'Enfourner',
        description:
          'Poser le rôti sur les légumes. Ajouter thym et romarin. Enfourner à 220°C pendant 15 min, puis baisser à 180°C et poursuivre la cuisson.',
        dureeMinutes: 60,
      },
      {
        numero: 5,
        titre: 'Repos obligatoire',
        description:
          'Sortir le rôti, le couvrir de papier aluminium et laisser reposer 10 min avant de trancher.',
        dureeMinutes: 10,
      },
    ],
    conseilChef:
      'Comptez 15 min par 500g à 180°C après la saisie. Un thermomètre à viande est votre meilleur allié : 65-70°C à cœur pour un rôti de porc bien cuit.',
  },

  {
    slug: 'poulet-roti-legumes',
    titre: 'Poulet fermier rôti et ses légumes',
    description:
      'Un poulet fermier rôti lentement, entouré des légumes de saison de la ferme. Simple, généreux, parfait.',
    image:
      'https://images.unsplash.com/photo-1762154194962-cccc677be031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    personnagesBase: 4,
    tempsPrepMinutes: 15,
    tempsCuissonMinutes: 75,
    difficulte: 'Facile',
    categorie: 'Volaille',
    tags: ['poulet', 'légumes', 'famille', 'facile', 'dimanche'],
    ingredients: [
      { nom: 'Poulet entier', quantitePourBase: 1, unite: 'pièce (~1,5 kg)', productId: '130' },
      { nom: 'Pommes de terre', quantitePourBase: 0.6, unite: 'kg', productId: '201' },
      { nom: 'Carottes', quantitePourBase: 1, unite: 'botte(s)', productId: '202' },
      { nom: 'Oignons', quantitePourBase: 0.3, unite: 'kg', productId: '204' },
      { nom: 'Ail', quantitePourBase: 1, unite: 'tête entière' },
      { nom: 'Citron', quantitePourBase: 1, unite: 'pièce' },
      { nom: 'Beurre', quantitePourBase: 40, unite: 'g' },
      { nom: 'Thym, romarin', quantitePourBase: 1, unite: 'bouquet' },
    ],
    etapes: [
      {
        numero: 1,
        titre: 'Préparer le poulet',
        description:
          'Préchauffer le four à 200°C. Glisser du beurre sous la peau de la poitrine. Farcir la cavité avec le citron coupé en deux, de l\'ail et des herbes.',
      },
      {
        numero: 2,
        titre: 'Préparer les légumes',
        description:
          'Couper les légumes en gros morceaux. Les placer dans un plat, assaisonner et arroser d\'huile.',
      },
      {
        numero: 3,
        titre: 'Enfourner',
        description:
          'Poser le poulet sur les légumes. Arroser d\'huile, saler, poivrer généreusement.',
        dureeMinutes: 75,
      },
      {
        numero: 4,
        titre: 'Arroser régulièrement',
        description:
          'Toutes les 20 min, arroser le poulet avec son jus de cuisson pour une peau bien dorée.',
      },
      {
        numero: 5,
        titre: 'Vérifier la cuisson',
        description:
          'Piquer la cuisse : le jus doit ressortir clair. Laisser reposer 10 min avant de découper.',
      },
    ],
    conseilChef:
      'Un poulet fermier mérite une cuisson douce et longue. Comptez 1h15 pour 1,5 kg. La peau doit être dorée et croustillante.',
  },

  {
    slug: 'boulettes-sauce-tomate',
    titre: 'Boulettes maison en sauce tomate',
    description:
      'Des boulettes façonnées à la main avec le haché de porc de la ferme, mijotées dans une sauce tomate parfumée. Un classique belge adoré par tous.',
    image:
      'https://images.unsplash.com/photo-1544009717-1c2561ae1439?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    personnagesBase: 4,
    tempsPrepMinutes: 20,
    tempsCuissonMinutes: 35,
    difficulte: 'Facile',
    categorie: 'Mijoté',
    tags: ['belge', 'famille', 'enfants', 'boulettes', 'porc'],
    ingredients: [
      { nom: 'Haché de porc', quantitePourBase: 0.6, unite: 'kg', productId: '122' },
      { nom: 'Oignons', quantitePourBase: 0.2, unite: 'kg', productId: '204' },
      { nom: 'Tomates concassées', quantitePourBase: 400, unite: 'ml (1 boîte)' },
      { nom: 'Concentré de tomate', quantitePourBase: 2, unite: 'c. à soupe' },
      { nom: 'Ail', quantitePourBase: 2, unite: 'gousse(s)' },
      { nom: 'Basilic frais', quantitePourBase: 1, unite: 'bouquet' },
      { nom: 'Œuf', quantitePourBase: 1, unite: 'pièce' },
      { nom: 'Chapelure', quantitePourBase: 3, unite: 'c. à soupe' },
    ],
    etapes: [
      {
        numero: 1,
        titre: 'Façonner les boulettes',
        description:
          'Mélanger le haché avec l\'œuf, la chapelure, sel et poivre. Former des boulettes de la taille d\'une noix.',
      },
      {
        numero: 2,
        titre: 'Dorer les boulettes',
        description:
          'Dans une grande poêle, dorer les boulettes sur toutes les faces dans l\'huile. Réserver.',
        dureeMinutes: 8,
      },
      {
        numero: 3,
        titre: 'Préparer la base tomate',
        description:
          'Dans la même poêle, faire revenir oignon et ail émincés. Ajouter le concentré de tomate et laisser caraméliser 2 min.',
      },
      {
        numero: 4,
        titre: 'Mijoter ensemble',
        description:
          'Ajouter les tomates concassées, assaisonner. Remettre les boulettes. Couvrir et laisser mijoter à feu doux.',
        dureeMinutes: 25,
      },
      {
        numero: 5,
        titre: 'Finition',
        description:
          'Ajouter le basilic frais haché. Rectifier l\'assaisonnement. Servir avec des pâtes ou du riz.',
      },
    ],
    conseilChef:
      'Une pincée de sucre dans la sauce tomate neutralise l\'acidité. Préparez-en le double et congelez — elles réchauffent parfaitement.',
  },

  {
    slug: 'soupe-legumes-saison',
    titre: 'Soupe de légumes de la ferme',
    description:
      'La soupe réconfortante par excellence, faite avec les légumes de la semaine. Veloutée, savoureuse et prête en 30 minutes.',
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    personnagesBase: 4,
    tempsPrepMinutes: 20,
    tempsCuissonMinutes: 30,
    difficulte: 'Facile',
    categorie: 'Soupe',
    tags: ['végétarien', 'hiver', 'légumes', 'rapide', 'économique'],
    ingredients: [
      { nom: 'Carottes', quantitePourBase: 1, unite: 'botte(s)', productId: '202' },
      { nom: 'Poireaux', quantitePourBase: 1, unite: 'botte(s)', productId: '203' },
      { nom: 'Pommes de terre', quantitePourBase: 0.4, unite: 'kg', productId: '201' },
      { nom: 'Oignons', quantitePourBase: 0.2, unite: 'kg', productId: '204' },
      { nom: 'Bouillon de légumes', quantitePourBase: 1500, unite: 'ml' },
      { nom: 'Crème fraîche', quantitePourBase: 100, unite: 'ml' },
      { nom: 'Beurre', quantitePourBase: 20, unite: 'g' },
    ],
    etapes: [
      {
        numero: 1,
        titre: 'Préparer les légumes',
        description:
          'Éplucher et couper tous les légumes en morceaux grossiers. Les tailles n\'ont pas besoin d\'être parfaites car on va mixer.',
      },
      {
        numero: 2,
        titre: 'Faire revenir',
        description:
          'Dans une grande casserole, faire fondre le beurre et faire revenir oignons et poireaux 5 min à feu moyen.',
        dureeMinutes: 5,
      },
      {
        numero: 3,
        titre: 'Cuire',
        description:
          'Ajouter les carottes, pommes de terre et le bouillon. Porter à ébullition, puis cuire à feu moyen jusqu\'à ce que tous les légumes soient tendres.',
        dureeMinutes: 25,
      },
      {
        numero: 4,
        titre: 'Mixer et finir',
        description:
          'Mixer jusqu\'à consistance lisse. Ajouter la crème, assaisonner avec sel, poivre et muscade. Réchauffer doucement.',
      },
    ],
    conseilChef:
      'Variez selon la saison : courge butternut en automne, courgettes en été. Le secret d\'une bonne soupe : ne jamais lésiner sur les légumes.',
  },

  {
    slug: 'saucisses-pommes-de-terre',
    titre: 'Saucisses fermières et pommes de terre persillées',
    description:
      'Un classique rapide et savoureux avec les saucisses artisanales de la ferme et des pommes de terre sautées au beurre et au persil.',
    image:
      'https://images.unsplash.com/photo-1579366948929-444eb79881eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    personnagesBase: 4,
    tempsPrepMinutes: 10,
    tempsCuissonMinutes: 25,
    difficulte: 'Facile',
    categorie: 'Viande',
    tags: ['rapide', 'saucisses', 'enfants', 'facile', 'BBQ'],
    ingredients: [
      { nom: 'Saucisses', quantitePourBase: 0.6, unite: 'kg', productId: '120' },
      { nom: 'Pommes de terre', quantitePourBase: 0.8, unite: 'kg', productId: '201' },
      { nom: 'Oignons', quantitePourBase: 0.3, unite: 'kg', productId: '204' },
      { nom: 'Persil frais', quantitePourBase: 1, unite: 'bouquet' },
      { nom: 'Ail', quantitePourBase: 2, unite: 'gousse(s)' },
      { nom: 'Beurre', quantitePourBase: 30, unite: 'g' },
    ],
    etapes: [
      {
        numero: 1,
        titre: 'Cuire les pommes de terre',
        description:
          'Faire cuire les pommes de terre avec la peau dans l\'eau bouillante salée jusqu\'à ce qu\'elles soient tendres. Égoutter et couper en rondelles.',
        dureeMinutes: 20,
      },
      {
        numero: 2,
        titre: 'Griller les saucisses',
        description:
          'Cuire les saucisses à la poêle ou au grill à feu moyen, en les retournant régulièrement jusqu\'à coloration uniforme.',
        dureeMinutes: 12,
      },
      {
        numero: 3,
        titre: 'Faire sauter les pommes de terre',
        description:
          'Dans une grande poêle, faire dorer les rondelles de pommes de terre avec les oignons dans le beurre. Saler, poivrer.',
        dureeMinutes: 8,
      },
      {
        numero: 4,
        titre: 'Finition',
        description:
          'Ajouter l\'ail et le persil haché en fin de cuisson. Servir avec les saucisses.',
      },
    ],
  },

  {
    slug: 'burger-de-porc-maison',
    titre: 'Burger de porc maison',
    description:
      'Un vrai burger façonné à la main avec le haché de porc de la ferme, garni des légumes du jardin. Plus besoin de fast-food.',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    personnagesBase: 4,
    tempsPrepMinutes: 15,
    tempsCuissonMinutes: 15,
    difficulte: 'Facile',
    categorie: 'BBQ',
    tags: ['burger', 'BBQ', 'été', 'porc', 'enfants'],
    ingredients: [
      { nom: 'Haché de porc', quantitePourBase: 0.5, unite: 'kg', productId: '122' },
      { nom: 'Salade', quantitePourBase: 1, unite: 'pièce', productId: '206' },
      { nom: 'Tomates', quantitePourBase: 0.4, unite: 'kg', productId: '207' },
      { nom: 'Oignons', quantitePourBase: 0.2, unite: 'kg', productId: '204' },
      { nom: 'Pains à burger', quantitePourBase: 4, unite: 'pièce(s)' },
      { nom: 'Fromage à fondre', quantitePourBase: 4, unite: 'tranche(s)' },
      { nom: 'Cornichons, ketchup, moutarde', quantitePourBase: 1, unite: 'au goût' },
    ],
    etapes: [
      {
        numero: 1,
        titre: 'Façonner les steaks',
        description:
          'Mélanger le haché avec sel, poivre et une pincée d\'ail en poudre. Former 4 steaks de même épaisseur. Ne pas trop travailler la viande.',
      },
      {
        numero: 2,
        titre: 'Préparer les garnitures',
        description:
          'Laver et couper la salade, les tomates en rondelles, les oignons en fines lamelles.',
      },
      {
        numero: 3,
        titre: 'Cuire les burgers',
        description:
          'Chauffer une poêle à feu très vif. Cuire les steaks 3-4 min par côté. Saler uniquement en fin de cuisson. Ajouter le fromage 1 min avant la fin.',
        dureeMinutes: 8,
      },
      {
        numero: 4,
        titre: 'Assembler',
        description:
          'Toaster les pains dans la poêle. Tartiner de moutarde et ketchup, ajouter salade, tomate, oignon, le steak et les cornichons.',
      },
    ],
    conseilChef:
      'Ne jamais appuyer sur le steak avec une spatule — ça perd tout le jus. Saler uniquement à la fin pour garder la viande juteuse.',
  },

  {
    slug: 'cotes-de-porc-a-la-creme',
    titre: 'Côtes de porc à la crème et champignons',
    description:
      'Un plat élégant et rapide : des côtes de porc fermier dorées, une sauce crémeuse aux champignons et échalotes. Prêt en 25 minutes.',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    personnagesBase: 4,
    tempsPrepMinutes: 10,
    tempsCuissonMinutes: 20,
    difficulte: 'Facile',
    categorie: 'Viande',
    tags: ['porc', 'rapide', 'crème', 'élégant', 'champignons'],
    ingredients: [
      { nom: 'Côtes de porc', quantitePourBase: 0.7, unite: 'kg', productId: '121' },
      { nom: 'Oignons', quantitePourBase: 0.2, unite: 'kg', productId: '204', note: 'ou échalotes' },
      { nom: 'Champignons de Paris', quantitePourBase: 300, unite: 'g' },
      { nom: 'Crème fraîche épaisse', quantitePourBase: 200, unite: 'ml' },
      { nom: 'Beurre', quantitePourBase: 40, unite: 'g' },
      { nom: 'Vin blanc sec', quantitePourBase: 100, unite: 'ml' },
      { nom: 'Persil frais', quantitePourBase: 1, unite: 'bouquet' },
    ],
    etapes: [
      {
        numero: 1,
        titre: 'Cuire les côtes',
        description:
          'Dans une poêle, faire fondre le beurre à feu moyen-vif. Cuire les côtes de porc 3-4 min par côté jusqu\'à belle coloration. Réserver au chaud.',
        dureeMinutes: 8,
      },
      {
        numero: 2,
        titre: 'Préparer la sauce',
        description:
          'Dans la même poêle, faire revenir les oignons émincés, puis les champignons tranchés jusqu\'à évaporation de l\'eau.',
        dureeMinutes: 5,
      },
      {
        numero: 3,
        titre: 'Déglacer',
        description:
          'Verser le vin blanc, laisser réduire de moitié. Ajouter la crème, laisser épaissir 3 min à feu doux. Assaisonner.',
        dureeMinutes: 5,
      },
      {
        numero: 4,
        titre: 'Finition',
        description:
          'Remettre les côtes dans la sauce 2 min pour les réchauffer. Parsemer de persil haché. Servir avec des tagliatelles ou des pommes de terre.',
      },
    ],
    conseilChef:
      'Ne pas trop cuire les côtes — elles doivent rester légèrement rosées à cœur pour rester juteuses. La sauce crème épaissit en refroidissant.',
  },
]
