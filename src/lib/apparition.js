// Effets d'apparition au défilement (framer-motion), communs à toutes les sections
// de la page pour garder un même rythme. Utilisation :
//   <motion.div {...apparition('haut', 0.1)}>…</motion.div>
// Effets : haut, gauche, droite, zoom, flou (titres). Avec « réduire les animations »,
// MotionConfig (App.jsx) ne garde que le fondu.

const DEPARTS = {
   haut: { opacity: 0, y: 40 },
   gauche: { opacity: 0, x: -48 },
   droite: { opacity: 0, x: 48 },
   zoom: { opacity: 0, scale: 0.94, y: 20 },
   // le flou n'est utilisé que sur des titres : un filtre resté sur un conteneur
   // dérangerait les éléments en position fixe qu'il contient
   flou: { opacity: 0, y: 24, filter: 'blur(10px)' },
}

export const apparition = (effet = 'haut', delai = 0, duree = 0.7) => ({
   initial: DEPARTS[effet],
   whileInView: { opacity: 1, x: 0, y: 0, scale: 1, ...(effet === 'flou' ? { filter: 'blur(0px)' } : {}) },
   viewport: { once: true, amount: 0.15 },
   transition: { duration: duree, delay: delai, ease: [0.22, 1, 0.36, 1] },
})
