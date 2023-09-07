import { Carousel } from "flowbite-react";

const CarouselContainer = ({ images, folder }) => {

  return (
    <Carousel slide={false} className="h-60 md:h-96 lg:h-full" indicators={false}>
      {images.map((item) => (
        <img key={item} src={`/${folder}/${item}`} className="w-full h-full" />
      ))}
    </Carousel>
  );
};

export default CarouselContainer;
