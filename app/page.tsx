import { Hero } from "../components/Hero";
import { MenuGallery } from "../components/MenuGallery";
import { ContactSection } from "../components/ContactSection";
import { menuGallery, restaurantInfo } from "../content/menu";

export default function HomePage() {
  return (
    <>
      <Hero
        imageSrc="/images/image.png"
        tagline={restaurantInfo.heroTagline}
        ctaLabel={restaurantInfo.heroCta}
        ctaHref="/#menu"
      />
      <MenuGallery images={menuGallery} />
      <ContactSection
        phone={restaurantInfo.phone}
        email={restaurantInfo.email}
        address={restaurantInfo.address}
        hours={restaurantInfo.hours}
        mapEmbedUrl={restaurantInfo.mapEmbedUrl}
      />
    </>
  );
}