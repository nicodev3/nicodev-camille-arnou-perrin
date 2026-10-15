# Vérification typographique — 15 octobre 2026

Skill : `better-typography`. Périmètre : huit pages publiques (accueil, tarifs, contact, à propos, pourquoi consulter, mentions légales, approche intégrative, psychothérapie psychodynamique), composants partagés et contenus Markdown publiés. Administration et formulaire de configuration exclus.

## Corrections

| Gravité | Emplacement | Avant | Après | Pourquoi |
| --- | --- | --- | --- | --- |
| MEDIUM | `src/styles/stitch.css:865` | Les `strong` Markdown demandaient le gras navigateur 700, absent des faces déclarées | Graisse 600 explicitement définie, déjà chargée | Éviter un gras synthétisé ou une substitution de graisse |
| MEDIUM | `src/design/fonts.mjs:17` | Plus Jakarta Sans uniquement en style normal, alors que les références éditoriales utilisent `em` | Style italique déclaré ; poids normal 300 inutilisé retiré | Charger le dessin italique réel plutôt que laisser le navigateur l’incliner |
| MEDIUM | `src/styles/stitch.css:332`, `:462`, `:622`, `:1019` | Cartes à 20 px / 27,5 px (1,375), FAQ et rappel contact à 20 px / 27 px (1,35), sur plusieurs lignes | Interligne sans unité de 1,5 | Améliorer la lecture des blocs de trois à cinq lignes |
| MEDIUM | `src/styles/stitch.css:871` | Titres éditoriaux h2 à 39,06 px sur mobile et 48,83 px sur bureau ; jusqu’à quatre lignes à 320 px | Échelle fluide de 31,25 à 39,06 px, interligne 1,4 ; h3 à 25 px | Adapter la hiérarchie au texte long en conservant Newsreader |
| MEDIUM | `src/styles/stitch.css:889` | Le long titre « Psychothérapie psychodynamique » se cassait dans un mot sur petit écran | Taille fluide dédiée aux pages éditoriales, 33,6 px à 320 px, 61,04 px à 1440 px | Le titre tient sur deux lignes sans lettre isolée, confirmé sur capture de production |
| MEDIUM | `src/styles/stitch.css:894` | Paragraphes légaux sans limite de longueur propre | Largeur maximale 65ch | Éviter de trop longues lignes sur bureau |
| LOW | `src/styles/stitch.css:881` | Même marge de 1rem avant les paragraphes et les nouveaux titres Markdown | 2,5rem avant les titres ; pas de marge ajoutée au premier titre | Distinguer plus clairement les sections |

## Contrôles

- Inventaire Chrome des valeurs calculées sur les huit pages, à 320, 768 et 1440 px : tailles, familles, graisses, interlignes et rectangles de texte. Aucun débordement horizontal détecté ; aucun texte courant multiligne sous un interligne de 1,4 après correction dans les éléments inspectés.
- Corps de texte : 16 px, interligne 27,2 px dans les articles (1,7), mesure plafonnée à 640 px. Les notes restent à 14 px. Le document déclare `lang="fr"`.
- Champs visibles de contact : 16 px ; le piège antispam hors écran est exclu de ce résultat.
- Les h1 et h2 restent hiérarchisés ; les titres éditoriaux ont leur propre échelle, sans modifier celle de l’accueil.
- Validation supplémentaire sur les fichiers de production des deux pages d’approches, à 320 et 1440 px. `document.fonts` confirme Plus Jakarta Sans normal 400/500/600, italique 400 sur la référence bibliographique et Newsreader normal 400. Le texte en gras calcule bien une graisse 600.
- Captures inspectées : approche intégrative à 768 px et psychothérapie psychodynamique à 320 px ; contrôle final à 320 px sur le build de production.
- `npm run check` : 72 fichiers, 0 erreur, 0 avertissement.
- `npm run build` : réussite ; avertissement préexistant sur la directive `@theme` de la feuille séparée. Les tailles ont été vérifiées dans les styles calculés du build.
- `git diff --check` : aucune erreur d’espacement.

Preuves locales temporaires : `tmp/typography-audit/before.json`, `tmp/typography-audit/results.json`, `tmp/typography-production/results.json` et captures PNG associées. Scripts : `tmp/typography-audit.mjs`, `tmp/typography-production.mjs`.

**Non vérifiés** : Safari/iOS réel, Firefox, zoom navigateur à 200 % et augmentation personnalisée de l’espacement du texte. La taille des champs a été contrôlée dans Chrome, sans conclure à un test iOS.

**Approve** pour le périmètre et les contrôles indiqués : aucun défaut HIGH confirmé ne reste ouvert.
