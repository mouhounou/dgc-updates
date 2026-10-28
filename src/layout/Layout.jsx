/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { Video } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VideoGalleryPopup from "../components/VideoGalleryPopup";
import WhatsAppButton from "../components/WhatsAppButton";
import { videos } from "../data/site";
import { initGA, trackPageView } from "../lib/analytics";

// Remet le scroll en haut à chaque changement de route
function useScrollTop(pathname) {
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
   }, [pathname]);
}

function Layout() {
   const location = useLocation();
   useScrollTop(location.pathname);

   const [videoOpen, setVideoOpen] = useState(false);

   useEffect(() => {
      initGA();
   }, []);

   useEffect(() => {
      trackPageView(location.pathname);
   }, [location]);

   // Permet à n'importe quelle page d'ouvrir la galerie vidéo
   useEffect(() => {
      const open = () => setVideoOpen(true);
      window.addEventListener("open-video-gallery", open);
      return () => window.removeEventListener("open-video-gallery", open);
   }, []);

   return (
      // « réduire les animations » : les apparitions au défilement se limitent à un fondu
      <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
         <ToastContainer position="top-right" />
         <Navbar />
         <AnimatePresence mode="wait">
            <motion.main
               key={location.pathname}
               className="flex-1"
               initial={{ opacity: 0, y: 16 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.35, ease: "easeOut" }}
            >
               <Outlet />
            </motion.main>
         </AnimatePresence>
         <Footer />

         {/* Bouton vidéo flottant (au-dessus du WhatsApp) */}
         <motion.button
            onClick={() => setVideoOpen(true)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 18 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="group fixed z-[55] bottom-32 right-9 flex items-center gap-2.5"
            aria-label="Voir nos vidéos"
         >
            <span className="hidden sm:block rounded-full bg-white text-first text-sm font-semibold px-3.5 py-2 shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
               Voir nos vidéos
            </span>
            <span className="relative w-14 h-14 rounded-full bg-second text-white flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
               <span className="absolute inset-0 rounded-full bg-second animate-ping opacity-30" />
               <Video className="w-6 h-6 relative z-10" />
            </span>
         </motion.button>

         <WhatsAppButton />

         <VideoGalleryPopup open={videoOpen} setOpen={setVideoOpen} videos={videos} />
      </div>
      </MotionConfig>
   );
}

export default Layout;
