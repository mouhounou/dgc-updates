/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
   ArrowRight,
   ArrowUpRight,
   Plus,
   Minus,
   Quote,
   PlayCircle,
   MapPin,
   GraduationCap,
   TrendingUp,
   Users,
   ShieldCheck,
   Clock,
   Sparkles,
   Lightbulb,
   Monitor,
   FlaskConical,
   Languages,
   Award,
   Building2,
} from "lucide-react";
import { Container, Eyebrow, SectionHeading, Button, Reveal } from "../components/ui";
import { SEO } from "../lib/SEO";
import {
   ecoles,
   stats,
   valeurs,
   temoignages,
   infrastructures,
} from "../data/site";
import { masters, anneeRentree } from "../data/masters";
import { stories } from "../assets";
import ThreeParticles from "../components/ThreeParticles";

const heroMain = stories[15]?.src || stories[0].src;

function Home() {
   const openVideos = () => window.dispatchEvent(new Event("open-video-gallery"));

   // Icônes des infrastructures, dans l'ordre de `infrastructures` (site.js)
   const iconesInfra = [Monitor, FlaskConical, Languages];
   const atouts = [
      {
         icon: Lightbulb,
         titre: "Une pédagogie pratique et professionnalisante",
         desc: "On apprend en faisant : études de cas réelles, travaux pratiques et stages en entreprise pour être opérationnel dès le diplôme.",
      },
      ...infrastructures.map((inf, i) => ({
         icon: iconesInfra[i] || Building2,
         titre: inf.title,
         desc: inf.desc,
      })),
      {
         icon: Award,
         titre: "Des certifications reconnues",
         desc: "Oracle, Cisco, MikroTik, CompTIA… des certifications qui font la différence sur le marché de l'emploi.",
      },
   ];

   return (
      <>
         <SEO />

         {/* ── HERO ─────────────────────────────────────────── */}
         <section className="relative overflow-hidden min-h-[86vh] flex items-center text-white">
            {/* Image de fond (bâtiment), calée en bas */}
            <img
               src="/back.webp"
               alt="Campus du Groupe DGC-Formation à Pointe-Noire"
               className="absolute inset-0 w-full h-full object-cover object-bottom"
            />
            {/* Overlays : opaque à gauche → transparent à droite */}
            <div className="absolute inset-0 bg-gradient-to-r from-first from-5% via-first/85 via-45% to-transparent to-95%" />
            <div className="absolute inset-0 bg-gradient-to-t from-first/70 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-first/45 sm:bg-transparent" />

            {/* Particules Three.js interactives (parallax souris) */}
            <ThreeParticles />

            <Container className="relative z-10 py-24">
               <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                  {masters.length > 0 && (
                     <Reveal i={0}>
                        <Link
                           to="/masters"
                           className="group mb-4 inline-flex items-center gap-2 rounded-full bg-second/90 hover:bg-second pl-1.5 pr-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-lg transition-colors"
                        >
                           <span className="rounded-full bg-white text-second px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">
                              Nouveau
                           </span>
                           {masters.length > 1 ? `${masters.length} Masters` : "Master"} · Rentrée {anneeRentree}
                           <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                     </Reveal>
                  )}


                  <Reveal i={1}>
                     <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
                        Formons les talents
                        <br />
                        <span className="font-secondary text-second font-normal">
                           de demain.
                        </span>
                     </h1>
                  </Reveal>

                  <Reveal i={2}>
                     <p className="mt-6 text-white/85 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
                        Groupe DGC-Formation, école d'enseignement supérieur regroupant
                        4 écoles spécialisées. 21 ans d'excellence et une pédagogie
                        tournée vers l'emploi.
                     </p>
                  </Reveal>

                  <Reveal i={3}>
                     <div className="mt-7 flex flex-wrap justify-center lg:justify-start gap-2.5">
                        {ecoles.map((e) => (
                           <a
                              key={e.sigle}
                              href={e.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`${e.nom} : visiter le site`}
                              aria-label={`Site de l'${e.sigle} (${e.nom}), nouvel onglet`}
                              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm font-semibold text-white transition-all hover:bg-white hover:text-first hover:border-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                           >
                              <span className="w-2 h-2 rounded-full bg-second" />
                              {e.sigle}
                              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                           </a>
                        ))}
                     </div>
                  </Reveal>

                  <Reveal i={4}>
                     <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                        <Button to="/preinscription" variant="primary">
                           Démarrer ma préinscription <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button href="#ecoles" variant="ghostLight">
                           Découvrir nos écoles
                        </Button>
                     </div>
                  </Reveal>
               </div>
            </Container>
         </section>

         {/* ── 1. NOS ÉCOLES (cycle Licence) ───────────────── */}
         <section id="ecoles" className="scroll-mt-24 py-20 sm:py-28">
            <Container>
               <div className="mb-12">
                  <SectionHeading
                     align="left"
                     eyebrow="Nos 4 écoles"
                     title="Un groupe, quatre pôles d'excellence"
                     subtitle="Du commerce à l'ingénierie en passant par le numérique, chaque école prépare à des métiers qui recrutent."
                  />
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ecoles.map((e, i) => (
                     <Reveal key={e.sigle} i={i}>
                        <a
                           href={e.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="group block card-soft overflow-hidden h-full hover:-translate-y-1 transition-transform duration-300"
                        >
                           <div className="relative h-44 overflow-hidden">
                              <img
                                 src={e.image}
                                 alt={e.nom}
                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <span
                                 className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                                 style={{ background: e.accent }}
                              >
                                 {e.sigle}
                              </span>
                           </div>
                           <div className="p-5">
                              <h3 className="text-lg text-first leading-snug">
                                 {e.domaine}
                              </h3>
                              <p className="mt-2 text-sm text-muted line-clamp-3">
                                 {e.description}
                              </p>
                              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-second">
                                 Découvrir
                                 <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </span>
                           </div>
                        </a>
                     </Reveal>
                  ))}
               </div>
            </Container>
         </section>

         {/* ── 2. CYCLE MASTER ──────────────────────────────── */}
         {masters.length > 0 && (
            <section id="masters" className="scroll-mt-24 py-20 sm:py-28 bg-surface">
               <Container>
                  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
                     <SectionHeading
                        align="left"
                        eyebrow={
                           <>
                              <Sparkles className="w-3.5 h-3.5" /> Nouveau · Rentrée {anneeRentree}
                           </>
                        }
                        title="Poursuivez jusqu'au Bac+5"
                        subtitle={`${masters.length} masters en comptabilité, contrôle de gestion, audit et finance, ouverts aux licenciés comme aux professionnels en activité.`}
                     />
                     <Button to="/masters" variant="dark" className="self-start lg:self-auto shrink-0">
                        Tous les masters <ArrowRight className="w-4 h-4" />
                     </Button>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {masters.map((m, i) => (
                        <Reveal key={m.slug} i={i}>
                           <Link
                              to={`/masters/${m.slug}`}
                              className="group block card-soft overflow-hidden h-full hover:-translate-y-1 transition-transform duration-300"
                           >
                              <div className="relative h-44 overflow-hidden">
                                 <img
                                    src={m.images[0].src}
                                    alt={`Master ${m.titre}`}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                 />
                                 <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-second">
                                    Master {m.sigle}
                                 </span>
                              </div>
                              <div className="p-5">
                                 <h3 className="text-lg text-first leading-snug">{m.titre}</h3>
                                 <p className="mt-2 text-sm text-muted line-clamp-3">{m.accroche}</p>
                                 <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-second">
                                    Voir le programme
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                 </span>
                              </div>
                           </Link>
                        </Reveal>
                     ))}
                  </div>
               </Container>
            </section>
         )}

         {/* ── 3. POURQUOI DGC (chiffres + atouts) ──────────── */}
         <section className="py-20 sm:py-28">
            <Container>
               <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-stretch">
                  {/* Photo + chiffres clés en surimpression */}
                  <Reveal effet="gauche" className="h-full">
                     <div className="relative h-full min-h-[440px] lg:min-h-[600px] rounded-3xl overflow-hidden shadow-xl">
                        <img
                           src={stories[0].src}
                           alt="Étudiants du Groupe DGC-Formation en salle de cours"
                           loading="lazy"
                           className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-first via-first/40 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                           <div className="grid grid-cols-2 gap-3">
                              {stats.map((s) => (
                                 <div
                                    key={s.label}
                                    className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3.5"
                                 >
                                    <p className="text-2xl sm:text-3xl font-display text-white flex items-baseline gap-1 leading-none">
                                       <CountUp end={s.value} duration={2} separator=" " enableScrollSpy scrollSpyOnce />
                                       <span className="text-second text-xl">{s.suffix}</span>
                                    </p>
                                    <p className="text-xs text-white/75 mt-1.5 leading-snug">{s.label}</p>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </Reveal>

                  {/* Texte + atouts */}
                  <div className="flex flex-col justify-center">
                     <SectionHeading
                        align="left"
                        eyebrow="Pourquoi DGC"
                        title="21 ans à former l'élite de demain"
                        subtitle="Une institution reconnue, solidement implantée à Pointe-Noire, qui combine théorie et pratique pour une insertion professionnelle réussie."
                     />

                     <div className="mt-8 grid sm:grid-cols-2 gap-4">
                        {atouts.map((a, i) => {
                           const vedette = i === 0;
                           return (
                              <Reveal key={a.titre} i={i} className={vedette ? "sm:col-span-2" : ""}>
                                 <div
                                    className={`h-full rounded-2xl p-5 flex gap-4 transition-all duration-300 hover:-translate-y-0.5 ${
                                       vedette
                                          ? "bg-first text-white shadow-lg shadow-first/20"
                                          : "border border-line bg-white hover:border-first/25 hover:shadow-md"
                                    }`}
                                 >
                                    <span
                                       className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                                          vedette ? "bg-second text-white" : "bg-second/10 text-second"
                                       }`}
                                    >
                                       <a.icon className="w-5 h-5" />
                                    </span>
                                    <div>
                                       <h3 style={{ fontFamily: "var(--font-sans)" }} className={`text-[15px] font-semibold leading-snug ${vedette ? "text-white" : "text-ink"}`}>
                                          {a.titre}
                                       </h3>
                                       <p className={`mt-1 text-sm leading-relaxed ${vedette ? "text-white/75" : "text-muted"}`}>
                                          {a.desc}
                                       </p>
                                    </div>
                                 </div>
                              </Reveal>
                           );
                        })}
                     </div>

                     <div className="mt-8">
                        <Button to="/a-propos" variant="dark" className="w-full">
                           En savoir plus sur nous <ArrowRight className="w-4 h-4" />
                        </Button>
                     </div>
                  </div>
               </div>
            </Container>
         </section>

         {/* ── 4. VIE AU CAMPUS ────────────────────────────── */}
         <section className="py-20 sm:py-28 bg-surface">
            <Container>
               <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
                  <SectionHeading
                     align="left"
                     eyebrow="La vie au campus"
                     title="Plongez dans notre quotidien"
                  />
                  <button
                     onClick={openVideos}
                     className="inline-flex items-center gap-2 text-sm font-semibold text-first hover:text-second transition-colors"
                  >
                     <PlayCircle className="w-5 h-5" /> Voir nos vidéos
                  </button>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {stories.slice(0, 8).map((s, i) => (
                     <Reveal key={i} i={i % 4}>
                        <div className="relative rounded-2xl overflow-hidden group aspect-square">
                           <img
                              src={s.src}
                              alt={s.caption}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-first/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                              <span className="text-white text-xs font-semibold">
                                 {s.caption}
                              </span>
                           </div>
                        </div>
                     </Reveal>
                  ))}
               </div>
            </Container>
         </section>

         {/* ── 5. TÉMOIGNAGES ──────────────────────────────── */}
         <section className="py-20 sm:py-28">
            <Container>
               <SectionHeading
                  eyebrow="Ils témoignent"
                  title="La parole à nos diplômés"
                  subtitle="Leur réussite est la meilleure preuve de la qualité de nos formations."
                  className="mb-14"
               />
               <div className="grid md:grid-cols-3 gap-6">
                  {temoignages.map((t, i) => (
                     <Reveal key={t.name} i={i}>
                        <div className="card-soft p-7 h-full flex flex-col">
                           <Quote className="w-8 h-8 text-second/30" />
                           <p className="mt-4 text-ink/80 leading-relaxed flex-1">
                              “{t.quote}”
                           </p>
                           <div className="mt-6 flex items-center gap-3 pt-5 border-t border-line">
                              <div className="w-11 h-11 rounded-full bg-first text-white flex items-center justify-center font-display">
                                 {t.name.charAt(0)}
                              </div>
                              <div>
                                 <p className="font-bold text-ink text-sm">{t.name}</p>
                                 <p className="text-xs text-muted">{t.role}</p>
                              </div>
                           </div>
                        </div>
                     </Reveal>
                  ))}
               </div>
            </Container>
         </section>

         {/* ── 6. CTA PRÉINSCRIPTION ───────────────────────── */}
         <section className="py-6 pb-20">
            <Container>
               <Reveal effet="zoom">
               <div className="band-dark rounded-[2rem] px-6 sm:px-14 py-16 text-center text-white relative overflow-hidden">
                  {/* Motif grille */}
                  <div
                     className="pointer-events-none absolute inset-0 opacity-[0.08]"
                     style={{
                        backgroundImage:
                           "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "42px 42px",
                     }}
                  />
                  <div className="blob w-80 h-80 bg-second/30 -top-24 -right-10" />
                  <div className="blob w-72 h-72 bg-white/10 -bottom-24 -left-10" />

                  <div className="relative z-10 max-w-2xl mx-auto">
                     <Eyebrow className="!bg-white/10 !border-white/20 !text-white">
                        <Sparkles className="w-3.5 h-3.5" /> Rentrée 2026 · Places limitées
                     </Eyebrow>
                     <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl leading-tight">
                        Prêt·e à construire{" "}
                        <span className="font-secondary text-second font-normal">
                           votre avenir
                        </span>{" "}
                        ?
                     </h2>
                     <p className="mt-4 text-white/80 max-w-xl mx-auto">
                        Lancez votre préinscription en quelques minutes. Notre équipe
                        d'orientation vous recontacte pour finaliser votre dossier.
                     </p>
                     <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button to="/preinscription" variant="primary">
                           Je me préinscris <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button to="/contact" variant="ghostLight">
                           Poser une question
                        </Button>
                     </div>

                     {/* Réassurance */}
                     <div className="mt-9 pt-7 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-white/75">
                        <span className="inline-flex items-center gap-2">
                           <ShieldCheck className="w-4 h-4 text-second" /> Sans engagement
                        </span>
                        <span className="inline-flex items-center gap-2">
                           <Clock className="w-4 h-4 text-second" /> Réponse sous 24–48h
                        </span>
                        <span className="inline-flex items-center gap-2">
                           <GraduationCap className="w-4 h-4 text-second" /> 4 écoles au choix
                        </span>
                     </div>
                  </div>
               </div>
               </Reveal>
            </Container>
         </section>
      </>
   );
}

export default Home;
