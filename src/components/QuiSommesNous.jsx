import React, { useState } from 'react'
import {
  FaInfoCircle,
  FaUsers,
  FaBullseye,
  FaLightbulb,
  FaGraduationCap,
  FaHandsHelping,
  FaUserTie,
  FaAward,
  FaChartLine,
  FaGlobe
} from 'react-icons/fa'

const QuiSommesNous = () => {
  const [hoveredValue, setHoveredValue] = useState(null)

  const teamMembers = [
    { 
      name: 'Mr Gama', 
      role: 'Service Orientation Information et Recrutement',
      description: 'Expert en orientation professionnelle avec plus de 15 ans d\'expérience'
    },
    { 
      name: 'Mr Japhet', 
      role: 'Service Orientation Information et Recrutement',
      description: 'Spécialisé dans l\'accompagnement des étudiants vers l\'excellence'
    }
  ]

  const values = [
    {
      icon: <FaAward className="text-3xl text-first" />,
      title: 'Rigueur',
      desc: 'Nous appliquons des méthodes strictes et méthodiques dans tous nos processus d\'enseignement et d\'évaluation.',
      color: 'bg-blue-50 border-blue-200',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      icon: <FaUsers className="text-3xl text-first" />,
      title: 'Proximité',
      desc: 'Un accompagnement personnalisé et un suivi individualisé pour chaque étudiant dans son parcours de formation.',
      color: 'bg-purple-50 border-purple-200',
      hoverColor: 'hover:bg-purple-100'
    },
    {
      icon: <FaHandsHelping className="text-3xl text-first" />,
      title: 'Solidarité',
      desc: 'Créer un environnement d\'entraide et de soutien mutuel entre étudiants, enseignants et administration.',
      color: 'bg-green-50 border-green-200',
      hoverColor: 'hover:bg-green-100'
    },
    {
      icon: <FaGraduationCap className="text-3xl text-first" />,
      title: 'Excellence',
      desc: 'Viser la qualité supérieure dans tous nos programmes de formation avec des standards internationaux.',
      color: 'bg-orange-50 border-orange-200',
      hoverColor: 'hover:bg-orange-100'
    },
  ]




  return (
    <section id="about" className="w-full py-20   relative overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-100/40 to-transparent rounded-full translate-y-40 -translate-x-40"></div>
      
      <div className="w-full mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-sm">
            <FaInfoCircle className="text-2xl text-blue-600" />
            <span className="text-lg font-semibold text-slate-700">À propos de nous</span>
          </div>
          <h2 className="text-3xl mb-8 font-bold text-first">
            Qui sommes-nous ?
          </h2>
        </div>



        {/* Main Content */}
        <div className="w-full flex flex-col lg:flex-row gap-16">
          
          {/* Left Column */}
          <div className="w-full flex-1">
            <div className="w-full bg-white/70 backdrop-blur-sm rounded-3xl p-8  transition-all duration-500">
              
              {/* Introduction */}
              <div className="w-full mb-12">
                <h3 className="text-2xl font-bold text-first mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-first rounded-full"></div>
                  Notre Histoire
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4 text-lg">
                  Depuis <span className="font-semibold text-gray-600">21 ans</span>, le Groupe DGC-Formation est une institution d'enseignement
                  supérieur située dans la zone industrielle, en face du Lycée Victor
                  Augagneur à Pointe-Noire.
                </p>
                <p className="text-slate-700 leading-relaxed text-lg">
                  Nous formons des étudiants ambitieux, prêts à relever les défis du
                  monde professionnel à travers une pédagogie <span className="font-semibold text-gray-600">pratique et innovante</span>.
                </p>
              </div>

              {/* Team Section */}
              <div>
                <h3 className="flex items-center text-2xl font-bold text-slate-800 mb-8">
                  <FaUsers className="text-blue-600 mr-3 text-3xl" />
                  Équipe Direction
                </h3>
                <div className="space-y-6">
                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="group cursor-pointer">
                      <div className="flex items-start p-6 bg-gradient-to-r from-blue-50 to-second/5 rounded-2xl border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                        <div className="bg-white rounded-full p-3 shadow-md mr-4 group-hover:scale-110 transition-transform duration-300">
                          <FaUserTie className="text-2xl text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800 text-xl mb-2">{member.name}</h4>
                          <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                          <p className="text-slate-600">{member.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8  transition-all duration-500">
              
              {/* Mission */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-first mb-6 flex items-center gap-3">
                  <FaBullseye className="text-second text-3xl" />
                  Notre Mission
                </h3>
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100 rounded-2xl p-6">
                  <p className="text-slate-700 leading-relaxed text-lg">
                    Fournir une <span className="font-semibold text-second">éducation de qualité</span> qui prépare nos
                    étudiants à exceller dans leurs carrières professionnelles. Nous
                    combinons théorie et pratique pour offrir une expérience d'apprentissage
                    complète et transformatrice.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div>
                <h3 className="flex items-center text-2xl font-bold text-first mb-8">
                  Nos Valeurs
                </h3>

                <div className="space-y-6">
                  {values.map((valeur, i) => (
                    <div 
                      key={valeur.title} 
                      className={`p-6 border-2 border-blue-100 hover:border-blue-300 rounded-2xl transition-all duration-300 cursor-pointer bg-gradient-to-r from-blue-50 to-second/5 hover:shadow-lg hover:scale-105 group`}
                      onMouseEnter={() => setHoveredValue(i)}
                      onMouseLeave={() => setHoveredValue(null)}
                    >
                      <div className="flex items-start">
                        <div className="mr-4 group-hover:scale-110 transition-transform duration-300">
                          {valeur.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-first text-xl mb-3">{valeur.title}</h4>
                          <p className="text-slate-700 leading-relaxed">{valeur.desc}</p>
                          
                          {hoveredValue === i && (
                            <div className="mt-4 pt-4 border-t border-slate-200">
                              <div className="flex items-center text-sm text-slate-500">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                                Découvrez nos formations alignées sur cette valeur
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuiSommesNous