/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { apparition } from "../lib/apparition";

// Conteneur de largeur maîtrisée
export function Container({ className = "", children }) {
   return (
      <div className={`w-full max-w-7xl mx-auto px-5 sm:px-8 ${className}`}>
         {children}
      </div>
   );
}

// Eyebrow / label de section en pilule
export function Eyebrow({ children, className = "" }) {
   return <span className={`eyebrow ${className}`}>{children}</span>;
}

// Titre de section (Lilita One) + sous-titre optionnel
export function SectionHeading({
   eyebrow,
   title,
   subtitle,
   align = "center",
   className = "",
}) {
   const alignment =
      align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
   return (
      <motion.div className={`flex flex-col ${alignment} max-w-2xl gap-4 ${className}`} {...apparition("flou")}>
         {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
         <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight text-first">
            {title}
         </h2>
         {subtitle && (
            <p className="text-muted text-base sm:text-lg leading-relaxed">
               {subtitle}
            </p>
         )}
      </motion.div>
   );
}

// Bouton polymorphe : <a>, <Link> (via `to`) ou <button>
export function Button({
   children,
   to,
   href,
   variant = "primary",
   className = "",
   ...props
}) {
   const base =
      "inline-flex items-center cursor-pointer hover:scale-95 transition-all justify-center gap-2 rounded-full font-semibold text-sm px-6 py-3 transition-all duration-200 cursor-pointer";
   const variants = {
      primary:
         "bg-second text-white hover:bg-second-light shadow-lg shadow-second/25 hover:-translate-y-0.5",
      dark:
         "bg-first text-white hover:bg-first-light shadow-lg shadow-first/25 hover:-translate-y-0.5",
      outline:
         "border border-line bg-white text-first hover:border-first/40 hover:bg-surface",
      ghostLight:
         "border border-white/30 text-white hover:bg-white hover:text-first",
   };
   const cls = `${base} ${variants[variant]} ${className}`;

   if (to) {
      return (
         <Link to={to} className={cls} {...props}>
            {children}
         </Link>
      );
   }
   if (href) {
      return (
         <a href={href} className={cls} {...props}>
            {children}
         </a>
      );
   }
   return (
      <button className={cls} {...props}>
         {children}
      </button>
   );
}

// En-tête de page interne : image de fond + overlay bleu + motif + halo
export function PageHero({
   eyebrow,
   title,
   subtitle,
   image = "/back.webp",
   children,
}) {
   return (
      <section className="relative flex h-[360px] md:h-[420px] items-center justify-center overflow-hidden px-[5%] text-center">
         {/* Image de fond */}
         <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
         />
         {/* Overlay bleu DGC */}
         <div className="absolute inset-0 bg-first/85" />
         {/* Motif grille */}
         <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
               backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
               `,
               backgroundSize: "40px 40px",
            }}
         />

         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 mx-auto max-w-2xl"
         >
            {eyebrow && (
               <span className="text-sm font-semibold uppercase tracking-wider text-second">
                  {eyebrow}
               </span>
            )}
            <h1 className="mt-3 text-3xl md:text-5xl text-white leading-tight">
               {title}
            </h1>
            {subtitle && (
               <p className="mt-4 text-base leading-relaxed text-white/75">
                  {subtitle}
               </p>
            )}
            {children && <div className="mt-7">{children}</div>}
         </motion.div>
      </section>
   );
}

// Apparition au défilement, même rythme que les sites de l'ESIT et de l'ESGC.
// `i` décale l'entrée des éléments d'une liste ; `effet` : haut, gauche, droite, zoom, flou.
export function Reveal({ children, i = 0, effet = "haut", className = "" }) {
   return (
      <motion.div className={className} {...apparition(effet, i * 0.08)}>
         {children}
      </motion.div>
   );
}
