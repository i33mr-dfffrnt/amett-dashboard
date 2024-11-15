import AdminSidebar from "../../components/adminSidebar";
import SortDropdown from "../../components/sortDropdown";
import { IoTrash } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { Fragment, useEffect, useState } from "react";
import ConfirmModal from "../../components/confirmModal";
import amettAPI from "../../api/amettAPI";
import { BiExpandAlt } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

const ManageQuoteRequests = (props) => {
  const [quotesList, setQuotesList] = useState([]);
  const [confirmModalState, setConfirmModalState] = useState(false);
  const [deleteItemName, setDeleteItemName] = useState("");
  const [deleteItemCount, setDeleteItemCount] = useState(0);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  const [quotesListExpandState, setQuotesListExpandState] = useState([]);

  const [submitFunction, setSubmitFunction] = useState(null);

  const [modalMsg, setModalMsg] = useState("");
  const [modalSuccessMsg, setModalSuccessMsg] = useState("");
  const [modalErrMsg, setModalErrMsg] = useState("");

  const sortList = ["Newest", "Oldest", "Model A-Z"];
  const [filteredList, setFilteredList] = new useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchQuotes = async () => {
      let response;
      try {
        if (searchParams.get("query")) {
          response = await amettAPI.get(`/quotes?model=${searchParams.get("query")}`);
        } else {
          response = await amettAPI.get(`/quotes`);
        }
        setQuotesList(response.data.data.quotes);
        setFilteredList(response.data.data.quotes);
        setQuotesListExpandState(
          response.data.data.quotes.map((el) => {
            return { _id: el._id, state: false };
          })
        );
      } catch (error) {}
    };
    fetchQuotes();
    setIsCheck([]);
  }, [updateList]);

  const filterBySearch = (event) => {
    const query = event.target.value;
    var updatedList = [...quotesList];

    updatedList = updatedList.filter((item) => {
      return item.model.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredList(updatedList);
  };
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

  const sortQuotes = (method) => {
    if (method === "Newest") {
      setFilteredList(
        [...filteredList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (method === "Oldest") {
      setFilteredList(
        [...filteredList].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
    } else if (method === "Model A-Z") {
      setFilteredList([...filteredList].sort((a, b) => a.model.name.localeCompare(b.model.name)));
    }
  };

  const quotes = filteredList.map((el) => {
    return (
      <Fragment key={el._id}>
        <tr className="bg-white border-b hover:bg-gray-50">
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
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 max-w-md ellipsis ">
            {el.model.name}
          </th>
          <td className="px-6 py-4 ">{el.email}</td>
          <td className="px-6 py-4 max-w-md ellipsis">{el.message}</td>
          <td className="px-6 py-4">{`${new Date(el.createdAt)}`}</td>

          <td className="flex items-center justify-center px-6 py-4 space-x-3 ">
            <button
              onClick={() => {
                setDeleteItemCount(1);
                setDeleteItemName(el.name);
                setConfirmModalState(true);
                setSubmitFunction(() => () => {
                  return amettAPI.delete(`/quotes/${el._id}`);
                });
                setModalMsg(`Are you sure you want to delete this quote request by ${el.email}?`);
                setModalSuccessMsg(`quote was deleted successfully!`);
                setModalErrMsg(`Something went wrong! Please try again later`);
              }}
              className=" flex w-30 text-sm items-center justify-center rounded-3xl border border-transparent  drop-shadow-lg bg-white py-1 px-1  font-semibold text-white "
            >
              <IoTrash size={20} color="#FA0562" />
            </button>
            <button
              className=" flex w-30 text-sm items-center justify-center rounded-3xl border border-transparent  drop-shadow-lg bg-white py-1 px-1  font-semibold text-white "
              onClick={(event) => {
                setQuotesListExpandState(
                  [...quotesListExpandState].map((quoteExpand) => {
                    return quoteExpand._id !== el._id
                      ? quoteExpand
                      : { _id: quoteExpand._id, state: !quoteExpand.state };
                  })
                );
                console.log(
                  "f",
                  [...quotesListExpandState].map((quoteExpand) => {
                    return quoteExpand._id !== el._id
                      ? quoteExpand
                      : { _id: quoteExpand._id, state: !quoteExpand.state };
                  })
                );
              }}
            >
              <BiExpandAlt size={20} color="#000" />
            </button>
          </td>
        </tr>
        {quotesListExpandState.find((x) => x._id === el._id).state ? (
          <tr className="bg-baseGray border-b ">
            <th colSpan="7" scope="row" className="px-6 py-4 font-medium text-gray-900  ">
              <div className="grid text-left gap-3 ">
                <h3>{`From: ${el.email}`}</h3>
                <p>{`Message: ${el.message}`}</p>
                <p>
                  {`Model link on AMETT website: `}
                  <a
                    className="text-dodger underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://amett.net/models?type=${el.model.type}&manufacturer=${el.model.manufacturer}`}
                  >
                    https://amett.net/models?type={el.model.type}&manufacturer=
                    {el.model.manufacturer}
                  </a>
                </p>
              </div>
            </th>
          </tr>
        ) : null}
      </Fragment>
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
        <h2 className="text-xl sm:text-4xl mb-5 mt-2 playfairDisplay-font font-bold">
          Manage Quote Requests
        </h2>
        <div className="flex flex-row justify-end gap-3 my-4">
          <h3 className="flex w-30 text-sm items-center justify-center rounded-sm border border-transparent  py-1 px-4  font-semibold ">
            {`${filteredList.length} quote requests were found`}
          </h3>
          {searchParams.get("query") && quotesList[0] ? (
            <div
              onClick={() => {}}
              className={`flex text-sm items-center justify-center rounded-xl border-2 py-1 pr-2  font-semibold text-black focus:outline-none`}
            >
              <button
                type="button"
                className="bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 "
                aria-label="Close"
                onClick={() => {
                  setSearchParams();
                  setUpdateList(!updateList);
                }}
              >
                <span className="sr-only">Close</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              {quotesList[0].model.name}
            </div>
          ) : null}
          <button
            onClick={() => {
              setDeleteItemCount(isCheck.length);
              setConfirmModalState(true);
              setDeleteItemName("");
              setModalMsg(`Are you sure you want to delete ${isCheck.length} quote requests? `);
              setModalSuccessMsg(`${isCheck.length} items were deleted successfully!`);
              setModalErrMsg(`Something went wrong! Please try again later`);
              setSubmitFunction(() => () => {
                return amettAPI.delete(`/quotes`, {
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
          <SortDropdown sortList={sortList} sort={sortQuotes} />
          <div className="relative text-gray-600 ">
            <input
              className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-sm text-sm focus:outline-none  w-full"
              type="search"
              name="search"
              placeholder="Search for models"
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
                  model name
                </th>
                <th scope="col" className="px-6 py-3">
                  Requester Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
                <th scope="col" className="px-6 py-3">
                  Request Time
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{quotes}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageQuoteRequests;
