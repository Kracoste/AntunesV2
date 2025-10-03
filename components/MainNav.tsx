import Image from "next/image";
import Link from "next/link";
import styles from "../styles/MainNav.module.css";

const navItems = [
  { label: "Menus", href: "/#menu" as const },
  { label: "À propos", href: "/about" as const }
];

export function MainNav() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/images/antunes2.png"
            alt="Restaurant Antunes"
            width={200}
            height={90}
            priority
            className={styles.logoImage}
          />
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.links}>
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/reservation" className={styles.reserve} aria-disabled="true">
          Réserver bientôt
        </Link>
      </div>
    </header>
  );
}
