import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GiPriceTag } from "react-icons/gi";
import amettAPI from "../api/amettAPI";
export default function BidModal(props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [bid, setBid] = useState("");
  const [isSuccessAlertShown, setSuccessAlertShown] = useState(false);
  const [isErrorAlertShown, setErrorAlertShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const cancelButtonRef = useRef(null);

  const localClose = () => {
    setSuccessAlertShown(false);
    setErrorAlertShown(false);
    setMessage("");
    setBid("");
    props.setBidModalState();
  };

  const validateForm = () => {
    if (fullName.trim() === "") {
      setErrorMessage("Please Input Your Full Name");
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Please Enter a Valid Email");
      return false;
    } else if (props.selectedAuction.currentBid * 1 >= bid) {
      setErrorMessage("Please Enter a Valid Bid. Your Bid Must be Greater Than the Current Bid");
      return false;
    } else if (message.trim() === "") {
      setErrorMessage("Please Enter a Message");
      return false;
    } else return true;
  };

  const submitBid = async () => {
    setSuccessAlertShown(false);
    setErrorAlertShown(false);
    setIsLoading(true);
    if (validateForm()) {
      try {
        await amettAPI.post(`/bids`, {
          name: fullName,
          email,
          message,
          bid,
          auctionName: props.selectedAuction.name,
          auction: props.selectedAuction._id,
        });
        setIsLoading(false);
        setSuccessAlertShown(true);
        // setTimeout(() => localClose(), 5000);
      } catch (error) {
        setErrorMessage("Something went wrong! Please try to contact us on: sales@amett.net");
        setIsLoading(false);
        setErrorAlertShown(true);
      }
    } else {
      setIsLoading(false);
      setErrorAlertShown(true);
    }
  };
  return (
    <Transition.Root show={props.bidModalState} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.setBidModalState}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {isSuccessAlertShown ? (
                  <div className="bg-baseGreen  text-center py-4 lg:px-4 ">
                    <div
                      className="p-2 bg-secondGreen items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
                      role="alert"
                    >
                      <span className="flex rounded-full bg-baseGreen uppercase px-2 py-1 text-xs font-bold mr-3">
                        Success!
                      </span>
                      <span className="font-semibold mr-2 text-left flex-auto">
                        Your message was successfully sent. Our agents will contact you shortly!
                      </span>
                    </div>
                  </div>
                ) : null}
                {isErrorAlertShown ? (
                  <div className="bg-errorRed  text-center py-4 lg:px-4 ">
                    <div
                      className="p-2 bg-secondErrorRed items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
                      role="alert"
                    >
                      <span className="flex rounded-full bg-errorRed uppercase px-2 py-1 text-xs font-bold mr-3">
                        Error!
                      </span>
                      <span className="font-semibold mr-2 text-left flex-auto">{errorMessage}</span>
                    </div>
                  </div>
                ) : null}
                <div className="bg-white ">
                  <button
                    type="button"
                    className="ml-3 my-3   bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 "
                    data-dismiss-target="#toast-success"
                    aria-label="Close"
                    onClick={() => localClose()}
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
                  <div className="sm:flex sm:items-start px-4  pb-4  sm:pb-4">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondBlack sm:mx-0 sm:h-10 sm:w-10">
                      <GiPriceTag className="h-6 w-6 text-baseBlack" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Make a Bid
                      </Dialog.Title>
                      <div className="mt-2">
                        <label for="name" className="block my-2 text-sm font-medium text-gray-900 ">
                          Full Name*
                        </label>
                        <input
                          className="border border-secondBlue bg-white h-10 px-2  rounded-lg text-sm focus:outline-none  w-48 sm:w-72 "
                          name="name"
                          type="text"
                          onChange={(event) => {
                            setFullName(event.target.value);
                          }}
                          value={fullName}
                        />

                        <label
                          for="email"
                          className="block my-2 text-sm font-medium text-gray-900 "
                        >
                          Your email address*
                        </label>
                        <input
                          className="border border-secondBlue bg-white h-10 px-2 rounded-lg text-sm focus:outline-none  w-48 sm:w-72 "
                          name="email"
                          type="email"
                          // placeholder="example@domain.com"
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                          value={email}
                        />
                        <label
                          for="model"
                          className="block my-2 text-sm font-medium text-gray-900 "
                        >
                          Your bid in USD*
                        </label>
                        <input
                          className="border border-secondBlue h-10 px-2  rounded-lg text-sm focus:outline-none  w-48 sm:w-72 "
                          name="model"
                          type="number"
                          onChange={(event) => {
                            setBid(event.target.value);
                          }}
                          value={bid}
                          // min={400}
                        />

                        <label
                          for="message"
                          className="block my-2 text-sm font-medium text-gray-900 "
                        >
                          Message*
                        </label>
                        <textarea
                          className="border border-secondBlue bg-white h-10 px-2 py-1 rounded-lg text-sm focus:outline-none w-72 sm:w-96 h-28"
                          type="text"
                          name="message"
                          onChange={(event) => {
                            setMessage(event.target.value);
                          }}
                          value={message}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-secondBlue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-baseBlue focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => submitBid()}
                    disabled={isLoading}
                  >
                    {!isLoading ? (
                      "Submit"
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
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => localClose()}
                    ref={cancelButtonRef}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
