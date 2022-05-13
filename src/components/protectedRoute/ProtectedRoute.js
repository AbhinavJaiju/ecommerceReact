import React from "react";

import { ReactDOM } from "react";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  let auth = false;

  if (sessionStorage.getItem("isAuthenticated")) {
    auth = true;
  }

  // console.log(Component);

  //your logic

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
