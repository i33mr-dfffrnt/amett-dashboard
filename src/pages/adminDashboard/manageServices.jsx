import AdminSidebar from "../../components/adminSidebar";
import SortDropdown from "../../components/sortDropdown";
import { IoAddCircleOutline, IoTrash, IoPencil } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import ConfirmModal from "../../components/confirmModal";
import { Link } from "react-router-dom";
import amettAPI from "../../api/amettAPI";

const ManageServices = () => {
  const [servicesList, setServicesList] = useState([]);
  const [confirmModalState, setConfirmModalState] = useState(false);
  const [deleteItemName, setDeleteItemName] = useState("");
  const [deleteItemCount, setDeleteItemCount] = useState(0);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  const [submitFunction, setSubmitFunction] = useState(null);

  const [modalMsg, setModalMsg] = useState("");
  const [modalSuccessMsg, setModalSuccessMsg] = useState("");
  const [modalErrMsg, setModalErrMsg] = useState("");

  const sortList = ["Newest", "Oldest", "Service A-Z", "Type A-Z"];
  const [filteredList, setFilteredList] = new useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await amettAPI.get(`/services`);
        setServicesList(response.data.data.services);
        setFilteredList(response.data.data.services);
      } catch (error) {}
    };
    fetchServices();
    setIsCheck([]);
  }, [updateList]);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);

    // The state hasn't changed yet, so when isCheckAll is true, it is actually false and vice versa
    if (isCheckAll) {
      setIsCheck([]);
    } else {
      setIsCheck(filteredList.map((el) => el._id));
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    } else {
      setIsCheck([...isCheck, id]);
    }
  };

  const sortServices = (method) => {
    if (method === "Newest") {
      setFilteredList(
        [...filteredList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (method === "Oldest") {
      setFilteredList(
        [...filteredList].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
    } else if (method === "Service A-Z") {
      setFilteredList([...filteredList].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (method === "Type A-Z") {
      setFilteredList([...filteredList].sort((a, b) => a.type.name.localeCompare(b.name)));
    }
  };

  const filterBySearch = (event) => {
    const query = event.target.value;
    var updatedList = [...servicesList];

    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredList(updatedList);
  };

  const services = filteredList.map((el) => {
    return (
      <tr className="bg-white border-b hover:bg-gray-50" key={el._id}>
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              id={el._id}
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2  "
              onChange={handleClick}
              checked={isCheck.includes(el._id)}
            />
          </div>
        </td>
        <th scope="row" className="px-6 py-4 font-medium text-gray-900  max-w-sm ellipsis">
          {el.name}
        </th>
        <td className=" px-6 py-4 max-w-sm ellipsis">{el.type.name}</td>
        <td className="px-6 py-4">{el.status}</td>

        <td className="flex items-center justify-center px-6 py-4 space-x-3 ">
          <button
            onClick={() => {
              setDeleteItemCount(1);
              setDeleteItemName(el.name);
              setConfirmModalState(true);
              setSubmitFunction(() => () => {
                return amettAPI.delete(`/services/${el._id}`);
              });
              setModalMsg(`Are you sure you want to delete ${el.name}?`);
              setModalSuccessMsg(`${el.name} was deleted successfully!`);
              setModalErrMsg(`Something went wrong! Please try again later`);
            }}
            className=" flex w-30 text-sm items-center justify-center rounded-3xl border border-transparent  drop-shadow-lg bg-white py-1 px-1  font-semibold text-white "
          >
            <IoTrash size={20} color="#FA0562" />
          </button>
          <Link
            to={`/update-service/${el._id}`}
            className=" flex w-30 text-sm items-center justify-center rounded-3xl border border-transparent  drop-shadow-lg bg-white py-1 px-1  font-semibold text-white "
          >
            <IoPencil size={20} color="#1CABFF" />
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div className=" grid grid-cols-5 gap-4">
      <AdminSidebar />
      <ConfirmModal
        confirmModalState={confirmModalState}
        setConfirmModalState={() => setConfirmModalState(false)}
        deleteItemCount={deleteItemCount}
        deleteItemName={deleteItemName}
        submitFunction={() => {
          return submitFunction();
        }}
        setUpdateList={() => setUpdateList(!updateList)}
        header={"Delete item/s"}
        icon={
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-carnationRed sm:mx-0 sm:h-10 sm:w-10">
            <IoTrash className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
        }
        submitBtnClasses={"bg-carnationRed hover:bg-carnationRedDark focus:ring-red-500"}
        modalMsg={modalMsg}
        modalSuccessMsg={modalSuccessMsg}
        modalErrMsg={modalErrMsg}
      />

      <div className="col-span-4 mt-10 ">
        <h2 className="text-xl sm:text-4xl mb-5 mt-2 playfairDisplay-font font-bold">Services</h2>
        <div className="flex flex-row justify-end gap-3 my-4">
          <h3 className="flex w-30 text-sm items-center justify-center rounded-sm border border-transparent  py-1 px-4  font-semibold ">
            {`${filteredList.length} services were found`}
          </h3>
          {/* <Link
            to={"/manage-equipment-manufacturers"}
            className="flex items-center justify-center rounded-sm border border-gray-300  bg-white py-1 px-4  shadow-lg"
          >
            Manage Manufacturers
          </Link> */}
          <Link
            to={"/manage-service-types"}
            className="flex items-center justify-center rounded-sm border border-gray-300  bg-white py-1 px-4  shadow-lg"
          >
            Manage Collections
          </Link>
          <Link
            to={`/create-service`}
            className=" flex w-30 text-sm items-center justify-center rounded-sm border border-transparent bg-dodger py-1 px-4  font-semibold text-white hover:bg-dodgerDark focus:outline-none"
          >
            <IoAddCircleOutline size={30} className="mr-2" />
            Add Service
          </Link>

          <button
            onClick={() => {
              setDeleteItemCount(isCheck.length);
              setConfirmModalState(true);
              setDeleteItemName("");

              setModalMsg(`Are you sure you want to delete ${isCheck.length} items?`);
              setModalSuccessMsg(`${isCheck.length} items were deleted successfully!`);
              setModalErrMsg(`Something went wrong! Please try again later`);
              setSubmitFunction(() => () => {
                return amettAPI.delete(`/services`, {
                  data: { deleteArray: isCheck },
                });
              });
            }}
            className={`flex w-30 text-sm items-center justify-center rounded-sm border border-transparent py-1 px-2  font-semibold text-white  focus:outline-none ${
              isCheck.length ? " bg-carnationRed hover:bg-carnationRedDark" : " bg-baseGray"
            }`}
            disabled={!isCheck.length}
          >
            <IoTrash size={30} />
          </button>
          <SortDropdown sortList={sortList} sort={sortServices} />
          <div className="relative text-gray-600 ">
            <input
              className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-sm text-sm focus:outline-none  w-full"
              type="search"
              name="search"
              placeholder="Search for services"
              onChange={filterBySearch}
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-2">
              <FiSearch />
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2  "
                      onChange={handleSelectAll}
                      checked={isCheckAll}
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  service name
                </th>
                <th scope="col" className="px-6 py-3">
                  collection
                </th>

                <th scope="col" className="px-6 py-3">
                  status
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{services}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageServices;
