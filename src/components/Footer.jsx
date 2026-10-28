/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { ArrowUp, BadgeCheck, ChartGantt, Clock, Cog, ExternalLink, HardHat, Mail, MapPin, Phone, Zap } from "lucide-react";
import { FaTiktok, FaTelegram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ecoles, contactInfo, socials, valeurs } from "../data/site";
import { apparition } from "../lib/apparition";

const socialIcons = {
   Facebook: FaFacebook,
   TikTok: FaTiktok,
   Telegram: FaTelegram,
   LinkedIn: FaLinkedin,
};

const navLinks = [
   { to: "/", label: "Accueil" },
   { to: "/a-propos", label: "À propos" },
   { to: "/preinscription", label: "Préinscription" },
   { to: "/contact", label: "Contact" },
];

// Bandeau défilant : certifications du CCPM, chacune ouvre sa pré-inscription sur ccpm.dgc-congo.org
const CCPM = "https://ccpm.dgc-congo.org/date?programme=";
const iconesDomaine = { electrique: Zap, mecanique: Cog, civil: HardHat, projet: ChartGantt };
const certifications = [
   { nom: "Cisco CCST IT Support", slug: "support-it" },
   { nom: "Cisco CCNA", slug: "admin-reseaux" },
   { nom: "Cisco Certified CyberOps Associate", slug: "cybersecurite" },
   { nom: "Cisco CCST Networking", slug: "cloud" },
   { nom: "Cisco CCNP Enterprise", slug: "expert-reseaux" },
   { nom: "Électronique grand public, industrielle & embarquée", slug: "electronique-embarquee", domaine: "electrique" },
   { nom: "Froid & climatisation", slug: "froid-climatisation", domaine: "electrique" },
   { nom: "Électricité bâtiment & industrielle", slug: "electricite-batiment-industrielle", domaine: "electrique" },
   { nom: "Automatisme, instrumentation & mesure", slug: "automatisme-instrumentation", domaine: "electrique" },
   { nom: "GMAO", slug: "gmao", domaine: "mecanique" },
   { nom: "Contrôle des matériaux (CND)", slug: "controle-materiaux-cnd", domaine: "mecanique" },
   { nom: "Topographie", slug: "topographie", domaine: "civil" },
   { nom: "DAO / CAO & structures", slug: "dao-cao-structures", domaine: "civil" },
   { nom: "Microsoft Project", slug: "microsoft-project", domaine: "projet" },
];

// Liste doublée pour une boucle continue ; la copie est masquée aux lecteurs d'écran
function ListeCertifications({ copie }) {
   return (
      <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={copie || undefined}>
         {certifications.map((c) => {
            const Icon = c.domaine ? iconesDomaine[c.domaine] : BadgeCheck;
            return (
               <li key={c.slug}>
                  <a
                     href={CCPM + c.slug}
                     target="_blank"
                     rel="noopener noreferrer"
                     tabIndex={copie ? -1 : undefined}
                     className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 transition-colors hover:bg-white/20 hover:text-white"
                  >
                     {c.domaine ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-second text-white">
                           <Icon className="h-3.5 w-3.5" />
                        </span>
                     ) : (
                        <Icon className="h-5 w-5 text-second" />
                     )}
                     {c.nom}
                  </a>
               </li>
            );
         })}
      </ul>
   );
}

// Colonnes : apparition au défilement, l'une après l'autre (même rythme que tout le site)
const colReveal = (i) => apparition("haut", i * 0.1);

function ColHeading({ children }) {
   return (
      <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/35">
         <span className="h-3 w-1 rounded-full bg-second" />
         {children}
      </p>
   );
}

function Footer() {
   return (
      <footer className="relative overflow-hidden bg-gradient-to-b from-first via-[#062a4d] to-[#04121f] text-white">
         {/* Motif grille */}
         <div className="pointer-events-none absolute inset-0 opacity-10">
            <div
               className="absolute inset-0"
               style={{
                  backgroundImage: `
                     linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
                  `,
                  backgroundSize: "48px 48px",
               }}
            />
         </div>

         {/* Certifications : défilement continu, pause au survol */}
         <div className="relative z-10 border-b border-white/10 bg-white/5 py-5">
            <p className="sr-only">Nos certifications</p>
            <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
               <div className="marquee-track flex w-max">
                  <ListeCertifications />
                  <ListeCertifications copie />
               </div>
            </div>
         </div>

         {/* Corps */}
         <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-16">
            <motion.div
               transition={{ duration: 0.6, staggerChildren: 0.1 }}
               className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
            >
               {/* Marque + contact */}
               <motion.div
                  {...colReveal(0)}
                  className="flex flex-col items-center text-center md:items-start md:text-left"
               >
                  <p className="text-sm leading-relaxed text-white/70 max-w-xs">
                     École d'enseignement supérieur à Pointe-Noire. Nous formons les
                     talents de demain depuis 21 ans.
                  </p>

                  <div className="mt-5 flex flex-col gap-2.5 text-sm text-white/60">
                     <a
                        href={`tel:${contactInfo.secretariat.replace(/\s/g, "")}`}
                        className="flex items-center gap-2 transition-colors hover:text-second"
                     >
                        <Phone className="h-3.5 w-3.5 text-second" />
                        {contactInfo.secretariat} (Secrétariat)
                     </a>
                     <a
                        href={`tel:${contactInfo.recrutement.replace(/\s/g, "")}`}
                        className="flex items-center gap-2 transition-colors hover:text-second"
                     >
                        <Phone className="h-3.5 w-3.5 text-second" />
                        {contactInfo.recrutement} (Recrutement)
                     </a>
                     <a
                        href={`mailto:${contactInfo.email}`}
                        className="flex items-center gap-2 transition-colors hover:text-second"
                     >
                        <Mail className="h-3.5 w-3.5 text-second" />
                        {contactInfo.email}
                     </a>
                     <span className="flex items-start gap-2">
                        <MapPin className="h-3.5 w-3.5 text-second mt-0.5 shrink-0" />
                        Pointe-Noire, République du Congo
                     </span>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                     {socials.map((s) => {
                        const Icon = socialIcons[s.name];
                        return (
                           <motion.a
                              key={s.name}
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.12, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              aria-label={s.name}
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-second hover:bg-second hover:text-white"
                           >
                              {Icon && <Icon className="h-4 w-4" />}
                           </motion.a>
                        );
                     })}
                  </div>
               </motion.div>

               {/* Nos écoles */}
               <motion.div
                  {...colReveal(1)}
                  className="sm:border-l sm:border-white/10 sm:pl-8 flex flex-col items-center text-center md:items-start md:text-left"
               >
                  <ColHeading>Nos écoles</ColHeading>
                  <ul className="space-y-3">
                     {ecoles.map((e) => (
                        <li key={e.sigle}>
                           <a
                              href={e.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block text-white/70 transition-all hover:translate-x-1 hover:text-white"
                           >
                              <span className="font-semibold">{e.sigle}</span>{" "}
                              <span className="text-white/45 text-sm">· {e.domaine}</span>
                           </a>
                        </li>
                     ))}
                  </ul>
               </motion.div>

               {/* Navigation */}
               <motion.div
                  {...colReveal(2)}
                  className="sm:border-l sm:border-white/10 sm:pl-8 flex flex-col items-center text-center md:items-start md:text-left"
               >
                  <ColHeading>Navigation</ColHeading>
                  <ul className="space-y-3">
                     {navLinks.map((l) => (
                        <li key={l.to}>
                           <Link
                              to={l.to}
                              className="inline-block text-white/70 transition-all hover:translate-x-1 hover:text-white"
                           >
                              {l.label}
                           </Link>
                        </li>
                     ))}
                     <li>
                        <a
                           href="https://examcademy.com/"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center gap-1.5 text-white/70 transition-all hover:translate-x-1 hover:text-white"
                        >
                           Examcademy <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                     </li>
                  </ul>
               </motion.div>

               {/* Valeurs + horaires */}
               <motion.div
                  {...colReveal(3)}
                  className="sm:border-l sm:border-white/10 sm:pl-8 flex flex-col items-center text-center md:items-start md:text-left"
               >
                  <ColHeading>Nos valeurs</ColHeading>
                  <ul className="space-y-3">
                     {valeurs.map((v) => (
                        <li
                           key={v.title}
                           className="text-white/70 flex items-center gap-2"
                        >
                           <span className="w-1.5 h-1.5 rounded-full bg-second" />
                           {v.title}
                        </li>
                     ))}
                  </ul>
                  <div className="mt-6 flex items-start gap-2 text-sm text-white/55">
                     <Clock className="h-4 w-4 text-second mt-0.5 shrink-0" />
                     <span>
                        {contactInfo.horaires.map((h) => (
                           <span key={h} className="block">
                              {h}
                           </span>
                        ))}
                     </span>
                  </div>
               </motion.div>
            </motion.div>
         </div>

         {/* Bas de page */}
         <div className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 max-w-7xl mx-auto px-5 sm:px-8 py-6 text-xs text-white/40 sm:flex-row">
            <p>
               © {new Date().getFullYear()} Groupe DGC-Formation — Tous droits réservés.
            </p>

            <div className="flex items-center gap-6">
               <a
                  href="https://informatiky.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-second"
               >
                  Développé par informatiky.com
               </a>

               <motion.button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Retour en haut"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-second hover:bg-second hover:text-white"
               >
                  <ArrowUp className="h-4 w-4" />
               </motion.button>
            </div>
         </div>
      </footer>
   );
}

export default Footer;
