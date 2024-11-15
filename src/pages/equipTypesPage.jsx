import amettAPI from "../api/amettAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

const EquipTypesPage = () => {
  const [equipTypesList, setEquipTypesList] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await amettAPI.get(`/equipment-types`);
        setEquipTypesList(response.data.data.equipmentTypes);
      } catch (error) {}
    };
    fetchTypes();
    console.log("time");
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-4 flex-auto   ">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="justify-start flex max-w-2xl items-center space-x-2  lg:max-w-7xl -mt-2"
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
                <p className=" text-sm font-medium text-gray-900">Equipment Types</p>
              </div>
            </li>
          </ol>
        </nav>
        <div className="playfairDisplay-font">
          {
            <div className="row grid md:grid-cols-4 grid-cols-2  gap-y-6 gap-x-2 ">
              {equipTypesList.map((el, i) => {
                return (
                  <Link key={el.name} to={`/equipment-manufacturers/${el._id}`}>
                    <div className="flex flex-col items-center  w-full rounded-lg shadow-xl">
                      <img className="h-44 lg:h-72 object-cover	" src={el.imageUrl} alt="" />
                      <h4 className="font-semibold text-xs sm:text-xl">{el.name}</h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default EquipTypesPage;
