import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

// Cloudflare Turnstile : vérification anti-robot des formulaires.
// Le jeton obtenu est envoyé à l'API (champ « turnstileToken »), qui le valide
// auprès de Cloudflare avec la clé secrète avant d'envoyer l'e-mail.

// Clé publique du widget (Cloudflare → Turnstile), commune aux sites du Groupe DGC.
// VITE_TURNSTILE_SITE_KEY permet de la remplacer au build (ex. clé de test "1x00000000000000000000AA").
// La clé SECRÈTE ne doit jamais apparaître ici : elle reste sur le serveur de l'API.
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAF22zUWbljy8cLoo'

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

// Chargement unique du script Cloudflare, partagé entre les formulaires
let chargement = null
function chargerScript() {
   if (window.turnstile) return Promise.resolve()
   if (!chargement) {
      chargement = new Promise((resolve, reject) => {
         const s = document.createElement('script')
         s.src = SCRIPT_SRC
         s.async = true
         s.defer = true
         s.onload = () => resolve()
         s.onerror = () => {
            chargement = null
            reject(new Error('Turnstile indisponible'))
         }
         document.head.appendChild(s)
      })
   }
   return chargement
}

// onToken(jeton) : appelé avec "" quand le jeton expire ou en cas d'erreur.
// ref.reset() : nouveau défi (un jeton ne sert qu'une fois, à appeler après chaque envoi).
const Turnstile = forwardRef(function Turnstile({ onToken, action, className }, ref) {
   const conteneur = useRef(null)
   const widgetId = useRef(null)
   const onTokenRef = useRef(onToken)
   useEffect(() => {
      onTokenRef.current = onToken
   }, [onToken])

   useImperativeHandle(ref, () => ({
      reset: () => {
         onTokenRef.current('')
         if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current)
      },
   }))

   useEffect(() => {
      let annule = false
      chargerScript()
         .then(() => {
            if (annule || !conteneur.current || !window.turnstile) return
            widgetId.current = window.turnstile.render(conteneur.current, {
               sitekey: TURNSTILE_SITE_KEY,
               action,
               language: 'fr',
               theme: 'light',
               size: 'flexible',
               callback: (token) => onTokenRef.current(token),
               'expired-callback': () => onTokenRef.current(''),
               'error-callback': () => onTokenRef.current(''),
            })
         })
         .catch(() => onTokenRef.current(''))
      return () => {
         annule = true
         if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current)
         widgetId.current = null
         onTokenRef.current('') // widget retiré : son jeton n'est plus suivi
      }
   }, [action])

   return <div ref={conteneur} className={className} />
})

export default Turnstile
