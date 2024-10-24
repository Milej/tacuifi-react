import React from "react";
import Iframe from "react-iframe";
import CarouselContainer from "../CarouselContainer";
import "./Card.css";
import { NavLink } from "react-router-dom";
import Button from "../Button";

const Card = ({ title, text, location, folder, images, destination }) => {
  return (
    <div className="container mx-auto card my-10 rounded-lg ring-1 ring-zinc-200 hover:ring-2 hover:ring-zinc-700">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 p-10 text-center">
        <NavLink to={destination} className="col-span-1 xl:col-span-2">
          <h2 className="text-4xl xl:text-5xl col-span-3">{title}</h2>
        </NavLink>

        <p className="col-span-1 xl:col-span-2 text-base xl:text-xl text-left">{text}</p>

        <div className="col-span-1">
          <CarouselContainer images={images} folder={folder} />
        </div>

        <div className="col-span-1 h-60 md:h-80 xl:h-96">
          <Iframe url={location} className="w-full h-full rounded"></Iframe>
        </div>

        <div className="col-span-1 xl:col-span-2">
          <Button text="Conocer más" page={destination} />
        </div>
      </div>
    </div>
  );
};

export default Card;
