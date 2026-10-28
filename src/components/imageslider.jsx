/* eslint-disable no-unused-vars */
import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const variants = {
   enter: (dir) => ({ x: dir >= 0 ? "8%" : "-8%", opacity: 0, scale: 1.06 }),
   center: { x: 0, opacity: 1, scale: 1 },
   exit: (dir) => ({ x: dir >= 0 ? "-8%" : "8%", opacity: 0 }),
};

const SWIPE = 60; // px nécessaires pour déclencher un swipe

// Slider plein format : le contenu passé en `children` s'affiche en overlay.
// La progression de chaque photo sert aussi de minuteur (onAnimationEnd => photo suivante),
// donc plus de vignettes : de simples barres cliquables suffisent.
export default function ImageSlider({
   images = [],
   alt = "",
   interval = 6000,
   className = "",
   children,
}) {
   const n = images.length;
   const [[index, dir], setState] = useState([0, 0]);
   const [paused, setPaused] = useState(false);
   const reduce = useReducedMotion();

   const go = useCallback((d) => setState(([i]) => [(i + d + n) % n, d]), [n]);
   const goTo = (i) => setState(([cur]) => [i, i >= cur ? 1 : -1]);

   if (n === 0) return null;

   const auto = n > 1 && !reduce;

   const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
   };

   return (
      <div
         className={`relative select-none overflow-hidden bg-first group min-h-[560px] h-[82vh] max-h-[860px] ${className}`}
         role="region"
         aria-roledescription="carrousel"
         aria-label={`Photos ${alt}`}
         tabIndex={0}
         onKeyDown={onKeyDown}
         onMouseEnter={() => setPaused(true)}
         onMouseLeave={() => setPaused(false)}
         onFocus={() => setPaused(true)}
         onBlur={() => setPaused(false)}
      >
         <style>{`@keyframes slider-fill { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>

         {/* Photos */}
         <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.img
               key={index}
               src={images[index].src}
               alt={`${alt} — photo ${index + 1} sur ${n}`}
               custom={dir}
               variants={variants}
               initial="enter"
               animate="center"
               exit="exit"
               transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
               drag={n > 1 ? "x" : false}
               dragConstraints={{ left: 0, right: 0 }}
               dragElastic={0.2}
               onDragEnd={(_, { offset }) => {
                  if (offset.x < -SWIPE) go(1);
                  else if (offset.x > SWIPE) go(-1);
               }}
               draggable={false}
               className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
            />
         </AnimatePresence>

         {/* Voiles pour la lisibilité du texte */}
         <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-first/90 via-first/30 to-first/40" />
         <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-first/60 via-transparent to-transparent" />

         {/* Overlay : infos du master */}
         <div className="pointer-events-none absolute inset-0 flex flex-col justify-end">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 pt-28 pb-24 sm:pb-28 [&_*]:pointer-events-auto">
               {children}
            </div>
         </div>

         {/* Flèches */}
         {n > 1 && (
            <>
               <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Photo précédente"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 text-white backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-first transition sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
               >
                  <ChevronLeft className="w-5 h-5" />
               </button>
               <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Photo suivante"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 text-white backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-first transition sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
               >
                  <ChevronRight className="w-5 h-5" />
               </button>
            </>
         )}

         {/* Barres de progression (remplacent les vignettes) */}
         {n > 1 && (
            <div className="absolute bottom-6 left-0 right-0">
               <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 flex items-center gap-4">
                  <div className="flex flex-1 gap-2 max-w-md">
                     {images.map((_, i) => (
                        <button
                           key={i}
                           type="button"
                           onClick={() => goTo(i)}
                           aria-label={`Afficher la photo ${i + 1}`}
                           aria-current={i === index}
                           className="relative h-5 flex-1 flex items-center"
                        >
                           <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/30">
                              {i < index && <span className="absolute inset-0 bg-white" />}
                              {i === index && (
                                 <span
                                    key={`${index}-${auto}`}
                                    onAnimationEnd={() => auto && go(1)}
                                    className="absolute inset-0 origin-left bg-white"
                                    style={
                                       auto
                                          ? {
                                               animation: `slider-fill ${interval}ms linear forwards`,
                                               animationPlayState: paused ? "paused" : "running",
                                            }
                                          : undefined
                                    }
                                 />
                              )}
                           </span>
                        </button>
                     ))}
                  </div>
                  <span className="text-xs font-semibold text-white/80 tabular-nums">
                     {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                  </span>
               </div>
            </div>
         )}
      </div>
   );
}