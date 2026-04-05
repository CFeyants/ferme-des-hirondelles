import { addDays, isBefore, isAfter, set, getDay } from "date-fns";

export type Category = "viande" | "legumes";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string; // e.g., "kg", "pièce"
  category: Category;
  image: string;
  inStock: boolean;
  stockQuantity: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: CartItem[];
  total: number;
  status: "pending" | "confirmed" | "picked_up" | "cancelled";
  pickupDate: string; // "vendredi" or "samedi"
  paymentMethod: "card" | "transfer" | "wero";
  createdAt: string;
  isPrepared?: boolean;
}

export const PRODUCTS: Product[] = [
  // VIANDES - BOEUF
  {
    id: "101",
    name: "Steak (par 2 pièces)",
    description: "Deux steaks de bœuf tendre, environ 300g total.",
    price: 12.00,
    unit: "paquet",
    category: "viande",
    image: "https://images.unsplash.com/photo-1677607219966-22fbfa433667?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXclMjBiZWVmJTIwc3RlYWt8ZW58MXx8fHwxNzY3MjY0NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 20,
  },
  {
    id: "102",
    name: "Haché de bœuf",
    description: "Pur bœuf, idéal pour vos sauces bolognaises.",
    price: 14.00,
    unit: "kg",
    category: "viande",
    image: "https://images.unsplash.com/photo-1448907503123-67254d59ca4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91bmQlMjBiZWVmfGVufDF8fHx8MTc2NzI2NDUyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 30,
  },
  {
    id: "103",
    name: "Rôti de bœuf",
    description: "Morceau de choix à rôtir au four.",
    price: 25.00,
    unit: "kg",
    category: "viande",
    image: "https://images.unsplash.com/photo-1733700469173-15d46efc2c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdCUyMGJlZWYlMjByYXd8ZW58MXx8fHwxNzY3MjY0NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 10,
  },
  {
    id: "104",
    name: "Carbonnades",
    description: "Morceaux à mijoter pour une viande fondante.",
    price: 18.00,
    unit: "kg",
    category: "viande",
    image: "https://images.unsplash.com/photo-1733700469173-15d46efc2c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdCUyMGJlZWYlMjByYXd8ZW58MXx8fHwxNzY3MjY0NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 15,
  },
  
  // VIANDES - VEAU
  {
    id: "110",
    name: "Escalopes de Veau",
    description: "Fines tranches de veau de lait.",
    price: 28.00,
    unit: "kg",
    category: "viande",
    image: "https://images.unsplash.com/photo-1677050205812-1fbf1a832efa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWFsJTIwY3V0bGV0JTIwcmF3fGVufDF8fHx8MTc2NzI2NDUzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 10,
  },
  {
    id: "111",
    name: "Rôti de Veau",
    description: "Tendre et délicat.",
    price: 30.00,
    unit: "kg",
    category: "viande",
    image: "https://images.unsplash.com/photo-1677050205812-1fbf1a832efa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWFsJTIwY3V0bGV0JTIwcmF3fGVufDF8fHx8MTc2NzI2NDUzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 5,
  },

  // VIANDES - PORC
  {
    id: "120",
    name: "Côtelettes de Porc",
    description: "Porc fermier élevé sur paille.",
    price: 11.00,
    unit: "kg",
    category: "viande",
    image: "https://images.unsplash.com/photo-1763033035770-e83f50e8e8b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3JrJTIwY2hvcHMlMjByYXd8ZW58MXx8fHwxNzY3MjY0NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 25,
  },
  {
    id: "121",
    name: "Saucisses artisanales",
    description: "Recette traditionnelle aux herbes.",
    price: 12.00,
    unit: "kg",
    category: "viande",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVzYWdlcyUyMHJhd3xlbnwxfHx8fDE3NjcyNjQ1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 40,
  },
  {
    id: "122",
    name: "Lard",
    description: "Lard fumé maison, tranché.",
    price: 10.00,
    unit: "kg",
    category: "viande",
    image: "https://images.unsplash.com/photo-1723466982423-9425425492a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNvbiUyMHJhd3xlbnwxfHx8fDE3NjcyNjQ1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 20,
  },

  // VIANDES - VOLAILLE
  {
    id: "130",
    name: "Poulet entier",
    description: "Poulet fermier élevé en plein air (env. 1.5kg).",
    price: 15.00,
    unit: "pièce",
    category: "viande",
    image: "https://images.unsplash.com/photo-1672787153655-0c19308dcc60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aG9sZSUyMGNoaWNrZW4lMjByYXd8ZW58MXx8fHwxNzY3MTk1MzQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 15,
  },
  {
    id: "131",
    name: "Filets de poulet",
    description: "Blancs de poulet sans peau.",
    price: 18.00,
    unit: "kg",
    category: "viande",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnJlYXN0JTIwcmF3fGVufDF8fHx8MTc2NzI2NDUyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 20,
  },

  // TRANSFORMÉS
  {
    id: "140",
    name: "Boulettes",
    description: "Mélange porc et bœuf, assaisonné.",
    price: 13.00,
    unit: "kg",
    category: "viande",
    image: "https://images.unsplash.com/photo-1673984268026-128f096760a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0YmFsbHMlMjByYXd8ZW58MXx8fHwxNzY3MjY0NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 30,
  },
  {
    id: "141",
    name: "Burgers fermiers",
    description: "100% bœuf, préparés sur place.",
    price: 3.50,
    unit: "pièce",
    category: "viande",
    image: "https://images.unsplash.com/photo-1578418578297-720893445295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBwYXR0eSUyMHJhd3xlbnwxfHx8fDE3NjcyNjQ1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 40,
  },
  {
    id: "142",
    name: "Saucissons",
    description: "Saucisson sec artisanal.",
    price: 6.00,
    unit: "pièce",
    category: "viande",
    image: "https://images.unsplash.com/photo-1651429985498-8ab2886735e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnklMjBzYXVzYWdlfGVufDF8fHx8MTc2NzI2NDUzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 50,
  },

  // LÉGUMES & FRUITS
  {
    id: "201",
    name: "Pommes de terre",
    description: "Chair ferme, idéale vapeur ou rissolée.",
    price: 2.00,
    unit: "kg",
    category: "legumes",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG9lc3xlbnwxfHx8fDE3NjcyNjQ1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 100,
  },
  {
    id: "202",
    name: "Carottes",
    description: "Carottes des sables, sucrées et croquantes.",
    price: 2.50,
    unit: "botte",
    category: "legumes",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJyb3RzJTIwYnVuY2h8ZW58MXx8fHwxNzY3MjY0NTI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 40,
  },
  {
    id: "203",
    name: "Poireaux",
    description: "Pour vos soupes et fondues.",
    price: 3.00,
    unit: "botte",
    category: "legumes",
    image: "https://images.unsplash.com/photo-1549913468-0ddc24a4a1bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWVrc3xlbnwxfHx8fDE3NjcyNjQ1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 30,
  },
  {
    id: "204",
    name: "Oignons",
    description: "Oignons jaunes de conservation.",
    price: 2.00,
    unit: "kg",
    category: "legumes",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmlvbnN8ZW58MXx8fHwxNzY3MjY0NTI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 60,
  },
  {
    id: "205",
    name: "Courges Butternut",
    description: "Douce et noisettée.",
    price: 4.00,
    unit: "pièce",
    category: "legumes",
    image: "https://images.unsplash.com/photo-1583260142340-1569bcfeb39c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXJudXQlMjBzcXVhc2h8ZW58MXx8fHwxNzY3MjY0NTI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 20,
  },
  {
    id: "206",
    name: "Salade",
    description: "Laitue fraîche du matin.",
    price: 1.50,
    unit: "pièce",
    category: "legumes",
    image: "https://images.unsplash.com/photo-1640958904159-51ae08bd3412?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXR0dWNlfGVufDF8fHx8MTc2NzI2NDUyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 30,
  },
  {
    id: "207",
    name: "Tomates",
    description: "Mélange de variétés anciennes (saison).",
    price: 4.50,
    unit: "kg",
    category: "legumes",
    image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lc3xlbnwxfHx8fDE3NjcyNjQ1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 25,
  },
  {
    id: "208",
    name: "Courgettes",
    description: "Vertes et croquantes.",
    price: 3.00,
    unit: "kg",
    category: "legumes",
    image: "https://images.unsplash.com/photo-1691480291894-75229c2bfd44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6dWNjaGluaXxlbnwxfHx8fDE3NjcyNjQ1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 30,
  },
  {
    id: "209",
    name: "Pommes",
    description: "Jonagold, locales.",
    price: 3.50,
    unit: "kg",
    category: "legumes",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZXN8ZW58MXx8fHwxNzY3MjY0NTI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 50,
  },
  {
    id: "210",
    name: "Poires",
    description: "Conférence, juteuses.",
    price: 4.00,
    unit: "kg",
    category: "legumes",
    image: "https://images.unsplash.com/photo-1631160299919-6a175aa6d189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFyc3xlbnwxfHx8fDE3NjcyNjQ1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 40,
  },
  {
    id: "211",
    name: "Fraises",
    description: "La touche sucrée de saison.",
    price: 6.00,
    unit: "ravier",
    category: "legumes",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJpZXN8ZW58MXx8fHwxNzY3MjY0NTI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 20,
  },

  // PANIERS
  {
    id: "301",
    name: "Panier légumes – petit",
    description: "Assortiment pour 1-2 personnes. Sélection de produits en large stock pour éviter le gaspillage (-20%).",
    price: 12.00, // Was 15.00
    unit: "panier",
    category: "legumes",
    image: "https://images.unsplash.com/photo-1690934167884-08c184b6c606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBiYXNrZXR8ZW58MXx8fHwxNzY3MjY0NTI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 10,
  },
  {
    id: "302",
    name: "Panier légumes – grand",
    description: "Assortiment familial pour 4 personnes. Sélection de produits en large stock pour éviter le gaspillage (-20%).",
    price: 20.00, // Was 25.00
    unit: "panier",
    category: "legumes",
    image: "https://images.unsplash.com/photo-1690934167884-08c184b6c606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBiYXNrZXR8ZW58MXx8fHwxNzY3MjY0NTI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 10,
  },
  {
    id: "303",
    name: "Panier mixte légumes & fruits",
    description: "Le meilleur des deux mondes.",
    price: 30.00,
    unit: "panier",
    category: "legumes",
    image: "https://images.unsplash.com/photo-1690934167884-08c184b6c606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBiYXNrZXR8ZW58MXx8fHwxNzY3MjY0NTI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    stockQuantity: 5,
  }
];

// Helper to check if shop is open
// Open until Thursday 23:59
export const isShopOpen = (): { isOpen: boolean; message: string } => {
  const now = new Date();
  const currentDay = getDay(now); // 0 = Sunday, 1 = Monday, ..., 4 = Thursday, 5 = Friday, 6 = Saturday

  // Logic: 
  // Orders open from Sunday to Thursday 23:59.
  // Closed Friday and Saturday (pickup days).
  
  // If it's Friday (5) or Saturday (6), it's closed.
  if (currentDay === 5 || currentDay === 6) {
    return { isOpen: false, message: "Les commandes sont fermées. Retrait en cours." };
  }

  // If it's Thursday (4), check time.
  // Actually, standard logic says open all week UNTIL Thursday night.
  // So if it's Thursday, it's open until 23:59.
  // Since we only check day, basically if it's not Fri/Sat, it's open.
  
  return { isOpen: true, message: "Commandes ouvertes jusqu'à jeudi 23h59" };
};

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    customerName: "Jean Dupont",
    customerEmail: "jean.dupont@email.com",
    items: [{ ...PRODUCTS[0], quantity: 1 }, { ...PRODUCTS[3], quantity: 1 }],
    total: 30.00,
    status: "confirmed",
    pickupDate: "vendredi",
    paymentMethod: "card",
    createdAt: "2025-12-30T10:00:00Z"
  }
];
