import { useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { ChevronDown, Check } from "lucide-react";

// Langues proposées (code Google Translate + drapeau pays ISO)
const LANGS = [
   { code: "fr", country: "FR", label: "Français" },
   { code: "en", country: "GB", label: "English" },
   { code: "es", country: "ES", label: "Español" },
   { code: "pt", country: "PT", label: "Português" },
   { code: "it", country: "IT", label: "Italiano" },
   { code: "de", country: "DE", label: "Deutsch" },
   { code: "ar", country: "SA", label: "العربية" },
   { code: "zh-CN", country: "CN", label: "中文" },
];

// Lit la langue courante depuis le cookie googtrans (ex: "/fr/en")
function readLangFromCookie() {
   const m = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
   return m ? decodeURIComponent(m[1]) : "fr";
}

function LanguageSwitcher() {
   const [open, setOpen] = useState(false);
   const [current, setCurrent] = useState("fr");
   const ref = useRef(null);

   // Injecte le widget Google Translate (caché) — moteur de traduction
   useEffect(() => {
      window.googleTranslateElementInit = () => {
         if (!window.google?.translate) return;
         const host = document.getElementById("google_translate_element");
         if (host && host.childElementCount > 0) return;
         new window.google.translate.TranslateElement(
            {
               pageLanguage: "fr",
               includedLanguages: LANGS.map((l) => l.code).join(","),
               autoDisplay: false,
            },
            "google_translate_element"
         );
      };

      if (!document.getElementById("google-translate-script")) {
         const s = document.createElement("script");
         s.id = "google-translate-script";
         s.src =
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
         document.body.appendChild(s);
      } else if (window.google?.translate) {
         window.googleTranslateElementInit();
      }

      setCurrent(readLangFromCookie());
   }, []);

   // Ferme au clic extérieur
   useEffect(() => {
      const onClick = (e) => {
         if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      };
      document.addEventListener("mousedown", onClick);
      return () => document.removeEventListener("mousedown", onClick);
   }, []);

   const changeLang = (code) => {
      setCurrent(code);
      setOpen(false);

      // Applique via le <select> caché du widget Google
      const trySet = (attempt = 0) => {
         const select = document.querySelector(".goog-te-combo");
         if (select) {
            select.value = code;
            select.dispatchEvent(new Event("change"));
         } else if (attempt < 20) {
            setTimeout(() => trySet(attempt + 1), 150);
         }
      };
      trySet();
   };

   const active = LANGS.find((l) => l.code === current) || LANGS[0];

   return (
      <div className="relative" ref={ref}>
         {/* Élément Google caché (moteur) */}
         <div id="google_translate_element" className="gt-hidden" />

         {/* Bouton drapeau */}
         <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 h-10 px-2.5 rounded-full border border-line bg-white hover:border-first/40 transition-colors"
            aria-label="Choisir la langue"
         >
            <ReactCountryFlag
               countryCode={active.country}
               svg
               style={{ width: "1.35rem", height: "1.35rem", borderRadius: "3px" }}
            />
            <ChevronDown
               className={`w-4 h-4 text-muted transition-transform ${
                  open ? "rotate-180" : ""
               }`}
            />
         </button>

         {/* Menu */}
         <div
            className={`absolute right-0 mt-2 w-52 card-soft p-1.5 z-50 transition-all duration-200 ${
               open
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
            }`}
         >
            {LANGS.map((l) => {
               const selected = l.code === current;
               return (
                  <button
                     key={l.code}
                     type="button"
                     onClick={() => changeLang(l.code)}
                     className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                        selected ? "bg-surface text-first" : "text-ink/80 hover:bg-surface"
                     }`}
                  >
                     <ReactCountryFlag
                        countryCode={l.country}
                        svg
                        style={{ width: "1.25rem", height: "1.25rem", borderRadius: "3px" }}
                     />
                     <span className="flex-1 text-left">{l.label}</span>
                     {selected && <Check className="w-4 h-4 text-first" />}
                  </button>
               );
            })}
         </div>
      </div>
   );
}

export default LanguageSwitcher;
