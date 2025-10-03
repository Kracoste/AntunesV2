import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { MainNav } from "../components/MainNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Restaurant Antunes",
  description:
    "Cuisine gastronomique de saison, vins vivants et accueil chaleureux au cœur de Paris. Découvrez le menu et réservez votre table.",
  metadataBase: new URL("https://www.restaurant-antunes.fr"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Restaurant Antunes",
    description:
      "Cuisine gastronomique de saison, vins vivants et table conviviale en plein cœur de Paris.",
    locale: "fr_FR",
    type: "website"
  }
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <MainNav />
        <main>{children}</main>
      </body>
    </html>
  );
}