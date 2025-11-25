import type { MenuCategory } from "../lib/types";
import styles from "../styles/MenuSection.module.css";

type MenuSectionProps = {
  categories: MenuCategory[];
};

export function MenuSection({ categories }: MenuSectionProps) {
  return (
    <section id="menu-experience" className={styles.section}>
      <div className={styles.header}>
        <p className={styles.kicker}>Le Menu</p>
        <h2 className={styles.title}>Une expérience gastronomique en trois actes</h2>
        <p className={styles.description}>
          Chaque plat est imaginé par notre brigade à partir de produits sourcés chez des artisans
          engagés. Les suggestions changent au rythme des arrivages.
        </p>
      </div>
      <div className={styles.grid}>
        {categories.map((category) => (
          <article key={category.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
            <ul className={styles.items}>
              {category.items.map((item) => (
                <li key={item.name} className={styles.item}>
                  <div className={styles.itemMedia}>
                    <img
                      src={item.image}
                      alt={item.name}
                      width={240}
                      height={160}
                      className={styles.itemImage}
                    />
                  </div>
                  <div className={styles.itemContent}>
                    <div>
                      <p className={styles.itemName}>{item.name}</p>
                      <p className={styles.itemDescription}>{item.description}</p>
                    </div>
                    <p className={styles.itemPrice}>{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}