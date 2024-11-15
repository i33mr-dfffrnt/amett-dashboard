import Navbar from "../components/navbar";
import { useState } from "react";
import amettAPI from "../api/amettAPI";
import ErrorNotification from "../components/errorNotification";
import { serviceEnum } from "../enums/serviceEnums";
import SuccessNotification from "../components/successNotification";

const ServiceForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sType, setSType] = useState(serviceEnum.SERVICETYPES[0]);
  const [dType, setDType] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [site, setSite] = useState("");
  const [location, setLocation] = useState("");
  const [problem, setProblem] = useState("");
  const [notes, setNotes] = useState("");

  const [isSuccessAlertShown, setSuccessAlertShown] = useState(false);
  const [isErrorAlertShown, setErrorAlertShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    if (name.trim() === "") {
      setErrorMessage("Please input name");
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Please input a valid email ");
      return false;
    } else if (sType.trim() === "") {
      setErrorMessage("Please choose a service type ");

      return false;
    } else if (dType.trim() === "") {
      setErrorMessage("Please input device type");
      return false;
    } else if (manufacturer.trim() === "") {
      setErrorMessage("Please input a manufacturer");
      return false;
    } else if (serialNo.trim() === "") {
      setErrorMessage("Please input a serial number");
      return false;
    } else if (site.trim() === "") {
      setErrorMessage("Please input a site");
      return false;
    } else if (location.trim() === "") {
      setErrorMessage("Please input a location");
      return false;
    } else if (problem.trim() === "") {
      setErrorMessage("Please input a problem location");
      return false;
    } else return true;
  };

  const submit = async () => {
    setSuccessAlertShown(false);
    setErrorAlertShown(false);
    setIsLoading(true);
    if (validateForm()) {
      try {
        const body = {
          name,
          email,
          sType,
          dType,
          manufacturer,
          serialNo,
          site,
          location,
          problem,
          notes,
        };
        // const formData = new FormData();
        // formData.append("name", name);
        // formData.append("email", email);
        // formData.append("sType", sType);
        // formData.append("dType", dType);
        // formData.append("manufacturer", manufacturer);
        // formData.append("serialNo", serialNo);
        // formData.append("site", site);
        // formData.append("problem", problem);
        // formData.append("notes", notes);

        await amettAPI.post(`/service`, body);

        setIsLoading(false);
        setSuccessAlertShown(true);
        // setTimeout(() => localClose(), 5000);
      } catch (error) {
        setErrorMessage("Something went wrong!");
        setIsLoading(false);
        setErrorAlertShown(true);
      }
    } else {
      setIsLoading(false);
      setErrorAlertShown(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4 flex-auto playfairDisplay-font">
        <div className="grid grid-cols-5 gap-4">
          {isErrorAlertShown ? (
            <ErrorNotification
              msg={errorMessage}
              setErrorAlertShown={() => setErrorAlertShown(false)}
            />
          ) : null}
          {isSuccessAlertShown ? (
            <SuccessNotification
              msg={"Success! Your new service request has been created"}
              setSuccessAlertShown={() => setSuccessAlertShown(false)}
            />
          ) : null}
          <div className="col-span-5 ">
            <h2 className="m-4 text-left playfairDisplay-font text-xl sm:text-3xl font-semibold">
              Equipment Servicing Request Form
            </h2>

            <form className="grid grid-cols-5  gap-4 text-sm sm:text-2xl playfairDisplay-font  mr-3  md:px-20 xl:px-32 py-2">
              <h5 className="">Full Name:*</h5>
              <input
                type="text"
                name="name"
                className="border border-gray-300 rounded-sm col-span-4 pl-1"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
              />

              <h5 className="">Email Address:*</h5>
              <input
                type="text"
                name="email"
                className="border border-gray-300 rounded-sm col-span-4 pl-1"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
              />
              <h5 className="">Service Type:*</h5>
              <select
                name="service type"
                className="border border-gray-300 rounded-sm col-span-4 bg-white p-1"
                onChange={(event) => {
                  setSType(event.target.value);
                }}
              >
                {serviceEnum.SERVICETYPES.map((el) => {
                  return (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>

              <h5 className="">Device Type:*</h5>
              <input
                type="text"
                name="device type"
                className="border border-gray-300 rounded-sm col-span-4 pl-1"
                onChange={(event) => {
                  setDType(event.target.value);
                }}
                value={dType}
              />
              <h5 className="break-words">Device Manufacturer:*</h5>
              <input
                type="text"
                name="manufacturer"
                className="border border-gray-300 rounded-sm col-span-4 pl-1"
                onChange={(event) => {
                  setManufacturer(event.target.value);
                }}
                value={manufacturer}
              />
              <h5 className="">Serial /Inventory Number:*</h5>
              <input
                type="text"
                name="serial no."
                className="border border-gray-300 rounded-sm col-span-4 pl-1"
                onChange={(event) => {
                  setSerialNo(event.target.value);
                }}
                value={serialNo}
              />
              <h5 className="">Device Site:*</h5>
              <input
                type="text"
                name="device site"
                className="border border-gray-300 rounded-sm col-span-4 pl-1"
                onChange={(event) => {
                  setSite(event.target.value);
                }}
                value={site}
              />
              <h5 className="">Device Location:*</h5>
              <input
                type="text"
                name="location"
                className="border border-gray-300 rounded-sm col-span-4 pl-1"
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
                value={location}
              />
              <h5 className="">Problem Description:*</h5>
              <textarea
                name="problem"
                className="col-span-4 border border-gray-300"
                onChange={(event) => {
                  setProblem(event.target.value);
                }}
                value={problem}
              />
              <h5 className="">Notes:</h5>
              <textarea
                name="notes"
                className="col-span-4 border border-gray-300"
                onChange={(event) => {
                  setNotes(event.target.value);
                }}
                value={notes}
              />

              <div className="col-span-5 flex justify-center">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    submit();
                  }}
                  disabled={isLoading}
                  className="flex items-center justify-center rounded-lg border border-gray-300 py-4 px-6 font-bold bg-baseGreen text-white text-xl sm:text-3xl shadow-lg"
                >
                  {!isLoading ? (
                    "Send Request"
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceForm;
