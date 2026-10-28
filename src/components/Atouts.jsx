/* eslint-disable no-unused-vars */
import { useState } from "react";
import { stories } from "../assets";
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask, faMicrochip, faLanguage, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const infrastructures = [
  {
    icon: faFlask,
    title: "05 salles d'informatique",
    description: "Équipées des derniers logiciels et matériels",
  },
  {
    icon: faMicrochip,
    title: "07 laboratoires techniques",
    description: "Mécanique, Electrotechnique, Électronique, etc",
  },
  {
    icon: faLanguage,
    title: "01 Laboratoire d'Anglais",
    description: "Pour une maîtrise parfaite de la langue internationale",
  },
];

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

function Atouts() {
  const [selected, setSelected] = useState(4);

  const handlePrevious = () => {
    setSelected((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelected((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-y-8 gap-x-12 mt-[2rem]">
      
      {/* Statistiques/Infrastructures - À gauche */}
      <div className="lg:w-[40%] flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-first mb-4">Nos Infrastructures</h2>
        {infrastructures.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-5 p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInLeft}
            custom={index}
          >
            <div className="flex-shrink-0 w-14 h-14 bg-first/10 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={item.icon} className="text-2xl text-first" />
            </div>
            <div>
              <h3 className="text-xl text-first/90 font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Carrousel professionnel - À droite */}
      <motion.div
        className="lg:w-[60%] flex flex-col justify-center"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-xl">
          {/* Carrousel principal */}
          <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-2xl group bg-black">
            <AnimatePresence mode="wait">
              <motion.img
                key={selected}
                className="w-full h-full object-cover"
                src={stories[selected].src}
                alt={`pic ${selected + 1} de la galerie`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </AnimatePresence>

            {/* Overlay gradient pour meilleure lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Boutons de navigation - Toujours visibles sur mobile */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 z-10 hover:scale-110 lg:opacity-0 lg:group-hover:opacity-100"
              aria-label="Image précédente"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-first text-lg" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 z-10 hover:scale-110 lg:opacity-0 lg:group-hover:opacity-100"
              aria-label="Image suivante"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-first text-lg" />
            </button>

            {/* Indicateurs de pagination (dots) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelected(index)}
                  className={`transition-all duration-300 rounded-full ${
                    selected === index
                      ? "w-8 h-2 bg-white"
                      : "w-2 h-2 bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Aller à l'image ${index + 1}`}
                />
              ))}
            </div>

            {/* Compteur stylisé */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-first px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {selected + 1} / {stories.length}
            </div>
          </div>

          {/* Légende avec design amélioré */}
          <motion.div 
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-700 font-medium text-base">
              {stories[selected].caption}
            </p>
          </motion.div>

          {/* Miniatures carrousel */}
          <div className="mt-6 relative">
            <div className="flex gap-3 overflow-x-auto pb-3 px-1 snap-x snap-mandatory rounded-lg [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {stories.map((item, index) => (
                <motion.div
                  key={index}
                  onClick={() => setSelected(index)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 snap-center relative group/thumb pt-4 cursor-pointer ${
                    selected === index ? "w-16 h-16" : "w-12 h-12"
                  } transition-all duration-300`}
                >
                  <div className={`w-full h-full rounded-xl overflow-hidden shadow-md transition-all duration-300 ${
                    selected === index 
                      ? "ring-4 ring-first shadow-xl" 
                      : "ring-2 ring-transparent hover:ring-first/50 opacity-70 hover:opacity-100"
                  }`}>
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {selected !== index && (
                    <div className="absolute inset-0 bg-black/20 rounded-xl group-hover/thumb:bg-black/0 transition-all duration-300" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Atouts;