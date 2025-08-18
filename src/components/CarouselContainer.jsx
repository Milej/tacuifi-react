import { Carousel } from "flowbite-react";

const CarouselContainer = ({ images, folder }) => {
  return (
    <div className="w-full h-64 md:h-[450px] xl:h-[500px] rounded-xl overflow-hidden shadow-lg">
      <Carousel slide={false} indicators={false}>
        {images.map((item) => (
          <img key={item} src={`/${folder}/${item}`} className="w-full h-full object-cover" alt="Cabaña Tacuifí" />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselContainer;
