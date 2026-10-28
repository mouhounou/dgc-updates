/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Clock, Film } from "lucide-react";

const VideoGalleryPopup = ({ open, setOpen, videos }) => {
   const [index, setIndex] = useState(0);
   const selected = videos[index];

   return (
      <AnimatePresence>
         {open && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setOpen(false)}
               className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-ink/85 backdrop-blur-md"
            >
               <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 24 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-5xl max-h-[92vh] rounded-3xl overflow-hidden flex flex-col border border-white/10 shadow-2xl bg-gradient-to-b from-[#0a2949] to-[#05121f]"
               >
                  {/* Header */}
                  <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 border-b border-white/10">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-second/15 flex items-center justify-center">
                           <Film className="w-5 h-5 text-second" />
                        </div>
                        <div>
                           <h2 className="font-display text-white text-lg sm:text-xl leading-none">
                              Nos vidéos
                           </h2>
                           <p className="text-white/50 text-xs mt-1">
                              La vie au campus en images
                           </p>
                        </div>
                     </div>
                     <button
                        onClick={() => setOpen(false)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        aria-label="Fermer"
                     >
                        <X className="w-5 h-5" />
                     </button>
                  </div>

                  {/* Body scrollable */}
                  <div className="overflow-y-auto video-scroll p-5 sm:p-7">
                     {/* Lecteur */}
                     <div className="relative rounded-2xl overflow-hidden aspect-video bg-black ring-1 ring-white/10">
                        <video
                           key={selected.url}
                           className="w-full h-full object-contain"
                           controls
                           autoPlay
                           src={selected.url}
                        />
                     </div>

                     {/* Infos vidéo courante */}
                     <div className="mt-4 flex flex-wrap items-center gap-2.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-second text-white text-[11px] font-bold uppercase tracking-wide">
                           <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                           En lecture
                        </span>
                        {selected.duration && (
                           <span className="inline-flex items-center gap-1 text-white/55 text-xs">
                              <Clock className="w-3.5 h-3.5" /> {selected.duration}
                           </span>
                        )}
                     </div>
                     <h3 className="mt-2.5 font-display text-white text-xl sm:text-2xl">
                        {selected.title}
                     </h3>
                     <p className="text-white/60 text-sm mt-1.5 leading-relaxed max-w-3xl">
                        {selected.description}
                     </p>

                     {/* Séparateur + carrousel */}
                     <div className="flex items-center justify-between mt-8 mb-3">
                        <h4 className="text-white font-semibold text-sm">
                           Toutes les vidéos
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 text-xs font-semibold">
                           {videos.length}
                        </span>
                     </div>

                     <div className="flex gap-4 overflow-x-auto pb-2 video-scroll snap-x">
                        {videos.map((video, i) => {
                           const active = i === index;
                           return (
                              <button
                                 key={i}
                                 onClick={() => setIndex(i)}
                                 className="group snap-start shrink-0 w-52 text-left"
                              >
                                 <div
                                    className={`relative rounded-xl overflow-hidden aspect-video bg-black ring-2 transition-all ${
                                       active
                                          ? "ring-second"
                                          : "ring-white/10 group-hover:ring-white/30"
                                    }`}
                                 >
                                    <video
                                       src={video.url}
                                       muted
                                       playsInline
                                       preload="metadata"
                                       className="w-full h-full object-cover"
                                    />
                                    <div
                                       className={`absolute inset-0 flex items-center justify-center transition-colors ${
                                          active
                                             ? "bg-second/25"
                                             : "bg-black/40 group-hover:bg-black/20"
                                       }`}
                                    >
                                       <span className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                          <Play className="w-4 h-4 text-first fill-first ml-0.5" />
                                       </span>
                                    </div>
                                    {video.duration && (
                                       <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded">
                                          {video.duration}
                                       </span>
                                    )}
                                    {active && (
                                       <span className="absolute top-1.5 left-1.5 bg-second text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                          ● En cours
                                       </span>
                                    )}
                                 </div>
                                 <p
                                    className={`mt-2 text-sm font-semibold line-clamp-1 ${
                                       active ? "text-second" : "text-white"
                                    }`}
                                 >
                                    {video.title}
                                 </p>
                                 <p className="text-white/45 text-xs line-clamp-1">
                                    {video.description}
                                 </p>
                              </button>
                           );
                        })}
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default VideoGalleryPopup;
