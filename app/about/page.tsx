import type { Metadata } from "next";
import styles from "../../styles/AboutPage.module.css";

export const metadata: Metadata = {
  title: "À propos | Restaurant Antunes",
  description:
    "Découvrez l'histoire du Restaurant Antunes : la rencontre d'une cheffe passionnée et d'un sommelier voyageur pour une table gastronomique à taille humaine."
};

const values = [
  {
    icon: "🌱",
    title: "Local & Bio",
    description:
      "Nous privilégions les circuits courts et les produits biologiques pour vous garantir fraîcheur et qualité."
  },
  {
    icon: "👨‍🍳",
    title: "Savoir-faire",
    description:
      "Notre équipe met tout son savoir-faire au service d'une cuisine authentique et raffinée."
  },
  {
    icon: "❤️",
    title: "Passion",
    description:
      "Chaque plat est préparé avec amour et passion pour vous offrir une expérience inoubliable."
  }
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Notre histoire</span>
        <h1>Une table pensée comme une maison</h1>
        <p>
          Le Restaurant Antunes est né d'une intuition simple : marier l'exigence gastronomique à
          l'esprit d'accueil d'une maison familiale. Ici, chaque service commence par un mot doux, un
          regard attentif et un plat qui raconte un terroir.
        </p>
      </section>
      <section className={styles.twoColumn}>
        <div>
          <h2>La cuisine de Matt</h2>
          <p>
            Formé en Vendée, Matt puise dans ses racines portugaises ainsi que dans ses nombreux voyages pour créer une cuisine de saison, lumineuse et authentique.
            Passionné par son métier, il met tout son cœur dans chacune de ses assiettes et partage avec générosité son amour du goût et des produits vrais.
            Soucieux de proposer une expérience sincère et respectueuse de la nature, il privilégie les circuits courts et les producteurs locaux.
            C’est avec plaisir et enthousiasme qu’il vous invite à découvrir son univers culinaire, où simplicité rime avec élégance et gourmandise.
          </p>
        </div>
        <div>
          <h2>L'expérience de Jess</h2>
          <p>
            Avec passion et bienveillance, Jessy sélectionne des vins vivants issus de domaines respectueux de la vigne et des sols. 
            Sa carte, qui évolue chaque mois, marie grands classiques et découvertes confidentielles, pour le plaisir des curieux comme des amateurs éclairés.
            Avenant et attentionné, il aime proposer des accords en toute liberté, pensés pour sublimer chaque étape du menu dégustation. 
            Plus qu’un simple service, il transforme ce moment en une véritable expérience de partage, faite de convivialité et de découvertes.
           C’est avec plaisir qu’il vous accompagne tout au long de votre repas, afin de rendre cette rencontre autour du vin et de la table mémorable.
          </p>
        </div>
      </section>
      <section className={styles.values}>
        <h2>Nos valeurs</h2>
        <div className={styles.valuesGrid}>
          {values.map((value) => (
            <article key={value.title} className={styles.valueCard}>
              <span className={styles.valueIcon} aria-hidden="true">
                {value.icon}
              </span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}