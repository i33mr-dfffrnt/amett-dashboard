import AdminSidebar from "../../components/adminSidebar";
import SortDropdown from "../../components/sortDropdown";
import { IoTrash, IoPencil, IoReloadOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import ConfirmModal from "../../components/confirmModal";
import { Link } from "react-router-dom";
import amettAPI from "../../api/amettAPI";
import SuccessNotification from "../../components/successNotification";
import ErrorNotification from "../../components/errorNotification";

const ManageAuctions = () => {
  const [auctionsList, setAuctionsList] = useState([]);
  const [confirmModalState, setConfirmModalState] = useState(false);
  const [deleteItemName, setDeleteItemName] = useState("");
  const [deleteItemCount, setDeleteItemCount] = useState(0);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessAlertShown, setSuccessAlertShown] = useState(false);
  const [isErrorAlertShown, setErrorAlertShown] = useState(false);

  const [submitFunction, setSubmitFunction] = useState(null);

  const [modalHeader, setModalHeader] = useState("");
  const [modalIcon, setModalIcon] = useState(null);
  const [modalSubmitBtnClasses, setModalSubmitBtnClasses] = useState("");
  const [modalMsg, setModalMsg] = useState("");
  const [modalSuccessMsg, setModalSuccessMsg] = useState("");
  const [modalErrMsg, setModalErrMsg] = useState("");

  const sortList = ["Auction A-Z", "End Date Ascending", "End Date Descending", "Highest Bid"];
  const [filteredList, setFilteredList] = new useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await amettAPI.get(`/auctions`);
        setAuctionsList(response.data.data.auctions);
        setFilteredList(response.data.data.auctions);
      } catch (error) {}
    };
    fetchAuctions();
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

  const sortAuctions = (method) => {
    if (method === "Auction A-Z") {
      setFilteredList([...filteredList].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (method === "End Date Ascending") {
      setFilteredList([...filteredList].sort((a, b) => new Date(a.endDate) - new Date(b.endDate)));
    } else if (method === "End Date Descending") {
      setFilteredList([...filteredList].sort((a, b) => new Date(b.endDate) - new Date(a.endDate)));
    } else if (method === "Highest Bid") {
      setFilteredList(
        [...filteredList].sort((a, b) => new Date(b.currentBid) - new Date(a.currentBid))
      );
    }
  };

  const filterBySearch = (event) => {
    const query = event.target.value;
    var updatedList = [...auctionsList];

    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredList(updatedList);
  };

  const updateAuctionsList = async () => {
    setSuccessAlertShown(false);
    setErrorAlertShown(false);
    setIsLoading(true);
    try {
      await amettAPI.post(`/jobs`);
      const response = await amettAPI.get(`/auctions`);
      setAuctionsList(response.data.data.auctions);
      setFilteredList(response.data.data.auctions);

      setIsLoading(false);
      setSuccessAlertShown(true);
      // setTimeout(() => localClose(), 5000);
    } catch (error) {
      setIsLoading(false);
      setErrorAlertShown(true);
      throw error;
    }
  };

  const auctions = filteredList.map((el) => {
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
        <th scope="row" className=" px-6 py-4 font-medium text-gray-900  max-w-sm ellipsis">
          {el.name}
        </th>
        <td className="px-6 py-4">{el.currentBid}</td>
        <td className="px-6 py-4">{el.endDate.split("T")[0]}</td>
        <td className="px-6 py-4">{el.status}</td>
        <td className="px-6 py-4 ">
          <Link
            className="text-dodger underline"
            to={{ pathname: "/admin-dashboard/manage-bids", search: `query=${el._id}` }}
          >
            Bids List
          </Link>
        </td>

        <td className="flex items-center justify-center px-6 py-4 space-x-3 ">
          <button
            onClick={() => {
              setDeleteItemCount(1);
              setDeleteItemName(el.name);
              setModalHeader("Delete Item");
              setModalIcon(
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-carnationRed sm:mx-0 sm:h-10 sm:w-10">
                  <IoTrash className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              );
              setModalSubmitBtnClasses(
                "bg-carnationRed hover:bg-carnationRedDark focus:ring-red-500"
              );
              setModalMsg(
                `Are you sure you want to delete ${el.name}? All associated bids will be deleted as well`
              );
              setModalSuccessMsg(`${el.name} was deleted successfully!`);
              setModalErrMsg(`Something went wrong! Please try again later`);
              setConfirmModalState(true);
              setSubmitFunction(() => () => {
                return amettAPI.delete(`/auctions/${el._id}`);
              });
            }}
            className=" flex w-30 text-sm items-center justify-center rounded-3xl border border-transparent  drop-shadow-lg bg-white py-1 px-1  font-semibold text-white "
          >
            <IoTrash size={20} color="#FA0562" />
          </button>
          <Link
            to={`/admin-dashboard/update-auction/${el._id}`}
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
      {isErrorAlertShown ? (
        <ErrorNotification
          msg={"Something went wrong updating list of auctions! Please try again later."}
          setErrorAlertShown={() => setErrorAlertShown(false)}
        />
      ) : null}
      {isSuccessAlertShown ? (
        <SuccessNotification
          msg={"Success! The list of auctions was updated."}
          setSuccessAlertShown={() => setSuccessAlertShown(false)}
        />
      ) : null}
      <ConfirmModal
        confirmModalState={confirmModalState}
        setConfirmModalState={() => setConfirmModalState(false)}
        deleteItemCount={deleteItemCount}
        deleteItemName={deleteItemName}
        submitFunction={() => {
          return submitFunction();
        }}
        setUpdateList={() => setUpdateList(!updateList)}
        header={modalHeader}
        icon={modalIcon}
        submitBtnClasses={modalSubmitBtnClasses}
        modalMsg={modalMsg}
        modalSuccessMsg={modalSuccessMsg}
        modalErrMsg={modalErrMsg}
      />

      <div className="col-span-4 mt-10 ">
        <h2 className="text-xl sm:text-4xl mb-5 mt-2 playfairDisplay-font font-bold">
          Manage Auctions
        </h2>
        <div className="flex flex-row justify-end gap-3 my-4">
          <h3 className="flex w-30 text-sm items-center justify-center rounded-sm border border-transparent  py-1 px-4  font-semibold ">
            {`${filteredList.length} auctions were found`}
          </h3>
          <button
            disabled={isLoading}
            onClick={() => {
              setModalHeader("Update Auctions");
              setModalIcon(
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-baseGreen sm:mx-0 sm:h-10 sm:w-10">
                  <IoReloadOutline className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              );
              setModalSubmitBtnClasses("bg-baseGreen hover:bg-secondGreen focus:ring-green-500");
              setModalMsg(
                `Are you sure you want to retrieve updated auctions list? All changes you've made to auctions will be lost and replaced by the actual data from auctions websites. This will take a few minutes.`
              );
              setModalSuccessMsg(`Auctions list was updated successfully`);
              setModalErrMsg(`Something went wrong! Please try again later`);
              setConfirmModalState(true);
              setSubmitFunction(() => () => {
                return updateAuctionsList();
              });
            }}
            className=" flex w-30 text-sm items-center justify-center rounded-sm border border-transparent bg-baseGreen py-1 px-4  font-semibold text-white hover:bg-secondGreen focus:outline-none"
          >
            {!isLoading ? (
              <>
                <IoReloadOutline size={30} className="mr-2" />
                Update Auctions List
              </>
            ) : (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-5 h-5  text-white animate-spin  fill-baseBlue"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </button>

          <button
            onClick={() => {
              setDeleteItemCount(isCheck.length);
              setModalHeader("Delete Items");
              setModalIcon(
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-carnationRed sm:mx-0 sm:h-10 sm:w-10">
                  <IoTrash className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              );
              setModalSubmitBtnClasses(
                "bg-carnationRed hover:bg-carnationRedDark focus:ring-red-500"
              );

              setModalMsg(
                `Are you sure you want to delete ${isCheck.length} items? All associated bids will be deleted as well`
              );
              setModalSuccessMsg(`${isCheck.length} items were deleted successfully!`);
              setModalErrMsg(`Something went wrong! Please try again later`);
              setConfirmModalState(true);
              setDeleteItemName("");

              setSubmitFunction(() => () => {
                return amettAPI.delete(`/auctions`, {
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
          <SortDropdown sortList={sortList} sort={sortAuctions} />
          <div className="relative text-gray-600 ">
            <input
              className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-sm text-sm focus:outline-none  w-full"
              type="search"
              name="search"
              placeholder="Search for auctions"
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
                  Auction name
                </th>
                <th scope="col" className="px-6 py-3">
                  Current Bid
                </th>
                <th scope="col" className="px-6 py-3">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Bids List
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{auctions}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAuctions;
