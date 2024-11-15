import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import image from "../assets/medical_equipment2.jpg";

const CustomCarousel = () => {
  return (
    <div className="rounded-lg shadow-md mx-20 justify-center mt-4 rounded-lg">
      <Carousel
        autoPlay={true}
        // emulateTouch
        // infiniteLoop
        interval={7000}
        showThumbs={false}
        dynamicHeight={false}
        stopOnHover
      >
        <div className="carousel-slide rounded-lg">
          <div
            className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed rounded-lg"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          ></div>
          <img src={image} alt=".." className="carousel-img rounded-lg" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="mb-10 sm:text-6xl text-3xl	playfairDisplay-font text-white">
              Top Sellers
            </h2>
            <h3 className="mb-10 sm:text-xl	rubik-font text-white ">
              Check out our most sold items and products
            </h3>
            <button className="bg-baseGreen hover:bg-secondGreen text-white rubik-font py-2 px-4  rounded shadow sm:text-lg">
              View Listings
            </button>
          </div>
        </div>
        <div className="carousel-slide rounded-lg">
          <div
            className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          ></div>
          <img src={image} alt=".." className="carousel-img rounded-lg" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="mb-10 sm:text-6xl text-3xl	playfairDisplay-font text-white">
              Top Sellers
            </h2>
            <h3 className="mb-10 sm:text-xl	rubik-font text-white ">
              Check out our most sold items and products
            </h3>
            <button className="bg-baseGreen hover:bg-secondGreen text-white rubik-font py-2 px-4  rounded shadow sm:text-lg">
              View Listings
            </button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
