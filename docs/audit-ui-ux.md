# Audit UI et UX — 15 octobre 2026

Complément : [vérification typographique approfondie](audit-typographie.md), avec mesures dans Chrome et contrôle des polices sur le build de production.

## Périmètre et couverture

Parcours public : accueil → motifs de consultation, tarifs, présentation et contact ; en-tête, menus, FAQ et pied de page partagés. Astro, Tailwind 4, composants Astro et tokens de `stitch.css`. Conventions consultées : `README.md`, `docs/design-fork.md` et `src/design/fonts.mjs`. Aucun `AGENTS.md` trouvé dans le dépôt. Administration, configuration client, carte et pages éditoriales détaillées exclus de la validation interactive.

Skills utilisés : `better-interface`, puis `better-accessibility`, `better-layout`, `better-writing`, `better-typography`, `better-colors`, `better-ui`.

| Domaine | Preuves inspectées | Résultat |
| --- | --- | --- |
| Accessibilité | BaseLayout, StandardPageLayout, Header, ContactForm, FAQ ; fermeture Échap dans Chrome | Corrections appliquées ; lecteur d’écran non vérifié |
| Layout | Chrome aux largeurs 320, 768 et 1440 px ; HeaderTopBar et HeroSection | Chevauchement du téléphone corrigé ; menus défilables |
| Rédaction | accueil.md, ContactForm, client.json, pseudo-contenu des cartes | Répétition, fausse invitation à cliquer et nom de cabinet incorrect corrigés |
| Typographie | global.css, stitch.css, fonts.mjs ; captures mobile et bureau | Petits textes relevés ; mentions en casse naturelle ; polices typées |
| Couleurs | Tokens, calcul des paires opaques, script check:contrast | Paires mesurées conformes après correction |
| UI | États CSS des boutons, menus, FAQ, cartes et préférence de mouvement réduit | Indicateurs explicites ; survol réservé aux pointeurs compatibles |

## Constats et corrections

Les références désignent les fichiers corrigés ; « Avant » décrit l’implémentation auditée.

| Gravité | Domaine | Emplacement | Avant | Après | Pourquoi |
| --- | --- | --- | --- | --- | --- |
| HIGH | Couleurs | `src/styles/stitch.css:40` | Texte secondaire `#7d7f77` sur crème : 3,80:1 ; texte discret du footer : 4,29:1 | `#66685f` sur crème : 5,30:1 ; footer : 6,88:1 | Contraste du texte normal, WCAG 1.4.3 |
| HIGH | Accessibilité | `src/styles/stitch.css:1161` | Bordures des champs `#e4dfd5` sur blanc : 1,33:1 ; focus supprimé et remplacé par un halo pâle | Bordure `#66685f` : 5,66:1 ; contour terracotta explicite | Identifier les champs et leur focus, WCAG 1.4.11 |
| HIGH | Layout | `src/components/HeaderTopBar.astro:42` | Téléphone recouvert par le bouton à 320 px, confirmé par capture | Téléphone non compressible, ligne d’actions autorisée à se répartir sur plusieurs lignes | Préserver l’accès au contact, WCAG 1.4.10 |
| HIGH | Layout | `src/components/FaqSection.astro:25` | Marqueur natif supprimé avec `list-style: none`, sans remplacement | Chevron visible et retourné à l’ouverture | Rendre le contenu replié repérable |
| MEDIUM | Accessibilité | `src/layouts/BaseLayout.astro:75` | Aucun raccourci au contenu | Premier lien « Aller au contenu », cible `main` focalisable | Contourner la navigation répétée, WCAG 2.4.1 |
| MEDIUM | Accessibilité | `src/components/Header.astro:163` | Menus sans fermeture Échap ; absence de compensation des ancres pour le header collant | Échap ferme le menu et rend le focus ; hauteur observée par ResizeObserver ; panneaux défilables | Faciliter le clavier et conserver les cibles visibles |
| MEDIUM | Rédaction | `src/styles/stitch.css:318` | Cartes statiques avec « Découvrir l’accompagnement → » et élévation au survol | Suppression de la fausse action et du mouvement | Ne pas suggérer une interaction absente |
| MEDIUM | Typographie | `src/styles/stitch.css:25` | Texte xs à 10,24 px ; mentions longues en capitales espacées | xs à 13 px, sm à 14 px ; mentions en casse naturelle et interligne 1,6 | Rendre les indications et actions plus lisibles |
| MEDIUM | Rédaction | `src/content/site-copy/accueil.md:2` | Même passage répété dans le chapô et l’introduction | Chapô réduit au premier message, orthographe corrigée | Réduire la longueur avant les actions |
| MEDIUM | Rédaction | `src/data/client.json:155` | Titre d’onglet d’un autre cabinet : Pierre Jeanet | Cabinet de psychologie de Camille Perrin | Cohérence de l’identité entre navigation et contenu |
| LOW | Rédaction | `src/components/ContactForm.astro:29` | Obligations indiquées en fin de formulaire ; téléphone sans précision ; promesse absolue de confidentialité | Obligations en amont, téléphone facultatif, indication sur l’usage des données et les informations sensibles | Clarifier la saisie et éviter une promesse non démontrée |

## Vérification

- `npm run check` : 72 fichiers, aucune erreur, aucun avertissement. Correction de l’inférence des tuples de poids de police avec `@satisfies`.
- `npm run build` : génération réussie des 11 pages. Avertissement préexistant sur `@theme` dans la feuille séparée ; les tailles sont aussi déclarées sur la racine, et leur valeur calculée a été vérifiée dans Chrome.
- `npm run check:contrast -- src/styles/stitch.css` : cinq paires conformes, ratios de 5,51:1 à 15,32:1.
- Calcul complémentaire des tokens secondaires et des bordures : valeurs avant/après dans le tableau. Ces calculs concernent les paires opaques indiquées, pas chaque pixel rendu du site.
- Chrome headless, cinq routes publiques à 320, 768 et 1440 px : contrôle de débordement horizontal, cible du lien d’évitement, ouverture de FAQ et présence du chevron. Captures de l’accueil inspectées à 320 et 1440 px.
- Menu mobile : ouverture, focus sur le déclencheur, Échap, fermeture confirmée.
- `npm run check:bom` : échec sur le fichier préexistant `tmp/fetch-screen.mjs`, hors modifications.
- **Non vérifiés** : parcours complet au lecteur d’écran, zoom navigateur réel à 200 %, miroir RTL, Safari/iOS, envoi réel via Formspree et erreurs réseau. Les champs sont contrôlés côté source ; aucune demande réelle n’a été envoyée.

Les captures et le script de contrôle local se trouvent dans `tmp/ui-audit/` et `tmp/ui-browser-audit.mjs` (fichiers temporaires ignorés par Git).

## Verdict

**Approve**, limité au périmètre inspecté et aux contrôles ci-dessus : les constats HIGH identifiés ont été corrigés. Ce verdict ne constitue pas une certification WCAG ni une validation des états indiqués comme non vérifiés.
