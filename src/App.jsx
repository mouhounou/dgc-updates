import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Preinscription from "./pages/Preinscription";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Master from "./pages/master";
import MasterPreinscription from "./pages/MasterPreinscription";
import MasterDetail from "./pages/MasterDetail";

function App() {
   return (
      <Routes>
         <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/masters" element={<Master />} />
            <Route path="/masters/:slug" element={<MasterDetail />} />
            <Route path="/masters/:slug/preinscription" element={<MasterPreinscription />} />
            <Route path="/preinscription" element={<Preinscription />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
         </Route>
      </Routes>
   );
}

export default App;
