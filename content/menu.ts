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
        image: "/images/produit.jpg"
      },
      {
        name: "Velouté de potimarron",
        description: "Crème légère à la noisette torréfiée, croustillant de sarrasin.",
        price: "12 €",
        image: "/images/plat.jpg"
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
        image: "/images/plat.jpg"
      },
      {
        name: "Filet de bœuf maturé",
        description: "Purée fumée de pommes de terre, jus corsé au cacao, jeunes légumes glacés.",
        price: "38 €",
        image: "/images/produit.jpg"
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
        image: "/images/plat.jpg"
      },
      {
        name: "Tarte fine aux pommes",
        description: "Caramel au beurre salé, glace au lait ribot.",
        price: "12 €",
        image: "/images/produit.jpg"
      }
    ]
  }
];

export const menuGallery = [
  { id: "menu-4", src: "/images/Menu4.jpg", alt: "Carte des vins vivants" },
  { id: "menu-5", src: "/images/Menu5.jpg", alt: "Carte des desserts" },
  { id: "menu-3", src: "/images/Menu3.jpg", alt: "Menu dégustation - Été" },
  { id: "menu-1", src: "/images/Menu1.jpg", alt: "Menu du jour" },
  { id: "menu-2", src: "/images/Menu2.jpg", alt: "Menu dégustation - Printemps" },
  { id: "boisson-1", src: "/images/Boisson/boisson1.jpeg", alt: "Carte des boissons" },
  { id: "boisson-2", src: "/images/Boisson/boisson2.jpeg", alt: "Carte des boissons - Suite" }
];

export const restaurantInfo = {
  name: "Restaurant Antunes",
  heroTagline: "Cuisine de saison, vins vivants et accueil chaleureux au cœur de la ville.",
  heroCta: "Découvrir nos menus",
  phone: "0549968690",
  email: "lantunesrestaurant@gmail.com",
  address: "3 Rue des Cailloux, 79330 Coulonges-Thouarsais",
  hours: [
    "Lundi - Mardi : 9h - 15h",
    "Mercredi : Jour De Fermeture",
    "Jeudi : 9h - 21h",
    "Vendredi - Samedi : 9h - 23h30",
    "Dimanche : 9h - 15h",
  ],
  mapEmbedUrl:
    "https://www.google.com/maps?q=3+Rue+des+Cailloux,+79330+Coulonges-Thouarsais&output=embed",
  socialMedia: {
    instagram: "https://www.instagram.com/lantunesrestaurant",
    facebook: "https://www.facebook.com/profile.php?id=61583136790603",
    tiktok: "https://www.tiktok.com/@lantunesrestaurant?lang=fr"
  }
};
