import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Container, Reveal } from "../components/ui";

function NotFound() {
   return (
      <section className="py-32">
         <Container className="max-w-lg">
            <Reveal effet="zoom" className="text-center flex flex-col items-center">
               <p className="font-display text-7xl text-first">404</p>
               <h1 className="mt-4 text-2xl text-ink">Page introuvable</h1>
               <p className="mt-3 text-muted">
                  La page que vous cherchez n'existe pas ou a été déplacée.
               </p>
               <Link
                  to="/"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-first text-white font-semibold px-6 py-3 hover:bg-first-light transition-colors"
               >
                  <Home className="w-4 h-4" /> Retour à l'accueil
               </Link>
            </Reveal>
         </Container>
      </section>
   );
}

export default NotFound;
