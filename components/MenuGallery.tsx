"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "../styles/MenuGallery.module.css";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

type MenuGalleryProps = {
  menuImages: GalleryImage[];
  drinkImages: GalleryImage[];
};

export function MenuGallery({ menuImages, drinkImages }: MenuGalleryProps) {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;
  const galleryImages = useMemo(() => [...menuImages, ...drinkImages], [menuImages, drinkImages]);

  const getCurrentIndex = useCallback(() => {
    if (!activeImage) return -1;
    return galleryImages.findIndex((img) => img.id === activeImage.id);
  }, [activeImage, galleryImages]);

  const goToNext = useCallback(() => {
    const currentIndex = getCurrentIndex();
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setActiveImage(galleryImages[nextIndex]);
    setIsZoomed(false);
  }, [getCurrentIndex, galleryImages]);

  const goToPrevious = useCallback(() => {
    const currentIndex = getCurrentIndex();
    if (currentIndex === -1) return;
    const previousIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    setActiveImage(galleryImages[previousIndex]);
    setIsZoomed(false);
  }, [getCurrentIndex, galleryImages]);

  const close = useCallback(() => {
    setActiveImage(null);
    setIsZoomed(false);
  }, []);

  const openImage = useCallback((image: GalleryImage) => {
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
          Retrouvez d&apos;un côté l&apos;ensemble de nos menus et desserts, et de l&apos;autre les cartes des vins
          et boissons. Cliquez sur un visuel pour l&apos;ouvrir et zoomer.
        </p>
      </div>

      <div className={styles.galleries}>
        <div className={styles.galleryBlock}>
          <div className={styles.blockHeader}>
            <p className={styles.blockKicker}>Cartes du menu</p>
            <h3>Menus </h3>
            <p>Les cartes du moment pour vos déjeuners, dîners et douceurs à partager.</p>
          </div>
          <div className={styles.grid}>
            {menuImages.map((image) => (
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
                  priority
                  loading="eager"
                  quality={85}
                  className={styles.thumbnailImage}
                  sizes="(min-width: 1024px) 180px, (min-width: 768px) 140px, 45vw"
                />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.galleryBlock}>
          <div className={styles.blockHeader}>
            <p className={styles.blockKicker}>Cartes des boissons</p>
            <h3>Vins & cocktails</h3>
            <p>Découvrez la sélection de vins, softs et boissons maison élaborée par l&apos;équipe.</p>
          </div>
          <div className={styles.grid}>
            {drinkImages.map((image) => (
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
                  priority
                  loading="eager"
                  quality={85}
                  className={styles.thumbnailImage}
                  sizes="(min-width: 1024px) 180px, (min-width: 768px) 140px, 45vw"
                />
              </button>
            ))}
          </div>
        </div>
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
