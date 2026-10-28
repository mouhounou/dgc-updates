// ─────────────────────────────────────────────────────────────
// Données centralisées du site Groupe DGC-Formation
// (contenu réel du site + valeurs ajustées pour crédibilité)
// ─────────────────────────────────────────────────────────────

import com from "../assets/image/FILIERES COMMERCE/IMG-20240619-WA0099.jpg";
import info from "../assets/image/FILIERES INFOS/IMG-20240726-WA0055.jpg";
import poly from "../assets/IMG_9674.webp";
import certif from "../assets/tec4.webp";

// ── Coordonnées / identité ────────────────────────────────────
export const contactInfo = {
   adresse:
      "Zone industrielle, 87 Rue Gamba, en face du Lycée Victor Augagneur — Pointe-Noire, République du Congo",
   secretariat: "+242 05 796 08 50",
   recrutement: "+242 05 092 74 23",
   // Numéro du bouton WhatsApp flottant (indicatif + numéro, sans espaces ni +)
   whatsapp: "242050927423",
   email: "contact@dgc-congo.org",
   horaires: [
      "Lundi – Vendredi : 8h00 – 17h00",
      "Samedi : 9h00 – 13h00",
   ],
};

export const socials = [
   { name: "Facebook", url: "https://www.facebook.com/DGCFormations" },
   { name: "LinkedIn", url: "https://www.linkedin.com/school/dgccongo/" },
   { name: "TikTok", url: "https://www.tiktok.com/@dgc.groupe" },
   { name: "Telegram", url: "https://t.me/+AO6Ui6q2VAE2NjM8" },
];

// ── Les 4 écoles du groupe ────────────────────────────────────
export const ecoles = [
   {
      sigle: "ESGC",
      nom: "École Supérieure de Gestion & Commerce",
      domaine: "Gestion, Commerce & Management",
      accent: "#e69112",
      image: com,
      url: "http://esgc.dgc-congo.org",
      description:
         "Le cycle Licence qui forme les futurs cadres du commerce, de la finance et de la gestion des entreprises.",
      filieres: [
         "Comptabilité & Gestion",
         "Gestion des Ressources Humaines",
         "Banque & Assurance",
         "Négociation & Digitalisation de la Relation Client",
         "Logistique, Transport & Commerce International",
      ],
   },
   {
      sigle: "ESIT",
      nom: "École Supérieure d'Informatique & Télécoms",
      domaine: "Informatique, Réseaux & Télécommunications",
      accent: "#e69112",
      image: info,
      url: "https://esit.dgc-congo.org",
      description:
         "La référence pour se former aux métiers du numérique : développement, réseaux, sécurité et télécommunications.",
      filieres: [
         "Génie Logiciel",
         "Informatique, Réseaux & Sécurité",
         "Télécommunications",
         "Infographie & Web Design",
         "Maintenance des Systèmes Informatiques",
         "Automatisme & Informatique Industrielle",
      ],
   },
   {
      sigle: "ESUP",
      nom: "École Supérieure Polytechnique",
      domaine: "Génie & Sciences de l'ingénieur",
      accent: "#e69112",
      image: poly,
      url: "http://esup.dgc-congo.org",
      description:
         "Former des ingénieurs et techniciens supérieurs pour l'industrie, le BTP, l'énergie et le secteur pétrolier.",
      filieres: [
         "Génie Industriel & Maintenance",
         "Génie Civil & Construction Durable",
         "Génie Thermique & Énergétique",
         "Qualité, Logistique Industrielle & Organisation",
         "Génie Pétrolier & Minier",
      ],
   },
   {
      sigle: "CCPM",
      nom: "Centre de Certifications & Professionnalisation aux Métiers",
      domaine: "Académie Cisco & certifications techniques",
      accent: "#e69112",
      image: certif,
      url: "https://ccpm.dgc-congo.org",
      description:
         "Des formations courtes et certifications professionnelles reconnues pour booster rapidement votre employabilité.",
      // Formations du CCPM, par catégorie (même catalogue que ccpm.dgc-congo.org)
      // type : « courte » (Académie Cisco) ou « technique » (certifications techniques)
      groupes: ccpmGroupes(),
      filieres: ccpmGroupes().flatMap((g) => g.formations.map((f) => f.titre)),
   },
];

function ccpmGroupes() {
   return [
      {
         id: "cisco",
         titre: "Académie Cisco · Informatique",
         info: "Cours du soir, du lundi au vendredi, de 17 h à 21 h",
         type: "courte",
         icone: "network",
         formations: [
            { titre: "Technicien Support IT & Réseaux", duree: "4 mois" },
            { titre: "Administrateur Réseaux & Systèmes", duree: "7 mois" },
            { titre: "Spécialiste Cybersécurité", duree: "7 mois" },
            { titre: "Administrateur Systèmes & Cloud", duree: "7 mois" },
            { titre: "Expert Réseaux & Sécurité", duree: "9 mois" },
         ],
      },
      {
         id: "genie-electrique",
         titre: "Génie Électrique & Automatisme",
         info: "Certification technique · 6 à 8 h par semaine",
         type: "technique",
         icone: "electrique",
         formations: [
            { titre: "Électronique grand public, industrielle & embarquée", duree: "6 mois" },
            { titre: "Froid & climatisation", duree: "6 mois" },
            { titre: "Électricité bâtiment & industrielle", duree: "6 mois" },
            { titre: "Automatisme, instrumentation & mesure", duree: "6 mois" },
         ],
      },
      {
         id: "genie-mecanique",
         titre: "Génie Mécanique & Maintenance",
         info: "Certification technique · 6 à 8 h par semaine",
         type: "technique",
         icone: "mecanique",
         formations: [
            { titre: "GMAO", duree: "3 mois" },
            { titre: "Contrôle des matériaux (CND)", duree: "6 mois" },
         ],
      },
      {
         id: "genie-civil",
         titre: "Génie Civil",
         info: "Certification technique · 6 à 8 h par semaine",
         type: "technique",
         icone: "civil",
         formations: [
            { titre: "Topographie", duree: "6 mois" },
            { titre: "DAO / CAO & structures", duree: "6 mois" },
         ],
      },
      {
         id: "gestion-projets",
         titre: "Gestion de Projets",
         info: "Certification technique · 6 à 8 h par semaine",
         type: "technique",
         icone: "projet",
         formations: [{ titre: "Microsoft Project", duree: "3 mois" }],
      },
   ];
}

// ── Chiffres clés (ajustés pour crédibilité — à valider) ──────
export const stats = [
   { value: 21, suffix: "ans", label: "d'expérience à Pointe-Noire" },
   { value: 5000, suffix: "+", label: "étudiants formés" },
   { value: 4, suffix: "", label: "écoles spécialisées" },
   { value: 90, suffix: "%", label: "d'insertion en stage" },
];

// ── Valeurs ───────────────────────────────────────────────────
export const valeurs = [
   {
      title: "Rigueur",
      desc: "Des méthodes strictes et méthodiques dans l'enseignement comme dans l'évaluation.",
   },
   {
      title: "Proximité",
      desc: "Un accompagnement personnalisé et un suivi individualisé de chaque étudiant.",
   },
   {
      title: "Solidarité",
      desc: "Un environnement d'entraide entre étudiants, enseignants et administration.",
   },
   {
      title: "Excellence",
      desc: "Des programmes exigeants alignés sur des standards internationaux.",
   },
];

// ── Infrastructures ───────────────────────────────────────────
export const infrastructures = [
   {
      title: "05 salles d'informatique",
      desc: "Équipées des derniers logiciels et matériels.",
   },
   {
      title: "07 laboratoires techniques",
      desc: "Mécanique, électrotechnique, électronique, etc.",
   },
   {
      title: "01 laboratoire d'anglais",
      desc: "Pour une maîtrise de la langue internationale.",
   },
];

// ── Équipe direction / orientation ────────────────────────────
export const equipe = [
   {
      name: "Mr Gama",
      role: "Service Orientation, Information & Recrutement",
      desc: "Expert en orientation professionnelle, il accompagne les futurs étudiants dans leur choix de parcours.",
   },
   {
      name: "Mr Japhet",
      role: "Service Orientation, Information & Recrutement",
      desc: "Spécialisé dans l'accompagnement des étudiants vers l'excellence académique et professionnelle.",
   },
];

// ── Témoignages ───────────────────────────────────────────────
export const temoignages = [
   {
      name: "Grace Loemba",
      role: "Diplômée ESGC — Banque & Assurance",
      quote:
         "La formation m'a ouvert les portes du secteur bancaire dès la fin de mon stage. Un encadrement de qualité et très humain.",
   },
   {
      name: "Merlin Bahouna",
      role: "Diplômé ESIT — Réseaux & Sécurité",
      quote:
         "Les labos et les certifications m'ont donné un vrai avantage. J'ai décroché un poste d'administrateur réseaux à Pointe-Noire.",
   },
   {
      name: "Sandra Makaya",
      role: "Étudiante ESUP — Génie Civil",
      quote:
         "Une pédagogie pratique et des enseignants disponibles. Je me sens réellement préparée au monde professionnel.",
   },
];

// ── Vidéos (galerie Cloudinary) ───────────────────────────────
export const videos = [
   {
      url: "https://res.cloudinary.com/dba4dlprz/video/upload/v1765187303/vid_yr5xsr.mp4",
      title: "Présentation de DGC Formation",
      description: "Découvrez notre établissement et nos programmes de formation.",
      duration: "3:25",
   },
   {
      url: "https://res.cloudinary.com/dba4dlprz/video/upload/v1765186989/vid3_p9cxc1.mp4",
      title: "Salle informatique | Ep. 1",
      description: "Les expériences de nos étudiants au sein de DGC Formation.",
      duration: "00:11",
   },
   {
      url: "https://res.cloudinary.com/dba4dlprz/video/upload/v1765187140/vid2_waiyda.mp4",
      title: "Salle informatique | Ep. 2",
      description: "Les expériences de nos étudiants au sein de DGC Formation.",
      duration: "00:49",
   },
   {
      url: "https://res.cloudinary.com/dba4dlprz/video/upload/v1765186759/WhatsApp_Vid%C3%A9o_2025-12-04_%C3%A0_14.33.42_1617e360_ryiwnp.mp4",
      title: "DGC Formation",
      description: "Les expériences de nos étudiants au sein de DGC Formation.",
      duration: "1:30",
   },
];

// Navigation principale (pages)
export const navLinks = [
   { label: "Accueil", to: "/" },
   { label: "À propos", to: "/a-propos" },
   { label: "Nos écoles", to: "/nos-ecoles" },
   { label: "Contact", to: "/contact" },
];
