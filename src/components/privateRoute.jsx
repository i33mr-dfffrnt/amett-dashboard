import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import isAuth from "../utils/auth";

const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);
  // const auth = isAuth(); // determine if authorized, from context or however you're doing it
  // console.log(auth);
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  isAuth().then((isValid) => {
    setIsValid(isValid);
    setIsLoading(false);
  });
  return isLoading ? (
    <div className=" grid grid-cols-5 gap-4">
      <div className="h-screen "></div>
      {/* <AdminSidebar /> */}
      {/* Loading... */}
    </div>
  ) : isValid === true ? (
    <Outlet />
  ) : (
    <Navigate to="/admin-dashboard/login" />
  );
  // return auth ? <Outlet /> : <Navigate to="/admin-dashboard/login" />;
  // return <Outlet />;
  // return <Navigate to="/admin-dashboard/login" />;
};

export default PrivateRoute;
