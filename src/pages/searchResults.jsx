import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import amettAPI from "../api/amettAPI";
import Navbar from "../components/navbar";

const SearchResults = () => {
  const [results, setResults] = useState([]);

  const { searchTerm } = useParams();

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await amettAPI.get(`/equipment-models/search/${searchTerm}`);
        setResults(response.data.data.equipmentModels);
      } catch (error) {}
    };
    fetchEquipments();
  }, []);
  return (
    <>
      <Navbar />

      <div className="flex-auto">
        {results.map((el) => {
          return (
            <Link
              key={el._id}
              to={`/models?type=${el.type._id}&manufacturer=${el.manufacturer._id}`}
            >
              <div className="grid grid-cols-3 m-4 h-72 gap-x-2 border-r shadow-md " key={el._id}>
                <img src={el.imageUrl} alt="" className="object-contain h-44 lg:h-72 w-full" />
                <div className="mt-2 lg:mt-0 lg:pr-8 col-span-2	">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl playfairDisplay-font">
                    {`${el.name}`}
                  </h1>
                  <p className="font-semibold">{`${el.type.name} by ${el.manufacturer.name}`}</p>
                  <p className="">{el.description}</p>
                </div>
              </div>
            </Link>
          );
        })}

        {results && (
          <div className="grid grid-cols-2 m-4 h-80 gap-x-2  ">
            <img
              src={require("../assets/undraw_searching_re_3ra9.svg").default}
              alt=""
              className="object-contain h-44 lg:h-80 w-full"
            />
            <div className="mt-2 lg:mt-0 lg:pr-8	">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl playfairDisplay-font">
                Could not find what you're looking for?
              </h1>
              <p className="">
                Contact us! We can certainly help you:
                <a className="font-bold" href="mailto: abc@example.com">
                  {" "}
                  sales@amett.net
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;
