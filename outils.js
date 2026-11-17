// =========================================================
// 🧰 LA BOÎTE À OUTILS
// Chaque outil est une petite fonction. Lis-les : c'est le
// meilleur moyen de comprendre comment marche la crypto !
// =========================================================

const $ = (id) => document.getElementById(id);

// ---------- 1. CODE CÉSAR ----------
function cesar(texte, decalage) {
  let resultat = "";
  for (const lettre of texte) {
    const code = lettre.charCodeAt(0);
    if (code >= 65 && code <= 90) {          // A à Z
      resultat += String.fromCharCode(((code - 65 + decalage + 26) % 26) + 65);
    } else if (code >= 97 && code <= 122) {  // a à z
      resultat += String.fromCharCode(((code - 97 + decalage + 26) % 26) + 97);
    } else {
      resultat += lettre;                    // espaces, chiffres… on ne touche pas
    }
  }
  return resultat;
}

function majCesar() {
  const decalage = Number($("cesar-decalage").value);
  $("cesar-valeur").textContent = decalage;
  $("cesar-sortie").textContent = cesar($("cesar-texte").value, decalage);
}
$("cesar-texte").addEventListener("input", majCesar);
$("cesar-decalage").addEventListener("input", majCesar);

$("cesar-force").addEventListener("click", () => {
  const texte = $("cesar-texte").value;
  let lignes = [];
  for (let d = 1; d <= 25; d++) {
    lignes.push("-" + String(d).padStart(2, " ") + " : " + cesar(texte, -d));
  }
  $("cesar-liste").textContent = lignes.join("\n");
  $("cesar-liste").hidden = false;
});

// ---------- 2. BASE64 ----------
// (TextEncoder permet de gérer les accents correctement)
$("b64-encoder").addEventListener("click", () => {
  const octets = new TextEncoder().encode($("b64-texte").value);
  $("b64-sortie").textContent = btoa(String.fromCharCode(...octets));
});
$("b64-decoder").addEventListener("click", () => {
  try {
    const brut = atob($("b64-texte").value.trim());
    const octets = Uint8Array.from(brut, (c) => c.charCodeAt(0));
    $("b64-sortie").textContent = new TextDecoder().decode(octets);
  } catch {
    $("b64-sortie").textContent = "⚠️ Ce n'est pas de la Base64 valide.";
  }
});

// ---------- 3. BINAIRE ----------
$("bin-vers").addEventListener("click", () => {
  const texte = $("bin-texte").value;
  $("bin-sortie").textContent = [...texte]
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
});
$("bin-depuis").addEventListener("click", () => {
  const groupes = $("bin-texte").value.trim().split(/\s+/);
  $("bin-sortie").textContent = groupes
    .map((g) => String.fromCharCode(parseInt(g, 2)))
    .join("");
});

// ---------- 4. FORCE D'UN MOT DE PASSE ----------
const MOTS_INTERDITS = ["password", "motdepasse", "azerty", "qwerty", "123456", "admin", "soleil", "doudou", "loulou", "chouchou"];

function analyserMotDePasse(mdp) {
  // Combien de symboles différents le pirate doit-il essayer pour chaque caractère ?
  let alphabet = 0;
  if (/[a-z]/.test(mdp)) alphabet += 26;
  if (/[A-Z]/.test(mdp)) alphabet += 26;
  if (/[0-9]/.test(mdp)) alphabet += 10;
  if (/[^a-zA-Z0-9]/.test(mdp)) alphabet += 33;

  // Nombre de combinaisons = alphabet ^ longueur
  // Un ordinateur de pirate teste environ 10 milliards de mots de passe par seconde.
  const combinaisons = Math.pow(alphabet, mdp.length);
  let secondes = combinaisons / 1e10 / 2;

  const conseils = [];
  const simplifie = mdp.toLowerCase().replace(/[@4]/g, "a").replace(/0/g, "o").replace(/[3]/g, "e").replace(/[1!]/g, "i").replace(/\$/g, "s");
  if (MOTS_INTERDITS.some((mot) => simplifie.includes(mot))) {
    secondes = 0.001;
    conseils.push("Contient un mot de passe connu : il est dans toutes les listes de pirates.");
  }
  if (mdp.length < 12) conseils.push("Moins de 12 caractères : trop court.");
  if (/(19|20)\d\d/.test(mdp)) conseils.push("Une année (date de naissance ?) se devine facilement.");
  if (alphabet <= 36) conseils.push("Mélange majuscules, chiffres et symboles… ou fais plus long.");
  return { secondes, conseils };
}

function dureeLisible(s) {
  if (s < 1) return "instantané";
  const unites = [["an", 31536000], ["jour", 86400], ["heure", 3600], ["minute", 60], ["seconde", 1]];
  if (s > 31536000 * 1e6) return "plus d'un million d'années";
  for (const [nom, duree] of unites) {
    if (s >= duree) {
      const n = Math.floor(s / duree);
      return n + " " + nom + (n > 1 ? "s" : "");
    }
  }
}

$("mdp").addEventListener("input", () => {
  const mdp = $("mdp").value;
  if (mdp === "") {
    $("mdp-verdict").textContent = "";
    $("mdp-conseils").innerHTML = "";
    $("mdp-barre").style.width = "0";
    return;
  }
  const { secondes, conseils } = analyserMotDePasse(mdp);
  // Barre : 0 % = instantané, 100 % = plus de 100 ans
  const niveau = Math.min(Math.max(Math.log10(secondes + 1) / Math.log10(31536000 * 100), 0), 1);
  $("mdp-barre").style.width = niveau * 100 + "%";
  $("mdp-verdict").textContent = "Temps pour le casser : " + dureeLisible(secondes);
  $("mdp-verdict").className = "message " + (niveau > 0.7 ? "ok" : "erreur");
  $("mdp-conseils").innerHTML = "";
  for (const c of conseils) {
    const li = document.createElement("li");
    li.textContent = c;
    $("mdp-conseils").appendChild(li);
  }
});

// ---------- 5. EMPREINTE SHA-256 ----------
function nettoyer(texte) {
  return texte.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

async function sha256(texte) {
  const octets = new TextEncoder().encode(texte);
  const resultat = await crypto.subtle.digest("SHA-256", octets);
  return [...new Uint8Array(resultat)].map((o) => o.toString(16).padStart(2, "0")).join("");
}

$("hash-texte").addEventListener("input", async () => {
  const texte = nettoyer($("hash-texte").value);
  $("hash-sortie").textContent = texte ? await sha256(texte) : "";
});

// ---------- 6. ATTAQUE PAR DICTIONNAIRE ----------
// Une (toute petite) liste des mots de passe les plus utilisés.
// Les vrais pirates en ont plusieurs MILLIARDS.
const DICTIONNAIRE = [
  "123456", "123456789", "azerty", "password", "12345678", "qwerty", "123123",
  "000000", "1234567", "111111", "motdepasse", "soleil", "doudou", "loulou",
  "chouchou", "marseille", "football", "iloveyou", "admin", "abc123",
  "nicolas", "camille", "princesse", "chocolat", "pokemon", "minecraft",
  "superman", "dragon", "naruto", "fortnite", "bonjour", "coucou", "jetaime",
  "psg", "om", "maman", "papa", "chat", "chien", "azertyuiop", "1234", "0000"
];

$("dico-lancer").addEventListener("click", async () => {
  const cible = $("dico-empreinte").value.trim().toLowerCase();
  if (!cible) return;
  const sortie = $("dico-sortie");
  sortie.textContent = "";
  for (const mot of DICTIONNAIRE) {
    const empreinte = await sha256(mot);
    sortie.textContent += "Essai : " + mot.padEnd(12, " ") + empreinte.slice(0, 16) + "…\n";
    if (empreinte === cible) {
      sortie.textContent += "\n🎯 TROUVÉ ! Le mot de passe est : " + mot;
      return;
    }
  }
  sortie.textContent += "\n❌ Pas dans le dictionnaire. Ce mot de passe résiste !";
});
