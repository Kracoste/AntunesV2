"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/MenuGallery.module.css";

const SUPABASE_URL = "https://emmkywnwjamcfprywihw.supabase.co";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

type MenuGalleryProps = {
  images: GalleryImage[];
};

export function MenuGallery({ images }: MenuGalleryProps) {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [menuDuJour, setMenuDuJour] = useState<GalleryImage | null>(null);

  // Charger le menu du jour depuis Supabase
  useEffect(() => {
    const url = `${SUPABASE_URL}/storage/v1/object/public/menu-du-jour/menu-du-jour.jpg`;
    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setMenuDuJour({
            id: "menu-du-jour",
            src: `${url}?t=${Date.now()}`,
            alt: "Menu du jour",
          });
        }
      })
      .catch(() => {});
  }, []);

  // Combiner le menu du jour avec les autres images
  const allImages = menuDuJour ? [menuDuJour, ...images] : images;
  const menuImages = menuDuJour ? [menuDuJour, ...images.slice(0, 5)] : images.slice(0, 5);

  const minSwipeDistance = 50;

  const getCurrentIndex = useCallback(() => {
    if (!activeImage) return -1;
    return allImages.findIndex((img) => img.id === activeImage.id);
  }, [activeImage, allImages]);

  const goToNext = useCallback(() => {
    const currentIndex = getCurrentIndex();
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % allImages.length;
    setActiveImage(allImages[nextIndex]);
    setIsZoomed(false);
  }, [getCurrentIndex, allImages]);

  const goToPrevious = useCallback(() => {
    const currentIndex = getCurrentIndex();
    if (currentIndex === -1) return;
    const previousIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
    setActiveImage(allImages[previousIndex]);
    setIsZoomed(false);
  }, [getCurrentIndex, allImages]);

  const close = useCallback(() => {
    setActiveImage(null);
    setIsZoomed(false);
  }, []);

  const openImage = useCallback((image: GalleryImage) => {
    setActiveImage(image);
    setIsZoomed(false);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    // Ne pas gérer le swipe si on est en mode zoom
    if (isZoomed) return;
    // Ne pas gérer le swipe si c'est un pinch (2 doigts)
    if (e.targetTouches.length > 1) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // Ne pas gérer le swipe si on est en mode zoom
    if (isZoomed) return;
    // Ne pas gérer le swipe si c'est un pinch (2 doigts)
    if (e.targetTouches.length > 1) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    // Ne pas gérer le swipe si on est en mode zoom
    if (isZoomed) return;
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
                className={image.id === "menu-du-jour" ? styles.thumbnailMenuDuJour : styles.thumbnail}
                onClick={() => openImage(image)}
                aria-label={`Agrandir ${image.alt}`}
              >
                {image.id === "menu-du-jour" ? (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={styles.thumbnailImageMenuDuJour}
                  />
                ) : (
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
                )}
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
            {images.slice(5).map((image) => (
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
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className={styles.lightboxImage}
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
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
