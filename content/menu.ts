import type { MenuCategory } from "../lib/types";

export const menuCategories: MenuCategory[] = [
  {
    id: "entrees",
    title: "Entrées",
    description: "Une sélection de mises en bouche raffinées qui évoluent au fil des saisons.",
    items: [
      {
        name: "Huîtres de Cancale",
        description: "Servies avec une mignonnette au champagne et zestes d'agrumes.",
        price: "18 €",
        image: "/images/menu/entrees-huitres.png"
      },
      {
        name: "Velouté de potimarron",
        description: "Crème légère à la noisette torréfiée, croustillant de sarrasin.",
        price: "12 €",
        image: "/images/menu/entrees-veloute.png"
      }
    ]
  },
  {
    id: "plats",
    title: "Plats signature",
    description: "Les incontournables de la maison, élaborés avec des producteurs locaux.",
    items: [
      {
        name: "Bar de ligne en croûte de sel",
        description: "Fenouil confit, beurre blanc au yuzu, chips de pain de seigle.",
        price: "32 €",
        image: "/images/menu/plats-bar.png"
      },
      {
        name: "Filet de bœuf maturé",
        description: "Purée fumée de pommes de terre, jus corsé au cacao, jeunes légumes glacés.",
        price: "38 €",
        image: "/images/menu/plats-boeuf.png"
      }
    ]
  },
  {
    id: "desserts",
    title: "Douceurs",
    description: "Un final tout en gourmandise pour prolonger l'expérience.",
    items: [
      {
        name: "Soufflé chocolat grand cru",
        description: "Chantilly au poivre timut, crumble cacao pécan.",
        price: "14 €",
        image: "/images/menu/desserts-souffle.png"
      },
      {
        name: "Tarte fine aux pommes",
        description: "Caramel au beurre salé, glace au lait ribot.",
        price: "12 €",
        image: "/images/menu/desserts-tarte.png"
      }
    ]
  }
];

export const menuGallery = [
  { id: "menu-1", src: "/images/menu1.png", alt: "Menu dégustation - Printemps" },
  { id: "menu-2", src: "/images/menu2.png", alt: "Menu dégustation - Été" },
  { id: "menu-3", src: "/images/menu3.png", alt: "Menu déjeuner" },
  { id: "menu-4", src: "/images/menu4.png", alt: "Carte des vins vivants" },
  { id: "menu-5", src: "/images/menu5.png", alt: "Carte des desserts" }
];

export const restaurantInfo = {
  name: "Restaurant Antunes",
  heroTagline: "Cuisine de saison, vins vivants et accueil chaleureux au cœur de la ville.",
  heroCta: "Découvrir nos menus",
  phone: "+33 1 23 45 67 89",
  email: "contact@restaurant-antunes.fr",
  address: "3 Rue des Cailloux, 79330 Coulonges-Thouarsais",
  hours: [
    "Lundi - Vendredi : 9h00 - 18h00",
    "Samedi - Dimanche : 9h00 - 00h00",
  ],
  mapEmbedUrl:
    "https://www.google.com/maps?q=3+Rue+des+Cailloux,+79330+Coulonges-Thouarsais&output=embed"
};