import React from "react";
import Intro from "./../components/Intro/Intro";
import Card from "./../components/Card/Card";

const Home = () => {
  const imagesTacuifi = [];
  for (let i = 1; i <= 25; i++) {
    imagesTacuifi.push(`${i}.jpg`);
  }
  const imagesTacuifi2 = [];
  for (let i = 1; i <= 31; i++) {
    imagesTacuifi2.push(`${i}.jpg`);
  }
  return (
    <>
      <Intro></Intro>
      <Card
        title="Tacuifí I"
        text="Ubicado sobre la avenida principal, en un amplio predio iluminado, parquizado y arbolado. A 200mts del río y a 350mts del casco histórico."
        location="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1014.231067499505!2d-64.57806790987982!3d-31.92287474087504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d2b1755b41236f%3A0x26826f7a3b72880f!2sCaba%C3%B1as%20Tacuifi!5e0!3m2!1ses-419!2sar!4v1629501904631!5m2!1ses-419!2sar"
        folder="tacuifi"
        images={imagesTacuifi}
      ></Card>

      <Card
        title="Tacuifí II"
        text="Ubicadas en un amplio predio iluminado y arbolado. Frente al río y a 350mts del casco histórico. Quincho abierto con asador-parrilla y piscina de 6x3."
        location="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3386.4858381087347!2d-64.57629538483951!3d-31.920564581239056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d2b3d54abb44d7%3A0x59156d6c3449bf1c!2sCaba%C3%B1as%20Tacuifi%20II!5e0!3m2!1ses-419!2sar!4v1630186855791!5m2!1ses-419!2sar"
        folder="tacuifi2"
        images={imagesTacuifi2}
      ></Card>
    </>
  );
};

export default Home;
