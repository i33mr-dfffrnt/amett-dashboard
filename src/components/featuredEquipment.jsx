import { Link } from "react-router-dom";
import deviceImg from "../assets/1436-1-valleylab-force-fx-c.jpg";
const FeaturedEquipment = ({ model }) => {
  return (
    <Link
      to={`/models?type=${model.type._id}&manufacturer=${model.manufacturer._id}`}
      className="text-left playfairDisplay-font inline-block	px-4  w-2/4 sm:w-1/3	whitespace-normal"
    >
      <img className="h-30 sm:h-60" src={model.imageUrl} alt="" />
      <h4 className="font-semibold text-xs sm:text-lg	 ">{model.name}</h4>
      <h4 className="text-xs sm:text-base font-medium">
        <Link to={`/equipment-manufacturers/${model.type._id}`} className="text-cyan-900 underline">
          {model.type.name}
        </Link>
        {` By ${model.manufacturer.name}`}
      </h4>
    </Link>
  );
};

export default FeaturedEquipment;
