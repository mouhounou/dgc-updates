/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
   ArrowLeft,
   ArrowRight,
   Send,
   CheckCircle2,
   Check,
   Clock,
   CalendarDays,
   Building2,
   Loader2,
   AlertCircle,
   MessageCircle,
   User,
   Briefcase,
   Target,
   ShieldCheck,
} from "lucide-react";
import { Container, Button, Reveal } from "../components/ui";
import { SEO } from "../lib/SEO";
import { getMaster, formulaireParDefaut, agrement } from "../data/masters";
import { emailOk, verifEmail, verifTel, ERR_INPUT, errGroupe as groupeErreur, tuileCls, attrsErreur, signalerErreurs } from "../lib/validation";

// Ordre d'affichage des champs (notification et défilement vers le premier à corriger)
const ORDRE_CHAMPS = ["nom", "telephone", "email", "profil", "posteEmployeur", "diplome", "diplomeAutre", "parcours", "rythme", "entretien", "lieu", "certifie"];

// ── API ───────────────────────────────────────────────────────
const API_URL = "https://api.dgc.informatiky.com";

async function envoyerPreinscription(payload) {
   const url = `${API_URL}/api/mail/preinscription-master`;
   const debut = performance.now();

   try {
      const res = await axios.post(url, payload);

      if (!res.data?.success) {
         console.error("[Préinscription] Réponse reçue mais success=false", {
            url,
            status: res.status,
            data: res.data,
            dureeMs: Math.round(performance.now() - debut),
         });
         throw new Error(res.data?.message || "Envoi impossible");
      }
      return res.data;
   } catch (error) {
      const dureeMs = Math.round(performance.now() - debut);

      // Type d'échec
      let type = "ERREUR_INCONNUE";
      if (error.response) type = "REPONSE_SERVEUR_ERREUR"; // le serveur a répondu 4xx / 5xx
      else if (error.code === "ECONNABORTED") type = "TIMEOUT";
      else if (error.request) type = "AUCUNE_REPONSE_RESEAU"; // CORS, hors ligne, API down...

      console.group(` [Préinscription] Échec de la requête : ${type}`);
      console.error("Date :", new Date().toISOString());
      console.error("Durée :", `${dureeMs} ms`);
      console.error("URL :", url);
      console.error("Méthode :", error.config?.method?.toUpperCase() || "POST");
      console.error("Message :", error.message);
      console.error("Code axios :", error.code);
      console.error("En ligne ? :", navigator.onLine);

      if (error.response) {
         console.error("Status HTTP :", error.response.status, error.response.statusText);
         console.error("Corps de la réponse :", error.response.data);
         console.error("Headers de la réponse :", error.response.headers);
      } else if (error.request) {
         console.error(
            "Aucune réponse reçue. Causes possibles : API hors service, CORS, réseau coupé, timeout.",
         );
         console.error("Objet request :", error.request);
      }

      console.error("Headers envoyés :", error.config?.headers);
      console.error("Payload envoyé :", {
         ...payload,
         telephone: payload.telephone ? "***" + String(payload.telephone).slice(-3) : "",
         email: payload.email ? payload.email.replace(/(.{2}).+(@.+)/, "$1***$2") : "",
      });
      console.error("Erreur complète :", error);
      console.groupEnd();

      throw error;
   }
}

// ── Étapes ────────────────────────────────────────────────────
const ETAPES = [
   { titre: "Coordonnées", desc: "Pour vous recontacter", icon: User },
   { titre: "Profil", desc: "Situation et diplôme", icon: Briefcase },
   { titre: "Projet", desc: "Vos choix de formation", icon: Target },
   { titre: "Validation", desc: "Dernière vérification", icon: ShieldCheck },
];

// ── Composants de formulaire ──────────────────────────────────
const inputCls =
   "w-full h-12 rounded-xl border border-line bg-white px-4 text-sm text-ink placeholder:text-muted/60 outline-none transition focus:border-first focus:ring-4 focus:ring-first/10";

function Field({ label, htmlFor, name, error, hint, required, group, children }) {
   const labelCls = "block text-sm font-semibold text-ink mb-2.5";
   const star = required && <span className="text-second ml-0.5">*</span>;
   const body = (
      <>
         {children}
         {hint && !error && <p className="text-xs text-muted mt-2">{hint}</p>}
         {error && (
            <p id={`${htmlFor || name}-erreur`} className="text-xs font-medium text-red-600 mt-2 flex items-start gap-1.5">
               <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-px" /> {error}
            </p>
         )}
      </>
   );
   return group ? (
      <fieldset>
         <legend className={labelCls}>
            {label}
            {star}
         </legend>
         {body}
      </fieldset>
   ) : (
      <div>
         <label htmlFor={htmlFor} className={labelCls}>
            {label}
            {star}
         </label>
         {body}
      </div>
   );
}

// Tuiles à choisir (radio = une réponse, checkbox = plusieurs)
function Choices({ name, options, value, onChange, multiple = false, invalide = false }) {
   const isOn = (o) => (multiple ? value.includes(o) : value === o);
   const toggle = (o) => {
      if (!multiple) return onChange(o);
      onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o]);
   };
   return (
      <div className="grid sm:grid-cols-2 gap-3">
         {options.map((o) => (
            <label
               key={o}
               className={`relative cursor-pointer flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-medium transition-all
               focus-within:ring-4 focus-within:ring-first/10 ${tuileCls(isOn(o), invalide)}`}
            >
               <input
                  type={multiple ? "checkbox" : "radio"}
                  name={name}
                  checked={isOn(o)}
                  onChange={() => toggle(o)}
                  className="sr-only"
               />
               <span
                  className={`w-5 h-5 shrink-0 flex items-center justify-center border transition-colors ${
                     multiple ? "rounded-md" : "rounded-full"
                  } ${isOn(o) ? "bg-first border-first" : "border-line bg-white"}`}
               >
                  {isOn(o) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
               </span>
               {o}
            </label>
         ))}
      </div>
   );
}

// Indicateur d'étapes
function Stepper({ etape, onGo }) {
   return (
      <ol className="grid grid-cols-4 gap-2 sm:gap-4">
         {ETAPES.map((e, i) => {
            const fait = i < etape;
            const actif = i === etape;
            return (
               <li key={e.titre}>
                  <button
                     type="button"
                     onClick={() => fait && onGo(i)}
                     disabled={!fait}
                     className="w-full text-left group disabled:cursor-default"
                     aria-current={actif ? "step" : undefined}
                  >
                     <span
                        className={`block h-1.5 rounded-full mb-3 transition-colors duration-500 ${
                           fait || actif ? "bg-second" : "bg-line"
                        }`}
                     />
                     <span className="flex items-center gap-2">
                        <span
                           className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                              fait
                                 ? "bg-second text-white"
                                 : actif
                                 ? "bg-first text-white"
                                 : "bg-surface text-muted border border-line"
                           }`}
                        >
                           {fait ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
                        </span>
                        <span className="hidden sm:block min-w-0">
                           <span
                              className={`block text-sm font-semibold leading-tight ${
                                 actif ? "text-first" : "text-ink"
                              }`}
                           >
                              {e.titre}
                           </span>
                           <span className="block text-[11px] text-muted truncate">{e.desc}</span>
                        </span>
                     </span>
                  </button>
               </li>
            );
         })}
      </ol>
   );
}

function MasterPreinscription() {
   const { slug } = useParams();
   const master = getMaster(slug);
   const formRef = useRef(null);

   const opts = { ...formulaireParDefaut, ...(master?.formulaire || {}) };
   const today = new Date().toLocaleDateString("fr-FR");

   const [f, setF] = useState({
      nom: "",
      telephone: "",
      email: "",
      profil: "",
      anneesExp: "",
      anneesExpDomaine: "",
      posteEmployeur: "",
      diplome: "",
      diplomeAutre: "",
      parcours: "",
      rythme: "",
      financement: [],
      entretien: "",
      lieu: "",
      certifie: false,
   });
   const [errors, setErrors] = useState({});
   const [etape, setEtape] = useState(0);
   const [status, setStatus] = useState("idle"); // idle | sending | done | error
   // Une validation de l'étape en cours a déjà échoué : on revalide à chaque saisie,
   // pour que le rouge disparaisse dès qu'un champ est corrigé
   const [tente, setTente] = useState(false);

   if (!master) return <Navigate to="/masters" replace />;

   const set = (k) => (v) => {
      const suivant = { ...f, [k]: v };
      setF(suivant);
      if (tente) setErrors(erreursEtape(etape, suivant));
   };
   const onInput = (k) => (e) => set(k)(e.target.value);
   const estPro = f.profil === "Professionnel en activité";
   const heroImage = master.images?.[0]?.src || "/back.webp";
   const derniere = ETAPES.length - 1;

   // Avancement du dossier : calculé à partir des champs obligatoires
   const requis = [
      f.nom.trim(),
      f.telephone.trim(),
      emailOk(f.email),
      f.profil,
      !estPro || f.posteEmployeur.trim(),
      f.diplome && (f.diplome !== "Autre" || f.diplomeAutre.trim()),
      !opts.parcours || f.parcours,
      f.rythme,
      f.entretien,
      f.lieu.trim(),
      f.certifie,
   ];
   const progression = Math.round((requis.filter(Boolean).length / requis.length) * 100);

   // Validation d'une étape donnée (sur le formulaire courant ou sur une version à jour)
   function erreursEtape(i, d = f) {
      const e = {};
      const pro = d.profil === "Professionnel en activité";
      if (i === 0) {
         if (!d.nom.trim()) e.nom = "Indiquez votre nom et prénom.";
         if (verifTel(d.telephone)) e.telephone = verifTel(d.telephone);
         if (verifEmail(d.email)) e.email = verifEmail(d.email);
      }
      if (i === 1) {
         if (!d.profil) e.profil = "Choisissez votre situation actuelle.";
         if (pro && !d.posteEmployeur.trim()) e.posteEmployeur = "Indiquez votre poste et votre employeur.";
         if (!d.diplome) e.diplome = "Choisissez votre dernier diplôme.";
         if (d.diplome === "Autre" && !d.diplomeAutre.trim()) e.diplomeAutre = "Précisez votre diplôme.";
      }
      if (i === 2) {
         if (opts.parcours && !d.parcours) e.parcours = "Choisissez un parcours.";
         if (!d.rythme) e.rythme = "Choisissez un rythme.";
         if (!d.entretien) e.entretien = "Indiquez si vous souhaitez un entretien d'orientation.";
      }
      if (i === 3) {
         if (!d.lieu.trim()) e.lieu = "Indiquez la ville (« Fait à »).";
         if (!d.certifie) e.certifie = "Cochez la case pour confirmer l'exactitude des informations.";
      }
      return e;
   }

   function allerA(i) {
      setEtape(i);
      setTente(false);
      setErrors({});
      setTimeout(() => {
         formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
   }

   function suivant() {
      const e = erreursEtape(etape);
      setErrors(e);
      if (Object.keys(e).length) {
         setTente(true);
         signalerErreurs(e, ORDRE_CHAMPS);
         return;
      }
      allerA(etape + 1);
   }

   async function onSubmit(ev) {
      ev.preventDefault();
      if (etape < derniere) return suivant();

      // Revalidation complète avant l'envoi : retour à la première étape incomplète
      for (let i = 0; i <= derniere; i++) {
         const e = erreursEtape(i);
         if (Object.keys(e).length) {
            setEtape(i);
            setErrors(e);
            setTente(true);
            signalerErreurs(e, ORDRE_CHAMPS);
            return;
         }
      }

      setStatus("sending");
      try {
         await envoyerPreinscription({
            master: { slug: master.slug, sigle: master.sigle, titre: master.titre, rentree: master.rentree },
            ...f,
            parcours: f.parcours || master.titre,
            fait_le: today,
         });
         setStatus("done");
         toast.success("Votre préinscription a bien été envoyée !");
         window.scrollTo({ top: 0, behavior: "smooth" });
      }  catch (err) {
         console.error("[Préinscription] Échec côté formulaire", {
            master: master.slug,
            etape,
            message: err?.message,
            statusHttp: err?.response?.status,
            reponseServeur: err?.response?.data,
         });
         setStatus("error");
         toast.error(err?.response?.data?.message || "Échec de l'envoi. Veuillez réessayer.");
      }
   }

   // Attributs et classes d'un champ en erreur
   const err = (k) => attrsErreur(k, !!errors[k]);
   const errInput = (k) => (errors[k] ? ERR_INPUT : "");
   const errGroupe = (k) => `transition-all ${groupeErreur(!!errors[k])}`;

   // ── Succès ──
   if (status === "done") {
      return (
         <>
            <SEO
               title={`Préinscription envoyée | Master ${master.sigle}`}
               description="Votre préinscription a bien été reçue."
               path={`/masters/${master.slug}/preinscription`}
            />
            <Container className="py-28">
            <Reveal effet="zoom">
               <div className="max-w-xl mx-auto rounded-2xl border border-line bg-white p-10 text-center">
                  <span className="w-14 h-14 rounded-full bg-second/10 flex items-center justify-center mx-auto mb-5">
                     <CheckCircle2 className="w-7 h-7 text-second" />
                  </span>
                  <h1 className="text-3xl text-first mb-3">Préinscription reçue</h1>
                  <p className="text-muted leading-relaxed mb-2">
                     Merci {f.nom.split(" ")[0]}. Nous étudions votre profil pour le Master {master.sigle} et
                     nous vous recontactons rapidement.
                  </p>
                  <p className="text-sm text-muted mb-8">
                     Un email de confirmation vous a été envoyé. Le dossier de candidature complet vous sera
                     transmis après validation de votre profil.
                  </p>
                  <div className="flex justify-center gap-3 flex-wrap">
                     <Button to="/masters" variant="dark">Voir les masters</Button>
                     <Button to="/" variant="outline">Retour à l'accueil</Button>
                  </div>
               </div>
            </Reveal>
            </Container>
         </>
      );
   }

   return (
      <>
         <SEO
            title={`Préinscription Master ${master.sigle} ${master.rentree} | Groupe DGC-Formation`}
            description={`Préinscrivez-vous au Master ${master.titre} en 2 minutes.`}
            path={`/masters/${master.slug}/preinscription`}
         />

         {/* ── HERO : image du programme en fond ── */}
         <header className="relative isolate overflow-hidden bg-first">
            <img
               src={heroImage}
               alt=""
               className="absolute inset-0 -z-10 w-full h-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-first/95 via-first/65 to-first/50" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-first/70 via-transparent to-transparent" />

            <Container className="pt-28 pb-36 sm:pb-40">
            <Reveal>
               <Link
                  to={`/masters/${master.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors mb-8"
               >
                  <ArrowLeft className="w-4 h-4" /> Retour au programme
               </Link>

               <h1 className="max-w-3xl text-3xl sm:text-5xl text-white leading-tight mb-4">
                  Préinscription au Master {master.sigle}
               </h1>
               <p className="max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed mb-7">
                  {master.titre}. Deux minutes suffisent : nous étudions votre profil et vous recontactons.
               </p>

               <div className="flex flex-wrap gap-3">
                  {[
                     { icon: CalendarDays, v: `Rentrée ${master.rentree}` },
                     { icon: Clock, v: master.duree },
                     { icon: Building2, v: master.ecole },
                  ].map((c) => (
                     <span
                        key={c.v}
                        className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2 text-sm font-medium text-white"
                     >
                        <c.icon className="w-4 h-4" />
                        {c.v}
                     </span>
                  ))}
               </div>
            </Reveal>
            </Container>
         </header>

         {/* ── FORMULAIRE : remonte sur le hero ── */}
         <Container className="-mt-24 sm:-mt-28 relative z-10 pb-20">
            <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
               <Reveal effet="zoom" className="min-w-0">
               <form
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  className="rounded-3xl border border-line bg-white shadow-xl shadow-first/10 overflow-hidden scroll-mt-24"
               >
                  {/* Étapes */}
                  <div className="px-6 sm:px-10 pt-7 pb-6 border-b border-line">
                     <Stepper etape={etape} onGo={allerA} />
                  </div>

                  {/* Contenu de l'étape */}
                  <div className="p-6 sm:p-10 min-h-[360px]">
                     <AnimatePresence mode="wait">
                        <motion.div
                           key={etape}
                           initial={{ opacity: 0, x: 24 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -24 }}
                           transition={{ duration: 0.22 }}
                           className="grid gap-7"
                        >
                           <div>
                              <h2 className="text-xl sm:text-2xl text-first">{ETAPES[etape].titre}</h2>
                              <p className="text-sm text-muted mt-1">{ETAPES[etape].desc}</p>
                           </div>

                           {/* 1 — Coordonnées */}
                           {etape === 0 && (
                              <>
                                 <Field label="Nom et prénom" htmlFor="nom" error={errors.nom} required>
                                    <input id="nom" {...err("nom")} className={`${inputCls} ${errInput("nom")}`} value={f.nom} onChange={onInput("nom")} autoComplete="name" placeholder="Ex. Jean Mabiala" />
                                 </Field>
                                 <div className="grid sm:grid-cols-2 gap-5">
                                    <Field label="Téléphone / WhatsApp" htmlFor="telephone" error={errors.telephone} required>
                                       <input id="telephone" {...err("telephone")} type="tel" className={`${inputCls} ${errInput("telephone")}`} value={f.telephone} onChange={onInput("telephone")} autoComplete="tel" placeholder="+242 ..." />
                                    </Field>
                                    <Field label="Email" htmlFor="email" error={errors.email} required>
                                       <input id="email" {...err("email")} type="email" className={`${inputCls} ${errInput("email")}`} value={f.email} onChange={onInput("email")} autoComplete="email" placeholder="vous@exemple.com" />
                                    </Field>
                                 </div>
                              </>
                           )}

                           {/* 2 — Profil */}
                           {etape === 1 && (
                              <>
                                 <Field group name="profil" label="Vous êtes actuellement" error={errors.profil} required>
                                    <div {...err("profil")} className={errGroupe("profil")}>
                                       <Choices name="profil" options={opts.profils} value={f.profil} onChange={set("profil")} invalide={!!errors.profil} />
                                    </div>
                                 </Field>

                                 {estPro && (
                                    <>
                                       <div className="grid sm:grid-cols-2 gap-5">
                                          <Field label="Années d'expérience" htmlFor="anneesExp">
                                             <input id="anneesExp" type="number" min="0" className={inputCls} value={f.anneesExp} onChange={onInput("anneesExp")} placeholder="Ex. 5" />
                                          </Field>
                                          <Field label={`Dont en ${opts.domaineExperience}`} htmlFor="anneesExpDomaine">
                                             <input id="anneesExpDomaine" type="number" min="0" className={inputCls} value={f.anneesExpDomaine} onChange={onInput("anneesExpDomaine")} placeholder="Ex. 3" />
                                          </Field>
                                       </div>
                                       <Field label="Poste et employeur actuels" htmlFor="posteEmployeur" error={errors.posteEmployeur} required>
                                          <input id="posteEmployeur" {...err("posteEmployeur")} className={`${inputCls} ${errInput("posteEmployeur")}`} value={f.posteEmployeur} onChange={onInput("posteEmployeur")} placeholder="Ex. Comptable, Société X" />
                                       </Field>
                                    </>
                                 )}

                                 <Field group name={errors.diplome ? "diplome" : "diplomeAutre"} label="Dernier diplôme obtenu ou en cours" error={errors.diplome || errors.diplomeAutre} required>
                                    <div {...err("diplome")} className={errGroupe("diplome")}>
                                       <Choices name="diplome" options={opts.diplomes} value={f.diplome} onChange={set("diplome")} invalide={!!errors.diplome} />
                                    </div>
                                    {f.diplome === "Autre" && (
                                       <input {...err("diplomeAutre")} aria-label="Précisez votre diplôme" className={`${inputCls} ${errInput("diplomeAutre")} mt-3`} value={f.diplomeAutre} onChange={onInput("diplomeAutre")} placeholder="Précisez votre diplôme" />
                                    )}
                                 </Field>
                              </>
                           )}

                           {/* 3 — Projet */}
                           {etape === 2 && (
                              <>
                                 {opts.parcours && (
                                    <Field group name="parcours" label="Parcours visé" error={errors.parcours} hint={opts.parcoursHint} required>
                                       <div {...err("parcours")} className={errGroupe("parcours")}>
                                          <Choices name="parcours" options={opts.parcours} value={f.parcours} onChange={set("parcours")} invalide={!!errors.parcours} />
                                       </div>
                                    </Field>
                                 )}
                                 <Field group name="rythme" label="Rythme souhaité" error={errors.rythme} required>
                                    <div {...err("rythme")} className={errGroupe("rythme")}>
                                       <Choices name="rythme" options={opts.rythmes} value={f.rythme} onChange={set("rythme")} invalide={!!errors.rythme} />
                                    </div>
                                 </Field>
                                 <Field group label="Financement envisagé" hint="Plusieurs réponses possibles.">
                                    <Choices name="financement" multiple options={opts.financements} value={f.financement} onChange={set("financement")} />
                                 </Field>
                                 <Field group name="entretien" label="Souhaitez-vous un entretien d'orientation ?" error={errors.entretien} required>
                                    <div {...err("entretien")} className={errGroupe("entretien")}>
                                       <Choices name="entretien" options={["Oui", "Non"]} value={f.entretien} onChange={set("entretien")} invalide={!!errors.entretien} />
                                    </div>
                                 </Field>
                              </>
                           )}

                           {/* 4 — Validation */}
                           {etape === 3 && (
                              <>
                                 {/* Récapitulatif */}
                                 <dl className="rounded-2xl border border-line bg-surface divide-y divide-line text-sm">
                                    {[
                                       ["Nom", f.nom],
                                       ["Téléphone", f.telephone],
                                       ["Email", f.email],
                                       ["Situation", f.profil],
                                       ["Diplôme", f.diplome === "Autre" ? f.diplomeAutre : f.diplome],
                                       opts.parcours && ["Parcours", f.parcours],
                                       ["Rythme", f.rythme],
                                       ["Financement", f.financement.join(", ") || "Non précisé"],
                                       ["Entretien", f.entretien],
                                    ]
                                       .filter(Boolean)
                                       .map(([k, v]) => (
                                          <div key={k} className="flex items-start justify-between gap-4 px-5 py-3">
                                             <dt className="text-muted">{k}</dt>
                                             <dd className="font-semibold text-ink text-right">{v || "—"}</dd>
                                          </div>
                                       ))}
                                 </dl>

                                 <div className="grid sm:grid-cols-2 gap-5">
                                    <Field label="Fait à" htmlFor="lieu" error={errors.lieu} required>
                                       <input id="lieu" {...err("lieu")} className={`${inputCls} ${errInput("lieu")}`} value={f.lieu} onChange={onInput("lieu")} placeholder="Ex. Pointe-Noire" />
                                    </Field>
                                    <Field label="Le" htmlFor="date">
                                       <input id="date" className={`${inputCls} bg-surface`} value={today} readOnly />
                                    </Field>
                                 </div>

                                 <div>
                                    <label
                                       className={`flex items-start gap-3 cursor-pointer rounded-xl transition-all ${
                                          errors.certifie ? "border border-red-300 bg-red-50/50 p-3" : ""
                                       }`}
                                    >
                                       <input
                                          type="checkbox"
                                          {...err("certifie")}
                                          checked={f.certifie}
                                          onChange={(e) => set("certifie")(e.target.checked)}
                                          className="mt-1 w-4 h-4 accent-[#0a4275]"
                                       />
                                       <span className="text-sm text-muted leading-relaxed">
                                          Je certifie l'exactitude des informations ci-dessus. Cette préinscription ne vaut
                                          pas inscription définitive.
                                       </span>
                                    </label>
                                    {errors.certifie && (
                                       <p id="certifie-erreur" className="text-xs font-medium text-red-600 mt-2 flex items-center gap-1.5">
                                          <AlertCircle className="w-3.5 h-3.5" /> {errors.certifie}
                                       </p>
                                    )}
                                 </div>
                              </>
                           )}
                        </motion.div>
                     </AnimatePresence>
                  </div>

                  {/* Barre de navigation */}
                  <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 border-t border-line bg-surface px-6 sm:px-10 py-5">
                     <div className="flex items-center gap-4">
                        {etape > 0 && (
                           <button
                              type="button"
                              onClick={() => allerA(etape - 1)}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-first hover:text-second transition-colors"
                           >
                              <ArrowLeft className="w-4 h-4" /> Précédent
                           </button>
                        )}
                        <p className="text-sm text-muted" aria-live="polite">
                           {status === "error" ? (
                              <span className="text-red-600 flex items-center gap-2">
                                 <AlertCircle className="w-4 h-4" /> L'envoi a échoué, réessayez.
                              </span>
                           ) : (
                              <>Étape {etape + 1} sur {ETAPES.length}</>
                           )}
                        </p>
                     </div>

                     {etape < derniere ? (
                        <button
                           type="button"
                           onClick={suivant}
                           className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-first text-white font-semibold px-7 py-3.5 shadow-lg shadow-first/20 hover:bg-first/90 transition-all"
                        >
                           Continuer <ArrowRight className="w-4 h-4" />
                        </button>
                     ) : (
                        <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={status === "sending"}>
                           {status === "sending" ? (
                              <>
                                 <Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours
                              </>
                           ) : (
                              <>
                                 Envoyer ma préinscription <Send className="w-4 h-4" />
                              </>
                           )}
                        </Button>
                     )}
                  </div>
               </form>
               </Reveal>

               {/* ── RÉCAP ── */}
               <aside className="lg:sticky lg:top-28">
               <Reveal effet="droite" i={2} className="grid gap-4">
                  <div className="rounded-2xl border border-line bg-white p-6 shadow-xl shadow-first/10">
                     <p className="text-xs font-semibold text-muted mb-3">Master sélectionné</p>
                     <div className="flex items-center gap-3 mb-5">
                        <span className="font-display text-xl text-first bg-first/8 rounded-xl px-3 py-2 leading-none">
                           {master.sigle}
                        </span>
                        <h3 className="text-base text-first leading-snug">{master.titre}</h3>
                     </div>

                     <div className="mb-5">
                        <div className="flex items-center justify-between text-xs font-semibold text-ink mb-2">
                           <span>Avancement</span>
                           <span className="tabular-nums">{progression} %</span>
                        </div>
                        <div
                           className="h-1.5 rounded-full bg-line overflow-hidden"
                           role="progressbar"
                           aria-valuenow={progression}
                           aria-valuemin={0}
                           aria-valuemax={100}
                        >
                           <div
                              className="h-full rounded-full bg-second transition-[width] duration-500"
                              style={{ width: `${progression}%` }}
                           />
                        </div>
                     </div>

                     <Link to="/masters" className="text-sm font-semibold text-first hover:text-second transition-colors">
                        Choisir un autre master
                     </Link>
                  </div>

                  <Link
                     to="/contact"
                     className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-sm font-semibold text-first hover:border-first/30 transition-colors"
                  >
                     <MessageCircle className="w-4 h-4 text-second" />
                     Une question avant de vous inscrire ?
                  </Link>

                  <p className="text-[11px] text-muted leading-relaxed px-1">{agrement}</p>
               </Reveal>
               </aside>
            </div>
         </Container>
      </>
   );
}

export default MasterPreinscription;