import { Carousel } from "flowbite-react";

const CarouselContainer = ({ images, folder }) => {
  return (
    <Carousel className="h-60 md:h-96" slide={false} indicators={false}>
      {images.map(item => (
        <img key={item} src={`/${folder}/${item}`} />
      ))}
    </Carousel>
  );
};

export default CarouselContainer;
