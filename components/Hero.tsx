import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Hero.module.css";

type HeroProps = {
  imageSrc: string;
  imageAlt?: string;
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
};

export function Hero({ imageSrc, imageAlt = "Salle du restaurant", tagline, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.kicker}>L&apos;Antunes</span>
          <h1>{tagline}</h1>
          <p>
            Chaque service est pensé comme un moment suspendu, avec une attention portée au rythme de vos
            repas et aux produits de nos artisans partenaires.
          </p>
          <div className={styles.actions}>
            <Link href={ctaHref as any} className={styles.primaryAction}>
              {ctaLabel}
            </Link>
            <Link href="/about" className={styles.secondaryAction}>
              Découvrir la maison
            </Link>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.imageFrame}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1200px) 520px, (min-width: 768px) 60vw, 90vw"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}