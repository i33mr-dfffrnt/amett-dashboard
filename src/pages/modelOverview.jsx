import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import amettAPI from "../api/amettAPI";
import Navbar from "../components/navbar";

import { useNavigate, useSearchParams, Link } from "react-router-dom";
import QuoteModal from "../components/quoteModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ModelOverview() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [models, setModels] = useState([]);
  const [type, setType] = useState();
  const [manufacturer, setManufacturer] = useState();

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await amettAPI.get(
          `/equipment-models?type=${searchParams.get("type")}&manufacturer=${searchParams.get(
            "manufacturer"
          )}&status=Active`
        );
        setModels(response.data.data.equipmentModels);
        setSelectedModel(response.data.data.equipmentModels[0]);
        setType(response.data.data.equipmentModels[0].type);
        setManufacturer(response.data.data.equipmentModels[0].manufacturer);
      } catch (error) {
        navigate("/404", { replace: true });
      }
    };
    fetchModel();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const updateSlide = (color) => {
    setSelectedModel(color);

    const colorIndex = models.indexOf(color);

    setCurrentSlide(colorIndex);
  };

  const [quoteModalState, setQuoteModalState] = useState(false);

  return (
    <>
      <Navbar />
      <div className="flex-auto">
        {selectedModel && (
          <QuoteModal
            selectedModel={selectedModel}
            quoteModalState={quoteModalState}
            setQuoteModalState={() => setQuoteModalState(false)}
          />
        )}
        {selectedModel && (
          <div className="bg-white ">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="justify-start flex max-w-2xl items-center space-x-2  lg:max-w-7xl mt-2 pl-4"
              >
                <li>
                  <div className="flex items-center">
                    <p className="text-xs sm:text-sm font-medium text-gray-500">Used Listings</p>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <Link
                      to={`/equipment-types`}
                      className=" text-sm font-medium text-gray-500 hover:text-gray-600"
                    >
                      Equipment Types
                    </Link>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <Link
                      to={`/equipment-manufacturers/${type._id}`}
                      className=" text-sm font-medium text-gray-500 hover:text-gray-600"
                    >
                      {`${type.name} Manufacturers`}
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                    <p className="ml-2 text-sm font-medium text-gray-900">
                      {`${type.name} by ${manufacturer.name}`}
                    </p>
                  </div>
                </li>
              </ol>
            </nav>

            {/* Model info */}

            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-8 lg:pb-24">
              <div className="w-full rounded-lg shadow-md product-carousel h-fit">
                <Carousel
                  // emulateTouch
                  showThumbs={false}
                  dynamicHeight={false}
                  selectedItem={currentSlide}
                  showIndicators={false}
                  showArrows={false}
                >
                  {models &&
                    models.map((el) => {
                      return (
                        <div className="product-carousel-slide rounded-lg" key={el.name}>
                          <img src={el.imageUrl} alt=".." className="carousel-img " />
                        </div>
                      );
                    })}
                  {/* <div className="product-carousel-slide">kek</div>
                  <div className="product-carousel-slide">kek1</div> */}
                </Carousel>
              </div>
              <div className="mt-2 lg:mt-0 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl playfairDisplay-font">
                  {`${type.name} by ${manufacturer.name}`}
                </h1>

                <div className="mt-10">
                  <RadioGroup value={selectedModel} onChange={updateSlide} className="mt-4">
                    <RadioGroup.Label className="sr-only"> Choose a model </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-4 lg:grid-cols-4 text-center">
                      {models?.map((model) => (
                        <RadioGroup.Option
                          key={model.name}
                          value={model}
                          className={({ active }) =>
                            classNames(
                              "bg-white shadow-sm text-gray-900 cursor-pointer",
                              active ? "ring-2 ring-baseBlue bg-gray-200" : "",
                              "rubik-font group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">{model.name}</RadioGroup.Label>
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked ? "border-baseBlue" : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <button
                  onClick={() => {
                    setQuoteModalState(true);
                  }}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-baseBlack py-3 px-8 text-base font-medium text-white hover:bg-baseBlue focus:outline-none focus:ring-2 focus:ring-baseBlue focus:ring-offset-2"
                >
                  Request a quote
                </button>
                {/* </form> */}
              </div>
              <div className="col-span-2	">
                <h2 className="my-4 text-left rubik-font sm:text-xl font-semibold text-baseBlue">
                  Model Description
                </h2>
                <p className="">{selectedModel.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
