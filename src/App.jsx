import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Home from "./pages/Home";
import Tacuifi from "./pages/Tacuifi";
import Tacuifi2 from "./pages/Tacuifi2";
import Contact from "./components/Contact"
import UnitDetailContainer from "./components/UnitDetailContainer"

const App = () => {

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="home" element={<Home />} />
          <Route exact path="tacuifi" element={<Tacuifi />} />
          <Route exact path="tacuifi/:unit" element={<UnitDetailContainer />} />
          <Route exact path="tacuifi2" element={<Tacuifi2 />} />
          <Route exact path="tacuifi2/:unitId" element={<UnitDetailContainer />} />
          <Route exact path="promotion" element="Promociones" />
          <Route exact path="contact" element={<Contact />} />
        </Routes>
        <FloatingWhatsApp
          phoneNumber="+5493546402842"
          accountName="Cabañas Tacuifí"
          avatar="./src/assets/images/logo.png"
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
