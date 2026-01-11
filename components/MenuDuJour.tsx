"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/MenuDuJour.module.css";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://emmkywnwjamcfprywihw.supabase.co";

export function MenuDuJour() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL publique de l'image dans Supabase Storage
    const url = `${SUPABASE_URL}/storage/v1/object/public/menu-du-jour/menu-du-jour.jpg`;
    
    // Vérifier si l'image existe
    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          // Ajouter un timestamp pour éviter le cache
          setImageUrl(`${url}?t=${Date.now()}`);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.loading}>Chargement du menu du jour...</p>
        </div>
      </section>
    );
  }

  if (!imageUrl) {
    return null; // Ne rien afficher s'il n'y a pas de menu du jour
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.kicker}>Aujourd&apos;hui</span>
        <h2 className={styles.title}>Menu du jour</h2>
        <div className={styles.imageWrapper}>
          <img
            src={imageUrl}
            alt="Menu du jour"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
