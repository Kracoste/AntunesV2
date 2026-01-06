import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { MainNav } from "../components/MainNav";
import { Footer } from "../components/Footer";
import { restaurantInfo } from "../content/menu";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "L'Antunes",
  description:
    "Cuisine de saison, accueil chaleureux au cœur de Coulonges-Thouarsais. Découvrez les menus et réservez votre table.",
  metadataBase: new URL("https://www.restaurant-antunes.fr"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Restaurant Antunes",
    description:
      "Cuisine de saison, table conviviale en plein cœur de Coulonges-Thouarsais.",
    locale: "fr_FR",
    type: "website"
  },
  // Optimisation viewport pour tous les appareils
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover'
  }
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-07NF1K1VMC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-07NF1K1VMC');
          `}
        </Script>
        
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TMP9FHCD');
            `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TMP9FHCD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <MainNav />
        <main>{children}</main>
        <Footer socialMedia={restaurantInfo.socialMedia} />
      </body>
    </html>
  );
}