import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.restaurant-antunes.fr/sitemap.xml",
    host: "https://www.restaurant-antunes.fr",
  };
}
