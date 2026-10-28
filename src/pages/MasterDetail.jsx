/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
   ArrowLeft,
   ArrowRight,
   Clock,
   CalendarDays,
   MapPin,
   Users,
   Target,
   Layers,
   Briefcase,
   ClipboardCheck,
   CheckCircle2,
   MessageCircle,
   Building2,
   GraduationCap,
   BookOpen,
   Award,
   Handshake,
   Puzzle,
   FileText,
   HelpCircle,
   ChevronDown,
   Info,
} from "lucide-react";
import { Container, Button, Reveal } from "../components/ui";
import { SEO, buildCourseJsonLd, buildFaqJsonLd, buildBreadcrumb } from "../lib/SEO";
import { getMaster, masters, agrement } from "../data/masters";
import ImageSlider from "../components/imageslider";

function Block({ icon: Icon, title, children }) {
   return (
      <Reveal>
         <section className="mb-14">
            <div className="flex items-center gap-3 mb-5">
               <span className="w-10 h-10 rounded-xl bg-first/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-first" />
               </span>
               <h2 className="text-2xl text-first">{title}</h2>
            </div>
            {children}
         </section>
      </Reveal>
   );
}

function CheckList({ items }) {
   return (
      <ul className="space-y-3">
         {items.map((t) => (
            <li key={t} className="flex items-start gap-3 text-muted leading-relaxed">
               <CheckCircle2 className="w-5 h-5 text-second shrink-0 mt-0.5" />
               <span>{t}</span>
            </li>
         ))}
      </ul>
   );
}

function AdmissionHeader({ tag, titre, sousTitre }) {
   return (
      <div className="flex items-center gap-4 px-6 py-5 bg-first text-white">
         <span className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 font-display text-lg flex items-center justify-center shrink-0">
            {tag}
         </span>
         <div>
            <p className="font-bold leading-tight">{titre}</p>
            <p className="text-xs text-white/70 mt-0.5">{sousTitre}</p>
         </div>
      </div>
   );
}

function Chips({ items }) {
   return (
      <div className="flex flex-wrap gap-2.5">
         {items.map((d) => (
            <span
               key={d}
               className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-first"
            >
               {d}
            </span>
         ))}
      </div>
   );
}

// Programme semestre par semestre (onglets)
function Programme({ semestres }) {
   const [actif, setActif] = useState(0);
   const s = semestres[actif];
   const ects = s.ues.reduce((t, u) => t + u.ects, 0);

   return (
      <>
         <div className="flex flex-wrap gap-2 mb-6" role="tablist">
            {semestres.map((sem, i) => (
               <button
                  key={sem.semestre}
                  role="tab"
                  aria-selected={i === actif}
                  onClick={() => setActif(i)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                     i === actif
                        ? "bg-first text-white border-first"
                        : "bg-white text-first border-line hover:border-first/40"
                  }`}
               >
                  {sem.semestre}
                  <span className={`ml-1.5 text-xs font-medium ${i === actif ? "text-white/70" : "text-muted"}`}>
                     {sem.annee}
                  </span>
               </button>
            ))}
         </div>

         <div className="grid sm:grid-cols-2 gap-4">
            {s.ues.map((ue) => (
               <div
                  key={ue.nom}
                  className={`card-soft p-5 ${ue.specialite ? "!border-second/50 bg-second/5" : ""}`}
               >
                  <div className="flex items-start justify-between gap-3 mb-3">
                     <h3 className="text-base text-first leading-snug">{ue.nom}</h3>
                     <span className="shrink-0 rounded-full bg-second/10 text-second text-xs font-bold px-2.5 py-1">
                        {ue.ects} ECTS
                     </span>
                  </div>
                  <ul className="space-y-1.5">
                     {ue.matieres.map((mat) => (
                        <li key={mat} className="flex items-start gap-2 text-sm text-muted">
                           <span className="w-1.5 h-1.5 rounded-full bg-second mt-2 shrink-0" />
                           {mat}
                        </li>
                     ))}
                  </ul>
               </div>
            ))}
         </div>
         <p className="mt-4 text-sm text-muted">
            Total {s.semestre.toLowerCase()} : <strong className="text-ink">{ects} crédits ECTS</strong>
         </p>
      </>
   );
}

// Sections masquées pour l'instant (les données restent dans masters.js)
const AFFICHER = { programme: false, dossier: false };

// Questions fréquentes : affichées sur la page ET publiées en FAQPage (SEO / moteurs de réponse)
function faqMaster(m) {
   const nom = `Master ${m.titre}`;
   const faq = [];
   if (m.duree)
      faq.push({
         q: `Combien de temps dure le ${nom} ?`, court: "Combien de temps dure ce master ?",
         a: `Le ${nom} dure ${m.duree} (Master 1 et Master 2)${m.ects ? `, soit ${m.ects} crédits ECTS` : ""}${
            m.volumeHoraire ? ` et ${m.volumeHoraire.toLocaleString("fr-FR")} heures d'enseignement encadré, hors stages` : ""
         }. C'est un diplôme de niveau Bac+5 (LMD) délivré par le Groupe DGC-Formation à Pointe-Noire.`,
      });
   if (m.admission)
      faq.push({
         q: `Quelles sont les conditions d'admission au ${nom} ?`, court: "Quelles sont les conditions d'admission ?",
         a: `En Master 1 : ${m.admission.join(" ; ")}.${
            m.admissionM2 ? ` Une entrée directe en Master 2 est possible : ${m.admissionM2.join(" ; ")}.` : ""
         }`,
      });
   if (m.rythme)
      faq.push({
         q: `Peut-on suivre le ${nom} en travaillant ?`, court: "Peut-on suivre ce master en travaillant ?",
         a: `Oui. Le master se suit en ${m.rythme.toLowerCase()}. Les professionnels en activité peuvent suivre un format en alternance avec des cours regroupés en sessions, sous réserve de l'accord de la Direction Académique.`,
      });
   if (m.debouches)
      faq.push({
         q: `Quels métiers exercer après le ${nom} ?`, court: "Quels métiers exercer après ce master ?",
         a: `Principaux débouchés : ${m.debouches.join(", ")}.${
            m.secteurs ? ` Secteurs qui recrutent : ${m.secteurs.join(", ")}.` : ""
         }`,
      });
   if (m.stages)
      faq.push({
         q: `Le ${nom} comprend-il des stages ?`, court: "La formation comprend-elle des stages ?",
         a: m.stages.map((s) => `${s.titre} (${s.quand}) : ${s.desc}`).join(" "),
      });
   faq.push({
      q: `Où se déroule le ${nom} et quand a lieu la rentrée ?`, court: "Où se déroule la formation et quand a lieu la rentrée ?",
      a: `La formation se déroule à Pointe-Noire (${m.lieu}). Rentrée ${
         m.moisRentree ? `en ${m.moisRentree}, ` : ""
      }année académique ${m.rentree}.`,
   });
   faq.push({
      q: `Comment se préinscrire au ${nom} ?`, court: "Comment se préinscrire ?",
      a: "La préinscription se fait en ligne en deux minutes sur le site du Groupe DGC-Formation. Elle ne vaut pas inscription définitive : l'école étudie votre profil, vous recontacte et vous transmet le dossier de candidature complet.",
   });
   return faq;
}

function FaqItem({ n, q, a, open }) {
   return (
      <details
         open={open}
         className="group rounded-2xl border border-line bg-white transition-colors open:border-first/20 open:bg-surface/60"
      >
         <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="w-8 h-8 rounded-lg bg-first/8 text-first text-xs font-bold flex items-center justify-center shrink-0 transition-colors group-open:bg-second group-open:text-white">
               {String(n).padStart(2, "0")}
            </span>
            <h3 style={{ fontFamily: "var(--font-sans)" }} className="flex-1 text-[15px] font-semibold text-ink leading-snug">{q}</h3>
            <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center shrink-0 transition-all group-open:rotate-180 group-open:border-second/40">
               <ChevronDown className="w-4 h-4 text-second" />
            </span>
         </summary>
         <p className="px-5 pb-5 pl-[4.25rem] pr-14 text-sm text-muted leading-relaxed">{a}</p>
      </details>
   );
}

function MasterDetail() {
   const { slug } = useParams();
   const master = getMaster(slug);

   if (!master) return <Navigate to="/masters" replace />;

   const preinscriptionPath = `/masters/${master.slug}/preinscription`;
   const autres = masters.filter((m) => m.slug !== master.slug);

   const faits = [
      { icon: Building2, label: "École", value: master.ecole },
      { icon: GraduationCap, label: "Niveau", value: master.niveau },
      { icon: Clock, label: "Durée", value: master.duree },
      { icon: CalendarDays, label: "Rentrée", value: master.rentree },
      { icon: Users, label: "Rythme", value: master.rythme },
      { icon: Users, label: "Promotion", value: master.effectif },
      { icon: MapPin, label: "Lieu", value: master.lieu },
   ].filter((f) => f.value);

   // Infos clés affichées en overlay sur le slider
   const overlayFaits = faits.filter((f) => ["Durée", "Rentrée", "Lieu"].includes(f.label));
   const faq = faqMaster(master);

   return (
      <>
         <SEO
            title={`Master ${master.titre} à Pointe-Noire (Bac+5) | Groupe DGC-Formation`}
            description={`${master.accroche} ${[master.niveau, master.duree, master.rythme, `rentrée ${master.rentree}`]
               .filter(Boolean)
               .join(" · ")}. Préinscription en ligne.`}
            path={`/masters/${master.slug}`}
            image={master.images?.[0]?.src}
            keywords={[
               `master ${master.titre}`,
               `master ${master.titre} Pointe-Noire`,
               `master ${master.titre} Congo`,
               master.mention,
               "master Pointe-Noire",
               "Bac+5 Congo",
               ...(master.debouches || []).slice(0, 4),
               "Groupe DGC-Formation",
            ].filter(Boolean)}
            jsonLd={[
               buildCourseJsonLd(master),
               buildFaqJsonLd(faq),
               buildBreadcrumb([
                  { name: "Accueil", path: "/" },
                  { name: "Masters", path: "/masters" },
                  { name: `Master ${master.titre}`, path: `/masters/${master.slug}` },
               ]),
            ]}
         />

         {/* ── HERO : slider + infos en overlay ── */}
         <ImageSlider images={master.images} alt={`Master ${master.sigle}`}>
            <Link
               to="/masters"
               className="flex w-fit items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors mb-6"
            >
               <ArrowLeft className="w-4 h-4" /> Tous les masters
            </Link>

            {master.mention && (
               <span className="block w-fit rounded-full bg-second px-3.5 py-1.5 text-xs font-bold text-white mb-4">
                  {master.mention}
               </span>
            )}

            <h1 className="max-w-3xl text-3xl sm:text-5xl text-white leading-tight mb-4">
               {master.titre}
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed mb-7">
               {master.accroche}
            </p>

            <div className="flex flex-wrap items-center gap-3">
               <Button to={preinscriptionPath} variant="primary">
                  Se préinscrire <ArrowRight className="w-4 h-4" />
               </Button>
               {overlayFaits.map((f) => (
                  <span
                     key={f.label}
                     className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-medium text-white"
                  >
                     <f.icon className="w-4 h-4" />
                     {f.value}
                  </span>
               ))}
            </div>
         </ImageSlider>

         <Container className="py-14">
            {/* ── CHIFFRES CLÉS ── */}
            {master.chiffres && (
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                  {master.chiffres.map((c, i) => (
                     <Reveal key={c.label} i={i}>
                        <div className="card-soft p-5 h-full">
                           <p className="text-3xl font-display text-first leading-none">{c.valeur}</p>
                           <p className="text-sm text-muted mt-2">{c.label}</p>
                        </div>
                     </Reveal>
                  ))}
               </div>
            )}

            <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">
               {/* ── CONTENU ── */}
               <div className="min-w-0">
                  <Block icon={Target} title="Présentation">
                     <p className="text-muted leading-relaxed mb-6">{master.presentation}</p>
                     <div className="card-soft p-6">
                        <p className="font-bold text-ink mb-4">Ce que vous saurez faire</p>
                        <CheckList items={master.objectifs} />
                     </div>
                  </Block>

                  {AFFICHER.programme && master.programme && (
                     <Block icon={BookOpen} title="Programme des enseignements">
                        <Programme semestres={master.programme} />
                     </Block>
                  )}

                  {master.specialite && (
                     <Block icon={Layers} title="Votre spécialisation en Master 2">
                        <p className="text-muted leading-relaxed mb-6">
                           Le Master 1 est commun à tous les masters CCA. En Master 2, vous suivez les
                           enseignements de spécialisation ci-dessous, en plus du tronc commun.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-5">
                           {[
                              { titre: "Semestre 3", items: master.specialite.s3 },
                              { titre: "Semestre 4", items: master.specialite.s4 },
                           ].map((b) => (
                              <div key={b.titre} className="card-soft p-6 relative overflow-hidden">
                                 <div className="absolute top-0 left-0 h-full w-1.5 bg-second" />
                                 <p className="text-[11px] font-bold uppercase tracking-widest text-second mb-3">
                                    {b.titre}
                                 </p>
                                 <ul className="space-y-2">
                                    {b.items.map((mod) => (
                                       <li key={mod} className="flex items-start gap-2 text-sm text-ink">
                                          <span className="w-1.5 h-1.5 rounded-full bg-second mt-2 shrink-0" />
                                          {mod}
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                           ))}
                        </div>
                        {master.specialite.profil && (
                           <p className="mt-5 text-sm text-muted">
                              <span className="font-bold text-first">Profil recommandé : </span>
                              {master.specialite.profil}
                           </p>
                        )}
                     </Block>
                  )}

                  {master.parcours && (
                  <Block icon={Layers} title={master.programme ? "Parcours de spécialisation (Master 2)" : "Parcours et enseignements"}>
                     {master.parcoursIntro && (
                        <p className="text-muted leading-relaxed mb-6">{master.parcoursIntro}</p>
                     )}
                     <div className="grid sm:grid-cols-2 gap-5">
                        {master.parcours.map((p, i) => (
                           <div key={p.nom} className="card-soft p-6 relative overflow-hidden flex flex-col">
                              <div className="absolute top-0 left-0 h-full w-1.5 bg-second" />
                              {master.parcours.length > 2 && (
                                 <p className="text-[11px] font-bold uppercase tracking-widest text-second mb-1">
                                    Parcours {i + 1}
                                 </p>
                              )}
                              <h3 className="text-lg text-first mb-2 leading-snug">{p.nom}</h3>
                              <p className="text-sm text-muted leading-relaxed mb-4">{p.desc}</p>
                              <ul className="space-y-2 flex-1">
                                 {p.modules.map((mod) => (
                                    <li key={mod} className="flex items-start gap-2 text-sm text-ink">
                                       <span className="w-1.5 h-1.5 rounded-full bg-second mt-2 shrink-0" />
                                       {mod}
                                    </li>
                                 ))}
                              </ul>
                              {p.debouches && (
                                 <p className="mt-5 pt-4 border-t border-line text-xs text-muted leading-relaxed">
                                    <span className="font-bold text-first">Débouchés : </span>
                                    {p.debouches.join(" · ")}
                                 </p>
                              )}
                           </div>
                        ))}
                     </div>
                  </Block>
                  )}

                  {master.competences && (
                     <Block icon={Puzzle} title="Blocs de compétences">
                        <div className="grid sm:grid-cols-2 gap-3">
                           {master.competences.map((c, i) => (
                              <div key={c} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
                                 <span className="w-8 h-8 rounded-lg bg-first text-white text-sm font-bold flex items-center justify-center shrink-0">
                                    {i + 1}
                                 </span>
                                 <p className="text-sm font-medium text-ink leading-snug pt-1">{c}</p>
                              </div>
                           ))}
                        </div>
                     </Block>
                  )}

                  {master.stages && (
                     <Block icon={FileText} title="Stages et mémoire">
                        <ol className="relative border-l-2 border-line ml-3 space-y-6">
                           {master.stages.map((s) => (
                              <li key={s.titre} className="pl-6 relative">
                                 <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-second border-4 border-white" />
                                 <p className="text-[11px] font-bold uppercase tracking-wider text-second">{s.quand}</p>
                                 <h3 className="text-lg text-first">{s.titre}</h3>
                                 <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
                              </li>
                           ))}
                        </ol>
                     </Block>
                  )}

                  <Block icon={Briefcase} title="Débouchés">
                     <Chips items={master.debouches} />
                     {master.secteurs && (
                        <>
                           <p className="font-bold text-ink mt-8 mb-3">Secteurs qui recrutent</p>
                           <CheckList items={master.secteurs} />
                        </>
                     )}
                  </Block>

                  {master.certifications && (
                     <Block icon={Award} title="Certifications et poursuite d'études">
                        <p className="text-muted leading-relaxed mb-5">
                           Le diplôme prépare, en complément ou à la suite du cursus, à des certifications
                           professionnelles reconnues :
                        </p>
                        <Chips items={master.certifications} />
                     </Block>
                  )}

                  <Block icon={ClipboardCheck} title="Conditions d'admission">
                     {master.admissionM2 ? (
                        <div className="grid md:grid-cols-2 gap-5">
                           {/* Master 1 : prérequis + étapes de sélection */}
                           <div className="card-soft overflow-hidden flex flex-col">
                              <AdmissionHeader
                                 tag="M1"
                                 titre="Entrée en Master 1"
                                 sousTitre="Après une Licence (Bac+3)"
                              />
                              <div className="p-6 flex-1">
                                 <div className="rounded-xl bg-first/5 border border-first/10 p-4 mb-6">
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-first mb-1.5">
                                       Prérequis
                                    </p>
                                    <p className="text-sm text-ink leading-relaxed">{master.admission[0]}</p>
                                 </div>
                                 <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-4">
                                    Procédure de sélection
                                 </p>
                                 <ol className="space-y-0">
                                    {master.admission.slice(1).map((etape, i, arr) => (
                                       <li key={etape} className="relative flex gap-4 pb-5 last:pb-0">
                                          {i < arr.length - 1 && (
                                             <span className="absolute left-[13px] top-7 bottom-0 w-px bg-line" />
                                          )}
                                          <span className="relative z-10 w-7 h-7 rounded-full bg-second text-white text-xs font-bold flex items-center justify-center shrink-0">
                                             {i + 1}
                                          </span>
                                          <p className="text-sm text-muted leading-relaxed pt-1">{etape}</p>
                                       </li>
                                    ))}
                                 </ol>
                              </div>
                           </div>

                           {/* Master 2 : voies d'accès directes */}
                           <div className="card-soft overflow-hidden flex flex-col">
                              <AdmissionHeader
                                 tag="M2"
                                 titre="Entrée directe en Master 2"
                                 sousTitre="Bac+4 ou expérience professionnelle"
                              />
                              <div className="p-6 flex-1">
                                 <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-4">
                                    Voies d'accès
                                 </p>
                                 <ul className="space-y-3">
                                    {master.admissionM2.map((voie, i) => {
                                       const Icon = [GraduationCap, Briefcase, ClipboardCheck][i] || CheckCircle2;
                                       return (
                                          <li key={voie} className="flex gap-3 rounded-xl border border-line bg-white p-4">
                                             <span className="w-9 h-9 rounded-lg bg-second/10 flex items-center justify-center shrink-0">
                                                <Icon className="w-4 h-4 text-second" />
                                             </span>
                                             <p className="text-sm text-muted leading-relaxed">{voie}</p>
                                          </li>
                                       );
                                    })}
                                 </ul>
                              </div>
                           </div>
                        </div>
                     ) : (
                        <CheckList items={master.admission} />
                     )}

                     {AFFICHER.dossier && master.dossier && (
                        <div className="mt-6 rounded-xl bg-surface border border-line p-6">
                           <p className="font-bold text-ink mb-3">Pièces du dossier de candidature</p>
                           <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2 list-decimal list-inside text-sm text-muted">
                              {master.dossier.map((d) => (
                                 <li key={d}>{d}</li>
                              ))}
                           </ol>
                        </div>
                     )}

                     <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl bg-surface border border-line p-5">
                        <Info className="w-5 h-5 text-first shrink-0" />
                        <p className="flex-1 text-sm text-muted leading-relaxed">
                           La préinscription ne vaut pas inscription définitive. Le dossier de
                           candidature complet est transmis après validation de votre profil.
                        </p>
                        <Button to={preinscriptionPath} variant="primary" className="shrink-0">
                           Se préinscrire <ArrowRight className="w-4 h-4" />
                        </Button>
                     </div>
                  </Block>

                  <Block icon={HelpCircle} title="Questions fréquentes">
                     <div className="space-y-3">
                        {faq.map((it, i) => (
                           <FaqItem key={it.q} n={i + 1} q={it.court || it.q} a={it.a} open={i === 0} />
                        ))}
                     </div>
                     <p className="mt-6 text-sm text-muted">
                        Une autre question ?{" "}
                        <Link to="/contact" className="font-semibold text-second hover:underline">
                           Contactez notre équipe
                        </Link>
                        , nous vous répondons sous 24 à 48 h.
                     </p>
                  </Block>

                  {master.partenaires && (
                     <Block icon={Handshake} title="Adossement professionnel">
                        <p className="text-muted leading-relaxed mb-5">
                           Le master s'appuie sur le réseau d'entreprises et d'institutions du groupe pour
                           les stages, les études de cas, les conférences et les jurys.
                        </p>
                        <CheckList items={master.partenaires} />
                     </Block>
                  )}
               </div>

               {/* ── CARTE LATÉRALE ── */}
               <aside className="lg:sticky lg:top-28">
                  <Reveal effet="droite" className="card-soft p-6">
                     <p className="text-[11px] font-bold uppercase tracking-widest text-second mb-1">
                        Master {master.sigle}
                     </p>
                     <h3 className="text-xl text-first mb-5 leading-snug">{master.titre}</h3>

                     <ul className="space-y-4 mb-6">
                        {faits.map((f) => (
                           <li key={f.label} className="flex items-start gap-3">
                              <span className="w-9 h-9 rounded-lg bg-first/8 flex items-center justify-center shrink-0">
                                 <f.icon className="w-4 h-4 text-first" />
                              </span>
                              <div>
                                 <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                                    {f.label}
                                 </p>
                                 <p className="text-sm font-semibold text-ink">{f.value}</p>
                              </div>
                           </li>
                        ))}
                     </ul>

                     <Button to={preinscriptionPath} variant="primary" className="w-full">
                        Se préinscrire <ArrowRight className="w-4 h-4" />
                     </Button>
                     <Button to="/contact" variant="outline" className="w-full mt-3">
                        Poser une question <MessageCircle className="w-4 h-4" />
                     </Button>
                  </Reveal>
                  <p className="text-[11px] text-muted leading-relaxed mt-4 px-1">{agrement}</p>
               </aside>
            </div>

            {/* ── AUTRES MASTERS ── */}
            {autres.length > 0 && (
               <section className="mt-20 pt-14 border-t border-line">
                  <div className="flex items-end justify-between gap-4 mb-8">
                     <Reveal effet="flou">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-second mb-2">
                           {master.mention || "Nos masters"}
                        </p>
                        <h2 className="text-2xl sm:text-3xl text-first">Découvrir les autres masters</h2>
                     </Reveal>
                     <Link
                        to="/masters"
                        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-first hover:text-second transition-colors shrink-0"
                     >
                        Tous les masters <ArrowRight className="w-4 h-4" />
                     </Link>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                     {autres.map((m, i) => (
                        <Reveal key={m.slug} i={i}>
                           <Link
                              to={`/masters/${m.slug}`}
                              className="group card-soft h-full flex flex-col overflow-hidden hover:-translate-y-1 hover:border-first/30 hover:shadow-lg transition-all duration-300"
                           >
                              <div className="relative h-36 overflow-hidden bg-surface">
                                 <img
                                    src={m.images[0].src}
                                    alt={`Master ${m.titre}`}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-first/70 via-first/10 to-transparent" />
                                 <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-first shadow-sm">
                                    {m.badge || `Master ${m.sigle}`}
                                 </span>
                                 <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-white/90">
                                    {[m.niveau, m.duree].filter(Boolean).join(" · ")}
                                 </span>
                              </div>

                              <div className="p-5 flex flex-col flex-1">
                                 <h3 className="text-base text-first leading-snug">Master {m.titre}</h3>
                                 <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2 flex-1">
                                    {m.accroche}
                                 </p>
                                 <span className="mt-4 pt-4 border-t border-line flex items-center justify-between text-sm font-semibold text-second">
                                    Voir le programme
                                    <span className="w-8 h-8 rounded-full bg-second/10 flex items-center justify-center group-hover:bg-second group-hover:text-white transition-colors">
                                       <ArrowRight className="w-4 h-4" />
                                    </span>
                                 </span>
                              </div>
                           </Link>
                        </Reveal>
                     ))}
                  </div>
               </section>
            )}
         </Container>
      </>
   );
}

export default MasterDetail;
