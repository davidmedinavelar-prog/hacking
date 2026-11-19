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
function trouverCode(essayer) 
{
  // 🎯 Ton code ici
  for (let code = 0; code <= 999; code++) {
    let resultat;
    resultat = essayer(code);
    if (resultat == true){
      return code;
    } 
  }
}


// ---------------------------------------------------------
// JOUR 2 BONUS : 🧠 Le cadenas bavard
// indice(code) renvoie "ok", "plus" (le secret est plus grand)
// ou "moins" (le secret est plus petit).
// Défi : 10 essais maximum !
// ---------------------------------------------------------
function trouverCodeMalin(indice) {
  // 🎯 Ton code ici
  let mini = 0;
  let maxi = 999;
  
  while (true) {
    const milieu = Math.floor((mini + maxi)/2);
    const resultat = indice(milieu);
    if (resultat === "ok") return milieu;
    
    if (resultat === "plus") mini = milieu + 1;
    else maxi = milieu - 1;

  }
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
const position = ALPHABET.indexOf(lettre);
if (position === -1) return lettre;
return ALPHABET[(position + decalage + 26) % 26];

}

// cesar("chat", 3) doit renvoyer "fkdw"
// Astuce : utilise TA fonction decalerLettre !
function cesar(texte, decalage) {
  // 🎯 Ton code ici
  let resultat = "";
  for (const lettre of texte) {
     resultat += decalerLettre(lettre, decalage);
    }
  return resultat;
    
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
if (MOTS_INTERDITS.includes(mdp.toLowerCase())) return 0;
let note = 0;
let aMiniscule = false;
let aMajuscule = false;
let aChiffre = false;
let aSymbole = false;

if (mdp.length >=8) note ++; //note ++ équivaut à note = note + 1
if (mdp.length >=12) note ++;
// Pour chaque caractère (c) du mot de passe je teste si c'est une minuscule ou une majuscule ou un chiffre ou un symbole.
for (c of mdp){
  if (MINUSCULES.includes(c)) aMiniscule = true;
  else if (MAJUSCULES.includes(c)) aMajuscule = true;
  else if (CHIFFRES.includes(c)) aChiffre= true;
  else aSymbole = true;    
}
if (aMiniscule === true ) note ++;  
if (aMajuscule === true ) note ++;  
if (aChiffre === true ) note ++;  
if (aSymbole === true ) note ++;  
return note;

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
