import AdminSidebar from "../../components/adminSidebar";
import { useState } from "react";
import amettAPI from "../../api/amettAPI";
import ErrorNotification from "../../components/errorNotification";
import CustomCropper from "../../components/customCropper";

import { getCroppedImg } from "../../utils/canvasUtils";
import SuccessNotification from "../../components/successNotification";

const TypeForm = () => {
  const [typeName, setTypeName] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [previewUri, setPreviewUri] = useState("");

  const [isSuccessAlertShown, setSuccessAlertShown] = useState(false);
  const [isErrorAlertShown, setErrorAlertShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    if (typeName.trim() === "") {
      setErrorMessage("Please input collection name");
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
        formData.append("name", typeName);

        await amettAPI.post(`/equipment-types`, formData, {
          headers: { "Content-type": "multipart/form-date" },
        });

        setIsLoading(false);
        setSuccessAlertShown(true);
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
          msg={"Success! Your new type has been created"}
          setSuccessAlertShown={() => setSuccessAlertShown(false)}
        />
      ) : null}
      <div className="col-span-4 mt-10 ">
        <h2 className="text-xl sm:text-4xl mb-5 mt-2 playfairDisplay-font font-bold">
          Add New Collection
        </h2>
        <h3 className=" text-lg sm:text-xl playfairDisplay-font flex  flex-row justify-start mr-3 mt-4 bg-baseBlue text-white p-1 font-bold">
          Collection Details
        </h3>
        <form className="grid grid-cols-5  gap-4 text-md lg:text-xl playfairDisplay-font  mr-3  bg-baseGray px-10 lg:px-20 xl:px-32 py-10">
          <h5 className="">Collection Name*</h5>
          <input
            type="text"
            name="name"
            className="border border-gray-300 rounded-sm col-span-4 pl-1"
            onChange={(event) => {
              setTypeName(event.target.value);
            }}
            value={typeName}
          />

          <h5 className="">Collection Photo*</h5>
          <input type="file" accept="image/*" onChange={onFileChange} />

          <div className="col-span-5 ">
            {imageSrc && (
              <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-8 lg:pb-24">
                <div>
                  Modify image
                  <CustomCropper image={imageSrc} showCroppedImage={showCroppedImage} />
                </div>
                <div>
                  How it will look like:
                  <div className="flex flex-col items-center  w-full rounded-lg ">
                    <img
                      className="h-44 lg:h-72 object-cover bg-white"
                      src={previewUri.url}
                      alt=""
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
                "Save Collection"
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

export default TypeForm;
