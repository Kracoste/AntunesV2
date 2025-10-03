# Restaurant Antunes – Site Next.js

Ce projet met en place l'architecture d'un site vitrine pour un restaurant en utilisant Next.js 14 (App Router) et TypeScript.

## Structure principale

- `app/` : routes App Router (`page.tsx`, `/about`, `/reservation`) et layout global.
- `components/` : composants réutilisables (`MainNav`, `Hero`, `MenuSection`, `ContactSection`).
- `content/` : données éditoriales structurées (menu, coordonnées).
- `lib/` : définitions de types partagés.
- `styles/` : styles CSS modules dédiés à chaque composant/page.
- `public/images/` : dossier pour les visuels (héros et menus). Des fichiers `.gitkeep` sont présents en attendant les images finales.

## Pages livrées

- **Page d'accueil** (`/`) : héro plein écran, section menu avec images, contact + carte Google Maps interactive.
- **À propos** (`/about`) : histoire du restaurant, présentation des fondateurs, jalons chronologiques.
- **Réserver une table** (`/reservation`) : route placeholder prête à accueillir le futur formulaire.

## Mise en place

1. Installer les dépendances :

   ```bash
   npm install
   ```

2. Lancer le serveur de développement :

   ```bash
   npm run dev
   ```

3. Ajouter vos visuels :
   - Image héro : `public/images/hero.jpg` (ratio conseillé 16:9, min 2400 px de large).
   - Visuels des plats : `public/images/menu/<nom>.png` (voir `content/menu.ts`).

4. Mettre à jour le contenu éditorial dans `content/menu.ts` ou créer de nouvelles sections/components selon vos besoins.

## Prochaines étapes possibles

- Implémenter le formulaire de réservation (client component + intégration CRM).
- Ajouter un système de gestion du menu via CMS ou fichier JSON.
- Mettre en place des tests (Playwright / Vitest) pour sécuriser les évolutions.

