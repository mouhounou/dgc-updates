/* eslint-disable no-unused-vars */
import logo from './logo.png'
import com from './image/FILIERES COMMERCE/IMG-20240619-WA0099.jpg'
import com2 from './image/FILIERES COMMERCE/IMG_7273.JPG'
import info from './image/FILIERES INFOS/IMG-20240726-WA0055.jpg'
import info2 from './image/FILIERES INFOS/IMG-20240726-WA0032.jpg'
import tec from './IMG_9674.webp'
import com3 from './_com3.webp'
import com5 from './_com5.webp'
import tec4 from './tec4.webp'
import {
   faCogs,
   faHardHat,
   faBolt,
   faClipboardCheck,
   faOilWell
} from '@fortawesome/free-solid-svg-icons'

import p1 from './image/p1.jpg'
import p2 from './image/p2.jpg'
import p3 from './image/p3.jpg'
import p5 from './image/p5.jpg'
import p6 from './image/p6.jpg'
import p7 from './image/p7.jpg'
import p8 from './image/cfao.png'
import p9 from './image/CORAF.jpg'

import n from './n1.webp'
import n2 from './n2.webp'
import n3 from './n3.webp'
import n4 from './n4.webp'
import n5 from './n5.webp'
import lg from './l.png'

import pra from './pra.jpg'
import pra2 from './pra2.jpg'
import pra4 from './pra4.jpg'
import pra5 from './pra5.jpg'

export const partenaires = [
  { src: '/oracle.png', alt: "orace", link: "https://education.oracle.com/race-to-certification-2025" },
  { src: '/mikrotik.png', alt: "Partenaire 1", link: "https://mikrotik.com/training/centers" },
  { src: '/comptia.webp', alt: "Partenaire 1", link: "https://www.comptia.org/en/certifications" },
  { src: p1, alt: "Partenaire 1", link: "#" },
  { src: p2, alt: "Partenaire 2", link: "#" },
  { src: p3, alt: "Partenaire 3", link: "#" },
  { src: p5, alt: "Partenaire 5", link: "#" },
  { src: p6, alt: "Partenaire 6", link: "#" },
  { src: p7, alt: "Partenaire 7", link: "#" },
  { src: p8, alt: "CFAO", link: "#" },
  { src: p9, alt: "CORAF", link: "#" },
  { src: p2, alt: "Partenaire 2", link: "#" },
  { src: p3, alt: "Partenaire 3", link: "#" },
  { src: p5, alt: "Partenaire 5", link: "#" },
  { src: p6, alt: "Partenaire 6", link: "#" },
  { src: p7, alt: "Partenaire 7", link: "#" },
  { src: p8, alt: "CFAO", link: "#" },
  { src: p9, alt: "CORAF", link: "#" }
];
export const formations = [
   {
      title: "Génie Industriel et Maintenance",
      icon: faCogs,
      description: "Entretien, dépannage et installation d'équipements industriels selon les règles de sécurité.",
      detailsTitle: "Secteurs recruteurs",
      details: [
         "Industrie pétrolière et gazière",
         "Secteur manufacturier",
         "Secteur de l’énergie"
      ]
   },
   {
      title: "Génie Civil et Construction Durable",
      icon: faHardHat,
      description: "Conception et construction d’infrastructures avec prise en compte de l’impact environnemental.",
      detailsTitle: "Secteurs recruteurs",
      details: [
         "Bureaux d’études",
         "Entreprises de construction",
         "Aménagement urbain"
      ]
   },
   {
      title: "Génie Thermique et Énergétique",
      icon: faBolt,
      description: "Conception et gestion des systèmes thermiques et énergétiques avec solutions durables.",
      detailsTitle: "Secteurs recruteurs",
      details: [
         "Secteur énergétique",
         "Énergies renouvelables",
         "Bâtiment durable"
      ]
   },
   {
      title: "Qualité, Logistique Industrielle et Organisation",
      icon: faClipboardCheck,
      description: "Optimisation des processus industriels et logistiques dans les entreprises.",
      detailsTitle: "Débouchés",
      details: [
         "Responsable qualité"
      ]
   },
   {
      title: "Génie Pétrolier et Minier",
      icon: faOilWell,
      description: "Techniques pour l’exploration, l’extraction et la gestion des ressources naturelles.",
      detailsTitle: "Emplois possibles",
      details: [
         "Ingénieur pétrolier",
         "Ingénieur de forage"
      ]
   }
]



export const assets = {
   logo,
   lg
}


export const stories = [
	{ src: pra4, caption: "Salle informatique" },
	{ src: pra5, caption: "Salle informatique" },
   { src: pra2, caption: "Salle informatique" },
   { src: tec4, caption: "Laboratoire" },
	{ src: pra, caption: "Salle informatique" },
	{ src: n, caption: "Travaux pratiques" },
	{ src: com5, caption: "Bibliotheque" },
	{ src: info, caption: "Pole informatique" },
   { src: n2, caption: "Travaux pratiques" },
	{ src: com2, caption: "Salle de travaux pratiques" },
   
   { src: com3, caption: "Bibliotheque" },
   { src: n3, caption: "Travaux pratiques" },
	{ src: com, caption: "Salle de travaux pratiques" },
	{ src: info2, caption: "Pole informatique" },
	{ src: n4, caption: "Travaux pratiques" },
   { src: tec, caption: "Pole polytechnique" },
	{ src: info2, caption: "Pole informatique" },
	{ src: tec, caption: "Pole polytechnique" },
	{ src: n5, caption: "Travaux pratiques" },
];