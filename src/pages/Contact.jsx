/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
   Phone,
   Mail,
   MapPin,
   Clock,
   ShieldCheck,
   GraduationCap,
   MessageCircleQuestion,
   Plus,
   Minus,
   Send,
   Loader2,
   AlertCircle,
} from "lucide-react";
import { Container, PageHero, Eyebrow, Reveal } from "../components/ui";
import { SEO, buildFaqJsonLd } from "../lib/SEO";
import { contactInfo } from "../data/site";
import { verifEmail, verifTel, ERR_INPUT, attrsErreur, signalerErreurs } from "../lib/validation";

// Validation du formulaire de contact
const ORDRE_CONTACT = ["name", "email", "phone", "subject", "message"];
const validerContact = (d) => ({
   name: d.name.trim() ? undefined : "Indiquez votre nom complet.",
   email: verifEmail(d.email),
   phone: verifTel(d.phone),
   subject: d.subject ? undefined : "Choisissez le sujet de votre message.",
   message: d.message.trim() ? undefined : "Écrivez votre message.",
});

const BENEFITS = [
   {
      icon: ShieldCheck,
      title: "Orientation gratuite",
      desc: "Nos conseillers vous aident à choisir la filière adaptée à votre projet, sans engagement.",
   },
   {
      icon: Clock,
      title: "Réponse rapide",
      desc: "Nous revenons vers vous sous 24 à 48h ouvrées après votre message.",
   },
   {
      icon: GraduationCap,
      title: "Accompagnement complet",
      desc: "De la préinscription à l'intégration, notre équipe vous suit à chaque étape.",
   },
];

const FAQ = [
   {
      q: "Quand ont lieu les inscriptions ?",
      a: "Les inscriptions sont ouvertes toute l'année, avec des rentrées principales en octobre et en février. Contactez le service recrutement pour connaître les places disponibles.",
   },
   {
      q: "Quels documents fournir pour s'inscrire ?",
      a: "En général : une pièce d'identité, les relevés de notes et diplômes obtenus, des photos d'identité et le formulaire d'inscription. La liste exacte vous est communiquée lors de la préinscription.",
   },
   {
      q: "Comment se déroule la préinscription en ligne ?",
      a: "Remplissez le formulaire de préinscription en choisissant votre école et votre filière. Notre équipe vous recontacte ensuite pour finaliser votre dossier.",
   },
   {
      q: "Puis-je changer de filière après mon inscription ?",
      a: "Une réorientation reste possible en début de cycle, selon les places disponibles. Parlez-en à votre conseiller d'orientation.",
   },
   {
      q: "Proposez-vous des facilités de paiement ?",
      a: "Oui, des échéanciers de paiement peuvent être mis en place. Renseignez-vous auprès du secrétariat pour connaître les modalités.",
   },
   {
      q: "Puis-je visiter le campus avant de m'inscrire ?",
      a: "Bien sûr ! Vous êtes les bienvenus aux heures d'ouverture pour découvrir nos infrastructures. Prenez rendez-vous par téléphone pour être accueilli par un conseiller.",
   },
   {
      q: "Les cours ont-ils lieu en présentiel ?",
      a: "Oui, l'enseignement se déroule principalement en présentiel sur notre campus de Pointe-Noire, avec des travaux pratiques en laboratoires et des stages en entreprise.",
   },
];

const MAP_SRC =
   "https://www.google.com/maps?q=Groupe%20DGC%20Formation%20Pointe-Noire&output=embed";

function FaqItem({ item, open, onToggle }) {
   return (
      <div
         className={`rounded-2xl border transition-colors ${
            open ? "border-first/30 bg-surface" : "border-line bg-white"
         }`}
      >
         <button
            onClick={onToggle}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
         >
            <span className="font-semibold text-ink">{item.q}</span>
            <span className="shrink-0 w-7 h-7 rounded-full bg-first text-white flex items-center justify-center">
               {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </span>
         </button>
         <div
            className={`overflow-hidden transition-all duration-300 ${
               open ? "max-h-52" : "max-h-0"
            }`}
         >
            <p className="px-5 pb-5 text-sm text-muted leading-relaxed">{item.a}</p>
         </div>
      </div>
   );
}

function Contact() {
   const [form, setForm] = useState({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
   });
   const [loading, setLoading] = useState(false);
   const [openFaq, setOpenFaq] = useState(0);
   const [erreurs, setErreurs] = useState({});
   const [tente, setTente] = useState(false); // une soumission a déjà été tentée

   // Après une tentative, le rouge disparaît dès qu'un champ est corrigé
   const onChange = (e) => {
      const suivant = { ...form, [e.target.name]: e.target.value };
      setForm(suivant);
      if (tente) setErreurs(validerContact(suivant));
   };

   const onSubmit = async (e) => {
      e.preventDefault();
      const verif = validerContact(form);
      setTente(true);
      setErreurs(verif);
      if (Object.values(verif).some(Boolean)) {
         signalerErreurs(verif, ORDRE_CONTACT);
         return;
      }
      setLoading(true);
      try {
         const res = await axios.post(
            "https://api.dgc.informatiky.com/api/mail/mailler",
            { ...form, site: "dgc" } // e-mails envoyés au nom du Groupe DGC-Formation
         );
         if (res.data.success) {
            toast.success("Votre message a bien été envoyé !");
            setForm({ name: "", email: "", phone: "", subject: "", message: "" });
            setTente(false);
            setErreurs({});
         } else {
            toast.error(res.data.message || "Une erreur est survenue.");
         }
      } catch (err) {
         toast.error("Échec de l'envoi. Veuillez réessayer.");
      } finally {
         setLoading(false);
      }
   };

   const inputClass =
      "w-full px-4 py-3 rounded-xl border border-line bg-white focus:border-first focus:outline-none focus:ring-2 focus:ring-first/15 transition";
   // Classes et attributs d'un champ, selon qu'il est en erreur
   const champ = (k, extra = "") => ({
      id: `contact-${k}`,
      name: k,
      value: form[k],
      onChange,
      className: `${inputClass} ${extra} ${erreurs[k] ? ERR_INPUT : ""}`,
      ...attrsErreur(`contact-${k}`, !!erreurs[k]),
   });
   const erreur = (k) =>
      erreurs[k] ? (
         <p id={`contact-${k}-erreur`} className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-600">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-px" /> {erreurs[k]}
         </p>
      ) : null;

   return (
      <>
         <SEO
            title="Contact | Groupe DGC-Formation — Pointe-Noire"
            description="Contactez le Groupe DGC-Formation à Pointe-Noire : secrétariat, recrutement, email, carte et formulaire. Réponse sous 24 à 48h ouvrées."
            path="/contact"
            jsonLd={[buildFaqJsonLd(FAQ)]}
         />
         <PageHero
            eyebrow="Contact"
            title="Parlons de votre avenir"
            subtitle="Une question sur nos formations ou vos inscriptions ? Notre équipe vous répond rapidement."
            image="/batiment.webp"
         />

         {/* ── Bénéfices + Formulaire ─────────────────────────── */}
         <section className="py-20 sm:py-24">
            <Container>
               <div className="grid gap-12 lg:grid-cols-[1fr_460px]">
                  {/* Colonne infos */}
                  <Reveal effet="gauche">
                     <Eyebrow>Pourquoi nous contacter</Eyebrow>
                     <h2 className="mt-4 text-2xl sm:text-3xl text-first">
                        Un échange pour cadrer votre projet d'études
                     </h2>
                     <p className="mt-4 leading-relaxed text-muted">
                        Que vous ayez déjà choisi votre filière ou que vous hésitiez
                        encore, notre équipe d'orientation est là pour vous guider vers
                        la formation la plus adaptée à vos ambitions.
                     </p>

                     <ul className="mt-8 flex flex-col gap-5">
                        {BENEFITS.map(({ icon: Icon, title, desc }) => (
                           <li key={title} className="flex items-start gap-4">
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-first/10 text-first">
                                 <Icon className="h-5 w-5" />
                              </span>
                              <div>
                                 <p className="font-semibold text-ink">{title}</p>
                                 <p className="mt-1 text-sm leading-relaxed text-muted">
                                    {desc}
                                 </p>
                              </div>
                           </li>
                        ))}
                     </ul>

                     {/* Coordonnées */}
                     <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-line bg-surface p-6 text-sm text-muted">
                        <a
                           href={`tel:${contactInfo.secretariat.replace(/\s/g, "")}`}
                           className="flex items-center gap-2 hover:text-first transition-colors"
                        >
                           <Phone className="h-4 w-4 text-first" />
                           {contactInfo.secretariat} — Secrétariat
                        </a>
                        <a
                           href={`tel:${contactInfo.recrutement.replace(/\s/g, "")}`}
                           className="flex items-center gap-2 hover:text-first transition-colors"
                        >
                           <Phone className="h-4 w-4 text-first" />
                           {contactInfo.recrutement} — Recrutement
                        </a>
                        <a
                           href={`mailto:${contactInfo.email}`}
                           className="flex items-center gap-2 hover:text-first transition-colors"
                        >
                           <Mail className="h-4 w-4 text-first" />
                           {contactInfo.email}
                        </a>
                        <span className="flex items-start gap-2">
                           <MapPin className="h-4 w-4 text-first mt-0.5 shrink-0" />
                           {contactInfo.adresse}
                        </span>
                        <span className="flex items-start gap-2">
                           <Clock className="h-4 w-4 text-first mt-0.5 shrink-0" />
                           <span>
                              {contactInfo.horaires.map((h) => (
                                 <span key={h} className="block">
                                    {h}
                                 </span>
                              ))}
                           </span>
                        </span>
                     </div>
                  </Reveal>

                  {/* Formulaire */}
                  <Reveal effet="droite" i={1}>
                     <form
                        onSubmit={onSubmit}
                        noValidate
                        className="card-soft p-6 sm:p-8 lg:sticky lg:top-24"
                     >
                        <h3 className="text-xl text-first mb-1">Envoyez-nous un message</h3>
                        <p className="text-sm text-muted mb-6">
                           Nous vous répondons sous 24 à 48h ouvrées.
                        </p>

                        <div className="space-y-4">
                           <div>
                              <label htmlFor="contact-name" className="block text-sm font-semibold text-ink mb-1.5">
                                 Nom complet
                              </label>
                              <input {...champ("name")} autoComplete="name" placeholder="Ex : Jean-Pierre Moukala" />
                              {erreur("name")}
                           </div>

                           <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                 <label htmlFor="contact-email" className="block text-sm font-semibold text-ink mb-1.5">
                                    Email
                                 </label>
                                 <input type="email" {...champ("email")} autoComplete="email" placeholder="votre@email.com" />
                                 {erreur("email")}
                              </div>
                              <div>
                                 <label htmlFor="contact-phone" className="block text-sm font-semibold text-ink mb-1.5">
                                    Téléphone
                                 </label>
                                 <input type="tel" {...champ("phone")} autoComplete="tel" placeholder="+242 06 000 00 00" />
                                 {erreur("phone")}
                              </div>
                           </div>

                           <div>
                              <label htmlFor="contact-subject" className="block text-sm font-semibold text-ink mb-1.5">
                                 Sujet
                              </label>
                              <select {...champ("subject", "cursor-pointer")}>
                                 <option value="">Choisissez un sujet</option>
                                 <option value="Formation">Formation</option>
                                 <option value="Inscription">Inscription</option>
                                 <option value="Partenariat">Partenariat</option>
                                 <option value="Autre">Autre</option>
                              </select>
                              {erreur("subject")}
                           </div>

                           <div>
                              <label htmlFor="contact-message" className="block text-sm font-semibold text-ink mb-1.5">
                                 Message
                              </label>
                              <textarea {...champ("message", "resize-none")} rows={4} placeholder="Comment pouvons-nous vous aider ?" />
                              {erreur("message")}
                           </div>

                           <button
                              type="submit"
                              disabled={loading}
                              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-second text-white font-semibold py-3.5 shadow-lg shadow-second/25 hover:bg-second-light disabled:opacity-60 transition-all"
                           >
                              {loading ? (
                                 <>
                                    <Loader2 className="w-5 h-5 animate-spin" /> Envoi…
                                 </>
                              ) : (
                                 <>
                                    Envoyer le message <Send className="w-4 h-4" />
                                 </>
                              )}
                           </button>
                        </div>
                     </form>
                  </Reveal>
               </div>
            </Container>
         </section>

         {/* ── FAQ ────────────────────────────────────────────── */}
         <section className="py-20 sm:py-24 bg-surface">
            <Container>
               <Reveal effet="flou" className="max-w-2xl mx-auto text-center mb-14">
                  <Eyebrow>Questions courantes</Eyebrow>
                  <h2 className="mt-4 text-3xl sm:text-4xl text-first">
                     Tout ce qu'il faut savoir
                  </h2>
               </Reveal>

               <div className="grid lg:grid-cols-[420px_1fr] gap-10 items-start">
                  <Reveal className="relative">
                     <div className="relative z-10 aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-xl border border-line">
                        <iframe
                           title="Localisation Groupe DGC-Formation"
                           src={MAP_SRC}
                           className="absolute inset-0 w-full h-full border-0"
                           loading="lazy"
                           allowFullScreen
                           referrerPolicy="no-referrer-when-downgrade"
                        />
                     </div>
                     <div className="absolute -bottom-5 left-4 right-4 sm:-right-5 sm:left-auto z-20 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-first/10 text-first">
                           <MapPin className="h-5 w-5" />
                        </span>
                        <div>
                           <p className="text-sm font-bold text-first">Nous trouver</p>
                           <a
                              href="https://www.google.com/maps/search/?api=1&query=Groupe+DGC+Formation+Pointe-Noire"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-second hover:underline"
                           >
                              Ouvrir dans Google Maps
                           </a>
                        </div>
                     </div>
                  </Reveal>

                  <Reveal i={1} className="space-y-3">
                     {FAQ.map((item, i) => (
                        <FaqItem
                           key={item.q}
                           item={item}
                           open={openFaq === i}
                           onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                        />
                     ))}
                  </Reveal>
               </div>
            </Container>
         </section>
      </>
   );
}

export default Contact;
