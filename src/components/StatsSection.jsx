/* eslint-disable no-unused-vars */
import React from 'react'
import CountUp from 'react-countup'
import Atouts from './Atouts'
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

const StatsSection = () => {
  const stats = [
    { number: 500000, label: "Étudiants diplômés", signe: "+" },
    { number: 350000, label: "Étudiants recrutés", signe: "+" },
    { number: 250000, label: "Étudiants à l'international", signe: "+" },
    { number: 95, label: "Insertion en stage", signe: "%" },
  ]

  return (
    <section id='atouts' className="py-12 px-[2%] md:px-[2.5%]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-first mb-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          custom={0}
        >
          Atouts et Différenciation
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          custom={0.5}
        >
          DGC en quelques chiffres
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white flex flex-col items-center justify-center p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInUp}
              custom={index + 1}
            >
              <h3 className="text-4xl flex items-center font-extrabold text-first">
                <span><CountUp separator=' ' end={item.number} duration={2} /></span>
                <span>{item.signe}</span>
              </h3>
              <p className="text-gray-600 mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Atouts />
    </section>
  )
}

export default StatsSection
