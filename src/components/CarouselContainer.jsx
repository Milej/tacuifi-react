import { Carousel } from "flowbite-react";

const CarouselContainer = ({ images, folder }) => {
  return (
    <Carousel slide={false} indicators={false}>
      {images.map(item => (
        <img key={item} src={`/${folder}/${item}`} />
      ))}
    </Carousel>
  );
};

export default CarouselContainer;
