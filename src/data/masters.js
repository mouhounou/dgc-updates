

import { stories } from "../assets";


const photo = (src) => ({ src });
const pack = (...srcs) => srcs.map(photo);

export const anneeRentree = "2027-2028";
export const agrement = "Établissement d'enseignement supérieur agréé sous le n°016/MES-CAB-DGESUP-DAAC";

// Options par défaut du formulaire (surchargeables par master via `formulaire`)
export const formulaireParDefaut = {
   profils: ["Professionnel en activité", "Jeune licencié(e)", "Étudiant(e) en cours de diplomation"],
   diplomes: ["Licence", "Autre"],
   rythmes: ["Temps plein", "Compatible avec un emploi", "Alternance"],
   financements: ["Personnel", "Parents ou tuteur", "Employeur", "Bourse", "Prêt bancaire"],
   domaineExperience: "le domaine du master",
};

// ─────────────────────────────────────────────────────────────
// Master CCA (référentiel académique, juin 2026)
// Un tronc commun en M1, puis 4 parcours de spécialisation en M2.
// Chaque parcours est présenté comme un master à part entière.
// ─────────────────────────────────────────────────────────────

const ccaCommun = {
   sigle: "CCA",
   mention: "Master Comptabilité, Contrôle de gestion et Audit",
   ecole: "École de Commerce",
   niveau: "Bac+5 · 120 crédits ECTS",
   duree: "2 ans",
   rentree: anneeRentree,
   moisRentree: "octobre",
   debut: "2027-10", // début des cours (données structurées)
   ects: 120,
   volumeHoraire: 1146,
   rythme: "Présentiel intensif ou alternance",
   lieu: "Zone industrielle, Pointe-Noire",
   effectif: "20 à 35 étudiants par promotion",
   chiffres: [
      { valeur: "Bac+5", label: "Diplôme de niveau Master (LMD)" },
      { valeur: "120", label: "crédits ECTS sur 4 semestres" },
      { valeur: "1 146 h", label: "d'enseignement encadré" },
      { valeur: "4–6 mois", label: "de stage de fin d'études" },
   ],
   objectifs: [
      "Produire, contrôler et analyser l'information comptable et financière (SYSCOHADA révisé, IFRS)",
      "Concevoir et piloter des systèmes de contrôle de gestion adaptés aux enjeux de l'organisation",
      "Conduire des missions d'audit interne et externe et évaluer le contrôle interne et les risques",
      "Appliquer l'environnement juridique, fiscal et de gouvernance OHADA / CEMAC",
      "Maîtriser les ERP, les logiciels comptables et les outils de data analysis",
      "Développer une posture professionnelle, éthique et managériale",
   ],
   competences: [
      "Produire et fiabiliser l'information comptable et financière",
      "Concevoir et piloter le contrôle de gestion et la performance",
      "Conduire une mission d'audit et de contrôle interne",
      "Maîtriser l'environnement juridique, fiscal et la gouvernance des affaires",
      "Mobiliser les outils numériques et les systèmes d'information de gestion",
      "Manager, communiquer et conduire des projets en contexte interculturel",
   ],
   stages: [
      { titre: "Stage découverte", quand: "Master 1 · 4 semaines", desc: "Une première immersion en entreprise, conclue par un rapport d'étonnement." },
      { titre: "Stage de fin d'études", quand: "Master 2 · 4 à 6 mois", desc: "En entreprise ou en institution, encadré par un tuteur entreprise et un tuteur académique." },
      { titre: "Mémoire professionnel", quand: "Master 2 · soutenance en septembre", desc: "Sur une problématique réelle observée en stage, soutenu devant un jury mixte." },
   ],
   secteurs: ["Banque et microfinance", "Pétrole, gaz et parapétrolier", "Télécoms et numérique", "Logistique et activités portuaires", "Cabinets d'audit et d'expertise comptable", "Secteur public et parapublic", "ONG et organismes internationaux", "Distribution, agro-industrie et services"],
   admission: [
      "Licence (Bac+3, 180 ECTS) en sciences de gestion, comptabilité, finance, audit, économie, administration des entreprises ou commerce, ou diplôme jugé équivalent",
      "Étude du dossier par la commission pédagogique",
      "Test écrit : comptabilité générale, mathématiques financières et culture économique",
      "Entretien de motivation devant un jury d'enseignants et de professionnels",
   ],
   admissionM2: [
      "Avoir validé un Master 1 CCA ou un Bac+4 compatible (au moins 60 ECTS), avec entretien de positionnement",
      "Professionnels en activité : validation des acquis de l'expérience (VAE) à partir de 3 ans d'expérience pertinente",
      "Test de positionnement si nécessaire (comptabilité, contrôle de gestion, anglais des affaires)",
   ],
   dossier: ["Formulaire de candidature", "CV à jour", "Lettre de motivation", "Copies certifiées des diplômes et relevés de notes", "Pièce d'identité ou passeport", "Deux photos d'identité", "Attestations de stage ou d'expérience, le cas échéant"],
   partenaires: ["UNICONGO et la Plateforme des Femmes Entrepreneures", "Direction nationale de la BEAC", "Cabinets d'audit et d'expertise comptable", "Entreprises du pétrole, des télécoms et de la logistique"],
   formulaire: {
      diplomes: ["Licence", "DCG", "Autre"],
      domaineExperience: "comptabilité / finance / audit",
   },
};

// Programme commun ; les UE de spécialisation (S3, S4) reçoivent les matières du parcours
const programmeCCA = (spe) => [
   {
      semestre: "Semestre 1",
      annee: "Master 1",
      ues: [
         { nom: "Fondements de la comptabilité et de la normalisation", ects: 8, matieres: ["Comptabilité générale approfondie (SYSCOHADA révisé)", "Normes IFRS : introduction et convergence"] },
         { nom: "Contrôle de gestion fondamental", ects: 7, matieres: ["Comptabilité analytique et calcul des coûts", "Contrôle budgétaire et gestion prévisionnelle"] },
         { nom: "Environnement juridique et fiscal des affaires", ects: 6, matieres: ["Droit des sociétés et droit des affaires OHADA", "Fiscalité des entreprises en zone CEMAC"] },
         { nom: "Outils quantitatifs et numériques", ects: 5, matieres: ["Mathématiques financières et statistiques de gestion", "Excel avancé et analyse de données"] },
         { nom: "Compétences transversales", ects: 4, matieres: ["Anglais des affaires I", "Communication professionnelle et développement personnel"] },
      ],
   },
   {
      semestre: "Semestre 2",
      annee: "Master 1",
      ues: [
         { nom: "Audit et contrôle interne : fondements", ects: 8, matieres: ["Théorie et démarche générale de l'audit", "Contrôle interne et cartographie des risques (COSO)"] },
         { nom: "Finance d'entreprise", ects: 7, matieres: ["Analyse financière et diagnostic d'entreprise", "Gestion de trésorerie et relations bancaires"] },
         { nom: "Comptabilité des groupes et normes internationales", ects: 6, matieres: ["Comptabilité des sociétés et restructurations", "Consolidation des comptes et IFRS approfondies"] },
         { nom: "Systèmes d'information de gestion", ects: 5, matieres: ["ERP et logiciels comptables", "Bases de données, requêtes et reporting"] },
         { nom: "Projet professionnel et stage découverte", ects: 4, matieres: ["Étude de cas transversale et business game", "Stage découverte de 4 semaines et rapport d'étonnement"] },
      ],
   },
   {
      semestre: "Semestre 3",
      annee: "Master 2",
      ues: [
         { nom: "Audit approfondi et normes internationales", ects: 7, matieres: ["Normes ISA et démarche d'audit légal", "Audit des systèmes d'information"] },
         { nom: "Pilotage stratégique de la performance", ects: 7, matieres: ["Tableaux de bord, Balanced Scorecard et reporting", "Contrôle de gestion sectoriel (banque, pétrole-gaz, logistique, télécoms)"] },
         { nom: "Gouvernance, éthique et droit des affaires", ects: 6, matieres: ["Gouvernance d'entreprise, éthique et déontologie", "Droit fiscal approfondi et contentieux fiscal"] },
         { nom: "Spécialisation (bloc 1)", ects: 6, matieres: spe.s3, specialite: true },
         { nom: "Méthodologie de la recherche et langues", ects: 4, matieres: ["Méthodologie et cadrage du mémoire", "Anglais des affaires II et préparation à la certification"] },
      ],
   },
   {
      semestre: "Semestre 4",
      annee: "Master 2",
      ues: [
         { nom: "Spécialisation (bloc 2)", ects: 10, matieres: spe.s4, specialite: true },
         { nom: "Séminaires professionnels", ects: 4, matieres: ["Cycle de conférences (experts-comptables, auditeurs, DAF)", "Atelier d'insertion professionnelle"] },
         { nom: "Stage de fin d'études", ects: 10, matieres: ["4 à 6 mois en entreprise ou institution"] },
         { nom: "Mémoire professionnel", ects: 6, matieres: ["Soutenance devant un jury mixte (académique et professionnel)"] },
      ],
   },
];

const masterCCA = ({ specialite, ...m }) => ({
   ...ccaCommun,
   ...m,
   specialite,
   programme: programmeCCA(specialite),
});

export const masters = [
   masterCCA({
      slug: "audit-controle-interne",
      badge: "Audit",
      images: pack("/m2.jpeg", stories[5].src, stories[7].src, "/back.webp"),
      titre: "Audit et Contrôle interne",
      accroche: "Sécurisez les comptes et les processus : devenez l'auditeur dont les organisations ont besoin.",
      presentation:
         "Ce master forme des spécialistes de l'audit interne, de l'audit externe et de la maîtrise des risques, capables de conduire des missions complètes et de structurer des dispositifs de contrôle interne robustes, dans l'environnement SYSCOHADA révisé, OHADA et CEMAC.",
      specialite: {
         s3: ["Audit interne et gestion des risques d'entreprise (ERM)", "Audit des PME et des grandes entreprises : cas sectoriels"],
         s4: ["Préparation à la certification Certified Internal Auditor (CIA)", "Audit légal et commissariat aux comptes", "Atelier de simulation de mission d'audit"],
         profil: "Rigueur méthodologique, esprit critique et goût des missions de terrain.",
      },
      debouches: ["Auditeur interne / externe", "Responsable de l'audit interne", "Risk manager", "Responsable contrôle interne", "Consultant en gestion des risques", "Collaborateur de cabinet d'audit"],
      certifications: ["Certified Internal Auditor (CIA)", "Diplôme d'expertise comptable CEMAC / OHADA", "ACCA", "Mastères spécialisés en audit et gouvernance"],
   }),

   masterCCA({
      slug: "controle-de-gestion",
      badge: "Contrôle de gestion",
      images: pack(stories[9].src, "/m2.jpeg", stories[5].src, "/back.webp"),
      titre: "Contrôle de gestion et Pilotage de la performance",
      accroche: "Transformez les chiffres en décisions et pilotez la performance de l'entreprise.",
      presentation:
         "Ce master forme des spécialistes du pilotage de la performance, capables de concevoir des systèmes de gestion adaptés aux enjeux stratégiques des organisations, y compris dans une logique de performance durable (RSE / ESG).",
      specialite: {
         s3: ["Contrôle de gestion sectoriel approfondi (banque, industrie, pétrole-gaz, logistique)", "Business Intelligence et reporting de gestion avancé"],
         s4: ["Pilotage de la performance et responsabilité sociétale (RSE / ESG)", "Systèmes de rémunération et pilotage par objectifs", "Atelier de simulation de gestion budgétaire"],
         profil: "Goût de l'analyse quantitative, de la stratégie et du dialogue avec les directions opérationnelles.",
      },
      debouches: ["Contrôleur de gestion", "Responsable planification et contrôle de gestion", "Analyste de performance", "Consultant en pilotage de la performance", "Directeur administratif et financier (à terme)"],
      certifications: ["Certified Management Accountant (CMA)", "ACCA", "Mastères spécialisés en contrôle de gestion"],
   }),

   masterCCA({
      slug: "comptabilite-fiscalite",
      badge: "Comptabilité & Fiscalité",
      images: pack(stories[6].src, stories[7].src, "/m2.jpeg", "/back.webp"),
      titre: "Comptabilité, Fiscalité et Normes internationales",
      accroche: "Maîtrisez la technique comptable et fiscale de haut niveau, jusqu'à l'expertise comptable.",
      presentation:
         "Ce master forme des spécialistes de la technique comptable et fiscale de haut niveau, en préparation aux métiers de l'expertise comptable et aux fonctions de direction comptable et financière, dans le cadre SYSCOHADA révisé et IFRS.",
      specialite: {
         s3: ["Approfondissement de l'expertise comptable et préparation DSCG / DEC", "Fiscalité internationale et prix de transfert"],
         s4: ["Normes IFRS avancées et opérations complexes", "Ingénierie comptable et fiscale des restructurations", "Atelier de préparation à la certification d'expertise comptable"],
         profil: "Vous visez l'expertise comptable, la direction comptable ou la fiscalité d'entreprise.",
      },
      debouches: ["Chef comptable / Responsable comptable groupe", "Responsable consolidation et reporting", "Fiscaliste d'entreprise", "Consultant en normes comptables internationales", "Expert-comptable (après la filière d'expertise)"],
      certifications: ["Diplôme d'expertise comptable CEMAC / OHADA", "DSCG / DEC", "ACCA ou CPA"],
   }),

   masterCCA({
      slug: "finance-tresorerie",
      badge: "Finance",
      images: pack(stories[8].src, stories[5].src, "/m2.jpeg", "/back.webp"),
      titre: "Finance d'entreprise et Trésorerie",
      accroche: "Accompagnez les décisions financières stratégiques et sécurisez la liquidité de l'entreprise.",
      presentation:
         "Ce master forme des spécialistes de la finance d'entreprise, capables d'accompagner les décisions financières stratégiques et la gestion de la liquidité dans des environnements à forte intensité capitalistique (pétrole, télécoms, logistique, banque).",
      specialite: {
         s3: ["Ingénierie financière et évaluation d'entreprise", "Gestion avancée de la trésorerie et relations bancaires"],
         s4: ["Financement de projets et structuration bancaire", "Gestion des risques financiers (taux, change, liquidité)", "Atelier de modélisation financière"],
         profil: "Goût de la modélisation, des marchés et des relations avec les institutions financières.",
      },
      debouches: ["Responsable trésorerie", "Analyste financier", "Chargé d'affaires financement d'entreprise", "Consultant en évaluation et ingénierie financière", "Chargé de mission en institution régionale (BEAC, CEMAC)"],
      certifications: ["ACCA", "CPA", "Mastères spécialisés et doctorat en finance"],
   }),

   // ── EXEMPLE (à remplacer) ──────────────────────────────────
   // {
   //    slug: "reseaux-cybersecurite",
   //    images: pack(stories[7].src, stories[0].src, stories[5].src, "/back.webp"),
   //    sigle: "RSC",
   //    titre: "Réseaux, Systèmes et Cybersécurité",
   //    accroche: "Protégez les systèmes d'information des organisations.",
   //    ecole: "École d'Informatique",
   //    duree: "2 ans",
   //    rentree: anneeRentree,
   //    rythme: "Temps plein ou compatible avec un emploi",
   //    lieu: "Zone industrielle, Pointe-Noire",
   //    presentation: "Texte de présentation à compléter par l'école.",
   //    objectifs: ["Objectif 1 à compléter", "Objectif 2 à compléter", "Objectif 3 à compléter"],
   //    parcours: [{ nom: "Parcours à définir", desc: "Description à compléter.", modules: ["Module 1", "Module 2", "Module 3"] }],
   //    debouches: ["Administrateur systèmes et réseaux", "Analyste cybersécurité", "Consultant IT"],
   //    admission: ["Licence en informatique ou équivalent", "Étude du profil par l'école"],
   //    formulaire: { parcours: ["À déterminer avec vous"], diplomes: ["Licence", "Autre"], domaineExperience: "informatique" },
   // },

   // ── EXEMPLE (à remplacer) ──────────────────────────────────
   // {
   //    slug: "management-projets",
   //    images: pack(stories[5].src, stories[7].src, stories[0].src, "/back.webp"),
   //    sigle: "MGP",
   //    titre: "Management de projets",
   //    accroche: "Pilotez des projets complexes de la conception à la livraison.",
   //    ecole: "École Polytechnique",
   //    duree: "2 ans",
   //    rentree: anneeRentree,
   //    rythme: "Temps plein ou compatible avec un emploi",
   //    lieu: "Zone industrielle, Pointe-Noire",
   //    presentation: "Texte de présentation à compléter par l'école.",
   //    objectifs: ["Objectif 1 à compléter", "Objectif 2 à compléter", "Objectif 3 à compléter"],
   //    parcours: [{ nom: "Parcours à définir", desc: "Description à compléter.", modules: ["Module 1", "Module 2", "Module 3"] }],
   //    debouches: ["Chef de projet", "Responsable PMO", "Consultant en organisation"],
   //    admission: ["Licence ou équivalent", "Étude du profil par l'école"],
   //    formulaire: { parcours: ["À déterminer avec vous"], diplomes: ["Licence", "Autre"], domaineExperience: "gestion de projets" },
   // },
];

// Anciennes adresses : /masters/cca renvoie vers la liste des masters
export const getMaster = (slug) => masters.find((m) => m.slug === slug);
