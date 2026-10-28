import { toast } from "react-toastify";

// Validation commune des formulaires (pré-inscription, Master, contact) :
// champ en rouge, message sous le champ, notification récapitulative
// et défilement jusqu'au premier champ à corriger.

export const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim());
export const telOk = (v) => /^\+?[0-9 ]{8,}$/.test(String(v).trim());

// Messages communs
export const verifEmail = (v) =>
   !String(v).trim() ? "Indiquez votre adresse email." : !emailOk(v) ? "Adresse email invalide (ex : nom@domaine.com)." : undefined;
export const verifTel = (v) =>
   !String(v).trim()
      ? "Indiquez un numéro de téléphone joignable."
      : !telOk(v)
        ? "Numéro invalide : chiffres, espaces et + uniquement, 8 caractères minimum."
        : undefined;

// Classes d'un champ de saisie en erreur (bordure et fond rouges)
export const ERR_INPUT = "!border-red-400 !bg-red-50/50 focus:!border-red-500 focus:!ring-red-500/15";

// Contour rouge autour d'un groupe de choix en erreur
export const errGroupe = (invalide) => (invalide ? "rounded-2xl ring-2 ring-red-400 ring-offset-4 ring-offset-white" : "");

// Classes d'une tuile à choisir, selon qu'elle est cochée ou en erreur
export const tuileCls = (on, invalide) =>
   on
      ? "border-first bg-first/5 text-first shadow-sm"
      : invalide
        ? "border-red-300 bg-red-50/50 text-ink hover:border-first/40"
        : "border-line bg-white text-ink hover:border-first/40 hover:-translate-y-px";

// Attributs d'un champ en erreur (repérage, accessibilité)
export const attrsErreur = (cle, invalide) =>
   invalide ? { "data-invalid": true, "aria-invalid": true, "aria-describedby": `${cle}-erreur` } : {};

// Notification récapitulative (une seule à la fois) + défilement et focus
// sur le premier champ à corriger. `ordre` : clés des champs dans l'ordre d'affichage.
let derniereNotification = null;
export function signalerErreurs(erreurs, ordre) {
   const liste = ordre.filter((k) => erreurs[k]).map((k) => erreurs[k]);
   if (!liste.length) return;
   if (derniereNotification !== null) toast.dismiss(derniereNotification);
   derniereNotification = toast.error(
      <div className="text-sm">
         <p className="font-bold text-ink">
            {liste.length === 1 ? "Un champ est à compléter" : `${liste.length} champs sont à compléter`}
         </p>
         <ul className="mt-1.5 grid gap-1 text-muted">
            {liste.map((m) => (
               <li key={m} className="flex gap-1.5">
                  <span className="text-red-500">•</span>
                  {m}
               </li>
            ))}
         </ul>
         <p className="mt-2 text-xs text-muted">Les champs concernés sont signalés en rouge.</p>
      </div>,
      { autoClose: 8000 }
   );
   setTimeout(() => {
      const el = document.querySelector("[data-invalid]");
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const cible = el.matches("input, textarea, select, button") ? el : el.querySelector("input, button, textarea, select");
      cible?.focus({ preventScroll: true });
   }, 50);
}
