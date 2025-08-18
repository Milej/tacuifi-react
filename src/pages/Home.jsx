import Intro from "./../components/Intro";
import Card from "./../components/Card";
import { TACUIFI } from "../config/rutas";

const Home = () => {
  const imagesTacuifi = [];
  for (let i = 1; i <= 25; i++) imagesTacuifi.push(`${i}.jpg`);

  return (
    <>
      <Intro />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Card
            title="Tacuifí I"
            text="Ubicado sobre la avenida principal, en un amplio predio iluminado, parquizado y arbolado. A 200mts del río y a 350mts del casco histórico."
            location="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1014.231067499505!2d-64.57806790987982!3d-31.92287474087504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d2b1755b41236f%3A0x26826f7a3b72880f!2sCaba%C3%B1as%20Tacuifi!5e0!3m2!1ses-419!2sar!4v1629501904631!5m2!1ses-419!2sar"
            folder="tacuifi"
            images={imagesTacuifi}
            destination={TACUIFI}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
