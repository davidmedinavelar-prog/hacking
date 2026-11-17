# Ta mission : penser comme un hacker, coder comme un développeur

Le premier jour, tu joues à **Mission Cyber** pour découvrir comment
pensent les hackers. Ensuite, chaque jour, on te pose **un problème de
hacker** et c'est **toi** qui écris le programme qui le résout : un
cadenas à forcer, un message secret à casser, un juge de mots de passe,
une attaque par dictionnaire.

À la fin de la semaine, tu auras écrit **tes propres programmes** et tu
sauras expliquer **ton algorithme** devant le groupe.

## La méthode (tous les jours à partir du jour 2)

1. **Comprendre** : résous le problème à la main, sur papier, avec 2 ou 3 exemples.
2. **Algorithme** : écris les étapes en français, une par ligne, dans la page Atelier.
3. **Coder** : traduis chaque ligne en JavaScript dans `atelier.js`.
4. **Tester** : la page te dit ✅ ou ❌ pour chaque test. Lis le message, corrige, recommence.

> Un **algorithme**, c'est une recette : une suite d'étapes précises qui
> résout un problème. Le **code**, c'est la même recette traduite dans
> une langue que l'ordinateur comprend.

## La charte du hacker éthique (à lire en premier)

1. Je ne teste que **mes** sites, ou ceux dont j'ai **l'autorisation écrite**.
2. Je ne cherche jamais à accéder au compte, au téléphone ou aux données de quelqu'un d'autre.
3. Si je trouve une faille, je **préviens** le propriétaire (ou l'Office fédéral de la cybersécurité, l'OFCS), je ne l'exploite pas.
4. Je n'utilise jamais mes vrais mots de passe dans les exercices.

> En Suisse, s'introduire sans droit dans le système informatique de
> quelqu'un d'autre est une infraction (article 143bis du Code pénal suisse,
> « accès indu à un système informatique »), même « juste pour voir ».
> Modifier ou effacer ses données est puni aussi (article 144bis).
> Ce qui fait un hacker **éthique**, c'est l'autorisation.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | le **squelette** du jeu (les écrans) |
| `script.js` | le **cerveau** : la liste des épreuves + la mécanique |
| `outils.html` / `outils.js` | la **boîte à outils** (César, Base64, binaire, empreintes…) |
| `atelier.html` | l'**atelier algo** : les problèmes du jour et les tests |
| `atelier.js` | **TON code** : les fonctions que tu dois écrire |
| `atelier-moteur.js` | le moteur qui teste ton code (pas besoin d'y toucher) |
| `style.css` | la **déco** |

Cherche les 🎯 dans le code : ce sont les endroits faits pour toi.

## Lancer le jeu

1. Ouvre le dossier dans VS Code
2. Clic droit sur `index.html` → « Open with Live Server »
3. Chaque fois que tu enregistres (Ctrl+S), la page se met à jour

---

## Jour 1 : Joueur — comprendre comment pensent les hackers
- [ ] Lire et signer la charte (ci-dessus)
- [ ] Jouer à la mission jusqu'au bout (note ton score !)
- [ ] Ouvrir les outils développeur (F12) : onglets Éléments et Console
- [ ] Changer le titre, l'intro et ton prénom dans `index.html`

## Jour 2 : 🔒 Le cadenas — la force brute
Problème : trouver le code d'un cadenas (0 à 999) sans le connaître.
- [ ] Ouvre `atelier.html` (menu « 🧠 Atelier algo »), onglet Jour 2
- [ ] Réponds aux questions « à la main » sur papier
- [ ] Écris ton algorithme en français dans la page
- [ ] Code `trouverCode` dans `atelier.js` jusqu'à avoir 5/5 ✅
- [ ] ⭐ Bonus : le cadenas bavard en 10 essais maximum (`trouverCodeMalin`)
- Ce que tu apprends : les **boucles** (`for`), les **conditions** (`if`), `return`

## Jour 3 : 🔐 César — ta propre machine à chiffrer
Problème : chiffrer et déchiffrer un message en décalant les lettres.
- [ ] À la main : chiffre « chat » avec un décalage de 3
- [ ] Algorithme, puis code `decalerLettre` et `cesar`
- [ ] Dans la console (F12), chiffre un message pour ton voisin avec **ta** fonction
- [ ] Compare ton code avec la fonction `cesar()` de `outils.js` : en quoi est-ce différent ?
- [ ] ⭐ Bonus : casser un message sans connaître la clé (`casserCesar`)
- Ce que tu apprends : parcourir un texte, le **modulo** `%`, **réutiliser** ses propres fonctions

## Jour 4 : 🔑 Le juge des mots de passe
Problème : donner une note de 0 à 6 à un mot de passe.
- [ ] À la main : note « Kevin2012 » et « girafe-tonnerre-violet-42 »
- [ ] Algorithme, puis code `noteMotDePasse`
- [ ] Teste 5 mots de passe inventés dans la console : ta note est-elle d'accord avec l'outil « Force » ?
- [ ] ⭐ Bonus : le détecteur de faux liens (`domaine` et `estLeVraiSite`)
- Ce que tu apprends : les **drapeaux** (`true`/`false`), les **compteurs**, plusieurs conditions

## Jour 5 : 🧨 L'attaque par dictionnaire, puis présentation
Problème : retrouver un mot de passe à partir de son empreinte.
- [ ] Algorithme, puis code `attaqueDictionnaire` (ton code va casser le boss final du jour 1 !)
- [ ] ⭐ Bonus : les variantes du pirate (`variantes`)
- [ ] Prépare ta présentation (2 min) : choisis **ton** problème préféré, montre ton algorithme en français, puis ton code, et explique ce que ça apprend sur la sécurité
- [ ] (Facultatif) Publie ton dossier sur **app.netlify.com/drop** pour garder un lien

### Niveau bonus (si tu es en avance)
- [ ] Dans la console, combien d'essais fait `trouverCode` pour le code 999 ? Et `trouverCodeMalin` ? Pourquoi une telle différence ?
- [ ] Le chiffre de Vigenère : César avec un mot-clé (chaque lettre du mot-clé donne un décalage)
- [ ] Un générateur de phrase de passe : choisis 4 mots au hasard dans une liste (`Math.random()`)
- [ ] Ajoute une épreuve à la Mission Cyber dont le message est chiffré avec **ta** fonction `cesar`

## Si ça ne marche plus

1. Appuie sur F12 → onglet « Console » : l'erreur est écrite en rouge
2. Vérifie les guillemets, les parenthèses et les accolades `{ }` : chaque `{` a son `}`
3. Dans l'atelier, si la page se fige : ta boucle ne s'arrête jamais. Ferme l'onglet et corrige-la
4. Annule avec Ctrl+Z jusqu'à ce que ça remarche
5. Demande à ton animateur 😉
