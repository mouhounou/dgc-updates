/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
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
   Building2,
   Loader2,
   AlertCircle,
   MessageCircle,
   User,
   BookOpen,
   Briefcase,
   ShieldCheck,
   GraduationCap,
   Network,
   Zap,
   Cog,
   HardHat,
   ChartGantt,
   Timer,
} from "lucide-react";
import { Container, Button, Reveal } from "../components/ui";
import { SEO } from "../lib/SEO";
import { ecoles } from "../data/site";
import { masters, agrement } from "../data/masters";
import { emailOk, verifEmail, verifTel, ERR_INPUT, errGroupe as groupeErreur, tuileCls, attrsErreur, signalerErreurs } from "../lib/validation";

// ── API ───────────────────────────────────────────────────────
const API_URL = "https://api.dgc.informatiky.com";

async function envoyerPreinscription(payload) {
   const url = `${API_URL}/api/mail/inscription`;
   const debut = performance.now();

   try {
      const res = await axios.post(url, payload);
      if (!res.data?.success) {
         console.error("[Préinscription licence] Réponse reçue mais success=false", {
            url,
            status: res.status,
            data: res.data,
            dureeMs: Math.round(performance.now() - debut),
         });
         throw new Error(res.data?.message || "Envoi impossible");
      }
      return res.data;
   } catch (error) {
      let type = "ERREUR_INCONNUE";
      if (error.response) type = "REPONSE_SERVEUR_ERREUR";
      else if (error.code === "ECONNABORTED") type = "TIMEOUT";
      else if (error.request) type = "AUCUNE_REPONSE_RESEAU";

      console.group(`[Préinscription licence] Échec de la requête : ${type}`);
      console.error("Date :", new Date().toISOString());
      console.error("Durée :", `${Math.round(performance.now() - debut)} ms`);
      console.error("URL :", url);
      console.error("Message :", error.message);
      console.error("Code axios :", error.code);
      console.error("En ligne ? :", navigator.onLine);
      if (error.response) {
         console.error("Status HTTP :", error.response.status, error.response.statusText);
         console.error("Corps de la réponse :", error.response.data);
      }
      console.error("Payload envoyé :", {
         ...payload,
         phone: payload.phone ? "***" + String(payload.phone).slice(-3) : "",
         email: payload.email ? payload.email.replace(/(.{2}).+(@.+)/, "$1***$2") : "",
      });
      console.error("Erreur complète :", error);
      console.groupEnd();
      throw error;
   }
}

// ── Données ───────────────────────────────────────────────────
const MASTERS = "MASTERS"; // valeur spéciale de l'onglet « Masters »

const niveaux = [
   { value: "bepc", label: "BEPC / Brevet" },
   { value: "bac", label: "Baccalauréat" },
   { value: "bac2", label: "Bac +2" },
   { value: "bac3", label: "Bac +3 et plus" },
   { value: "autre", label: "Autre" },
];

const situations = [
   { value: "etudiant", label: "Étudiant(e)" },
   { value: "employe", label: "En emploi" },
   { value: "demandeur", label: "En recherche d'emploi" },
   { value: "reconversion", label: "En reconversion professionnelle" },
];

const ETAPES = [
   { titre: "Coordonnées", desc: "Pour vous recontacter", icon: User },
   { titre: "Formation", desc: "École et filière", icon: BookOpen },
   { titre: "Profil", desc: "Niveau et situation", icon: Briefcase },
   { titre: "Validation", desc: "Dernière vérification", icon: ShieldCheck },
];

const labelDe = (liste, valeur) => liste.find((o) => o.value === valeur)?.label;

// Icônes des catégories de formations du CCPM
const ICONES_GROUPE = { network: Network, electrique: Zap, mecanique: Cog, civil: HardHat, projet: ChartGantt };

// Ordre d'affichage des champs (notification et défilement vers le premier à corriger)
const ORDRE_CHAMPS = ["firstName", "lastName", "phone", "email", "programme", "niveauEtudes", "situationPro", "certifie"];

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

// Tuiles à choisir (une seule réponse). options : [{ value, label }]
function Choices({ name, options, value, onChange, invalide }) {
   return (
      <div className="grid sm:grid-cols-2 gap-3">
         {options.map((o) => {
            const on = value === o.value;
            return (
               <label
                  key={o.value}
                  className={`relative cursor-pointer flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-medium transition-all
                  focus-within:ring-4 focus-within:ring-first/10 ${tuileCls(on, invalide)}`}
               >
                  <input
                     type="radio"
                     name={name}
                     checked={on}
                     onChange={() => onChange(o.value)}
                     className="sr-only"
                  />
                  <span
                     className={`w-5 h-5 shrink-0 flex items-center justify-center rounded-full border transition-colors ${
                        on ? "bg-first border-first" : "border-line bg-white"
                     }`}
                  >
                     {on && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </span>
                  {o.label}
               </label>
            );
         })}
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

// ── Page ──────────────────────────────────────────────────────
const emptyForm = {
   firstName: "",
   lastName: "",
   phone: "",
   email: "",
   ecole: "",
   programme: "",
   typeFormation: "", // « universitaire », « courte » (Académie Cisco) ou « technique »
   niveauEtudes: "",
   situationPro: "",
   comments: "",
   certifie: false,
};

function Preinscription() {
   const formRef = useRef(null);
   const [f, setF] = useState(emptyForm);
   const [errors, setErrors] = useState({});
   const [etape, setEtape] = useState(0);
   const [status, setStatus] = useState("idle"); // idle | sending | done | error
   const [onglet, setOnglet] = useState(ecoles[0].sigle);

   const derniere = ETAPES.length - 1;
   const isMasters = onglet === MASTERS;
   const ecoleActive = ecoles.find((e) => e.sigle === onglet) || ecoles[0];

   // Une validation de l'étape en cours a déjà échoué : on revalide à chaque saisie,
   // pour que le rouge disparaisse dès qu'un champ est corrigé
   const [tente, setTente] = useState(false);

   const maj = (suivant) => {
      setF(suivant);
      if (tente) setErrors(erreursEtape(etape, suivant));
   };
   const set = (k) => (v) => maj({ ...f, [k]: v });
   const onInput = (k) => (e) => set(k)(e.target.value);

   const choisirFiliere = (ecole, filiere, type = "universitaire") => {
      const programme =
         ecole.sigle === "CCPM" ? `${filiere} (CCPM)` : `Licence ${filiere} (${ecole.sigle})`;
      maj({ ...f, ecole: ecole.sigle, programme, typeFormation: type });
   };

   // Avancement du dossier : calculé à partir des champs obligatoires
   const requis = [
      f.firstName.trim(),
      f.lastName.trim(),
      f.phone.trim(),
      emailOk(f.email),
      f.programme,
      f.niveauEtudes,
      f.situationPro,
      f.certifie,
   ];
   const progression = Math.round((requis.filter(Boolean).length / requis.length) * 100);

   // Validation d'une étape donnée (sur le formulaire courant ou sur une version à jour)
   function erreursEtape(i, d = f) {
      const e = {};
      if (i === 0) {
         if (!d.firstName.trim()) e.firstName = "Indiquez votre prénom.";
         if (!d.lastName.trim()) e.lastName = "Indiquez votre nom.";
         if (verifTel(d.phone)) e.phone = verifTel(d.phone);
         if (verifEmail(d.email)) e.email = verifEmail(d.email);
      }
      if (i === 1) {
         if (!d.programme) e.programme = "Choisissez l'école et la formation qui vous intéressent.";
      }
      if (i === 2) {
         if (!d.niveauEtudes) e.niveauEtudes = "Sélectionnez votre niveau d'études.";
         if (!d.situationPro) e.situationPro = "Sélectionnez votre situation professionnelle.";
      }
      if (i === 3) {
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
            firstName: f.firstName.trim(),
            lastName: f.lastName.trim(),
            email: f.email.trim(),
            phone: f.phone.trim(),
            typeFormation: f.typeFormation || (f.ecole === "CCPM" ? "courte" : "universitaire"),
            programme: f.programme,
            niveauEtudes: f.niveauEtudes,
            situationPro: f.situationPro,
            comments: f.comments,
            site: "dgc", // e-mails envoyés au nom du Groupe DGC-Formation
         });
         setStatus("done");
         toast.success("Votre préinscription a bien été envoyée !");
         window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
         console.error("[Préinscription licence] Échec côté formulaire", {
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
   const errGroupe = (k) => groupeErreur(!!errors[k]);

   const tabCls = (on) =>
      `shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
         on
            ? "border-first bg-first text-white shadow-sm"
            : "border-line bg-white text-ink hover:border-first/40"
      }`;

   // ── Succès ──
   if (status === "done") {
      return (
         <>
            <SEO
               title="Préinscription envoyée | Groupe DGC-Formation"
               description="Votre préinscription a bien été reçue."
               path="/preinscription"
            />
            <Container className="py-28">
            <Reveal effet="zoom">
               <div className="max-w-xl mx-auto rounded-2xl border border-line bg-white p-10 text-center">
                  <span className="w-14 h-14 rounded-full bg-second/10 flex items-center justify-center mx-auto mb-5">
                     <CheckCircle2 className="w-7 h-7 text-second" />
                  </span>
                  <h1 className="text-3xl text-first mb-3">Préinscription reçue</h1>
                  <p className="text-muted leading-relaxed mb-2">
                     Merci {f.firstName}. Nous étudions votre demande pour « {f.programme} » et nous
                     vous recontactons rapidement.
                  </p>
                  <p className="text-sm text-muted mb-8">
                     Un email de confirmation vous a été envoyé. Notre équipe d'orientation vous
                     accompagnera pour finaliser votre inscription.
                  </p>
                  <div className="flex justify-center gap-3 flex-wrap">
                     <Button
                        variant="dark"
                        onClick={() => {
                           setF(emptyForm);
                           setEtape(0);
                           setErrors({});
                           setTente(false);
                           setStatus("idle");
                        }}
                     >
                        Nouvelle préinscription
                     </Button>
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
            title="Préinscription en ligne | Groupe DGC-Formation"
            description="Préinscrivez-vous en ligne au Groupe DGC-Formation : choisissez votre école (ESGC, ESIT, ESUP, CCPM) ou votre master. Notre équipe vous recontacte rapidement."
            path="/preinscription"
         />

         {/* ── HERO : image en fond ── */}
         <header className="relative isolate overflow-hidden bg-first">
            <img
               src="/story5.jpg"
               alt=""
               className="absolute inset-0 -z-10 w-full h-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-first/95 via-first/65 to-first/50" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-first/70 via-transparent to-transparent" />

            <Container className="pt-28 pb-36 sm:pb-40">
            <Reveal>
               <p className="text-sm font-semibold text-white/80 mb-4">Places limitées</p>
               <h1 className="max-w-3xl text-3xl sm:text-5xl text-white leading-tight mb-4">
                  Préinscription en ligne
               </h1>
               <p className="max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed mb-7">
                  Réservez votre place en quelques minutes. Notre équipe vous recontacte pour
                  finaliser votre dossier.
               </p>

               <div className="flex flex-wrap gap-3">
                  {[
                     { icon: Clock, v: "2 minutes" },
                     { icon: ShieldCheck, v: "Sans engagement" },
                     { icon: Building2, v: "ESGC · ESIT · ESUP · CCPM" },
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
                                 <div className="grid sm:grid-cols-2 gap-5">
                                    <Field label="Prénom" htmlFor="firstName" error={errors.firstName} required>
                                       <input id="firstName" {...err("firstName")} className={`${inputCls} ${errInput("firstName")}`} value={f.firstName} onChange={onInput("firstName")} autoComplete="given-name" placeholder="Ex. Jean-Pierre" />
                                    </Field>
                                    <Field label="Nom" htmlFor="lastName" error={errors.lastName} required>
                                       <input id="lastName" {...err("lastName")} className={`${inputCls} ${errInput("lastName")}`} value={f.lastName} onChange={onInput("lastName")} autoComplete="family-name" placeholder="Ex. Moukala" />
                                    </Field>
                                 </div>
                                 <div className="grid sm:grid-cols-2 gap-5">
                                    <Field label="Téléphone / WhatsApp" htmlFor="phone" error={errors.phone} required>
                                       <input id="phone" {...err("phone")} type="tel" className={`${inputCls} ${errInput("phone")}`} value={f.phone} onChange={onInput("phone")} autoComplete="tel" placeholder="+242 06 000 00 00" />
                                    </Field>
                                    <Field label="Email" htmlFor="email" error={errors.email} required>
                                       <input id="email" {...err("email")} type="email" className={`${inputCls} ${errInput("email")}`} value={f.email} onChange={onInput("email")} autoComplete="email" placeholder="vous@exemple.com" />
                                    </Field>
                                 </div>
                              </>
                           )}

                           {/* 2 — Formation */}
                           {etape === 1 && (
                              <Field group name="programme" label="École et filière" error={errors.programme} required>
                                 <div {...err("programme")} tabIndex={errors.programme ? -1 : undefined} className={`grid gap-5 outline-none transition-all ${errGroupe("programme")}`}>
                                    {/* Onglets écoles + masters */}
                                    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                                       {ecoles.map((e) => (
                                          <button
                                             key={e.sigle}
                                             type="button"
                                             onClick={() => setOnglet(e.sigle)}
                                             className={tabCls(onglet === e.sigle)}
                                          >
                                             <span className="w-2 h-2 rounded-full" style={{ background: e.accent }} />
                                             {e.sigle}
                                          </button>
                                       ))}
                                       <button
                                          type="button"
                                          onClick={() => setOnglet(MASTERS)}
                                          className={tabCls(isMasters)}
                                       >
                                          <GraduationCap className="w-4 h-4" />
                                          Masters
                                       </button>
                                    </div>

                                    {isMasters ? (
                                       <div className="grid gap-3">
                                          <p className="text-sm text-muted">
                                             Les masters ont leur propre formulaire de préinscription.
                                          </p>
                                          {masters.map((m) => (
                                             <Link
                                                key={m.slug}
                                                to={`/masters/${m.slug}/preinscription`}
                                                className="flex items-center gap-4 rounded-xl border border-line bg-white px-4 py-3.5 transition-all hover:border-first/40 hover:-translate-y-px"
                                             >
                                                <span className="font-display text-lg text-first bg-first/8 rounded-xl px-3 py-2 leading-none shrink-0">
                                                   {m.sigle}
                                                </span>
                                                <span className="min-w-0 flex-1">
                                                   <span className="block text-sm font-semibold text-ink leading-snug">
                                                      {m.titre}
                                                   </span>
                                                   <span className="block text-xs text-muted mt-0.5">
                                                      Rentrée {m.rentree} · {m.duree}
                                                   </span>
                                                </span>
                                                <ArrowRight className="w-4 h-4 text-first shrink-0" />
                                             </Link>
                                          ))}
                                       </div>
                                    ) : (
                                       <>
                                          <div className="flex items-start gap-3">
                                             <span
                                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                                                style={{ background: ecoleActive.accent }}
                                             >
                                                <Building2 className="w-5 h-5" />
                                             </span>
                                             <div>
                                                <p className="font-semibold text-ink leading-tight">{ecoleActive.nom}</p>
                                                <p className="text-xs text-muted mt-0.5">{ecoleActive.domaine}</p>
                                             </div>
                                          </div>

                                          {(ecoleActive.groupes || [{ id: "licence", type: "universitaire", formations: ecoleActive.filieres.map((titre) => ({ titre })) }]).map((g) => {
                                             const Icone = ICONES_GROUPE[g.icone];
                                             return (
                                                <div key={g.id} className="grid gap-3">
                                                   {g.titre && (
                                                      <div className="flex items-center gap-2.5 pt-1">
                                                         {Icone && (
                                                            <span className="w-7 h-7 rounded-lg bg-second/10 text-second flex items-center justify-center shrink-0">
                                                               <Icone className="w-4 h-4" />
                                                            </span>
                                                         )}
                                                         <span className="min-w-0">
                                                            <span className="block text-xs font-bold uppercase tracking-wider text-ink">{g.titre}</span>
                                                            {g.info && <span className="block text-[11px] text-muted">{g.info}</span>}
                                                         </span>
                                                      </div>
                                                   )}
                                                   <div className="grid sm:grid-cols-2 gap-3">
                                                      {g.formations.map(({ titre, duree }) => {
                                                         const value =
                                                            ecoleActive.sigle === "CCPM"
                                                               ? `${titre} (CCPM)`
                                                               : `Licence ${titre} (${ecoleActive.sigle})`;
                                                         const on = f.programme === value;
                                                         return (
                                                            <label
                                                               key={titre}
                                                               className={`relative cursor-pointer flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-medium transition-all focus-within:ring-4 focus-within:ring-first/10 ${tuileCls(on, !!errors.programme)}`}
                                                            >
                                                               <input
                                                                  type="radio"
                                                                  name="programme"
                                                                  checked={on}
                                                                  onChange={() => choisirFiliere(ecoleActive, titre, g.type)}
                                                                  className="sr-only"
                                                               />
                                                               <span
                                                                  className={`w-5 h-5 shrink-0 flex items-center justify-center rounded-full border transition-colors ${
                                                                     on ? "bg-first border-first" : "border-line bg-white"
                                                                  }`}
                                                               >
                                                                  {on && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                                               </span>
                                                               <span className="min-w-0 flex-1 leading-snug">{titre}</span>
                                                               {duree && (
                                                                  <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-surface border border-line px-2 py-0.5 text-[11px] font-semibold text-muted">
                                                                     <Timer className="w-3 h-3" />
                                                                     {duree}
                                                                  </span>
                                                               )}
                                                            </label>
                                                         );
                                                      })}
                                                   </div>
                                                </div>
                                             );
                                          })}
                                       </>
                                    )}
                                 </div>
                              </Field>
                           )}

                           {/* 3 — Profil */}
                           {etape === 2 && (
                              <>
                                 <Field group name="niveauEtudes" label="Niveau d'études" error={errors.niveauEtudes} required>
                                    <div {...err("niveauEtudes")} className={`transition-all ${errGroupe("niveauEtudes")}`}>
                                       <Choices name="niveauEtudes" options={niveaux} value={f.niveauEtudes} onChange={set("niveauEtudes")} invalide={!!errors.niveauEtudes} />
                                    </div>
                                 </Field>
                                 <Field group name="situationPro" label="Votre situation" error={errors.situationPro} required>
                                    <div {...err("situationPro")} className={`transition-all ${errGroupe("situationPro")}`}>
                                       <Choices name="situationPro" options={situations} value={f.situationPro} onChange={set("situationPro")} invalide={!!errors.situationPro} />
                                    </div>
                                 </Field>
                                 <Field label="Motivation / questions" htmlFor="comments" hint="Facultatif.">
                                    <textarea
                                       id="comments"
                                       rows={4}
                                       className={`${inputCls} h-auto py-3 resize-none`}
                                       value={f.comments}
                                       onChange={onInput("comments")}
                                       placeholder="Pourquoi souhaitez-vous rejoindre le Groupe DGC ?"
                                    />
                                 </Field>
                              </>
                           )}

                           {/* 4 — Validation */}
                           {etape === 3 && (
                              <>
                                 <dl className="rounded-2xl border border-line bg-surface divide-y divide-line text-sm">
                                    {[
                                       ["Nom", `${f.firstName} ${f.lastName}`.trim()],
                                       ["Téléphone", f.phone],
                                       ["Email", f.email],
                                       ["Formation", f.programme],
                                       ["Niveau", labelDe(niveaux, f.niveauEtudes)],
                                       ["Situation", labelDe(situations, f.situationPro)],
                                       ["Motivation", f.comments.trim() || "Non précisée"],
                                    ].map(([k, v]) => (
                                       <div key={k} className="flex items-start justify-between gap-4 px-5 py-3">
                                          <dt className="text-muted">{k}</dt>
                                          <dd className="font-semibold text-ink text-right">{v || "—"}</dd>
                                       </div>
                                    ))}
                                 </dl>

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
                                          Je certifie l'exactitude des informations ci-dessus. Cette préinscription ne
                                          vaut pas inscription définitive.
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
                     <p className="text-xs font-semibold text-muted mb-3">Formation sélectionnée</p>
                     {f.programme ? (
                        <div className="flex items-start gap-3 mb-5">
                           <span className="w-9 h-9 rounded-xl bg-first/10 flex items-center justify-center shrink-0">
                              <GraduationCap className="w-4 h-4 text-first" />
                           </span>
                           <h3 className="text-base text-first leading-snug">{f.programme}</h3>
                        </div>
                     ) : (
                        <p className="text-sm text-muted mb-5">Aucune formation choisie pour le moment.</p>
                     )}

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

                     <button
                        type="button"
                        onClick={() => {
                           setOnglet(MASTERS);
                           allerA(1);
                        }}
                        className="text-sm font-semibold text-first hover:text-second transition-colors"
                     >
                        Vous visez un master ?
                     </button>
                  </div>

                  <Link
                     to="/contact"
                     className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-sm font-semibold text-first hover:border-first/30 transition-colors"
                  >
                     <MessageCircle className="w-4 h-4 text-second" />
                     Une question avant de vous inscrire ?
                  </Link>

                  {agrement && (
                     <p className="text-[11px] text-muted leading-relaxed px-1">{agrement}</p>
                  )}
               </Reveal>
               </aside>
            </div>
         </Container>
      </>
   );
}

export default Preinscription;