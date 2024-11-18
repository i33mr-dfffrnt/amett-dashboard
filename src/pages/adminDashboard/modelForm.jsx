import AdminSidebar from "../../components/adminSidebar";
import { useEffect, useState } from "react";
import amettAPI from "../../api/amettAPI";
import ErrorNotification from "../../components/errorNotification";
import CustomCropper from "../../components/customCropper";
import { Link } from "react-router-dom";

import { getCroppedImg } from "../../utils/canvasUtils";
import SuccessNotification from "../../components/successNotification";

const ModelForm = () => {
  const [typeList, setTypeList] = useState([]);
  const [manuList, setManuList] = useState([]);

  const [EquipmentName, setEquipmentName] = useState("");
  const [type, setType] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [previewUri, setPreviewUri] = useState("");

  const [isSuccessAlertShown, setSuccessAlertShown] = useState(false);
  const [isErrorAlertShown, setErrorAlertShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    if (EquipmentName.trim() === "") {
      setErrorMessage("Please input Equipment name");
      return false;
    } else if (type.trim() === "") {
      setErrorMessage("Please choose a Equipment type ");
      return false;
    } else if (manufacturer.trim() === "") {
      setErrorMessage("Please choose a Equipment manufacturer ");

      return false;
    } else if (description.trim() === "") {
      setErrorMessage("Please input Equipment description");
      return false;
    } else if (manufacturer.trim() === "") {
      setErrorMessage("Please select a manufacturer");
      return false;
    } else if (type.trim() === "") {
      setErrorMessage("Please select a type");
      return false;
    } else if (!imageSrc) {
      setErrorMessage("Please upload an image");
      return false;
    } else return true;
  };

  const submit = async () => {
    setSuccessAlertShown(false);
    setErrorAlertShown(false);
    setIsLoading(true);
    if (validateForm()) {
      try {
        var file = new File([previewUri.file], "image.jpg", { type: previewUri.file.type });

        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", EquipmentName);
        formData.append("description", description);
        formData.append("type", type);
        formData.append("manufacturer", manufacturer);

        await amettAPI.post(`/equipment-Equipment`, formData, {
          headers: { "Content-type": "multipart/form-date" },
        });

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

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await amettAPI.get(`/equipment-manufacturers`);
        setManuList(response.data.data.equipmentManufacturers);
        setManufacturer(response.data.data.equipmentManufacturers[0]._id);
      } catch (error) {}
    };

    const fetchTypes = async () => {
      try {
        const response = await amettAPI.get(`/equipment-types`);
        setTypeList(response.data.data.equipmentTypes);

        setType(response.data.data.equipmentTypes[0]._id);
      } catch (error) {}
    };
    fetchManufacturers();
    fetchTypes();
  }, []);

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      let imageDataUrl = await readFile(file);

      setImageSrc(imageDataUrl);
    }
  };

  const showCroppedImage = async (croppedAreaPixels) => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
      setPreviewUri(croppedImage);
    } catch (error) {}
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      <AdminSidebar />
      {isErrorAlertShown ? (
        <ErrorNotification
          msg={errorMessage}
          setErrorAlertShown={() => setErrorAlertShown(false)}
        />
      ) : null}
      {isSuccessAlertShown ? (
        <SuccessNotification
          msg={"Success! Your new Equipment has been created"}
          setSuccessAlertShown={() => setSuccessAlertShown(false)}
        />
      ) : null}
      <div className="col-span-4 mt-10 ">
        <h2 className="text-xl sm:text-4xl mb-5 mt-2 playfairDisplay-font font-bold">
          Add New Equipment
        </h2>
        <h3 className=" text-lg sm:text-xl playfairDisplay-font flex  flex-row justify-start mr-3 mt-4 bg-baseBlue text-white p-1 font-bold">
          Equipment Details
        </h3>
        <form className="grid grid-cols-5  gap-4 text-md lg:text-xl playfairDisplay-font  mr-3  bg-baseGray px-10 lg:px-20 xl:px-32 py-10">
          <h5 className="">Equipment Name*</h5>
          <input
            type="text"
            name="name"
            className="border border-gray-300 rounded-sm col-span-4 pl-1"
            onChange={(event) => {
              setEquipmentName(event.target.value);
            }}
            value={EquipmentName}
          />
          <h5 className="">Type*</h5>
          <select
            name="type"
            className="border border-gray-300 rounded-sm col-span-3 bg-white p-1"
            onChange={(event) => {
              setType(event.target.value);
            }}
          >
            {typeList &&
              typeList.map((el) => {
                return (
                  <option key={el._id} value={el._id}>
                    {el.name}
                  </option>
                );
              })}
          </select>

          <Link
            to={`/admin-dashboard/create-equipment-type`}
            className="flex items-center justify-center rounded-sm border border-gray-300  bg-white py-1 px-4  shadow-lg"
          >
            New Type
          </Link>
          <h5 className="">Manufacturer*</h5>
          <select
            name="manufacturer"
            className="border border-gray-300 rounded-sm col-span-3 bg-white p-1"
            onChange={(event) => {
              setManufacturer(event.target.value);
            }}
            value={manufacturer}
          >
            {manuList &&
              manuList.map((el) => {
                return (
                  <option key={el._id} value={el._id}>
                    {el.name}
                  </option>
                );
              })}
          </select>
          <Link
            to={`/admin-dashboard/create-manufacturer`}
            className="flex items-center justify-center rounded-sm border border-gray-300  bg-white py-1 px-4  shadow-lg"
          >
            New Manufacturer
          </Link>
          <h5 className="">Description*</h5>
          <textarea
            name="description"
            className="col-span-4 border border-gray-300"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            value={description}
          />
          <h5 className="">Equipment Photo*</h5>
          <input type="file" accept="image/*" onChange={onFileChange} />

          <div className="col-span-5 ">
            {imageSrc && (
              <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-8 lg:pb-24">
                <div>
                  Modify image
                  <CustomCropper image={imageSrc} showCroppedImage={showCroppedImage} />
                </div>
                <div className="w-full rounded-lg  Equipment-carousel">
                  How it will look like:
                  <div className="Equipment-carousel-slide rounded-lg">
                    <img
                      src={previewUri.url}
                      alt=".."
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-span-5 flex justify-center">
            <button
              onClick={(event) => {
                event.preventDefault();
                submit();
              }}
              disabled={isLoading}
              className="flex items-center justify-center rounded-lg border border-gray-300 py-4 px-6 font-bold bg-baseGreen text-white  text-2xl shadow-lg"
            >
              {!isLoading ? (
                "Save Equipment"
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
  );
};

export default ModelForm;
