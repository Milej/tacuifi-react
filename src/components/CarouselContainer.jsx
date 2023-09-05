import { Carousel } from "flowbite-react";

const CarouselContainer = ({ images, folder }) => {

  return (
    <Carousel slide={false} className="p-1 w-full h-full">
      {images.map((item) => (
        <img key={item} src={`/${folder}/${item}`} />
      ))}
    </Carousel>
  );
};

export default CarouselContainer;
