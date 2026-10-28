/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import {
   GraduationCap,
   Clock,
   CalendarDays,
   ArrowRight,
   MessageCircle,
   Briefcase,
   BookOpenCheck,
   Users,
   BadgeCheck,
} from "lucide-react";
import { Container, PageHero, Button, Reveal, SectionHeading } from "../components/ui";
import { SEO, buildCourseListJsonLd, buildBreadcrumb } from "../lib/SEO";
import { masters, anneeRentree, agrement } from "../data/masters";

function Label({ icon: Icon, children }) {
   return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-second mb-3">
         <Icon className="w-3.5 h-3.5" />
         {children}
      </span>
   );
}

const atouts = [
   {
      icon: BookOpenCheck,
      title: "Académique et pratique",
      desc: "Des enseignements solides, nourris d'études de cas et de situations réelles d'entreprise.",
   },
   {
      icon: Users,
      title: "Pensé pour les actifs",
      desc: "Présentiel intensif ou alternance avec des cours regroupés en sessions, pour concilier études et emploi.",
   },
   {
      icon: Briefcase,
      title: "Tourné vers l'emploi",
      desc: "Stages, réseau d'entreprises partenaires et accompagnement vers des postes à responsabilité.",
   },
];

function Masters() {
   return (
      <>
         <SEO
            title="Masters Bac+5 à Pointe-Noire : audit, contrôle de gestion, comptabilité, finance | Groupe DGC-Formation"
            description={`${masters.length} masters Bac+5 (120 ECTS) à Pointe-Noire : ${masters
               .map((m) => m.titre)
               .join(", ")}. Présentiel intensif ou alternance, rentrée ${anneeRentree}. Préinscription en ligne.`}
            path="/masters"
            keywords={[
               "master Pointe-Noire",
               "master Congo",
               "Bac+5 Pointe-Noire",
               "master CCA Congo",
               ...masters.map((m) => `master ${m.titre}`),
               "Groupe DGC-Formation",
            ]}
            jsonLd={[
               buildCourseListJsonLd(masters),
               buildBreadcrumb([
                  { name: "Accueil", path: "/" },
                  { name: "Masters", path: "/masters" },
               ]),
            ]}
         />

         <PageHero
            eyebrow="Formations de niveau Master"
            title="Passez au niveau supérieur avec un Master DGC"
            subtitle={`Des programmes exigeants pour les licenciés et les professionnels. Rentrée ${anneeRentree}.`}
            image="/back.webp"
         />

         <Container>
            {/* ── PRÉSENTATION ── */}
            <section className="py-20 grid lg:grid-cols-2 gap-12 items-start">
               <Reveal>
                  <Label icon={GraduationCap}>Nos masters</Label>
                  <h2 className="text-3xl sm:text-4xl text-first leading-tight mb-5">
                     Des masters pour{" "}
                     <span className="font-secondary text-second font-normal">
                        accélérer votre carrière
                     </span>
                  </h2>
                  <p className="text-muted leading-relaxed mb-4">
                     Au sein du Groupe DGC-Formation, les programmes Master prolongent notre
                     approche : une formation de qualité, pratique et innovante, qui prépare à
                     des fonctions d'encadrement et de décision.
                  </p>
                  <p className="text-muted leading-relaxed mb-6">
                     Que vous veniez d'obtenir votre licence ou que vous soyez déjà en poste,
                     chaque master propose des parcours et des rythmes adaptés à votre projet.
                  </p>
                  <p className="inline-flex items-start gap-2 text-xs text-muted">
                     <BadgeCheck className="w-4 h-4 text-second shrink-0 mt-0.5" />
                     {agrement}
                  </p>
               </Reveal>

               <div className="grid gap-4">
                  {atouts.map((a, i) => (
                     <Reveal key={a.title} i={i}>
                        <div className="card-soft p-5 flex items-start gap-4">
                           <span className="w-11 h-11 rounded-2xl bg-first/10 flex items-center justify-center shrink-0">
                              <a.icon className="w-5 h-5 text-first" />
                           </span>
                           <div>
                              <h3 className="text-lg text-first mb-1">{a.title}</h3>
                              <p className="text-sm text-muted leading-relaxed">{a.desc}</p>
                           </div>
                        </div>
                     </Reveal>
                  ))}
               </div>
            </section>

            {/* ── GRILLE DES MASTERS ── */}
            <section className="mb-24" id="programmes">
               <SectionHeading
                  eyebrow="Programmes disponibles"
                  title="Choisissez votre master"
                  subtitle="Un tronc commun en Master 1, puis la spécialisation de votre choix en Master 2. Cliquez sur un master pour découvrir son programme, ses débouchés et ses conditions d'admission."
                  className="mb-12"
               />

               <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {masters.map((m, i) => (
                     <Reveal key={m.slug} i={i}>
                        <Link
                           to={`/masters/${m.slug}`}
                           className="group card-soft h-full flex flex-col overflow-hidden hover:-translate-y-1 hover:border-first/30 transition-all duration-300"
                        >
                           <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                              <img
                                 src={m.images[0].src}
                                 alt={`Master ${m.titre}`}
                                 loading="lazy"
                                 className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-first/70 via-transparent to-transparent" />
                              <span className="absolute top-4 left-4 font-display text-base text-first bg-white rounded-xl px-3 py-1.5 leading-none shadow-md">
                                 {m.badge || m.sigle}
                              </span>
                              <span className="absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-wider text-white/90">
                                 {m.mention ? `Master ${m.sigle}` : m.ecole}
                              </span>
                              <div className="absolute bottom-0 left-0 h-1 w-full bg-second scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                           </div>

                           <div className="p-6 flex flex-col flex-1">
                              <h3 className="text-xl text-first mb-2 leading-snug">{m.titre}</h3>
                              <p className="text-sm text-muted leading-relaxed mb-5 flex-1">{m.accroche}</p>

                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted mb-5">
                                 {m.niveau && (
                                    <span className="inline-flex items-center gap-1.5">
                                       <GraduationCap className="w-3.5 h-3.5 text-second" /> {m.niveau}
                                    </span>
                                 )}
                                 <span className="inline-flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-second" /> {m.duree}
                                 </span>
                                 <span className="inline-flex items-center gap-1.5">
                                    <CalendarDays className="w-3.5 h-3.5 text-second" /> Rentrée {m.rentree}
                                 </span>
                              </div>

                              <span className="inline-flex items-center gap-2 text-sm font-semibold text-second group-hover:gap-3 transition-all">
                                 Voir le programme <ArrowRight className="w-4 h-4" />
                              </span>
                           </div>
                        </Link>
                     </Reveal>
                  ))}
               </div>
            </section>

            {/* ── CTA FINAL ── */}
            <section className="mb-24">
               <Reveal effet="zoom" className="band-dark rounded-3xl px-8 py-14 text-center relative overflow-hidden">
                  <div className="blob w-72 h-72 bg-second/25 -top-16 -right-10" />
                  <div className="relative z-10 max-w-xl mx-auto">
                     <p className="text-[11px] font-bold uppercase tracking-widest text-second mb-3">
                        Un doute sur votre parcours ?
                     </p>
                     <h2 className="text-2xl sm:text-3xl text-white leading-tight mb-3">
                        Parlons de votre projet
                     </h2>
                     <p className="text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
                        Notre équipe étudie votre profil et vous oriente vers le master qui vous correspond.
                     </p>
                     <div className="flex items-center justify-center gap-3 flex-wrap">
                        <Button to="/contact" variant="primary">
                           Nous contacter <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button to="/a-propos" variant="ghostLight">
                           Découvrir DGC <ArrowRight className="w-4 h-4" />
                        </Button>
                     </div>
                  </div>
               </Reveal>
            </section>
         </Container>
      </>
   );
}

export default Masters;