import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate(`../search/${searchTerm}`, { replace: true });
    if (location.pathname.slice(0, 7) === "/search") navigate(0);
  };

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="relative mx-auto text-gray-600 ">
      <form onSubmit={handleSubmit}>
        <input
          className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none  sm:w-48 lg:w-72 xl:w-96"
          type="search"
          name="search"
          placeholder="Search for equipment"
          onChange={handleChange}
        />
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-2">
          <FiSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
