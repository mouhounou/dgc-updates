import { Helmet } from "react-helmet-async";
import { contactInfo, ecoles, socials } from "../data/site";

// ── Constantes du site ────────────────────────────────────────
export const SITE_URL = "https://www.dgc-congo.org";
const SITE_NAME = "Groupe DGC-Formation";
const DEFAULT_IMAGE = "/logo512.png";

// GEO — Pointe-Noire (département CG-16)
const GEO = {
   lat: -4.7762,
   lng: 11.853,
   region: "CG-16",
   placename: "Pointe-Noire, Congo",
};

const phones = [contactInfo.secretariat, contactInfo.recrutement].map((p) =>
   p.replace(/\s/g, "")
);

const sameAs = socials.map((s) => s.url).filter((u) => u && u !== "#");

const DEFAULT_KEYWORDS = [
   "Groupe DGC-Formation",
   "DGC Formation Pointe-Noire",
   "enseignement supérieur Congo",
   "école privée Pointe-Noire",
   "université privée Congo",
   "ESGC école de commerce Congo",
   "ESIT informatique Pointe-Noire",
   "ESUP polytechnique Congo",
   "CCPM certifications Congo",
   "formation professionnelle Congo",
   "licence Congo",
   "master Pointe-Noire",
   "master Congo Brazzaville",
   "master comptabilité contrôle de gestion audit Congo",
   "master CCA Pointe-Noire",
   "master audit Congo",
   "master finance Congo",
   "Bac+5 Pointe-Noire",
   "préinscription école Pointe-Noire",
   "étudier à Pointe-Noire",
   "où étudier au Congo",
   "Cisco Academy Congo",
   "Pearson VUE Pointe-Noire",
];

// ── Construction du JSON-LD (graph) ───────────────────────────
function buildGraph() {
   const address = {
      "@type": "PostalAddress",
      streetAddress:
         "Zone industrielle, 87 Rue Gamba, en face du Lycée Victor Augagneur",
      addressLocality: "Pointe-Noire",
      addressRegion: "Pointe-Noire",
      postalCode: "BP 2694",
      addressCountry: "CG",
   };

   const geo = {
      "@type": "GeoCoordinates",
      latitude: GEO.lat,
      longitude: GEO.lng,
   };

   const openingHoursSpecification = [
      {
         "@type": "OpeningHoursSpecification",
         dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
         opens: "08:00",
         closes: "17:00",
      },
      {
         "@type": "OpeningHoursSpecification",
         dayOfWeek: "Saturday",
         opens: "09:00",
         closes: "13:00",
      },
   ];

   const hasMap =
      "https://www.google.com/maps/search/?api=1&query=Groupe+DGC+Formation+Pointe-Noire";

   const organization = {
      "@type": ["EducationalOrganization", "CollegeOrUniversity"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ["DGC Formation", "Groupe DGC", "DGC Congo"],
      description:
         "Groupe d'enseignement supérieur à Pointe-Noire : 21 ans d'excellence à travers 4 écoles — ESGC (commerce & gestion), ESIT (informatique & télécoms), ESUP (polytechnique) et le CCPM (certifications professionnelles) — et un cycle Master (Bac+5) en comptabilité, contrôle de gestion, audit et finance.",
      url: SITE_URL,
      logo: `${SITE_URL}/logo512.png`,
      image: `${SITE_URL}/logo512.png`,
      foundingDate: "2004",
      email: contactInfo.email,
      telephone: phones,
      address,
      geo,
      hasMap,
      areaServed: [
         { "@type": "City", name: "Pointe-Noire" },
         { "@type": "Country", name: "République du Congo" },
      ],
      openingHoursSpecification,
      contactPoint: [
         {
            "@type": "ContactPoint",
            telephone: phones[0],
            contactType: "customer service",
            areaServed: "CG",
            availableLanguage: ["French"],
         },
         {
            "@type": "ContactPoint",
            telephone: phones[1],
            contactType: "admissions",
            areaServed: "CG",
            availableLanguage: ["French"],
         },
      ],
      department: ecoles.map((e) => ({
         "@type": "EducationalOrganization",
         name: e.nom,
         alternateName: e.sigle,
         url: e.url,
         description: e.description,
         knowsAbout: e.filieres,
      })),
      sameAs,
   };

   const localBusiness = {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: SITE_NAME,
      image: `${SITE_URL}/logo512.png`,
      url: SITE_URL,
      telephone: phones[0],
      email: contactInfo.email,
      address,
      geo,
      hasMap,
      openingHoursSpecification,
      priceRange: "$$",
      currenciesAccepted: "XAF",
      paymentAccepted: ["Cash", "Mobile Money"],
   };

   const website = {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "fr",
      publisher: { "@id": `${SITE_URL}/#organization` },
   };

   return {
      "@context": "https://schema.org",
      "@graph": [organization, localBusiness, website],
   };
}

// Helper exporté : FAQ structurée (page Contact)
export function buildFaqJsonLd(items) {
   return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((it) => ({
         "@type": "Question",
         name: it.q || it.question,
         acceptedAnswer: { "@type": "Answer", text: it.a || it.answer },
      })),
   };
}

// Helper : fil d'ariane structuré
export function buildBreadcrumb(trail) {
   return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: trail.map((t, i) => ({
         "@type": "ListItem",
         position: i + 1,
         name: t.name,
         item: `${SITE_URL}${t.path}`,
      })),
   };
}

// Helper : formation (schema.org/Course) pour une page master
export function buildCourseJsonLd(master) {
   const url = `${SITE_URL}/masters/${master.slug}`;
   const image = master.images?.[0]?.src;
   return {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": `${url}#course`,
      name: `Master ${master.titre}`,
      alternateName: master.mention,
      description: master.presentation,
      url,
      image: image ? `${SITE_URL}${image}` : undefined,
      inLanguage: "fr",
      provider: {
         "@type": "EducationalOrganization",
         "@id": `${SITE_URL}/#organization`,
         name: SITE_NAME,
         sameAs: SITE_URL,
      },
      educationalLevel: "Master (Bac+5)",
      educationalCredentialAwarded: {
         "@type": "EducationalOccupationalCredential",
         credentialCategory: "Master",
         name: master.mention || `Master ${master.titre}`,
      },
      numberOfCredits: master.ects,
      timeRequired: "P2Y",
      coursePrerequisites: master.admission,
      teaches: master.competences || master.objectifs,
      offers: { "@type": "Offer", category: "Paid", url: `${url}/preinscription` },
      hasCourseInstance: {
         "@type": "CourseInstance",
         courseMode: ["Onsite", "Blended"],
         startDate: master.debut,
         courseWorkload: master.volumeHoraire ? `PT${master.volumeHoraire}H` : undefined,
         location: {
            "@type": "Place",
            name: SITE_NAME,
            address: {
               "@type": "PostalAddress",
               streetAddress: "Zone industrielle, 87 Rue Gamba",
               addressLocality: "Pointe-Noire",
               addressCountry: "CG",
            },
         },
      },
   };
}

// Helper : liste de formations (page /masters)
export function buildCourseListJsonLd(masters) {
   return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Masters du ${SITE_NAME}`,
      itemListElement: masters.map((m, i) => ({
         "@type": "ListItem",
         position: i + 1,
         url: `${SITE_URL}/masters/${m.slug}`,
         name: `Master ${m.titre}`,
      })),
   };
}

// ── Composant SEO ─────────────────────────────────────────────
export const SEO = ({
   title = `${SITE_NAME} | Enseignement supérieur à Pointe-Noire, Congo 🇨🇬`,
   description = "Groupe DGC-Formation : 21 ans d'excellence à Pointe-Noire. 4 écoles (ESGC, ESIT, ESUP, CCPM) et 4 masters Bac+5 en audit, contrôle de gestion, comptabilité et finance. Préinscription en ligne.",
   keywords = DEFAULT_KEYWORDS,
   image = DEFAULT_IMAGE,
   path = "/",
   type = "website",
   jsonLd = [],
}) => {
   const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
   const ogImage = `${SITE_URL}${image}`;
   const graph = buildGraph();

   return (
      <Helmet>
         {/* Base */}
         <html lang="fr" />
         <title>{title}</title>
         <meta name="description" content={description} />
         <meta name="keywords" content={keywords.join(", ")} />
         <link rel="canonical" href={canonical} />
         <meta
            name="robots"
            content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
         />
         <meta name="author" content={SITE_NAME} />
         <meta name="publisher" content={SITE_NAME} />
         <meta name="language" content="fr-FR" />
         <meta name="theme-color" content="#0a4275" />

         {/* GEO / Local SEO */}
         <meta name="geo.region" content={GEO.region} />
         <meta name="geo.placename" content={GEO.placename} />
         <meta name="geo.position" content={`${GEO.lat};${GEO.lng}`} />
         <meta name="ICBM" content={`${GEO.lat}, ${GEO.lng}`} />

         {/* Open Graph */}
         <meta property="og:type" content={type} />
         <meta property="og:site_name" content={SITE_NAME} />
         <meta property="og:locale" content="fr_CG" />
         <meta property="og:title" content={title} />
         <meta property="og:description" content={description} />
         <meta property="og:url" content={canonical} />
         <meta property="og:image" content={ogImage} />
         <meta
            property="og:image:alt"
            content={`Logo ${SITE_NAME} — Pointe-Noire, Congo`}
         />

         {/* Twitter */}
         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:title" content={title} />
         <meta name="twitter:description" content={description} />
         <meta name="twitter:image" content={ogImage} />

         {/* hreflang */}
         <link rel="alternate" hrefLang="fr" href={canonical} />
         <link rel="alternate" hrefLang="fr-CG" href={canonical} />
         <link rel="alternate" hrefLang="x-default" href={canonical} />

         {/* JSON-LD principal */}
         <script type="application/ld+json">{JSON.stringify(graph)}</script>

         {/* JSON-LD additionnels (FAQ, breadcrumb…) */}
         {jsonLd.map((block, i) => (
            <script type="application/ld+json" key={i}>
               {JSON.stringify(block)}
            </script>
         ))}
      </Helmet>
   );
};
