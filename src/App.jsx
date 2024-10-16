import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Home from "./pages/Home";
import Tacuifi from "./pages/Tacuifi";
import Tacuifi2 from "./pages/Tacuifi2";
import Promociones from "./pages/Promociones";
import { CONTACTO, INICIO, PROMOCIONES, TACUIFI, TACUIFI_2, UNIDAD } from "./config/rutas";
import Error404 from "./pages/Error404";
import Unidad from "./pages/Unidad";
import Contacto from "./pages/Contacto";

const App = () => {
  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path={INICIO} element={<Home />} />
          <Route exact path={TACUIFI} element={<Tacuifi />} />
          <Route exact path={TACUIFI_2} element={<Tacuifi2 />} />
          <Route exact path={UNIDAD + "/:id"} element={<Unidad />} />
          <Route exact path={PROMOCIONES} element={<Promociones />} />
          <Route exact path={CONTACTO} element={<Contacto />} />
          <Route exact path="*" element={<Error404 />} />
        </Routes>
        <FloatingWhatsApp
          phoneNumber="+5493546402842"
          accountName="Cabañas Tacuifí"
          avatar="/logo.png"
          statusMessage="⏰ 9AM - 23PM"
          chatMessage="Hola 😊! ¿En que podemos ayudarle?"
          placeholder="Escribe un mensaje"
          allowClickAway
          allowEsc
        />
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
};

export default App;
