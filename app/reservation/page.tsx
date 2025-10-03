import type { Metadata } from "next";
import styles from "../../styles/ReservationPage.module.css";

export const metadata: Metadata = {
  title: "Réserver une table | Restaurant Antunes",
  description:
    "Interface de réservation du Restaurant Antunes. Cette section est en préparation et sera prochainement disponible."
};

const checklist = [
  "Choix de la date et du service",
  "Nombre de convives",
  "Allergies et préférences culinaires",
  "Coordonnées de confirmation"
];

export default function ReservationPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Réserver une table</span>
        <h1>Cette fonctionnalité est en cours de préparation</h1>
        <p>
          Nous finalisons actuellement l'outil de réservation en ligne pour vous garantir une
          expérience fluide et personnalisée. En attendant, n'hésitez pas à nous appeler pour réserver
          directement auprès de l'équipe.
        </p>
      </section>
      <section className={styles.panel}>
        <h2>Ce qui sera disponible très bientôt</h2>
        <ul>
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={styles.note}>
          Besoin d'une table ? Contactez-nous au <a href="tel:+33123456789">+33 1 23 45 67 89</a> ou
          écrivez-nous à <a href="mailto:contact@restaurant-antunes.fr">contact@restaurant-antunes.fr</a>.
        </p>
      </section>
    </div>
  );
}

