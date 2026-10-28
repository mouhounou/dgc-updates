import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ArrowRight, Phone, Building2, ArrowUpRight } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets";
import { ecoles } from "../data/site";
import LanguageSwitcher from "./LanguageSwitcher";

const links = [
   { label: "Accueil", to: "/" },
   { label: "À propos", to: "/a-propos" },
   { label: "Masters", to: "/masters" },
   { label: "Contact", to: "/contact" },
];

function Navbar() {
   const [scrolled, setScrolled] = useState(false);
   const [openSchools, setOpenSchools] = useState(false);
   const [drawer, setDrawer] = useState(false);
   const [mobileSchools, setMobileSchools] = useState(false);
   const { pathname } = useLocation();

   useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 20);
      const onClick = (e) => {
         if (!e.target.closest(".dd-schools")) setOpenSchools(false);
      };
      window.addEventListener("scroll", onScroll);
      document.addEventListener("mousedown", onClick);
      return () => {
         window.removeEventListener("scroll", onScroll);
         document.removeEventListener("mousedown", onClick);
      };
   }, []);

   // Ferme le tiroir mobile à chaque changement de page
   useEffect(() => {
      setDrawer(false);
      setMobileSchools(false);
   }, [pathname]);

   const linkClass = ({ isActive }) =>
      `px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
         isActive
            ? "bg-white text-first shadow-sm"
            : "text-white/75 hover:text-white hover:bg-white/10"
      }`;

   return (
      <>
         <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
               scrolled
                  ? "bg-first/90 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.7)]"
                  : "bg-first border-b border-transparent"
            }`}
         >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-4">
               {/* Logo */}
               <Link to="/" className="flex items-center gap-2 group">
                  <img
                     src={assets.logo}
                     alt="Groupe DGC-Formation"
                     className="w-11 h-11 rounded-xl transition-transform group-hover:scale-105"
                  />
                  {/* <span className="hidden sm:block font-display text-white text-lg leading-none">
                     DGC<span className="text-second">Formation</span>
                  </span> */}
               </Link>

               {/* Bloc droit : liens + Contact + langue */}
               <div className="flex items-center gap-2 lg:gap-3">
               {/* Nav desktop */}
               <nav className="hidden lg:flex items-center gap-1">
                  <NavLink to="/" className={linkClass} end>
                     Accueil
                  </NavLink>
                  <NavLink to="/a-propos" className={linkClass}>
                     À propos
                  </NavLink>
                  <NavLink to="/masters" className={linkClass}>
                     Masters
                  </NavLink>

                  {/* Dropdown écoles */}
                  <div className="relative dd-schools">
                     <button
                        onClick={() => setOpenSchools((v) => !v)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                           pathname === "/nos-ecoles"
                              ? "bg-white text-first shadow-sm"
                              : openSchools
                                ? "bg-white/10 text-white"
                                : "text-white/75 hover:text-white hover:bg-white/10"
                        }`}
                     >
                        Nos écoles
                        <ChevronDown
                           className={`w-4 h-4 transition-transform ${
                              openSchools ? "rotate-180" : ""
                           }`}
                        />
                     </button>
                     <div
                        className={`absolute right-0 mt-3 w-[24rem] rounded-2xl bg-white border border-line shadow-[0_24px_60px_-24px_rgba(12,26,43,0.4)] overflow-hidden transition-all duration-200 ${
                           openSchools
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible -translate-y-2"
                        }`}
                     >
                        <div className="px-4 pt-4 pb-2">
                           <p className="text-[11px] font-bold uppercase tracking-widest text-muted">
                              Nos établissements
                           </p>
                        </div>
                        <div className="px-2 pb-2">
                           {ecoles.map((e) => (
                              <a
                                 key={e.sigle}
                                 href={e.url}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="group flex items-center gap-3.5 px-3 py-3 rounded-xl hover:bg-surface transition-colors"
                              >
                                 <span className="w-11 h-11 rounded-xl bg-first flex items-center justify-center text-white shrink-0 shadow-sm">
                                    <Building2 className="w-5 h-5" />
                                 </span>
                                 <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-bold text-ink">
                                       {e.sigle}
                                    </span>
                                    <span className="block text-xs text-muted leading-snug">
                                       {e.domaine}
                                    </span>
                                 </span>
                                 <ArrowUpRight className="w-4 h-4 text-muted shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-first transition-all" />
                              </a>
                           ))}
                        </div>
                        <div className="px-4 py-3 border-t border-line bg-surface">
                           <span className="text-xs text-muted">
                              Chaque école dispose de son propre site web.
                           </span>
                        </div>
                     </div>
                  </div>

                  <NavLink to="/preinscription" className={linkClass}>
                     Préinscription
                  </NavLink>
               </nav>

               {/* Contact (bouton foncé) + langue + burger */}
               <div className="flex items-center gap-2.5">
                  <NavLink
                     to="/contact"
                     className={({ isActive }) =>
                        `hidden sm:inline-flex items-center gap-2 rounded-full text-sm font-semibold px-5 py-2.5 transition-all hover:-translate-y-0.5 ${
                           isActive
                              ? "bg-white text-first shadow-lg"
                              : "bg-second text-white shadow-lg shadow-second/25 hover:bg-second-light"
                        }`
                     }
                  >
                     <Phone className="w-4 h-4" /> Contact
                  </NavLink>

                  <LanguageSwitcher />

                  <button
                     onClick={() => setDrawer(true)}
                     className="lg:hidden p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors"
                     aria-label="Ouvrir le menu"
                  >
                     <Menu className="w-6 h-6" />
                  </button>
               </div>
               </div>
            </div>
         </header>

         {/* Spacer pour compenser le header fixe */}
         <div className="h-[72px]" />

         {/* Drawer mobile */}
         <div className={`fixed inset-0 z-[60] lg:hidden ${drawer ? "visible" : "invisible"}`}>
            <div
               className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
                  drawer ? "opacity-100" : "opacity-0"
               }`}
               onClick={() => setDrawer(false)}
            />
            <div
               className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white flex flex-col transition-transform duration-300 ${
                  drawer ? "translate-x-0" : "translate-x-full"
               }`}
            >
               <div className="flex items-center justify-between px-5 h-[72px] border-b border-line">
                  <span className="font-display text-first text-lg">
                     DGC<span className="text-second">Formation</span>
                  </span>
                  <button
                     onClick={() => setDrawer(false)}
                     className="p-2.5 rounded-xl text-first hover:bg-surface"
                     aria-label="Fermer le menu"
                  >
                     <X className="w-6 h-6" />
                  </button>
               </div>

               <nav className="flex-1 overflow-y-auto p-5 space-y-1">
                  {links.map((l) => (
                     <NavLink
                        key={l.to}
                        to={l.to}
                        end={l.to === "/"}
                        className={({ isActive }) =>
                           `block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                              isActive ? "bg-surface text-first" : "text-ink/80 hover:bg-surface"
                           }`
                        }
                     >
                        {l.label}
                     </NavLink>
                  ))}

                  <div>
                     <button
                        onClick={() => setMobileSchools((v) => !v)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-semibold text-ink/80 hover:bg-surface transition-colors"
                     >
                        Nos écoles
                        <ChevronDown
                           className={`w-5 h-5 transition-transform ${
                              mobileSchools ? "rotate-180" : ""
                           }`}
                        />
                     </button>
                     <div
                        className={`overflow-hidden transition-all duration-300 ${
                           mobileSchools ? "max-h-96" : "max-h-0"
                        }`}
                     >
                        <div className="pl-3 py-1 space-y-1">
                           {ecoles.map((e) => (
                              <a
                                 key={e.sigle}
                                 href={e.url}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="block px-4 py-2 rounded-lg text-sm text-muted hover:bg-surface hover:text-first"
                              >
                                 {e.sigle} — {e.domaine}
                              </a>
                           ))}
                        </div>
                     </div>
                  </div>
               </nav>

               <div className="p-5 border-t border-line">
                  <Link
                     to="/preinscription"
                     className="flex items-center justify-center gap-2 w-full rounded-full bg-second text-white font-semibold px-5 py-3 shadow-lg shadow-second/25"
                  >
                     Préinscription <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
}

export default Navbar;
