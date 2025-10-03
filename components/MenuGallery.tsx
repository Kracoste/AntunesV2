"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/MenuGallery.module.css";

type MenuImage = {
  id: string;
  src: string;
  alt: string;
};

type MenuGalleryProps = {
  images: MenuImage[];
};

export function MenuGallery({ images }: MenuGalleryProps) {
  const [activeImage, setActiveImage] = useState<MenuImage | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const close = useCallback(() => {
    setActiveImage(null);
    setIsZoomed(false);
  }, []);

  const openImage = useCallback((image: MenuImage) => {
    setActiveImage(image);
    setIsZoomed(false);
  }, []);

  useEffect(() => {
    if (!activeImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, close]);

  const lightboxClassName = isZoomed ? `${styles.lightbox} ${styles.lightboxZoomed}` : styles.lightbox;
  const helperTextClassName = isZoomed ? styles.helperTextHidden : styles.helperText;

  return (
    <section id="menu" className={styles.section}>
      <div className={styles.header}>
        <p className={styles.kicker}>Nos cartes</p>
        <h2>Découvrez les menus en détail</h2>
        <p>
          Cliquez sur chaque visuel pour l'ouvrir. Un second clic agrandit le menu tout en restant
          entièrement visible, quelle que soit la taille de l'écran.
        </p>
      </div>
      <div className={styles.grid}>
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            className={styles.thumbnail}
            onClick={() => openImage(image)}
            aria-label={`Agrandir ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={styles.thumbnailImage}
              sizes="(min-width: 1024px) 18vw, (min-width: 768px) 30vw, 90vw"
            />
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          className={lightboxClassName}
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          onClick={close}
        >
          <div className={styles.lightboxInner} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={close}
              aria-label="Fermer l'image agrandie"
            >
              ×
            </button>
            <button
              type="button"
              className={`${styles.lightboxImageButton} ${
                isZoomed ? styles.lightboxImageButtonZoomed : ""
              }`}
              onClick={() => setIsZoomed((current) => !current)}
              aria-pressed={isZoomed}
              aria-label={isZoomed ? "Revenir à la taille standard" : "Afficher en plus grand"}
            >
              <div className={styles.lightboxImageFrame}>
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  priority
                  className={styles.lightboxImage}
                  sizes="(min-width: 1400px) 960px, (min-width: 768px) 80vw, 90vw"
                />
              </div>
            </button>
            <p className={helperTextClassName}>
              Cliquez sur l'image pour {isZoomed ? "revenir à la vue standard" : "l'afficher en plein écran"}.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
