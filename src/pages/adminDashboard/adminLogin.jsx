import { useState } from "react";
import loginImg from "../../assets/loginImg.jpg";
import amettAPI from "../../api/amettAPI";
import { useNavigate } from "react-router-dom";

import axios from "axios";

axios.defaults.withCredentials = true;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (username.trim() === "") {
      setErrMsg("Please enter your username");
      return false;
    } else if (password.trim() === "") {
      setErrMsg("Please enter your password");
      return false;
    } else return true;
  };
  const login = async () => {
    setErrMsg("");
    setIsLoading(true);
    if (validateForm()) {
      try {
        await amettAPI.post(`/auth/login`, { username, password });
        // localStorage.setItem("jwt", response.data.data.token);
        setIsLoading(false);
        navigate("/admin-dashboard");
      } catch (error) {
        setErrMsg(error.response.data.message);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };
  return (
    <div className="grid md:grid-cols-2 h-screen">
      <div className="w-full  flex flex-col">
        <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
          <div href="#" className="bg-baseBlue text-white font-bold text-xl p-4">
            AMETT Group
          </div>
        </div>
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">AMETT Dashboard</p>
          {errMsg ? <p className=" text-errorRed text-center mt-4 text-xl">{errMsg}</p> : null}

          <form className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="text-lg">
                Username
              </label>
              <input
                type="text"
                // id="email"
                placeholder="Admin Username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            {/* <input
              type="submit"
              value="Log In"
              className="bg-baseBlue text-white font-bold text-lg hover:bg-secondBlue p-2 mt-8"
              onClick={(event) => {
                event.preventDefault();
                login();
              }}
            /> */}

            <button
              type="submit"
              className="bg-baseBlue text-white font-bold text-lg hover:bg-secondBlue p-2 mt-8"
              disabled={isLoading}
              onClick={(event) => {
                event.preventDefault();
                login();
              }}
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
          </form>
        </div>
      </div>

      <div className=" shadow-2xl">
        <img
          className="object-cover w-full h-screen hidden md:block"
          src={loginImg}
          alt="medical-equipment"
        />
      </div>
    </div>
  );
};

export default AdminLogin;
