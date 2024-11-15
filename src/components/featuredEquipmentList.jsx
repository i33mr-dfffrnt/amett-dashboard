import { useEffect, useState } from "react";
import FeaturedEquipment from "./featuredEquipment";
import amettAPI from "../api/amettAPI";
const FeaturedEquipmentList = () => {
  const [models, setModels] = useState([]);
  useEffect(() => {
    const fetchModels = async () => {
      const response = await amettAPI.get(
        `/equipment-models?status=Active&sort=-createdAt&limit=6`
      );
      setModels(response.data.data.equipmentModels);
    };
    fetchModels();
  }, []);

  return (
    <div className="my-8">
      <h2 className="m-4 text-left playfairDisplay-font text-xl sm:text-3xl font-semibold">
        Featured equipment{"  "}
        <a href="/equipment-types" className="underline sm:text-xl text-sm font-medium">
          View All
        </a>
      </h2>
      <div className="text-left	divide-x divide-gray-400 overflow-auto whitespace-nowrap">
        {models &&
          models.map((model) => {
            return <FeaturedEquipment model={model} />;
          })}
      </div>
    </div>
  );
};

export default FeaturedEquipmentList;
