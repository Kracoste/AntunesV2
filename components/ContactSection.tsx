import styles from "../styles/ContactSection.module.css";

type ContactSectionProps = {
  phone: string;
  email: string;
  address: string;
  hours: string[];
  mapEmbedUrl: string;
};

const buildMapsLink = (address: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

export function ContactSection({ phone, email, address, hours, mapEmbedUrl }: ContactSectionProps) {
  const [streetLine, ...cityParts] = address.split(",").map((part) => part.trim());
  const cityLine = cityParts.join(", ") || streetLine;
  const mapsDirectionUrl = buildMapsLink(address);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <span className={styles.kicker}>Nous rendre visite</span>
          <h2>Un accueil chaleureux au cœur de Coulonges-Thouarsais</h2>
          <p>
            Passez nous voir pour un déjeuner sur le pouce, un dîner avec accords mets-vins ou simplement
            pour saluer l&apos;équipe. Nous nous chargeons du reste.
          </p>
        </div>
        <div className={styles.layout}>
          <div className={styles.card}>
            <div className={styles.group}>
              <span className={styles.label}>Téléphone</span>
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className={styles.value}>
                {phone}
              </a>
            </div>
            <div className={styles.group}>
              <span className={styles.label}>Email</span>
              <a href={`mailto:${email}`} className={styles.value}>
                {email}
              </a>
            </div>
            <div className={styles.group}>
              <span className={styles.label}>Adresse</span>
              <p className={styles.value}>{address}</p>
            </div>
            <div className={styles.group}>
              <span className={styles.label}>Horaires</span>
              <ul className={styles.hours}>
                {hours.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.map}>
            <iframe
              src={mapEmbedUrl}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Carte Google Maps du Restaurant Antunes"
            />
            <a
              href={mapsDirectionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
              aria-label={`Ouvrir l&apos;itinéraire vers ${address} dans Google Maps`}
            >
              <span className={styles.mapTag}>{streetLine}</span>
              <span className={styles.mapTag}>{cityLine}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}