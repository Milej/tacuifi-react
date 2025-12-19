import "./index.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { INICIO } from "./config/rutas";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path={INICIO} element={<Landing />} />
        </Routes>
        <FloatingWhatsApp
          phoneNumber="+5493546402842"
          accountName="Cabañas Tacuifí"
          avatar="/fondo-wa.png"
          statusMessage="💬 Respondemos en minutos"
          chatMessage="Hola 👋
¿Querés consultar disponibilidad o precios para tu estadía?"
          placeholder="Escribe tu consulta aquí..."
          allowClickAway
          allowEsc
          notification
          notificationSound
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
