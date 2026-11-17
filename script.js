// =========================================================
// 🎯 À TOI : LES ÉPREUVES DE TA MISSION
//
// Chaque épreuve est un objet { ... } avec :
//   titre       : le nom de l'épreuve
//   categorie   : Web, Crypto, Réseau, Phishing…
//   enonce      : ce que le joueur doit faire
//   donnee      : (facultatif) un message codé, affiché dans un cadre
//   type        : "texte" (on écrit la réponse) ou "choix" (QCM)
//   choix       : (seulement pour "choix") la liste des propositions
//   reponse     : la bonne réponse, écrite en clair
//                 (ou une liste ["…", "…"] si plusieurs réponses sont acceptées)
//   empreinte   : OU BIEN l'empreinte SHA-256 de la réponse (niveau 3)
//   indice      : un coup de pouce (coûte des points)
//   explication : ce qu'on a appris, affiché après la réussite
//   points      : combien rapporte l'épreuve
//
// Options avancées :
//   messageConsole : un message répété dans la console (F12) pendant l'épreuve
//   preparer(zone) : une fonction lancée quand l'épreuve s'affiche ; "zone" est
//                    un cadre vide sous l'énoncé. Elle peut renvoyer une fonction
//                    de "rangement", lancée quand on quitte l'épreuve.
//
// Majuscules, accents et espaces ne comptent pas.
// =========================================================
const epreuves = [
  // ---------- NIVEAU 1 : les bases ----------
  {
    titre: "Regarde sous le capot",
    categorie: "🌐 Web",
    enonce: "La réponse est cachée dans cette page. Pas dans ce que tu vois… dans ce que le navigateur reçoit.",
    type: "texte",
    reponse: "sous-le-capot",
    indice: "Fais un clic droit sur la page → « Afficher le code source » (ou Ctrl+U).",
    explication: "Tout ce qu'un site envoie au navigateur est visible par tout le monde. Un développeur ne doit JAMAIS cacher un secret dans le HTML.",
    points: 100
  },
  {
    titre: "Le code de Jules",
    categorie: "🔐 Crypto",
    enonce: "Jules César envoyait ses messages en décalant chaque lettre dans l'alphabet. Décode ce mot :",
    donnee: "FKDWHDX",
    type: "texte",
    reponse: "chateau",
    indice: "Pour décoder, recule chaque lettre de 3 vers la gauche (D → A). Dans l'outil « Code César », mets le décalage sur −3.",
    explication: "Le chiffre de César n'a que 25 clés possibles : un ordinateur les teste toutes en une milliseconde. C'est ce qu'on appelle une attaque par force brute.",
    points: 100
  },
  {
    titre: "Pas si secret",
    categorie: "🔐 Crypto",
    enonce: "Ce message a l'air chiffré. Mais est-ce vraiment le cas ?",
    donnee: "cGFyZWZldQ==",
    type: "texte",
    reponse: "parefeu",
    indice: "Les deux « == » à la fin sont typiques de la Base64. Va dans la boîte à outils.",
    explication: "La Base64 est un ENCODAGE, pas un chiffrement : il n'y a aucune clé, n'importe qui peut le décoder. Et un pare-feu (firewall), c'est le filtre qui bloque les connexions non autorisées.",
    points: 100
  },
  {
    titre: "Que des 0 et des 1",
    categorie: "💻 Machine",
    enonce: "Les ordinateurs ne parlent qu'en binaire. Chaque groupe de 8 chiffres est une lettre. Traduis :",
    donnee: "01010111 01001001 01000110 01001001",
    type: "texte",
    reponse: "wifi",
    indice: "Utilise le traducteur binaire de la boîte à outils. 01010111 = 87 = la lettre W.",
    explication: "Chaque caractère est stocké sous forme de nombre (code ASCII), lui-même écrit en binaire. Tout ce qui circule sur un réseau, ce sont des 0 et des 1.",
    points: 100
  },
  {
    titre: "Colis en attente",
    categorie: "🎣 Phishing",
    enonce: "Tu reçois un SMS : « Votre colis est bloqué, réglez 1.99 CHF de frais ». Le vrai transporteur s'appelle ColisExpress. Quel lien est le VRAI site ?",
    type: "choix",
    choix: [
      "https://colisexpress.ch.suivi-paiement.com",
      "http://colis-express-securite.net/payer",
      "https://www.colisexpress.ch/suivi",
      "https://www.colisexpres.ch/suivi"
    ],
    reponse: "https://www.colisexpress.ch/suivi",
    indice: "Le vrai nom du site, c'est ce qui se trouve juste avant le premier « / ». Lis-le de droite à gauche.",
    explication: "Les pirates utilisent des noms qui RESSEMBLENT au vrai (une lettre en moins, un mot en plus). Dans le doute : ne clique pas, va sur le site toi-même.",
    points: 100
  },
  {
    titre: "Le coffre-fort",
    categorie: "🔑 Mots de passe",
    enonce: "Quel mot de passe est le plus difficile à casser ?",
    type: "choix",
    choix: ["P@ssw0rd!", "Kevin2012", "azertyuiop", "girafe-tonnerre-violet-42"],
    reponse: "girafe-tonnerre-violet-42",
    indice: "Teste-les dans l'outil « Force d'un mot de passe ». La longueur compte plus que tout.",
    explication: "Une phrase de passe (plusieurs mots au hasard) est longue, donc très dure à casser, et facile à retenir. « P@ssw0rd! » est dans toutes les listes de pirates.",
    points: 100
  },
  {
    titre: "L'annuaire d'Internet",
    categorie: "📡 Réseau",
    enonce: "Les ordinateurs se trouvent grâce à des adresses IP (ex : 142.250.75.227), pas grâce à des noms. Quel service traduit « google.fr » en adresse IP ? (3 lettres)",
    type: "texte",
    reponse: "dns",
    indice: "Domain Name System.",
    explication: "Le DNS est l'annuaire d'Internet. Si un pirate le trafique, il peut t'envoyer sur un faux site même si tu tapes la bonne adresse.",
    points: 100
  },
  {
    titre: "La console secrète",
    categorie: "🌐 Web",
    enonce: "Ce site parle tout seul en coulisses. Écoute-le.",
    type: "texte",
    reponse: "console-ninja",
    messageConsole: "Réponse de l'épreuve « La console secrète » : console-ninja",
    indice: "Appuie sur F12, puis va dans l'onglet « Console ».",
    explication: "La console des outils développeur montre les messages et les erreurs du JavaScript. C'est l'outil n°1 des développeurs… et des testeurs de sécurité.",
    points: 100
  },

  // ---------- NIVEAU 2 : l'agent de terrain ----------
  {
    titre: "César sans la clé",
    categorie: "🔐 Crypto",
    enonce: "Cette fois, personne ne t'a donné le décalage. Un vrai cryptanalyste ne se laisse pas arrêter pour si peu…",
    donnee: "LZWPVU",
    type: "texte",
    reponse: "espion",
    indice: "Colle le message dans l'outil « Code César » et clique sur « Force brute ». Une seule ligne veut dire quelque chose.",
    explication: "Quand il y a peu de clés possibles, on les essaie toutes : c'est la force brute. Les vrais chiffrements modernes ont plus de clés qu'il n'y a d'atomes dans l'univers.",
    points: 120
  },
  {
    titre: "Le cadenas",
    categorie: "🌐 Web",
    enonce: "Un site affiche un cadenas 🔒 à côté de son adresse (https://). Qu'est-ce que ça garantit ?",
    type: "choix",
    choix: [
      "Le site est forcément honnête",
      "La connexion entre toi et le site est chiffrée",
      "Le site a été vérifié par la police",
      "Le site ne peut pas contenir de virus"
    ],
    reponse: "La connexion entre toi et le site est chiffrée",
    indice: "Le « s » de https veut dire « secure » : il protège le TRAJET des données, pas le contenu du site.",
    explication: "Le cadenas empêche qu'on espionne ce que tu envoies. Mais n'importe qui, même un pirate, peut obtenir un cadenas pour son faux site en 2 minutes. Cadenas ≠ confiance.",
    points: 120
  },
  {
    titre: "Compter comme un ordinateur",
    categorie: "💻 Machine",
    enonce: "Combien vaut ce nombre binaire en écriture normale (décimale) ?",
    donnee: "101010",
    type: "texte",
    reponse: "42",
    indice: "De droite à gauche, chaque position vaut 1, 2, 4, 8, 16, 32. Additionne les valeurs là où il y a un 1.",
    explication: "32 + 8 + 2 = 42. En binaire, chaque position vaut le double de la précédente. Avec 8 positions (1 octet), on peut écrire les nombres de 0 à 255.",
    points: 120
  },
  {
    titre: "Le faux support",
    categorie: "🎭 Ingénierie sociale",
    enonce: "Ton téléphone sonne : « Bonjour, ici le support de ton jeu préféré. Ton compte va être supprimé ! Pour le sauver, donne-moi le code à 6 chiffres que tu viens de recevoir par SMS. » Que fais-tu ?",
    type: "choix",
    choix: [
      "Je donne le code, c'est le support officiel",
      "Je demande son nom, puis je donne le code",
      "Je donne seulement la moitié du code",
      "Je raccroche : on ne donne JAMAIS ce code"
    ],
    reponse: "Je raccroche : on ne donne JAMAIS ce code",
    indice: "À quoi sert ce code SMS, à ton avis ? Et pourquoi quelqu'un d'autre en aurait-il besoin ?",
    explication: "C'est de l'ingénierie sociale : on pirate l'humain plutôt que l'ordinateur, en jouant sur la peur et l'urgence. Aucun vrai service ne te demandera jamais un code reçu par SMS.",
    points: 100
  },
  {
    titre: "Tout en haut",
    categorie: "🌐 Web",
    enonce: "Le secret ne se trouve pas dans la page… mais il n'est pas loin. Lève les yeux.",
    type: "texte",
    reponse: "onglet-espion",
    preparer: () => {
      const ancienTitre = document.title;
      document.title = "🔑 Code : onglet-espion";
      return () => { document.title = ancienTitre; };
    },
    indice: "Regarde le nom écrit sur l'onglet de ton navigateur.",
    explication: "Le titre de l'onglet est choisi par le site. Une fausse page peut donc afficher « Ma Banque » ou « Connexion Google » en haut : ça ne prouve rien. Seule l'adresse compte.",
    points: 100
  },
  {
    titre: "Deux couches",
    categorie: "🔐 Crypto",
    enonce: "Un petit malin a encodé son mot de passe en Base64… puis a recommencé une deuxième fois, « pour être sûr ».",
    donnee: "Y0dseVlYUmw=",
    type: "texte",
    reponse: "pirate",
    indice: "Décode-le dans l'outil Base64, puis recopie le résultat et décode-le encore une fois.",
    explication: "Encoder deux fois ne rend pas plus sûr : sans clé secrète, n'importe qui peut défaire toutes les couches. Un encodage n'est PAS une protection.",
    points: 120
  },
  {
    titre: "Il n'y a rien de tel que chez soi",
    categorie: "📡 Réseau",
    enonce: "Que désigne l'adresse IP 127.0.0.1 ?",
    type: "choix",
    choix: [
      "Le serveur principal de Google",
      "Ta propre machine",
      "La box Internet de ton voisin",
      "Un pirate célèbre"
    ],
    reponse: "Ta propre machine",
    indice: "Son petit nom, c'est « localhost » : l'hôte… local.",
    explication: "127.0.0.1 (localhost) désigne toujours l'ordinateur sur lequel tu es. C'est l'adresse qu'utilisent les développeurs pour tester leurs sites, comme Live Server.",
    points: 100
  },
  {
    titre: "Combien de codes ?",
    categorie: "🔑 Mots de passe",
    enonce: "Un code PIN a 4 chiffres, de 0000 à 9999. Combien de codes différents existe-t-il ?",
    type: "texte",
    reponse: "10000",
    indice: "Chaque chiffre a 10 possibilités. 10 × 10 × 10 × 10 = ?",
    explication: "10 000 combinaisons, c'est très peu pour un ordinateur. C'est pour ça que ton téléphone se bloque après quelques erreurs : il empêche la force brute.",
    points: 120
  },
  {
    titre: "Le décalage magique",
    categorie: "🔐 Crypto",
    enonce: "Ce message utilise le ROT13 : un code César avec un décalage de 13. Décode-le. (Petit défi bonus : pourquoi appliquer ROT13 deux fois redonne le message de départ ?)",
    donnee: "UNZRPBAANTR",
    type: "texte",
    reponse: "hameconnage",
    indice: "Dans le Code César, mets le décalage sur 13 (ou −13 : ça donne la même chose !).",
    explication: "13 + 13 = 26 : on fait le tour complet de l'alphabet. Et l'hameçonnage, c'est le mot français pour « phishing » : un faux message qui veut te faire « mordre à l'hameçon ».",
    points: 120
  },
  {
    titre: "Le lien piégé",
    categorie: "🎣 Phishing",
    enonce: "Ta banque s'appelle BanqueAlpine, son site est banquealpine.ch. Un e-mail te propose 4 liens. Lequel est le seul vrai ?",
    type: "choix",
    choix: [
      "https://banquealpine.ch@connexion-client.com/login",
      "https://www.banque-alpine.ch.secure-login.net",
      "https://www.banquealpine.ch/connexion",
      "https://banquealpine-ch.com/connexion"
    ],
    reponse: "https://www.banquealpine.ch/connexion",
    indice: "Attention au piège du « @ » : dans une adresse, tout ce qui est AVANT le @ est ignoré par le navigateur !",
    explication: "Le lien avec @ t'envoie en réalité sur connexion-client.com. Les pirates adorent ce genre d'astuce. Pour ta banque : tape toujours l'adresse toi-même ou utilise l'appli officielle.",
    points: 150
  },
  {
    titre: "Le tiroir du navigateur",
    categorie: "🌐 Web",
    enonce: "Les sites peuvent ranger des informations directement DANS ton navigateur. Ce site vient d'y glisser un secret. Va fouiller le tiroir.",
    type: "texte",
    reponse: "tiroir-a-secrets",
    preparer: () => {
      try { localStorage.setItem("secret-agent", "tiroir-a-secrets"); } catch {}
      return () => { try { localStorage.removeItem("secret-agent"); } catch {} };
    },
    indice: "F12 → onglet « Application » (Chrome, Edge) ou « Stockage » (Firefox) → « Stockage local » (Local Storage) → clique sur l'adresse du site.",
    explication: "Le « stockage local » garde des données dans ton navigateur. Tout script de la page peut le lire : un site ne doit jamais y ranger un mot de passe.",
    points: 150
  },
  {
    titre: "Ti-ti-ti, ta-ta-ta",
    categorie: "📻 Transmission",
    enonce: "Un message en morse a été intercepté. Chaque groupe de points et de traits est une lettre.",
    donnee: "...- .. .-. ..- ...",
    type: "texte",
    reponse: "virus",
    indice: "Petit alphabet : E = .   T = −   I = ..   A = .−   N = −.   S = ...   U = ..−   R = .−.   V = ...−",
    explication: "Le morse, c'est un ENCODAGE (comme le binaire ou la Base64) : tout le monde peut le lire avec le tableau. Et un virus, c'est un programme qui se copie tout seul pour infecter d'autres fichiers.",
    points: 120
  },
  {
    titre: "Double verrou",
    categorie: "🔑 Mots de passe",
    enonce: "Oh non : ton mot de passe a fuité sur Internet ! Qu'est-ce qui peut ENCORE empêcher un pirate d'entrer sur ton compte ?",
    type: "choix",
    choix: [
      "Une jolie photo de profil",
      "La double authentification (un code sur ton téléphone)",
      "Un pseudo très original",
      "Rien, c'est fichu"
    ],
    reponse: "La double authentification (un code sur ton téléphone)",
    indice: "Le pirate connaît ce que tu SAIS (le mot de passe). Mais il n'a pas ce que tu POSSÈDES…",
    explication: "La double authentification (2FA / A2F) demande une deuxième preuve, souvent ton téléphone. Active-la partout où c'est possible : jeux, réseaux sociaux, e-mail.",
    points: 100
  },
  {
    titre: "L'effet avalanche",
    categorie: "🧨 Hachage",
    enonce: "Voici une empreinte SHA-256. Lequel de ces 4 mots l'a produite ?",
    donnee: "e3c260f121aa83828564f6074b253af81f6ff044cc612edfa765b55077c04fba",
    type: "choix",
    choix: ["chat", "chats", "chat!", "chat1"],
    reponse: "chats",
    indice: "Tape chaque mot dans l'outil « Empreinte SHA-256 » et compare le début de l'empreinte.",
    explication: "Une seule lettre de différence, et l'empreinte change COMPLÈTEMENT : c'est l'effet avalanche. Impossible de deviner le mot en regardant l'empreinte.",
    points: 120
  },
  {
    titre: "Wi-Fi gratuit",
    categorie: "📡 Réseau",
    enonce: "À la gare, ton téléphone trouve le réseau « WiFi_Gratuit_Gare », sans mot de passe. Quelle est la meilleure attitude ?",
    type: "choix",
    choix: [
      "Je m'y connecte pour consulter mon compte bancaire",
      "Si une page me demande mon mot de passe Google, je le donne",
      "J'utilise mes données mobiles (4G/5G) pour les choses importantes",
      "Je coupe mon antivirus pour que ça aille plus vite"
    ],
    reponse: "J'utilise mes données mobiles (4G/5G) pour les choses importantes",
    indice: "N'importe qui peut créer un réseau Wi-Fi et l'appeler comme il veut…",
    explication: "Un pirate peut créer un faux Wi-Fi « gratuit » et observer ce qui passe, ou afficher une fausse page de connexion. Sur un réseau public : rien de sensible.",
    points: 100
  },
  {
    titre: "Le port sécurisé",
    categorie: "📡 Réseau",
    enonce: "Sur un ordinateur, chaque service écoute à une « porte » numérotée : un port. Les sites en http:// utilisent le port 80. Et ceux en https:// ?",
    type: "choix",
    choix: ["21", "80", "443", "8080"],
    reponse: "443",
    indice: "C'est un nombre entre 400 et 450.",
    explication: "Le port 443 est celui du web chiffré (HTTPS). Les testeurs de sécurité « scannent » les ports ouverts d'un serveur… mais seulement avec une autorisation écrite !",
    points: 100
  },

  // ---------- NIVEAU 3 : l'expert ----------
  {
    titre: "Pas dans le code source",
    categorie: "🌐 Web",
    enonce: "Cette fois, Ctrl+U ne t'aidera pas : le secret a été ajouté à la page par JavaScript, APRÈS son chargement. Il est quelque part sous cette question… mais invisible.",
    type: "texte",
    reponse: "inspecteur-gadget",
    preparer: (zone) => {
      const secret = document.createElement("span");
      secret.hidden = true;
      secret.textContent = "Mot secret : inspecteur-gadget";
      zone.appendChild(secret);
    },
    indice: "Clic droit sur la question → « Inspecter ». Juste en dessous, cherche un élément marqué « hidden » et déplie-le.",
    explication: "L'Inspecteur montre la page TELLE QU'ELLE EST maintenant, avec tout ce que JavaScript a ajouté. Ce qui est « caché » à l'écran n'est jamais vraiment secret.",
    points: 150
  },
  {
    titre: "L'hexadécimal",
    categorie: "💻 Machine",
    enonce: "Les informaticiens écrivent souvent les nombres en base 16 (hexadécimal) : 0 à 9, puis a, b, c, d, e, f. Chaque paire est une lettre. Astuce : 61 = a, 62 = b, 63 = c, et ainsi de suite.",
    donnee: "63 6f 6f 6b 69 65",
    type: "texte",
    reponse: "cookie",
    indice: "Dans la console (F12), tape : String.fromCharCode(0x63, 0x6f, 0x6f, 0x6b, 0x69, 0x65)",
    explication: "Un cookie est un petit fichier qu'un site range dans ton navigateur pour se souvenir de toi. Si un pirate vole ton cookie de connexion, il peut se connecter à ta place, sans mot de passe !",
    points: 150
  },
  {
    titre: "La photo bavarde",
    categorie: "🕵️ Vie privée",
    enonce: "Tu publies une photo de ton chat prise dans ta chambre. On ne voit rien de spécial dessus. Qu'est-ce que le FICHIER peut quand même révéler ?",
    type: "choix",
    choix: [
      "Rien du tout, c'est juste une image",
      "Ton mot de passe",
      "La position GPS exacte où elle a été prise",
      "Ton numéro de carte bancaire"
    ],
    reponse: "La position GPS exacte où elle a été prise",
    indice: "Les fichiers photo contiennent des informations cachées : les « métadonnées » (date, modèle du téléphone…).",
    explication: "Les métadonnées (EXIF) peuvent contenir la position GPS : donc ton adresse ! Désactive la localisation de l'appareil photo, et méfie-toi de ce que tu publies.",
    points: 120
  },
  {
    titre: "La lettre truquée",
    categorie: "🎣 Phishing",
    enonce: "Le vrai site de paiement s'appelle payfacile.com. Dans l'adresse de l'expéditeur, le pirate a remplacé le « l » par une lettre qui lui ressemble. Laquelle ?",
    donnee: "De : Service PayFacile <alerte@payfaciIe.com>\nObjet : URGENT !!! Ton compte sera bloqué dans 24h\n\nClique vite ici pour confirmer ton mot de passe.",
    type: "texte",
    reponse: "i",
    indice: "Compare lettre par lettre « payfacile » et « payfaciIe ». Une majuscule peut se faire passer pour une minuscule…",
    explication: "Un « I » majuscule et un « l » minuscule se ressemblent énormément dans beaucoup de polices. Ajoute à ça l'urgence (« 24h », « !!! ») : deux signes classiques d'arnaque.",
    points: 150
  },
  {
    titre: "Force brute au cadenas",
    categorie: "🔑 Mots de passe",
    enonce: "Un pirate essaie 10 codes par seconde. Combien de SECONDES lui faut-il, au maximum, pour tester tous les codes PIN à 6 chiffres ?",
    type: "texte",
    reponse: "100000",
    indice: "Il y a 10 × 10 × 10 × 10 × 10 × 10 = 1 000 000 codes. À 10 par seconde…",
    explication: "1 000 000 ÷ 10 = 100 000 secondes, environ 28 heures. Avec 2 chiffres de plus, c'est 100 fois plus long. Chaque caractère ajouté multiplie le travail du pirate !",
    points: 150
  },
  {
    titre: "Le rançongiciel",
    categorie: "🦠 Malware",
    enonce: "Un logiciel malveillant chiffre tous tes fichiers (photos, devoirs…) et réclame de l'argent pour te les rendre. Comment s'appelle ce type de logiciel ? (en français ou en anglais)",
    type: "texte",
    reponse: ["rançongiciel", "ransomware", "rançon-logiciel"],
    indice: "En anglais : ransom (rançon) + software (logiciel). En français : rançon + logiciel.",
    explication: "Les rançongiciels attaquent des hôpitaux, des écoles, des communes… Et payer ne garantit rien. La meilleure défense ? L'épreuve suivante va te la donner.",
    points: 120
  },
  {
    titre: "Le poème",
    categorie: "🖼️ Stéganographie",
    enonce: "Ce petit poème a l'air innocent… mais un mot anglais s'y cache. C'est justement la meilleure arme contre les rançongiciels.",
    donnee: "Bien au chaud dans ton ordinateur,\nAttendent tes photos et tes devoirs.\nCopie-les ailleurs, souvent :\nKidnappés par un virus, ils seraient perdus.\nUn disque, une clé USB, le cloud…\nPrends-en soin, agent.",
    type: "texte",
    reponse: ["backup", "sauvegarde"],
    indice: "Lis seulement la première lettre de chaque ligne, de haut en bas.",
    explication: "Cacher un message dans un autre, c'est la stéganographie. Et le backup (sauvegarde) est LA protection contre les rançongiciels : si tes fichiers sont copiés ailleurs, la rançon ne sert à rien.",
    points: 150
  },
  {
    titre: "Le dictionnaire du pirate",
    categorie: "🧨 Hachage",
    enonce: "Un pirate a volé l'empreinte du mot de passe d'un joueur. Retrouve le mot de passe.",
    donnee: "9970626666560a32465d4ce10d28f3233365af833e15eed59884d9477862c379",
    type: "texte",
    reponse: "minecraft",
    indice: "Copie l'empreinte dans l'outil « Attaque par dictionnaire ».",
    explication: "Le nom de ton jeu préféré, de ton équipe ou de ton animal : c'est ce que les pirates essaient en premier. Leurs dictionnaires contiennent des milliards de mots.",
    points: 150
  },
  {
    titre: "Mises à jour",
    categorie: "🦠 Malware",
    enonce: "Ton téléphone propose une « mise à jour de sécurité ». Pourquoi faut-il l'installer rapidement ?",
    type: "choix",
    choix: [
      "Pour avoir de nouveaux emojis",
      "Elle corrige des failles que les pirates connaissent déjà",
      "Ça ne sert à rien, c'est juste pour vendre",
      "Pour que la batterie se vide plus vite"
    ],
    reponse: "Elle corrige des failles que les pirates connaissent déjà",
    indice: "Quand une faille est corrigée, la correction est publique… donc les pirates savent exactement où attaquer les appareils pas à jour.",
    explication: "Dès qu'une mise à jour de sécurité sort, c'est la course : les pirates attaquent les appareils qui ne l'ont pas encore installée. Active les mises à jour automatiques !",
    points: 100
  },
  {
    titre: "La porte dérobée",
    categorie: "🌐 Web",
    enonce: "Le développeur a oublié une fonction dans le code de cette page : ouvrirLaPorte(). Elle n'est reliée à aucun bouton… Appelle-la toi-même.",
    type: "texte",
    reponse: "porte-derobee",
    preparer: () => {
      window.ouvrirLaPorte = () => {
        const message = "🚪 Porte ouverte ! Mot de passe : porte-derobee";
        console.log(message);
        return message;
      };
      return () => { delete window.ouvrirLaPorte; };
    },
    indice: "F12 → onglet « Console ». Tape ouvrirLaPorte() puis appuie sur Entrée.",
    explication: "Tout le JavaScript d'une page tourne sur TON ordinateur : n'importe qui peut lire ses fonctions et les lancer depuis la console. Une « porte dérobée » oubliée dans un code, c'est une faille.",
    points: 150
  },
  {
    titre: "Le QR code du parking",
    categorie: "🎣 Phishing",
    enonce: "Sur un parcmètre, un autocollant « Payez ici 📱 » avec un QR code est collé PAR-DESSUS l'étiquette d'origine. Que fais-tu ?",
    type: "choix",
    choix: [
      "Je scanne et je paie, c'est plus rapide",
      "Je scanne et je donne juste mon numéro de carte",
      "Je ne scanne pas : je paie avec l'appli ou le site officiel",
      "Je scanne deux fois pour être sûr"
    ],
    reponse: "Je ne scanne pas : je paie avec l'appli ou le site officiel",
    indice: "Un QR code, c'est juste un lien… et on ne voit pas où il mène avant de l'ouvrir.",
    explication: "C'est le « quishing » (phishing par QR code). Un autocollant collé par-dessus est un signal d'alarme. Un QR code n'est qu'un lien caché : même prudence qu'avec un lien dans un SMS.",
    points: 100
  },
  {
    titre: "Le meilleur réflexe",
    categorie: "🔑 Mots de passe",
    enonce: "Tu as 25 comptes (jeux, école, réseaux sociaux…). Quelle est la meilleure méthode ?",
    type: "choix",
    choix: [
      "Le même mot de passe partout, mais très long",
      "Mon prénom + ma date de naissance, facile à retenir",
      "Un mot de passe différent pour chaque compte, rangé dans un gestionnaire de mots de passe",
      "Les écrire sur un post-it collé sous le clavier"
    ],
    reponse: "Un mot de passe différent pour chaque compte, rangé dans un gestionnaire de mots de passe",
    indice: "Si UN site se fait pirater et que tu utilises le même mot de passe partout… que se passe-t-il pour les 24 autres ?",
    explication: "Les pirates testent les mots de passe volés sur TOUS les autres sites. Un gestionnaire de mots de passe retient tout pour toi : tu n'as plus qu'un seul mot de passe maître (long !) à connaître.",
    points: 100
  },
  {
    titre: "Poupées russes",
    categorie: "🔐 Crypto",
    enonce: "Ce message a été protégé deux fois : d'abord avec un code César, PUIS encodé en Base64. Défais les couches dans l'ordre inverse.",
    donnee: "eGpzeW5zanFxag==",
    type: "texte",
    reponse: "sentinelle",
    indice: "1) Décode la Base64. 2) Mets le résultat dans le Code César et lance la force brute.",
    explication: "Empiler deux protections faibles ne fait pas une protection forte. Les vrais systèmes utilisent des algorithmes solides (comme AES) avec une clé longue et secrète.",
    points: 200
  },
  {
    titre: "Réservé aux admins",
    categorie: "🌐 Web",
    enonce: "Ce bouton est grisé : seuls les administrateurs ont le droit de cliquer. Vraiment ?",
    type: "texte",
    reponse: "verification-serveur",
    preparer: (zone) => {
      const bouton = document.createElement("button");
      bouton.className = "bouton";
      bouton.disabled = true;
      bouton.textContent = "🔒 Révéler le code (admins seulement)";
      const sortie = document.createElement("pre");
      sortie.className = "donnee";
      sortie.hidden = true;
      bouton.addEventListener("click", () => {
        sortie.textContent = "Code secret : verification-serveur";
        sortie.hidden = false;
      });
      zone.append(bouton, sortie);
    },
    indice: "Clic droit sur le bouton → « Inspecter ». Dans le code, repère le mot disabled : fais un clic droit dessus → « Supprimer l'attribut » (ou double-clique et efface-le).",
    explication: "Tout ce qui est dans ton navigateur, TU peux le modifier. Un vrai site doit toujours vérifier les droits côté serveur, jamais seulement en grisant un bouton.",
    points: 200
  },
  {
    titre: "La loi, c'est la loi",
    categorie: "⚖️ Éthique",
    enonce: "Tu as appris plein de techniques. Tu remarques que le site de ton école semble mal protégé. Que fais-tu ?",
    type: "choix",
    choix: [
      "Je teste un peu : si je ne casse rien, c'est permis",
      "Je montre la faille à mes potes",
      "Je préviens un adulte ou le responsable, sans rien tester",
      "J'en profite pour changer ma note"
    ],
    reponse: "Je préviens un adulte ou le responsable, sans rien tester",
    indice: "Un hacker éthique ne touche JAMAIS à un système sans autorisation écrite.",
    explication: "Sans autorisation écrite, entrer dans un système est interdit par le Code pénal suisse (art. 143bis), même sans rien casser. Signaler une faille de façon responsable, c'est ça le vrai hacking éthique.",
    points: 150
  },

  // ---------- LE BOSS ----------
  {
    titre: "Le boss final",
    categorie: "🧨 Hachage",
    enonce: "Le mot de passe du boss n'est écrit nulle part : le site garde seulement son empreinte SHA-256. Mais le boss a choisi un des mots de passe les plus utilisés au monde…",
    donnee: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    type: "texte",
    empreinte: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    indice: "Copie l'empreinte dans l'outil « Attaque par dictionnaire ».",
    explication: "Une empreinte ne se « décode » pas. Mais si le mot de passe est courant, il suffit de calculer l'empreinte de milliers de mots de passe connus et de comparer. Moralité : un mot de passe unique et long !",
    points: 200
  }
];

// 🎯 À TOI : combien de points perd-on en demandant un indice ?
const COUT_INDICE = 40;


// =========================================================
// ⚙️ LA MÉCANIQUE DU JEU
// Pas besoin de toucher en dessous pour commencer.
// =========================================================

// Les messages secrets (visibles dans la console, F12).
// Ils sont répétés toutes les 5 secondes tant que l'épreuve est affichée,
// pour que le joueur les voie même s'il ouvre la console après coup.
let minuterieConsole = null;
function parlerDansLaConsole(message) {
  clearInterval(minuterieConsole);
  minuterieConsole = null;
  if (!message) return;
  const parler = () => {
    console.log("%c🕵️ Psst, agent…", "font-size:20px;font-weight:bold;color:#3DFFA2");
    console.log("%c" + message, "font-size:14px;color:#3DFFA2");
  };
  parler();
  minuterieConsole = setInterval(parler, 5000);
}

const $ = (id) => document.getElementById(id);

let numero = 0;          // épreuve en cours (on compte à partir de 0)
let score = 0;
let indiceUtilise = false;
let reussie = false;
let ranger = null;       // fonction de "rangement" de l'épreuve en cours

// ---------- Sauvegarde de la progression ----------
// La mission est longue : si la page est rechargée, on reprend où on en était.
const CLE_SAUVEGARDE = "mission-cyber-progression";

function sauvegarder() {
  try { localStorage.setItem(CLE_SAUVEGARDE, JSON.stringify({ numero, score })); } catch {}
}
function lireSauvegarde() {
  try {
    const s = JSON.parse(localStorage.getItem(CLE_SAUVEGARDE));
    if (s && s.numero > 0 && s.numero < epreuves.length) return s;
  } catch {}
  return null;
}
function effacerSauvegarde() {
  try { localStorage.removeItem(CLE_SAUVEGARDE); } catch {}
}

function afficherEcran(ecran) {
  for (const id of ["ecran-accueil", "ecran-epreuve", "ecran-victoire"]) {
    $(id).hidden = true;
  }
  $(ecran).hidden = false;
}

function commencer(depuisLeDebut) {
  const sauvegarde = depuisLeDebut ? null : lireSauvegarde();
  numero = sauvegarde ? sauvegarde.numero : 0;
  score = sauvegarde ? sauvegarde.score : 0;
  afficherEcran("ecran-epreuve");
  afficherEpreuve();
}

function quitterEpreuve() {
  parlerDansLaConsole(null);
  if (ranger) ranger();
  ranger = null;
  $("zone-speciale").innerHTML = "";
}

function afficherEpreuve() {
  const e = epreuves[numero];
  indiceUtilise = false;
  reussie = false;
  sauvegarder();

  quitterEpreuve();
  parlerDansLaConsole(e.messageConsole);
  if (e.preparer) ranger = e.preparer($("zone-speciale")) || null;

  $("compteur").textContent = "Épreuve " + (numero + 1) + "/" + epreuves.length;
  $("categorie").textContent = e.categorie;
  $("score").textContent = score + " pts";
  $("barre").style.width = (numero / epreuves.length) * 100 + "%";
  $("titre-epreuve").textContent = e.titre;
  $("enonce").textContent = e.enonce;

  $("donnee").hidden = !e.donnee;
  $("donnee").textContent = e.donnee || "";

  $("message").textContent = "";
  $("message").className = "message";
  $("indice").hidden = true;
  $("indice").textContent = e.indice;
  $("bouton-indice").hidden = false;
  $("bouton-indice").textContent = "💡 Indice (−" + COUT_INDICE + " pts)";
  $("bilan").hidden = true;

  if (e.type === "choix") {
    $("formulaire").hidden = true;
    $("choix").hidden = false;
    $("choix").innerHTML = "";
    for (const proposition of e.choix) {
      const bouton = document.createElement("button");
      bouton.className = "bouton reponse";
      bouton.textContent = proposition;
      bouton.addEventListener("click", () => verifier(proposition, bouton));
      $("choix").appendChild(bouton);
    }
  } else {
    $("choix").hidden = true;
    $("formulaire").hidden = false;
    $("champ").value = "";
    $("champ").disabled = false;
    $("champ").focus();
  }
}

// Met une réponse "au propre" : minuscules, sans accents, sans espaces
// (« 10 000 », « 10'000 » et « 10000 » sont donc la même réponse)
function nettoyer(texte) {
  return texte.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[\s'’]/g, "");
}

// Calcule l'empreinte SHA-256 d'un texte (même calcul que dans la boîte à outils)
async function sha256(texte) {
  const octets = new TextEncoder().encode(texte);
  const resultat = await crypto.subtle.digest("SHA-256", octets);
  return [...new Uint8Array(resultat)].map((o) => o.toString(16).padStart(2, "0")).join("");
}

async function verifier(proposition, boutonChoisi) {
  if (reussie) return;
  const e = epreuves[numero];
  const essai = nettoyer(proposition);
  if (essai === "") return;

  let correct;
  if (e.empreinte) {
    correct = (await sha256(essai)) === e.empreinte.toLowerCase();
  } else {
    const bonnesReponses = Array.isArray(e.reponse) ? e.reponse : [e.reponse];
    correct = bonnesReponses.some((r) => essai === nettoyer(r));
  }

  if (correct) {
    reussie = true;
    const gain = indiceUtilise ? Math.max(e.points - COUT_INDICE, 10) : e.points;
    score += gain;
    $("score").textContent = score + " pts";
    $("message").textContent = "Accès autorisé. +" + gain + " pts";
    $("message").className = "message ok";
    $("champ").disabled = true;
    $("bouton-indice").hidden = true;
    $("explication").textContent = e.explication;
    $("bilan").hidden = false;
    if (boutonChoisi) boutonChoisi.classList.add("bon");
    $("bouton-suivant").focus();
  } else {
    $("message").textContent = "Accès refusé. Réessaie !";
    $("message").className = "message erreur";
    if (boutonChoisi) boutonChoisi.classList.add("mauvais");
  }
}

function montrerIndice() {
  indiceUtilise = true;
  $("indice").hidden = false;
  $("bouton-indice").hidden = true;
}

function suivante() {
  numero++;
  if (numero < epreuves.length) {
    afficherEpreuve();
  } else {
    afficherVictoire();
  }
}

function afficherVictoire() {
  quitterEpreuve();
  effacerSauvegarde();
  const max = epreuves.reduce((total, e) => total + e.points, 0);
  const pourcentage = score / max;
  $("score-final").textContent = score + " / " + max;

  // 🎯 À TOI : change les grades
  let grade = "🐣 Recrue : bon début, rejoue sans indice !";
  if (pourcentage >= 0.5) grade = "🛡️ Agent de terrain";
  if (pourcentage >= 0.8) grade = "🥷 Hacker éthique confirmé";
  if (pourcentage === 1) grade = "👑 Légende : zéro indice !";
  $("grade").textContent = grade;
  afficherEcran("ecran-victoire");
}

function partager() {
  const message = "J'ai fait " + $("score-final").textContent + " à " + document.title + ". Tu fais mieux ?";
  if (navigator.share) {
    navigator.share({ title: document.title, text: message, url: location.href });
  } else {
    navigator.clipboard.writeText(message + " " + location.href);
    alert("Lien copié ! Colle-le où tu veux.");
  }
}

// Sur l'accueil : proposer de reprendre une mission en cours
const sauvegardeAuDemarrage = lireSauvegarde();
if (sauvegardeAuDemarrage) {
  $("bouton-commencer").textContent = "Reprendre la mission (épreuve " + (sauvegardeAuDemarrage.numero + 1) + "/" + epreuves.length + ")";
  $("bouton-recommencer").hidden = false;
}

$("bouton-commencer").addEventListener("click", () => commencer(false));
$("bouton-recommencer").addEventListener("click", () => commencer(true));
$("bouton-rejouer").addEventListener("click", () => commencer(true));
$("bouton-partager").addEventListener("click", partager);
$("bouton-indice").addEventListener("click", montrerIndice);
$("bouton-suivant").addEventListener("click", suivante);
$("formulaire").addEventListener("submit", (evenement) => {
  evenement.preventDefault();   // empêche la page de se recharger
  verifier($("champ").value, null);
});
