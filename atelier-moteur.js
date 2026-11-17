// =========================================================
// ⚙️ LE MOTEUR DE L'ATELIER ALGO
// Ce fichier affiche les problèmes et teste TES fonctions.
// Tu n'as pas besoin de le modifier : ton code va dans atelier.js
// =========================================================

// ---------- Si atelier.js contient une erreur, on la garde pour l'afficher ----------
const erreursDeChargement = [];
window.addEventListener("error", (e) => {
  const fichier = (e.filename || "").split("/").pop() || "un fichier";
  erreursDeChargement.push(fichier + ", ligne " + e.lineno + " : " + e.message);
});

// ---------- Outil fourni : l'empreinte SHA-256 (version simple, sans "await") ----------
// empreinte("soleil") renvoie toujours la même suite de 64 caractères.
function empreinte(texte) {
  const octets = [...new TextEncoder().encode(String(texte))];
  const premiers = [];
  for (let n = 2; premiers.length < 64; n++) {
    if (premiers.every((p) => n % p !== 0)) premiers.push(n);
  }
  const partieDecimale = (x) => ((x - Math.floor(x)) * 0x100000000) >>> 0;
  const K = premiers.map((p) => partieDecimale(Math.cbrt(p)));
  const H = premiers.slice(0, 8).map((p) => partieDecimale(Math.sqrt(p)));

  const longueurEnBits = octets.length * 8;
  octets.push(0x80);
  while (octets.length % 64 !== 56) octets.push(0);
  for (let i = 7; i >= 0; i--) octets.push(Math.floor(longueurEnBits / 2 ** (8 * i)) % 256);

  const rotation = (x, n) => (x >>> n) | (x << (32 - n));
  for (let debut = 0; debut < octets.length; debut += 64) {
    const W = [];
    for (let t = 0; t < 64; t++) {
      if (t < 16) {
        const i = debut + 4 * t;
        W[t] = (octets[i] << 24) | (octets[i + 1] << 16) | (octets[i + 2] << 8) | octets[i + 3];
      } else {
        const s0 = rotation(W[t - 15], 7) ^ rotation(W[t - 15], 18) ^ (W[t - 15] >>> 3);
        const s1 = rotation(W[t - 2], 17) ^ rotation(W[t - 2], 19) ^ (W[t - 2] >>> 10);
        W[t] = (W[t - 16] + s0 + W[t - 7] + s1) | 0;
      }
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let t = 0; t < 64; t++) {
      const t1 = (h + (rotation(e, 6) ^ rotation(e, 11) ^ rotation(e, 25)) + ((e & f) ^ (~e & g)) + K[t] + W[t]) | 0;
      const t2 = ((rotation(a, 2) ^ rotation(a, 13) ^ rotation(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
      h = g; g = f; f = e; e = (d + t1) | 0;
      d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    [a, b, c, d, e, f, g, h].forEach((v, i) => { H[i] = (H[i] + v) | 0; });
  }
  return H.map((x) => (x >>> 0).toString(16).padStart(8, "0")).join("");
}

// Une petite liste de mots de passe très utilisés (pour les tests du jour 5)
const MOTS_COURANTS = [
  "123456", "123456789", "azerty", "password", "12345678", "qwerty", "123123",
  "000000", "111111", "motdepasse", "soleil", "doudou", "loulou", "chouchou",
  "marseille", "football", "iloveyou", "admin", "abc123", "princesse",
  "chocolat", "pokemon", "minecraft", "dragon", "naruto", "bonjour", "jetaime"
];

// ---------- Petits outils pour écrire les tests ----------
function montrer(valeur) {
  if (valeur === undefined) return "rien du tout (undefined) : as-tu oublié le return ?";
  if (typeof valeur === "string" || Array.isArray(valeur)) return JSON.stringify(valeur);
  return String(valeur);
}

// Teste "appel" : la fonction doit renvoyer exactement "attendu"
function egal(appel, calcul, attendu) {
  return {
    appel,
    lancer() {
      const obtenu = calcul();
      return { ok: obtenu === attendu, detail: "attendu " + montrer(attendu) + ", tu as renvoyé " + montrer(obtenu) };
    }
  };
}

// Un faux cadenas : il compte les essais et s'arrête si on boucle à l'infini
function fabriquerCadenas(secret) {
  const cadenas = (code) => {
    cadenas.essais++;
    if (cadenas.essais > 2000) throw new Error("Plus de 2000 essais : ta boucle ne s'arrête jamais ?");
    return code === secret;
  };
  cadenas.essais = 0;
  return cadenas;
}

// Un cadenas qui répond "plus", "moins" ou "ok"
function fabriquerCadenasBavard(secret) {
  const indice = (code) => {
    indice.essais++;
    if (indice.essais > 100) throw new Error("Plus de 100 essais : ta boucle ne s'arrête jamais ?");
    if (code === secret) return "ok";
    return secret > code ? "plus" : "moins";
  };
  indice.essais = 0;
  return indice;
}

// =========================================================
// 📚 LES PROBLÈMES
// =========================================================
const PROBLEMES = [
  // ---------------- JOUR 2 ----------------
  {
    id: "cadenas",
    jour: 2,
    titre: "🔒 Le cadenas à 3 chiffres",
    histoire: "Un agent a oublié le code de son cadenas : un nombre entre <b>0 et 999</b>. Tu ne connais pas le code, mais tu as le droit d'appeler <code>essayer(code)</code>, qui répond <code>true</code> si le cadenas s'ouvre, <code>false</code> sinon. Écris un programme qui trouve le code <b>tout seul</b>.",
    aLaMain: [
      "Si le code était 7, quels nombres essaierais-tu, dans quel ordre ?",
      "Combien d'essais au maximum faut-il pour être SÛR de trouver ?",
      "À quel moment ton programme doit-il s'arrêter ?"
    ],
    fonctions: ["trouverCode"],
    coupsDePouce: [
      "C'est une attaque par <b>force brute</b> : on essaie TOUS les codes, l'un après l'autre.",
      "En français : « pour chaque code de 0 à 999 : si essayer(code) est vrai, alors renvoyer code ».",
      "En JavaScript, « pour chaque code de 0 à 999 » s'écrit <code>for (let code = 0; code &lt;= 999; code++) { … }</code>"
    ],
    tests: [
      ...[7, 421, 0, 999].map((secret) => ({
        appel: "trouverCode(cadenas dont le code est " + secret + ")",
        lancer() {
          const obtenu = trouverCode(fabriquerCadenas(secret));
          return { ok: obtenu === secret, detail: "attendu " + secret + ", tu as renvoyé " + montrer(obtenu) };
        }
      })),
      {
        appel: "trouverCode s'arrête dès qu'il a trouvé (code 12)",
        lancer() {
          const cadenas = fabriquerCadenas(12);
          trouverCode(cadenas);
          return { ok: cadenas.essais === 13, detail: "13 essais suffisent (de 0 à 12), tu en as fait " + cadenas.essais };
        }
      }
    ]
  },
  {
    id: "cadenas-malin",
    jour: 2,
    bonus: true,
    titre: "🧠 Le cadenas bavard (10 essais maximum !)",
    histoire: "Ce cadenas-là est plus bavard : <code>indice(code)</code> répond <code>\"ok\"</code> si c'est le bon code, <code>\"plus\"</code> si le code secret est plus GRAND, <code>\"moins\"</code> s'il est plus PETIT. Défi : trouver n'importe quel code entre 0 et 999 en <b>10 essais maximum</b>.",
    aLaMain: [
      "Joue avec un voisin : il pense à un nombre entre 0 et 999, tu n'as droit qu'à « plus » ou « moins ». Quelle est ta meilleure première question ?",
      "Après « plus » à 500, entre quels nombres se trouve le code ?",
      "Il te faut deux nombres pour te souvenir de la zone où se cache le code. Lesquels ?"
    ],
    fonctions: ["trouverCodeMalin"],
    coupsDePouce: [
      "Garde deux variables : <code>min = 0</code> et <code>max = 999</code>. Le code est toujours entre les deux.",
      "Essaie toujours le milieu : <code>Math.floor((min + max) / 2)</code>. Si on te répond « plus », le code est au-dessus du milieu : <code>min = milieu + 1</code>.",
      "Répète avec <code>while (true) { … }</code> et sors avec <code>return</code> quand la réponse est \"ok\". Ça s'appelle la <b>recherche par dichotomie</b>."
    ],
    tests: [0, 1, 137, 500, 862, 998, 999].map((secret) => ({
      appel: "trouverCodeMalin(cadenas dont le code est " + secret + ")",
      lancer() {
        const indice = fabriquerCadenasBavard(secret);
        const obtenu = trouverCodeMalin(indice);
        if (obtenu !== secret) return { ok: false, detail: "attendu " + secret + ", tu as renvoyé " + montrer(obtenu) };
        return { ok: indice.essais <= 10, detail: "trouvé en " + indice.essais + " essai(s) (10 maximum)" };
      }
    }))
  },

  // ---------------- JOUR 3 ----------------
  {
    id: "cesar",
    jour: 3,
    titre: "🔐 Ta propre machine César",
    histoire: "Jules César décalait chaque lettre dans l'alphabet : avec un décalage de 3, <code>a → d</code>, <code>b → e</code>… et <code>z → c</code> (on repart au début !). Écris d'abord <code>decalerLettre(lettre, decalage)</code> qui décale UNE lettre, puis <code>cesar(texte, decalage)</code> qui chiffre un message entier. Les messages sont en minuscules ; ce qui n'est pas une lettre (espace, tiret, !) ne bouge pas.",
    aLaMain: [
      "Chiffre « chat » avec un décalage de 3, sur papier.",
      "La lettre a est en position 0, b en 1… z en 25. Quelle est la position de x ? Et celle de x décalé de 5 ?",
      "Que faut-il faire quand on « dépasse » z ? Et quand le décalage est négatif (−3) ?"
    ],
    fonctions: ["decalerLettre", "cesar"],
    coupsDePouce: [
      "<code>ALPHABET.indexOf(lettre)</code> donne la position d'une lettre (−1 si ce n'est pas une lettre). <code>ALPHABET[position]</code> fait l'inverse.",
      "Le <b>modulo</b> <code>%</code> donne le reste d'une division : <code>28 % 26</code> vaut 2. C'est parfait pour « repartir au début » ! Pour les décalages négatifs, ajoute 26 avant : <code>(position + decalage + 26) % 26</code>.",
      "Pour <code>cesar</code> : pars d'un texte vide <code>let resultat = \"\"</code>, puis « pour chaque lettre du texte » (<code>for (const lettre of texte)</code>), ajoute la lettre décalée à la fin : <code>resultat += …</code>"
    ],
    tests: [
      egal('decalerLettre("a", 3)', () => decalerLettre("a", 3), "d"),
      egal('decalerLettre("z", 1)', () => decalerLettre("z", 1), "a"),
      egal('decalerLettre("x", 5)', () => decalerLettre("x", 5), "c"),
      egal('decalerLettre("c", -3)', () => decalerLettre("c", -3), "z"),
      egal('decalerLettre(" ", 4)', () => decalerLettre(" ", 4), " "),
      egal('cesar("chateau", 3)', () => cesar("chateau", 3), "fkdwhdx"),
      egal('cesar("fkdwhdx", -3)', () => cesar("fkdwhdx", -3), "chateau"),
      egal('cesar("zoo", 1)', () => cesar("zoo", 1), "app"),
      egal('cesar("rendez-vous a midi !", 13)', () => cesar("rendez-vous a midi !", 13), "eraqrm-ibhf n zvqv !")
    ]
  },
  {
    id: "casser-cesar",
    jour: 3,
    bonus: true,
    titre: "⚡ Casser César sans la clé",
    histoire: "Tu as intercepté un message chiffré, sans le décalage. Mais tu sais qu'un mot est dedans (par exemple « agent »). Écris <code>casserCesar(message, motConnu)</code> qui renvoie le message <b>déchiffré</b>. Si aucun décalage ne marche, renvoie <code>null</code>.",
    aLaMain: [
      "Combien de décalages différents existe-t-il ?",
      "Comment savoir si un décalage est le bon ?",
      "Quelle fonction que TU as déjà écrite peux-tu réutiliser ?"
    ],
    fonctions: ["casserCesar"],
    coupsDePouce: [
      "C'est encore de la force brute, comme le cadenas : on essaie les 26 décalages de 0 à 25.",
      "Pour chaque décalage, calcule <code>cesar(message, -decalage)</code>, puis regarde si le résultat contient le mot : <code>essai.includes(motConnu)</code>.",
      "N'oublie pas le <code>return null</code> tout à la fin, APRÈS la boucle."
    ],
    tests: [
      egal('casserCesar("s\'hnlua zljyla hyypcl", "agent")', () => casserCesar("s'hnlua zljyla hyypcl", "agent"), "l'agent secret arrive"),
      egal('casserCesar("wvyal islbl", "porte")', () => casserCesar("wvyal islbl", "porte"), "porte bleue"),
      egal('casserCesar("bonjour", "zebre")', () => casserCesar("bonjour", "zebre"), null)
    ]
  },

  // ---------------- JOUR 4 ----------------
  {
    id: "mot-de-passe",
    jour: 4,
    titre: "🔑 Le juge des mots de passe",
    histoire: "Écris <code>noteMotDePasse(mdp)</code> qui donne une note de 0 à 6 :<br>• <b>+1</b> si au moins 8 caractères, et <b>+1 de plus</b> si au moins 12<br>• <b>+1</b> s'il y a au moins une minuscule<br>• <b>+1</b> s'il y a au moins une majuscule<br>• <b>+1</b> s'il y a au moins un chiffre<br>• <b>+1</b> s'il y a au moins un symbole (tout le reste : - ! @ espace…)<br>• mais <b>0</b> directement si le mot de passe (en minuscules) est dans la liste <code>MOTS_INTERDITS</code>.",
    aLaMain: [
      "Calcule à la main la note de « Kevin2012 », puis de « girafe-tonnerre-violet-42 ».",
      "Comment ferais-tu pour savoir s'il y a au moins UN chiffre dans un mot ? Regarde chaque caractère…",
      "Dans quel ordre vérifier les règles ? Laquelle doit passer en premier ?"
    ],
    fonctions: ["noteMotDePasse"],
    coupsDePouce: [
      "Commence par la liste interdite : <code>if (MOTS_INTERDITS.includes(mdp.toLowerCase())) return 0;</code>",
      "Crée 4 « drapeaux » à <code>false</code> : <code>aMinuscule</code>, <code>aMajuscule</code>, <code>aChiffre</code>, <code>aSymbole</code>. Pour chaque caractère, lève le bon drapeau (<code>true</code>).",
      "Pour reconnaître un caractère : <code>MINUSCULES.includes(c)</code>, <code>MAJUSCULES.includes(c)</code>, <code>CHIFFRES.includes(c)</code>… sinon c'est un symbole. À la fin, ajoute 1 à la note pour chaque drapeau levé."
    ],
    tests: [
      egal('noteMotDePasse("abc")', () => noteMotDePasse("abc"), 1),
      egal('noteMotDePasse("MOT")', () => noteMotDePasse("MOT"), 1),
      egal('noteMotDePasse("")', () => noteMotDePasse(""), 0),
      egal('noteMotDePasse("abcdefghijkl")', () => noteMotDePasse("abcdefghijkl"), 3),
      egal('noteMotDePasse("Kevin2012")', () => noteMotDePasse("Kevin2012"), 4),
      egal('noteMotDePasse("girafe-tonnerre-violet-42")', () => noteMotDePasse("girafe-tonnerre-violet-42"), 5),
      egal('noteMotDePasse("Girafe-Tonnerre-Violet-42")', () => noteMotDePasse("Girafe-Tonnerre-Violet-42"), 6),
      egal('noteMotDePasse("Azerty")', () => noteMotDePasse("Azerty"), 0),
      egal('noteMotDePasse("SOLEIL")', () => noteMotDePasse("SOLEIL"), 0)
    ]
  },
  {
    id: "phishing",
    jour: 4,
    bonus: true,
    titre: "🎣 Le détecteur de faux liens",
    histoire: "Souviens-toi de l'épreuve « Colis en attente » du jour 1. Le vrai nom d'un site, c'est le <b>domaine</b> : ce qui est entre <code>://</code> et le premier <code>/</code>. Écris <code>domaine(url)</code>, puis <code>estLeVraiSite(url, vraiDomaine)</code> qui dit si un lien mène bien au vrai site. Attention : <code>www.colisexpress.fr</code> est bien le vrai site, mais <code>faux-colisexpress.fr</code>, non !",
    aLaMain: [
      "Entoure le domaine dans « https://colisexpress.fr.suivi-paiement.com/payer ». Qui possède vraiment ce site ?",
      "Quelles sont les étapes pour découper une adresse ? Que faire s'il n'y a pas de « :// » ?",
      "Pourquoi « faux-colisexpress.fr » se termine par « colisexpress.fr » sans être le vrai site ? Quel caractère fait la différence ?"
    ],
    fonctions: ["domaine", "estLeVraiSite"],
    coupsDePouce: [
      "<code>texte.split(\"://\")</code> découpe un texte en morceaux. <code>\"a://b/c\".split(\"://\")</code> donne <code>[\"a\", \"b/c\"]</code> : le dernier morceau est <code>morceaux[morceaux.length - 1]</code>.",
      "Ensuite, découpe au <code>/</code> et garde le premier morceau : <code>.split(\"/\")[0]</code>.",
      "Le domaine est bon s'il est ÉGAL au vrai domaine, ou s'il se termine par un point suivi du vrai domaine : <code>d.endsWith(\".\" + vraiDomaine)</code>."
    ],
    tests: [
      egal('domaine("https://www.colisexpress.fr/suivi")', () => domaine("https://www.colisexpress.fr/suivi"), "www.colisexpress.fr"),
      egal('domaine("http://colis-express-securite.net/payer")', () => domaine("http://colis-express-securite.net/payer"), "colis-express-securite.net"),
      egal('domaine("https://colisexpress.fr.suivi-paiement.com")', () => domaine("https://colisexpress.fr.suivi-paiement.com"), "colisexpress.fr.suivi-paiement.com"),
      egal('domaine("colisexpress.fr/aide")', () => domaine("colisexpress.fr/aide"), "colisexpress.fr"),
      egal('estLeVraiSite("https://www.colisexpress.fr/suivi", "colisexpress.fr")', () => estLeVraiSite("https://www.colisexpress.fr/suivi", "colisexpress.fr"), true),
      egal('estLeVraiSite("https://colisexpress.fr", "colisexpress.fr")', () => estLeVraiSite("https://colisexpress.fr", "colisexpress.fr"), true),
      egal('estLeVraiSite("https://colisexpress.fr.suivi-paiement.com", "colisexpress.fr")', () => estLeVraiSite("https://colisexpress.fr.suivi-paiement.com", "colisexpress.fr"), false),
      egal('estLeVraiSite("https://www.colisexpres.fr/suivi", "colisexpress.fr")', () => estLeVraiSite("https://www.colisexpres.fr/suivi", "colisexpress.fr"), false),
      egal('estLeVraiSite("https://faux-colisexpress.fr", "colisexpress.fr")', () => estLeVraiSite("https://faux-colisexpress.fr", "colisexpress.fr"), false)
    ]
  },

  // ---------------- JOUR 5 ----------------
  {
    id: "dictionnaire",
    jour: 5,
    titre: "🧨 L'attaque par dictionnaire",
    histoire: "Un site sérieux ne garde jamais ton mot de passe : il garde son <b>empreinte</b> (64 caractères impossibles à « décoder »). Mais si le mot de passe est courant… Écris <code>attaqueDictionnaire(empreinteCible, dictionnaire)</code> qui renvoie le mot du dictionnaire dont l'empreinte est <code>empreinteCible</code>, ou <code>null</code> s'il n'y en a aucun. Tu as l'outil <code>empreinte(mot)</code>.",
    aLaMain: [
      "Dans la console (F12), tape <code>empreinte(\"soleil\")</code> deux fois. Que remarques-tu ? Et avec « Soleil » ?",
      "Ressemble-t-il à un problème que tu as déjà résolu ? Lequel ?",
      "Que doit faire le programme s'il a essayé tous les mots sans trouver ?"
    ],
    fonctions: ["attaqueDictionnaire"],
    coupsDePouce: [
      "C'est le cadenas du jour 2, mais avec une liste de mots au lieu des nombres de 0 à 999.",
      "« Pour chaque mot du dictionnaire » : <code>for (const mot of dictionnaire) { … }</code>",
      "Si <code>empreinte(mot) === empreinteCible</code>, renvoie le mot. Après la boucle : <code>return null</code>."
    ],
    tests: [
      egal('attaqueDictionnaire(empreinte("soleil"), ["azerty", "soleil", "doudou"])', () => attaqueDictionnaire(empreinte("soleil"), ["azerty", "soleil", "doudou"]), "soleil"),
      egal('attaqueDictionnaire(empreinte("azerty"), ["azerty", "soleil", "doudou"])', () => attaqueDictionnaire(empreinte("azerty"), ["azerty", "soleil", "doudou"]), "azerty"),
      egal('attaqueDictionnaire(empreinte("girafe-tonnerre"), ["azerty", "soleil"])', () => attaqueDictionnaire(empreinte("girafe-tonnerre"), ["azerty", "soleil"]), null),
      egal('attaqueDictionnaire(empreinte("soleil"), [])', () => attaqueDictionnaire(empreinte("soleil"), []), null),
      egal('attaqueDictionnaire("8d969eef…6c92" (le boss final du jour 1 !), MOTS_COURANTS)', () => attaqueDictionnaire("8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", MOTS_COURANTS), "123456")
    ]
  },
  {
    id: "variantes",
    jour: 5,
    bonus: true,
    titre: "🧬 Les variantes du pirate",
    histoire: "Les gens croient être malins avec « Soleil », « soleil123 » ou « s0l31l ». Les pirates aussi connaissent ces astuces ! Écris <code>variantes(mot)</code> qui renvoie une <b>liste</b> contenant au moins : le mot, le mot avec une Majuscule au début, le mot + « 123 », le mot + « ! », et le mot en « l33t » (a→4, e→3, i→1, o→0).",
    aLaMain: [
      "Écris à la main les 5 variantes de « chat ».",
      "Comment mettre seulement la PREMIÈRE lettre en majuscule ?",
      "Pour le l33t, faut-il regarder chaque lettre ? Ça ne te rappelle pas César ?"
    ],
    fonctions: ["variantes"],
    coupsDePouce: [
      "Une liste vide : <code>const liste = []</code>. Ajouter un élément : <code>liste.push(\"…\")</code>.",
      "Majuscule au début : <code>mot[0].toUpperCase() + mot.slice(1)</code>",
      "Pour le l33t, comme pour César : parcours chaque lettre, remplace-la si c'est a, e, i ou o, et construis un nouveau texte."
    ],
    tests: [
      ...["soleil", "Soleil", "soleil123", "soleil!", "s0l31l"].map((attendu) => ({
        appel: 'variantes("soleil") contient ' + JSON.stringify(attendu),
        lancer() {
          const liste = variantes("soleil");
          if (!Array.isArray(liste)) return { ok: false, detail: "il faut renvoyer une liste [ … ], tu as renvoyé " + montrer(liste) };
          return { ok: liste.includes(attendu), detail: "ta liste : " + montrer(liste) };
        }
      })),
      {
        appel: 'variantes("chat") contient "Chat" et "ch4t"',
        lancer() {
          const liste = variantes("chat");
          const ok = Array.isArray(liste) && liste.includes("Chat") && liste.includes("ch4t");
          return { ok, detail: "ta liste : " + montrer(liste) };
        }
      }
    ]
  }
];

// =========================================================
// 🖥️ L'AFFICHAGE
// =========================================================
const $ = (id) => document.getElementById(id);

function lire(cle) {
  try { return localStorage.getItem(cle) || ""; } catch { return ""; }
}
function ecrire(cle, valeur) {
  try { localStorage.setItem(cle, valeur); } catch { /* pas grave */ }
}

// L'algorithme compte s'il fait au moins 3 lignes non vides
function algorithmeEcrit(texte) {
  return texte.split("\n").filter((ligne) => ligne.trim() !== "").length >= 3;
}

function lancerTests(probleme) {
  const manquantes = probleme.fonctions.filter((nom) => typeof window[nom] !== "function");
  if (manquantes.length) {
    return { resultats: [], message: "La fonction " + manquantes.join(", ") + " n'existe pas dans atelier.js. L'as-tu effacée ou renommée ?" };
  }
  const resultats = probleme.tests.map((test) => {
    try {
      return { appel: test.appel, ...test.lancer() };
    } catch (erreur) {
      return { appel: test.appel, ok: false, detail: "💥 ton code a planté : " + erreur.message };
    }
  });
  return { resultats, message: "" };
}

function afficherTests(probleme, zone, compteur) {
  zone.innerHTML = "";
  const algo = lire("algo-" + probleme.id);
  if (!algorithmeEcrit(algo)) {
    zone.innerHTML = '<p class="verrou">🔒 Écris d\'abord ton algorithme en français (au moins 3 étapes) dans la case au-dessus. Les tests apparaîtront ensuite.</p>';
    compteur.textContent = "🔒";
    return 0;
  }
  const { resultats, message } = lancerTests(probleme);
  if (message) {
    zone.innerHTML = '<p class="message erreur"></p>';
    zone.firstChild.textContent = message;
    compteur.textContent = "0/" + probleme.tests.length;
    return 0;
  }
  const liste = document.createElement("ul");
  liste.className = "tests";
  for (const r of resultats) {
    const li = document.createElement("li");
    li.className = r.ok ? "test-ok" : "test-rate";
    const appel = document.createElement("code");
    appel.textContent = (r.ok ? "✅ " : "❌ ") + r.appel;
    const detail = document.createElement("span");
    detail.className = "petit";
    detail.textContent = r.detail;
    li.append(appel, detail);
    liste.appendChild(li);
  }
  zone.appendChild(liste);
  const reussis = resultats.filter((r) => r.ok).length;
  compteur.textContent = (reussis === resultats.length ? "🏆 " : "") + reussis + "/" + resultats.length;
  if (reussis === resultats.length) {
    const bravo = document.createElement("p");
    bravo.className = "message ok";
    bravo.textContent = "Tous les tests passent ! Montre ton algorithme et ton code à l'animateur.";
    zone.appendChild(bravo);
  }
  return reussis === resultats.length ? 1 : 0;
}

function creerCarte(probleme) {
  const carte = document.createElement("section");
  carte.className = "carte probleme";
  carte.dataset.jour = probleme.jour;
  carte.innerHTML = `
    <div class="entete">
      <span class="etiquette">Jour ${probleme.jour}</span>
      ${probleme.bonus ? '<span class="etiquette bonus">⭐ Bonus</span>' : ""}
      <span class="etiquette score compteur"></span>
    </div>
    <h2>${probleme.titre}</h2>
    <p>${probleme.histoire}</p>

    <h3><span class="numero">1</span> Comprendre : à la main d'abord, sans ordinateur</h3>
    <ul>${probleme.aLaMain.map((q) => "<li>" + q + "</li>").join("")}</ul>

    <h3><span class="numero">2</span> Ton algorithme, en français</h3>
    <p class="petit">Une étape par ligne. Utilise des mots comme « pour chaque », « si … alors », « sinon », « répéter tant que », « renvoyer ».</p>
    <textarea class="algo" rows="6" placeholder="1. ...&#10;2. ...&#10;3. ..."></textarea>

    <h3><span class="numero">3</span> Traduis-le en JavaScript</h3>
    <p class="petit">Ouvre <code>atelier.js</code> et cherche ${probleme.fonctions.map((f) => "<code>" + f + "</code>").join(" puis ")}. Enregistre (Ctrl+S) : la page se met à jour toute seule.</p>

    <h3><span class="numero">4</span> Les tests</h3>
    <div class="zone-tests"></div>

    <details class="pouces">
      <summary>💡 Coups de pouce (un à la fois !)</summary>
      <ol>${probleme.coupsDePouce.map((c) => "<li>" + c + "</li>").join("")}</ol>
    </details>
  `;
  const zone = carte.querySelector(".zone-tests");
  const compteur = carte.querySelector(".compteur");
  const algo = carte.querySelector(".algo");
  algo.value = lire("algo-" + probleme.id);
  algo.addEventListener("input", () => {
    ecrire("algo-" + probleme.id, algo.value);
    afficherTests(probleme, zone, compteur);
  });
  afficherTests(probleme, zone, compteur);
  return carte;
}

function choisirJour(jour) {
  ecrire("atelier-jour", String(jour));
  for (const bouton of document.querySelectorAll(".onglet")) {
    bouton.classList.toggle("actif", bouton.dataset.jour === String(jour));
  }
  for (const carte of document.querySelectorAll(".probleme")) {
    carte.hidden = carte.dataset.jour !== String(jour);
  }
}

window.addEventListener("load", () => {
  if (erreursDeChargement.length) {
    $("erreur-chargement").hidden = false;
    $("erreur-detail").textContent = erreursDeChargement.join("\n");
  }
  for (const probleme of PROBLEMES) $("problemes").appendChild(creerCarte(probleme));
  for (const bouton of document.querySelectorAll(".onglet")) {
    bouton.addEventListener("click", () => choisirJour(bouton.dataset.jour));
  }
  choisirJour(lire("atelier-jour") || 2);
});
