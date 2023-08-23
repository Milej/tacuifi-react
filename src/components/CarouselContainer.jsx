import { Carousel } from "flowbite-react";
import React from "react";

const CarouselContainer = ({ images, folder }) => {

  return (
    <Carousel className="p-1 w-full h-full">
      {images.map((item) => (
        <img src={`http://resource.ferozo.net/tacuifi/${folder}/${item}`} />
      ))}
    </Carousel>
  );
};

export default CarouselContainer;
