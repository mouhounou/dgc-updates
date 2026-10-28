/* eslint-disable no-unused-vars */
import {
   Heart,
   BookOpen,
   Star,
   ShieldCheck,
   Users,
   ArrowRight,
   MessageCircle,
   BadgeCheck,
   Target,
   Building2,
   CheckCircle2,
   BookOpenCheck,
   Wrench,
   Briefcase,
} from "lucide-react";
import { Container, PageHero, Button, Reveal, SectionHeading } from "../components/ui";
import { SEO } from "../lib/SEO";
import { stats, valeurs, equipe, infrastructures } from "../data/site";
import { stories, partenaires } from "../assets";

// Partenaires uniques (l'array d'origine est dupliqué pour le marquee)
const uniquePartners = partenaires.filter(
   (p, i, arr) => arr.findIndex((x) => x.src === p.src) === i
);

// Eyebrow façon modèle (texte orange, majuscules, icône)
function Label({ icon: Icon, children }) {
   return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-second mb-3">
         <Icon className="w-3.5 h-3.5" />
         {children}
      </span>
   );
}

const valeurIcons = [ShieldCheck, Users, Heart, Star];

const timeline = [
   {
      year: "2004 — Création",
      titre: "Naissance du Groupe DGC-Formation",
      desc: "Ouverture dans la zone industrielle de Pointe-Noire, avec l'ambition de former des professionnels réellement opérationnels.",
   },
   {
      year: "Développement",
      titre: "Des écoles spécialisées",
      desc: "Création progressive de nos pôles — commerce, informatique et polytechnique — pour couvrir les métiers qui recrutent.",
   },
   {
      year: "Aujourd'hui",
      titre: "La référence à Pointe-Noire",
      desc: "4 écoles, un centre de certifications (CCPM) et des partenaires internationaux (Oracle, Cisco, CompTIA…). 21 ans d'excellence.",
   },
];

function About() {
   return (
      <>
         <SEO
            title="À propos | Groupe DGC-Formation — 21 ans à Pointe-Noire"
            description="Découvrez le Groupe DGC-Formation : notre histoire depuis 2004, notre mission, nos valeurs, notre équipe et nos infrastructures à Pointe-Noire."
            path="/a-propos"
         />

         <PageHero
            eyebrow="À propos de nous"
            title="21 ans à former les talents du Congo"
            subtitle="Une institution d'enseignement supérieur reconnue à Pointe-Noire, engagée pour la réussite et l'employabilité de ses étudiants."
            image="/back.webp"
         />

         <Container>
            {/* ── STATS en surimpression ── */}
            <div className="relative z-20 -mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
               {stats.map((s, i) => (
                  <Reveal key={s.label} i={i} className="card-soft p-5 text-center">
                     <p className="text-3xl font-display text-first leading-none">
                        {s.value}
                        <span className="text-second text-xl">{s.suffix}</span>
                     </p>
                     <p className="text-[11px] font-bold uppercase tracking-wider text-muted mt-2">
                        {s.label}
                     </p>
                  </Reveal>
               ))}
            </div>

            {/* ── HISTOIRE ── */}
            <section className="mb-24">
               <Reveal className="flex flex-col items-center text-center mb-12">
                  <Label icon={BookOpen}>Notre histoire</Label>
                  <h2 className="text-3xl sm:text-4xl text-first leading-tight">
                     Née d'une conviction,{" "}
                     <span className="font-secondary text-second font-normal">
                        une mission concrète
                     </span>
                  </h2>
               </Reveal>

               <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <Reveal>
                     <p className="text-muted leading-relaxed mb-4">
                        Depuis 21 ans, le Groupe DGC-Formation est une institution
                        d'enseignement supérieur située dans la zone industrielle, en
                        face du Lycée Victor Augagneur à Pointe-Noire.
                     </p>
                     <p className="text-muted leading-relaxed mb-10">
                        Notre mission est simple : offrir une éducation de qualité,
                        pratique et innovante, qui prépare nos étudiants à exceller
                        dans leur vie professionnelle et à répondre aux besoins réels
                        des entreprises.
                     </p>

                     <div className="border-l-2 border-line pl-6 flex flex-col gap-8">
                        {timeline.map((t) => (
                           <div key={t.year} className="relative">
                              <div className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full bg-second" />
                              <p className="text-[11px] font-bold uppercase tracking-wider text-second mb-1">
                                 {t.year}
                              </p>
                              <p className="font-bold text-ink mb-1">{t.titre}</p>
                              <p className="text-sm text-muted leading-relaxed">
                                 {t.desc}
                              </p>
                           </div>
                        ))}
                     </div>
                  </Reveal>

                  <Reveal i={1}>
                     <div className="grid grid-cols-2 gap-4 lg:h-[520px]">
                        <div className="row-span-2 h-72 lg:h-full rounded-3xl overflow-hidden">
                           <img
                              src={stories[0].src}
                              alt="Campus DGC"
                              className="w-full h-full object-cover hover:scale-105 transition duration-700"
                           />
                        </div>
                        <div className="h-[250px] rounded-3xl overflow-hidden">
                           <img
                              src={stories[7].src}
                              alt="Salle informatique"
                              className="w-full h-full object-cover hover:scale-105 transition duration-700"
                           />
                        </div>
                        <div className="h-[250px] rounded-3xl overflow-hidden">
                           <img
                              src={stories[5].src}
                              alt="Travaux pratiques"
                              className="w-full h-full object-cover hover:scale-105 transition duration-700"
                           />
                        </div>
                     </div>
                  </Reveal>
               </div>
            </section>

            {/* ── MISSION / VISION ── */}
            <section className="mb-24 grid md:grid-cols-2 gap-6">
               <Reveal>
                  <div className="card-soft p-8 h-full relative overflow-hidden">
                     <div className="absolute top-0 left-0 h-full w-1.5 bg-second" />
                     <div className="w-12 h-12 rounded-2xl bg-first/10 flex items-center justify-center mb-4">
                        <Target className="w-6 h-6 text-first" />
                     </div>
                     <h3 className="text-xl text-first mb-3">Notre mission</h3>
                     <p className="text-lg text-ink leading-relaxed font-medium">
                        Révéler le potentiel de chaque étudiant et en faire un
                        professionnel{" "}
                        <span className="text-second">opérationnel et recherché</span>,
                        en unissant savoir académique et expérience du terrain.
                     </p>
                     <ul className="mt-6 space-y-3">
                        {[
                           {
                              icon: BookOpenCheck,
                              text: "Un socle théorique solide et actualisé",
                           },
                           {
                              icon: Wrench,
                              text: "Une pratique intensive en laboratoires et en entreprise",
                           },
                           {
                              icon: Briefcase,
                              text: "Un accompagnement réel vers l'emploi et les stages",
                           },
                        ].map((pillar) => (
                           <li key={pillar.text} className="flex items-start gap-3">
                              <span className="w-8 h-8 rounded-lg bg-first/8 flex items-center justify-center shrink-0">
                                 <pillar.icon className="w-4 h-4 text-first" />
                              </span>
                              <span className="text-sm text-muted leading-relaxed pt-1.5">
                                 {pillar.text}
                              </span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </Reveal>
               <Reveal i={1}>
                  <div className="card-soft p-8 h-full">
                     <div className="w-12 h-12 rounded-2xl bg-second/10 flex items-center justify-center mb-4">
                        <Building2 className="w-6 h-6 text-second" />
                     </div>
                     <h3 className="text-xl text-first mb-2">Nos infrastructures</h3>
                     <ul className="space-y-2.5">
                        {infrastructures.map((i) => (
                           <li key={i.title} className="flex items-start gap-2 text-muted">
                              <span className="w-1.5 h-1.5 rounded-full bg-second mt-2 shrink-0" />
                              <span>
                                 <span className="font-semibold text-ink">{i.title}</span>{" "}
                                 — {i.desc}
                              </span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </Reveal>
            </section>

            {/* ── VALEURS (identique à l'accueil) ── */}
            <section className="mb-24">
               <SectionHeading
                  eyebrow="Nos valeurs"
                  title="Ce qui nous rend différents"
                  subtitle="Quatre principes guident chaque étudiant tout au long de son parcours."
                  className="mb-14"
               />
               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {valeurs.map((v, i) => (
                     <Reveal key={v.title} i={i}>
                        <div className="card-soft p-6 h-full hover:-translate-y-1 transition-transform duration-300">
                           <div className="w-12 h-12 rounded-2xl bg-first/8 flex items-center justify-center mb-4">
                              <span className="font-display text-first text-xl">
                                 {String(i + 1).padStart(2, "0")}
                              </span>
                           </div>
                           <h3 className="text-xl text-first mb-2">{v.title}</h3>
                           <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
                        </div>
                     </Reveal>
                  ))}
               </div>
            </section>

            {/* ── PARTENAIRES ── */}
            <section className="mb-24">
               <SectionHeading
                  eyebrow="Ils nous font confiance"
                  title="Nos partenaires & certifications"
                  subtitle="Des partenaires locaux et internationaux qui valident la qualité de nos formations et certifications."
                  className="mb-12"
               />
               <Reveal
                  effet="zoom"
                  className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
               >
                  <div className="flex w-max gap-5 py-2 animate-marquee hover:[animation-play-state:paused]">
                     {[...uniquePartners, ...uniquePartners].map((p, i) => {
                        const external = p.link && p.link.startsWith("http");
                        return (
                           <a
                              key={i}
                              href={p.link || "#"}
                              target={external ? "_blank" : undefined}
                              rel={external ? "noopener noreferrer" : undefined}
                              className="group card-soft shrink-0 w-44 h-28 flex items-center justify-center p-6 hover:-translate-y-1 hover:border-first/30 hover:shadow-lg transition-all duration-300"
                           >
                              <img
                                 src={p.src}
                                 alt={p.alt || "Partenaire"}
                                 loading="lazy"
                                 className="max-h-16 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                              />
                           </a>
                        );
                     })}
                  </div>
               </Reveal>
            </section>

            {/* ── CTA FINAL ── */}
            <section className="mb-24">
               <Reveal effet="zoom" className="band-dark rounded-3xl px-8 py-14 text-center relative overflow-hidden">
                  <div className="blob w-72 h-72 bg-second/25 -top-16 -right-10" />
                  <div className="relative z-10 max-w-xl mx-auto">
                     <p className="text-[11px] font-bold uppercase tracking-widest text-second mb-3">
                        Rejoignez l'aventure
                     </p>
                     <h2 className="text-2xl sm:text-3xl text-white leading-tight mb-3">
                        Votre avenir se construit ici
                     </h2>
                     <p className="text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
                        Découvrez nos écoles ou lancez votre préinscription en quelques
                        minutes.
                     </p>
                     <div className="flex items-center justify-center gap-3 flex-wrap">
                        <Button to="/preinscription" variant="primary">
                           Se préinscrire <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button to="/contact" variant="ghostLight">
                           Nous contacter <MessageCircle className="w-4 h-4" />
                        </Button>
                     </div>
                  </div>
               </Reveal>
            </section>
         </Container>
      </>
   );
}

export default About;
