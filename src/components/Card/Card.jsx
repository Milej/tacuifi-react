import React from "react";
import Iframe from "react-iframe";
import CarouselContainer from "../CarouselContainer";
import "./Card.css";
import { NavLink } from "react-router-dom";
import Button from "../Button";

const Card = ({ title, text, location, folder, images }) => {
  return (
    <div className="flex card m-10 rounded-lg ring-1 ring-zinc-200 hover:ring-2 hover:ring-zinc-700">
      <div className="p-10 text-center space-y-8">
        <NavLink to={`/${folder}`}>
          <h2 className="text-5xl col-span-3">{title}</h2>
        </NavLink>

        <p className="text-xl text-left">{text}</p>

        <div className="h-80">
          <Iframe url={location} className="w-full h-full"></Iframe>
        </div>

        <Button text="Conocer más" page={`/${folder}`} />
      </div>

      <CarouselContainer images={images} folder={folder} />
    </div>
  );
};

export default Card;
