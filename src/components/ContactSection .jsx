/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import GoogleMapEmbed from './GoogleMapEmbed'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import {HashLoader} from 'react-spinners'


const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
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

const ContactSection = () => {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const toSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    try {
      
      if (!name || !phone || !email || !subject || !message) { 
        toast.error('Remplissez tous les champs de texte')
        setLoading(false)
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        toast.error('Adresse email invalide')
        return
      }

      const res = await axios.post('https://dgc-api.vercel.app/api/mail/mailler', { name, phone, email, subject, message })
      // const res = await axios.post('http://localhost:5000/api/mail/mailler', { name, phone, email, subject, message })
      console.log('====================================');
      console.log(res.data);
      console.log('====================================');
      
      if (res.data.success) {
        toast.success('Le mail a été envoyé avec succès')
        setEmail('')
        setName('')
        setPhone('')
        setSubject('')
        setMessage('')
        setLoading(false)
      } else {
        toast.error(res.data.message)
        setLoading(false)
      }

    } catch (err) {
      toast.error(err)
      setLoading(false)
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    }
  } 

  return (
    <section id='contact' className="py-12 px-4 text-gray-600 w-full flex flex-col items-center justify-center gap-5">
      <motion.div
        className="flex flex-col items-center justify-center gap-2 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, duration: 0.6 }}
        variants={fadeInUp}
        custom={1}
      >
        <h2 className="text-3xl font-bold text-first">Contactez-nous</h2>
        <p className="text-gray-600">Pour plus d'informations sur nos formations et inscriptions</p>
      </motion.div>

      <div className="w-full mx-auto flex flex-col md:flex-row gap-8 mt-6">
        {/* Bloc Gauche – Informations */}
        <motion.div
            className="md:w-1/2 bg-white shadow-md rounded-lg overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, duration: 0.6 }}
            variants={fadeInUp}
            custom={2}
        >
          <GoogleMapEmbed />
          <div className="p-6 space-y-5">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-first mt-1" />
              <div>
                <p className="font-medium">Adresse</p>
                <p>
                  Zone industrielle, 87 Rue Gamba en face du Lycée Victor Augagneur
                  Pointe-Noire, République du Congo
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-first mt-1" />
              <div>
                <p className="font-medium">Sécrétariat</p>
                <p>+242 05 796 08 50</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-first mt-1" />
                <div>
                  <p className="font-medium">Recrutement</p>
                  <p>+242 05 092 74 23</p>
                </div>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="text-first mt-1" />
              <div>
                <p className="font-medium">Email</p>
                <p>contact@dgc-congo.org</p>
              </div>
            </div>

            <div>
              <p className="font-medium">Horaires d'ouverture</p>
              <p>
                Lundi - Vendredi: 8h00 - 17h00<br />
                Samedi: 9h00 - 13h00
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bloc Droite – Formulaire */}
        <motion.div
          className="md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, duration: 0.6 }}
          variants={fadeInUp}
          custom={3}
        >
          <form onSubmit={toSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                id="name"
                className="w-full border border-gray-300 rounded p-2" />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="email"
                className="w-full border border-gray-300 rounded p-2" />
            </div>

            <div>
              <label htmlFor="phone" className="block font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full border border-gray-300 rounded p-2" />
            </div>

            <div>
              <label htmlFor="subject" className="block font-medium text-gray-700 mb-1">
                Sujet
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                id="subject"
                className="cursor-pointer w-full border border-gray-300 rounded p-2">
                <option value="">Choisissez un sujet</option>
                <option value="formation">Formation</option>
                <option value="inscription">Inscription</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows="4"
                className="w-full border border-gray-300 rounded p-2" />
            </div>

            {
              loading ? 
                <div className='w-full py-3 flex items-center justify-center'>
                  <HashLoader  color='#477298'/>
                </div>
                
                :
                <button
                  type="submit"
                  className="w-full bg-first hover:bg-first/75 cursor-pointer text-white font-semibold py-2 rounded"
                >
                  Envoyer
              </button>
            }
            
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
