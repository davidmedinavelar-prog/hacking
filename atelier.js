// =========================================================
// 🧠 L'ATELIER ALGO : TON CODE VA ICI
//
// La règle d'or : on ne code JAMAIS avant d'avoir écrit
// l'algorithme en français dans la page atelier.html.
//
// Petit dictionnaire français → JavaScript :
//
//   « x vaut 0 »                    let x = 0;
//   « ajouter 1 à x »               x = x + 1;   (ou x++)
//   « pour chaque n de 0 à 999 »    for (let n = 0; n <= 999; n++) { ... }
//   « pour chaque lettre du texte » for (const lettre of texte) { ... }
//   « pour chaque mot de la liste » for (const mot of liste) { ... }
//   « tant que … répéter »          while (condition) { ... }
//   « si … alors … sinon … »        if (condition) { ... } else { ... }
//   « a est égal à b »              a === b
//   « a est différent de b »        a !== b
//   « et » / « ou »                 &&  /  ||
//   « renvoyer le résultat »        return resultat;   (la fonction s'arrête là !)
//
// Pour tester une fonction à la main : F12 → Console, tape
// par exemple  cesar("chat", 3)  et appuie sur Entrée.
//
// ⚠️ Si la page se fige : tu as fait une boucle qui ne s'arrête
// jamais. Ferme l'onglet, corrige la boucle, rouvre la page.
// =========================================================


// ---------------------------------------------------------
// JOUR 2 : 🔒 Le cadenas à 3 chiffres
// essayer(code) renvoie true si le code ouvre le cadenas.
// Ta fonction doit renvoyer le bon code (un nombre de 0 à 999).
// ---------------------------------------------------------
function trouverCode(essayer) {
  // 🎯 Ton code ici

}


// ---------------------------------------------------------
// JOUR 2 BONUS : 🧠 Le cadenas bavard
// indice(code) renvoie "ok", "plus" (le secret est plus grand)
// ou "moins" (le secret est plus petit).
// Défi : 10 essais maximum !
// ---------------------------------------------------------
function trouverCodeMalin(indice) {
  // 🎯 Ton code ici

}


// ---------------------------------------------------------
// JOUR 3 : 🔐 Ta propre machine César
// Les messages sont en minuscules.
// ---------------------------------------------------------
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
// ALPHABET.indexOf("c") vaut 2      ALPHABET[2] vaut "c"
// ALPHABET.indexOf("!") vaut -1  (ce n'est pas une lettre)

// decalerLettre("a", 3) doit renvoyer "d"
function decalerLettre(lettre, decalage) {
  // 🎯 Ton code ici

}

// cesar("chat", 3) doit renvoyer "fkdw"
// Astuce : utilise TA fonction decalerLettre !
function cesar(texte, decalage) {
  // 🎯 Ton code ici

}


// ---------------------------------------------------------
// JOUR 3 BONUS : ⚡ Casser César sans la clé
// Renvoie le message déchiffré qui contient motConnu,
// ou null si aucun décalage ne marche.
// ---------------------------------------------------------
function casserCesar(message, motConnu) {
  // 🎯 Ton code ici

}


// ---------------------------------------------------------
// JOUR 4 : 🔑 Le juge des mots de passe
// Renvoie une note de 0 à 6 (les règles sont dans la page).
// ---------------------------------------------------------
const MOTS_INTERDITS = ["password", "motdepasse", "azerty", "qwerty", "123456", "admin", "soleil", "doudou", "loulou", "chouchou"];
const MINUSCULES = "abcdefghijklmnopqrstuvwxyz";
const MAJUSCULES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHIFFRES = "0123456789";
// MINUSCULES.includes("e") vaut true     CHIFFRES.includes("e") vaut false

function noteMotDePasse(mdp) {
  // 🎯 Ton code ici

}


// ---------------------------------------------------------
// JOUR 4 BONUS : 🎣 Le détecteur de faux liens
// domaine("https://www.colisexpress.fr/suivi") → "www.colisexpress.fr"
// estLeVraiSite(url, "colisexpress.fr") → true ou false
// ---------------------------------------------------------
function domaine(url) {
  // 🎯 Ton code ici

}

function estLeVraiSite(url, vraiDomaine) {
  // 🎯 Ton code ici (utilise ta fonction domaine !)

}


// ---------------------------------------------------------
// JOUR 5 : 🧨 L'attaque par dictionnaire
// Outil fourni : empreinte(mot) renvoie l'empreinte SHA-256 du mot.
// Renvoie le mot trouvé, ou null.
// ---------------------------------------------------------
function attaqueDictionnaire(empreinteCible, dictionnaire) {
  // 🎯 Ton code ici

}


// ---------------------------------------------------------
// JOUR 5 BONUS : 🧬 Les variantes du pirate
// variantes("chat") → ["chat", "Chat", "chat123", "chat!", "ch4t", ...]
// ---------------------------------------------------------
function variantes(mot) {
  // 🎯 Ton code ici

}
