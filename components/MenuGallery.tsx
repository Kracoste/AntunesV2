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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const getCurrentIndex = useCallback(() => {
    if (!activeImage) return -1;
    return images.findIndex((img) => img.id === activeImage.id);
  }, [activeImage, images]);

  const goToNext = useCallback(() => {
    const currentIndex = getCurrentIndex();
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % images.length;
    setActiveImage(images[nextIndex]);
    setIsZoomed(false);
  }, [getCurrentIndex, images]);

  const goToPrevious = useCallback(() => {
    const currentIndex = getCurrentIndex();
    if (currentIndex === -1) return;
    const previousIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setActiveImage(images[previousIndex]);
    setIsZoomed(false);
  }, [getCurrentIndex, images]);

  const close = useCallback(() => {
    setActiveImage(null);
    setIsZoomed(false);
  }, []);

  const openImage = useCallback((image: MenuImage) => {
    setActiveImage(image);
    setIsZoomed(false);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  useEffect(() => {
    if (!activeImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowRight") {
        goToNext();
      } else if (event.key === "ArrowLeft") {
        goToPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, close, goToNext, goToPrevious]);

  const lightboxClassName = isZoomed ? `${styles.lightbox} ${styles.lightboxZoomed}` : styles.lightbox;
  const helperTextClassName = isZoomed ? styles.helperTextHidden : styles.helperText;

  return (
    <section id="menu" className={styles.section}>
      <div className={styles.header}>
        <p className={styles.kicker}>Nos cartes</p>
        <h2>Découvrez les menus en détail</h2>
        <p>
          Cliquez sur chaque visuel pour l&apos;ouvrir. Un second clic agrandit le menu tout en restant
          entièrement visible, quelle que soit la taille de l&apos;écran.
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
              quality={100}
              className={styles.thumbnailImage}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 95vw"
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
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className={styles.lightboxInner} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={close}
              aria-label="Fermer l&apos;image agrandie"
            >
              ×
            </button>
            
            <button
              type="button"
              className={styles.navButton}
              style={{ left: '20px' }}
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label="Menu précédent"
            >
              ‹
            </button>

            <button
              type="button"
              className={styles.navButton}
              style={{ right: '20px' }}
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Menu suivant"
            >
              ›
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
                  quality={100}
                  className={styles.lightboxImage}
                  sizes="(min-width: 1400px) 1200px, (min-width: 768px) 90vw, 95vw"
                />
              </div>
            </button>
            <p className={helperTextClassName}>
              Cliquez sur l&apos;image pour {isZoomed ? "revenir à la vue standard" : "l&apos;afficher en plein écran"}. Utilisez les flèches pour naviguer.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
