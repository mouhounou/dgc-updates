import { BadgeCheck } from "lucide-react";

// Bandeau défilant : certifications préparées au CCPM, chacune ouvre la pré-inscription
// du programme correspondant sur ccpm.dgc-congo.org
const CCPM = "https://ccpm.dgc-congo.org/date?programme=";
const certifications = [
   { nom: "Cisco CCST IT Support", slug: "support-it" },
   { nom: "Cisco CCST Networking", slug: "cloud" },
   { nom: "Cisco CCNA", slug: "admin-reseaux" },
   { nom: "Cisco CyberOps Associate", slug: "cybersecurite" },
   { nom: "Cisco CCNP Enterprise", slug: "expert-reseaux" },
   { nom: "CompTIA A+", slug: "support-it" },
   { nom: "CompTIA Network+", slug: "expert-reseaux" },
   { nom: "CompTIA Security+", slug: "cybersecurite" },
   { nom: "AWS Cloud Practitioner", slug: "cloud" },
   { nom: "Microsoft Azure Fundamentals", slug: "cloud" },
];

// Chaque moitié de la piste répète la liste deux fois : elle reste plus large que
// l'écran, même très large, et la boucle ne laisse jamais de vide.
// La seconde moitié est masquée aux lecteurs d'écran.
function ListeCertifications({ copie }) {
   return (
      <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={copie || undefined}>
         {[...certifications, ...certifications].map((c, i) => (
            <li key={i} aria-hidden={(!copie && i >= certifications.length) || undefined}>
               <a
                  href={CCPM + c.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={copie || i >= certifications.length ? -1 : undefined}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 transition-colors hover:bg-white/20 hover:text-white"
               >
                  <BadgeCheck className="h-5 w-5 text-second" />
                  {c.nom}
               </a>
            </li>
         ))}
      </ul>
   );
}

// Bandeau des certifications qui défile en boucle (footer et hero de l'accueil)
export default function CertificationsDefilantes() {
   return (
      <>
         <p className="sr-only">Nos certifications</p>
         <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
            <div className="marquee-track flex w-max">
               <ListeCertifications />
               <ListeCertifications copie />
            </div>
         </div>
      </>
   );
}
