# Guide animateur — Stage Hacking Éthique (12-17 ans)

**Format :** en ligne, mini-groupe, 5 séances de 2 h (16h15-18h15)
**Fil rouge :** le jour 1, on joue à *Mission Cyber* pour découvrir le hacking éthique. Les jours 2 à 5, chaque stagiaire **résout un problème de hacker en écrivant son propre programme** : d'abord l'algorithme en français, ensuite le code JavaScript.
**Prérequis :** aucun. VS Code + extension Live Server installés avant le jour 1.

Tout se passe **dans le navigateur, sur le code des stagiaires**. Aucun outil offensif, aucune cible externe : les cadenas, messages et empreintes attaqués sont fabriqués par l'atelier.

---

## L'atelier algo (jours 2 à 5)

Page `atelier.html` (menu « 🧠 Atelier algo »). Pour chaque problème :

1. **Comprendre** : des questions à résoudre à la main, sans ordinateur.
2. **Algorithme** : le stagiaire écrit les étapes en français dans une case de la page.
   Les tests restent **verrouillés** tant que l'algorithme ne fait pas au moins 3 lignes.
3. **Coder** : il complète la fonction correspondante dans `atelier.js` (fonctions vides marquées 🎯).
4. **Tester** : à chaque Ctrl+S, la page relance les tests et affiche ✅/❌ avec ce qui était attendu et ce que la fonction a renvoyé.

Les 3 « coups de pouce » de chaque problème vont du plus vague au plus précis (le dernier donne presque la ligne de code). En haut de `atelier.js`, un petit dictionnaire français → JavaScript sert d'antisèche.

**Règle d'animation :** avant de laisser quelqu'un coder, demandez-lui de **lire son algorithme à voix haute** (ou de le coller dans le chat). Si l'algorithme est flou, le code le sera aussi. Un bon test : « Si je suis l'ordinateur et que je suis ta recette à la lettre, est-ce que je trouve ? »

L'algorithme est enregistré dans le navigateur du stagiaire (localStorage), le code dans `atelier.js`.

## Déroulé type d'une séance (jours 2 à 5)

| Durée | Moment |
|---|---|
| 10 min | Accroche : une actu cyber ou une question liée au problème du jour |
| 15 min | Notion du jour, en démo écran partagé (sans donner la solution) |
| 15 min | **Comprendre** : questions à la main, mise en commun à l'oral |
| 15 min | **Algorithme** : chacun écrit le sien, puis le lit au groupe ou à l'animateur |
| 50 min | **Coder et tester** (l'animateur passe de salle en salle). Les plus rapides attaquent le bonus ⭐ |
| 15 min | Tour de table : un stagiaire montre son algorithme, puis son code ; on compare les approches |

## Les 5 séances

### Jour 1 — Les fondamentaux du hacking éthique (*Mission Cyber*)
- **Notions :** chapeau blanc / gris / noir, cadre légal suisse (art. 143bis CP « accès indu à un système informatique », art. 144bis CP « détérioration de données »), bug bounty (la Confédération en organise un), signaler une faille à l'OFCS (Office fédéral de la cybersécurité), ce que voit le navigateur (client/serveur).
- **Activité :** jouer à *Mission Cyber* en entier, classement des scores.
- **Projet :** installation, personnaliser titre/couleurs, découvrir F12 (onglets Éléments et Console).
- **Charte** lue et validée par chacun à l'oral.
- **Pour finir (5 min) :** « C'est quoi une recette de cuisine ? » → introduire le mot *algorithme* pour le lendemain.

### Jour 2 — 🔒 Le cadenas : boucles et force brute
- **Notions :** algorithme vs code, variable, boucle `for`, condition `if`, `return`.
- **Accroche :** « Un cadenas à 3 chiffres : combien de combinaisons ? Combien de temps à la main ? Et pour un ordinateur ? »
- **Problème :** `trouverCode(essayer)`.
- **Bonus ⭐ :** `trouverCodeMalin(indice)`, la dichotomie. Faire d'abord le jeu du « plus ou moins » à l'oral entre deux stagiaires.
- **Message cyber :** un code court tombe en une fraction de seconde ; c'est pour ça que les téléphones bloquent après quelques essais.

### Jour 3 — 🔐 César : parcourir un texte, le modulo
- **Notions :** chiffrement vs encodage, position d'une lettre, modulo `%`, construire un texte lettre par lettre, réutiliser ses propres fonctions.
- **Accroche :** message chiffré posté dans le chat, premier qui décode gagne.
- **Problème :** `decalerLettre` puis `cesar`. Faire remarquer que `cesar` est très courte *parce que* `decalerLettre` existe : on découpe un gros problème en petits.
- **Bonus ⭐ :** `casserCesar` (force brute, réutilise `cesar`).
- **Activité de fin :** chacun chiffre un message avec **sa** fonction dans la console et l'envoie à un voisin.

### Jour 4 — 🔑 Le juge des mots de passe : drapeaux et compteurs
- **Notions :** booléens (drapeaux), compteur, plusieurs conditions, ordre des vérifications ; phrases de passe, gestionnaire de mots de passe, double authentification ; données personnelles et nouvelle loi sur la protection des données (nLPD, en vigueur depuis le 1er septembre 2023).
- **Accroche :** « vrai ou phishing ? » sur quelques captures d'écran fictives.
- **Problème :** `noteMotDePasse`.
- **Bonus ⭐ :** `domaine` + `estLeVraiSite` (lire le vrai domaine d'un lien, piège `faux-colisexpress.fr`).
- **Discussion :** « P@ssw0rd! » obtient 5/6 avec nos règles. Notre juge a une faille : laquelle ? (Il ne connaît pas les astuces de remplacement des pirates.) Transition vers le jour 5.

### Jour 5 — 🧨 L'attaque par dictionnaire, puis présentations
- **Notions :** empreinte (hachage), pourquoi un site ne stocke jamais les mots de passe en clair, attaque par dictionnaire.
- **Problème (45 min) :** `attaqueDictionnaire`. Le dernier test casse l'empreinte du boss final du jour 1 : effet garanti.
- **Bonus ⭐ :** `variantes`, puis discussion : pourquoi « s0l31l » n'est pas un bon mot de passe.
- **Présentations (2 min chacun) :** le stagiaire choisit son problème préféré, montre son algorithme en français, puis son code, et dit ce que ça apprend sur la sécurité.
- Facultatif : publication du dossier sur Netlify Drop, remise des attestations.

---

## Correspondance avec les objectifs annoncés

| Objectif du stage | Où |
|---|---|
| Fondamentaux du hacking éthique | J1 charte et *Mission Cyber* |
| Sécurité en ligne, protection des données | J4 mots de passe, faux liens, nLPD |
| Cryptographie de base | J3 César, J5 hachage |
| Réseaux informatiques | J1 (épreuve DNS), J4 (domaines, URL) |
| Techniques de défense | J4 juge de mots de passe, détecteur de faux liens |
| Outils de sécurité | Outils dev du navigateur, boîte à outils du projet |
| **Programmation, pensée algorithmique** | **J2 à J5 : problème → algorithme → code → tests** |
| Résolution de problèmes, activités ludiques | Questions « à la main », jeu du plus ou moins, messages chiffrés |
| Scénarios réels | Cadenas et code PIN, faux SMS de colis, mots de passe courants |
| Mener à bien un projet, confiance | Ses propres programmes qui passent les tests + présentation |

## Corrigés de l'atelier

Il existe d'autres solutions correctes : si tous les tests passent, c'est bon.

```js
// Jour 2
function trouverCode(essayer) {
  for (let code = 0; code <= 999; code++) {
    if (essayer(code)) return code;
  }
}

function trouverCodeMalin(indice) {
  let min = 0;
  let max = 999;
  while (true) {
    const milieu = Math.floor((min + max) / 2);
    const reponse = indice(milieu);
    if (reponse === "ok") return milieu;
    if (reponse === "plus") min = milieu + 1;
    else max = milieu - 1;
  }
}

// Jour 3
function decalerLettre(lettre, decalage) {
  const position = ALPHABET.indexOf(lettre);
  if (position === -1) return lettre;
  return ALPHABET[(position + decalage + 26) % 26];
}

function cesar(texte, decalage) {
  let resultat = "";
  for (const lettre of texte) {
    resultat += decalerLettre(lettre, decalage);
  }
  return resultat;
}

function casserCesar(message, motConnu) {
  for (let decalage = 0; decalage < 26; decalage++) {
    const essai = cesar(message, -decalage);
    if (essai.includes(motConnu)) return essai;
  }
  return null;
}

// Jour 4
function noteMotDePasse(mdp) {
  if (MOTS_INTERDITS.includes(mdp.toLowerCase())) return 0;
  let note = 0;
  if (mdp.length >= 8) note++;
  if (mdp.length >= 12) note++;
  let aMinuscule = false, aMajuscule = false, aChiffre = false, aSymbole = false;
  for (const c of mdp) {
    if (MINUSCULES.includes(c)) aMinuscule = true;
    else if (MAJUSCULES.includes(c)) aMajuscule = true;
    else if (CHIFFRES.includes(c)) aChiffre = true;
    else aSymbole = true;
  }
  if (aMinuscule) note++;
  if (aMajuscule) note++;
  if (aChiffre) note++;
  if (aSymbole) note++;
  return note;
}

function domaine(url) {
  const morceaux = url.split("://");
  return morceaux[morceaux.length - 1].split("/")[0];
}

function estLeVraiSite(url, vraiDomaine) {
  const d = domaine(url);
  return d === vraiDomaine || d.endsWith("." + vraiDomaine);
}

// Jour 5
function attaqueDictionnaire(empreinteCible, dictionnaire) {
  for (const mot of dictionnaire) {
    if (empreinte(mot) === empreinteCible) return mot;
  }
  return null;
}

function variantes(mot) {
  let leet = "";
  for (const lettre of mot) {
    if (lettre === "a") leet += "4";
    else if (lettre === "e") leet += "3";
    else if (lettre === "i") leet += "1";
    else if (lettre === "o") leet += "0";
    else leet += lettre;
  }
  return [mot, mot[0].toUpperCase() + mot.slice(1), mot + "123", mot + "!", leet];
}
```

### Erreurs fréquentes
- **`return` dans la boucle, au mauvais endroit** : `if (…) return code; else return -1;` s'arrête au premier essai. Le « pas trouvé » se met **après** la boucle.
- **Oubli du `return`** : la page affiche « tu as renvoyé rien du tout (undefined) ».
- **Modulo négatif** (jour 3) : `(2 - 3) % 26` vaut −1 en JavaScript, d'où le `+ 26`.
- **`=` au lieu de `===`** dans un `if`.
- **Boucle infinie** (`while` sans changer `min`/`max`) : l'atelier coupe après 100 essais pour le cadenas bavard ; ailleurs la page peut se figer → fermer l'onglet, corriger.
- **Erreur de syntaxe** dans `atelier.js` : un cadre rouge en haut de la page indique la ligne.

## Solutions de la mission d'exemple (jour 1)

| # | Épreuve | Réponse |
|---|---|---|
| 1 | Regarde sous le capot | `sous-le-capot` (commentaire HTML, Ctrl+U) |
| 2 | Le code de Jules | `chateau` (César −3) |
| 3 | Pas si secret | `parefeu` (Base64) |
| 4 | Que des 0 et des 1 | `wifi` |
| 5 | Colis en attente | `https://www.colisexpress.fr/suivi` |
| 6 | Le coffre-fort | `girafe-tonnerre-violet-42` |
| 7 | L'annuaire d'Internet | `dns` |
| 8 | La console secrète | `console-ninja` (F12 → Console, message répété toutes les 5 s) |
| 9 | César sans la clé | `espion` (César, force brute → −7) |
| 10 | Le cadenas | « La connexion entre toi et le site est chiffrée » |
| 11 | Compter comme un ordinateur | `42` |
| 12 | Le faux support | « Je raccroche : on ne donne JAMAIS ce code » |
| 13 | Tout en haut | `onglet-espion` (titre de l'onglet) |
| 14 | Deux couches | `pirate` (Base64 décodée deux fois) |
| 15 | Il n'y a rien de tel que chez soi | « Ta propre machine » |
| 16 | Combien de codes ? | `10000` |
| 17 | Le décalage magique | `hameconnage` (ROT13) |
| 18 | Le lien piégé | `https://www.banquealpine.ch/connexion` |
| 19 | Le tiroir du navigateur | `tiroir-a-secrets` (F12 → Application → Stockage local) |
| 20 | Ti-ti-ti, ta-ta-ta | `virus` (morse) |
| 21 | Double verrou | « La double authentification… » |
| 22 | L'effet avalanche | `chats` |
| 23 | Wi-Fi gratuit | « J'utilise mes données mobiles… » |
| 24 | Le port sécurisé | `443` |
| 25 | Pas dans le code source | `inspecteur-gadget` (Inspecteur, élément `hidden` ajouté par JS) |
| 26 | L'hexadécimal | `cookie` |
| 27 | La photo bavarde | « La position GPS exacte… » |
| 28 | La lettre truquée | `i` (payfac**I**e) |
| 29 | Force brute au cadenas | `100000` |
| 30 | Le rançongiciel | `rançongiciel` ou `ransomware` |
| 31 | Le poème | `backup` ou `sauvegarde` (acrostiche) |
| 32 | Le dictionnaire du pirate | `minecraft` (attaque par dictionnaire) |
| 33 | Mises à jour | « Elle corrige des failles… » |
| 34 | La porte dérobée | `porte-derobee` (taper `ouvrirLaPorte()` dans la console) |
| 35 | Le QR code du parking | « Je ne scanne pas… » |
| 36 | Le meilleur réflexe | « Un mot de passe différent… gestionnaire » |
| 37 | Poupées russes | `sentinelle` (Base64 puis César −5) |
| 38 | Réservé aux admins | `verification-serveur` (Inspecteur → supprimer `disabled`) |
| 39 | La loi, c'est la loi | « Je préviens un adulte… » |
| 40 | Le boss final | `123456` (attaque par dictionnaire) |

Majuscules, accents et espaces ne comptent pas (« 10 000 » = « 10000 »). La progression est sauvegardée dans le navigateur : si la page est rechargée, le bouton d'accueil propose de reprendre.

## Points de vigilance

- Rappeler la charte dès que quelqu'un propose de « tester » un vrai site (site de l'école, jeu en ligne, Wi-Fi du voisin…). Réponse type : « Sans autorisation écrite, c'est interdit par le Code pénal suisse (art. 143bis), même sans rien casser. »
- Jamais de vrais mots de passe dans les outils ni dans la console, même si tout reste local.
- Les exemples de phishing utilisent des marques **inventées** (ColisExpress) : demander aux stagiaires de faire pareil.
- `outils.js` contient déjà une fonction `cesar()` : demander de ne la lire **qu'après** avoir écrit la sienne (le jour 3 propose de comparer les deux).
- Ne pas laisser un stagiaire bloqué plus de 10 min : orienter vers le coup de pouce suivant, ou lui faire dérouler son algorithme sur un exemple à voix haute.
- L'outil SHA-256 de la boîte à outils a besoin de `localhost` (Live Server) ou `https` (Netlify). L'atelier, lui, fonctionne aussi en ouvrant le fichier en double-clic.
