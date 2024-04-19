import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Protected from "./components/organisms/ModalProtected.jsx";

function ProtectedRoute() {
  const auth = window.localStorage.getItem("token");

  return auth ? (
    <Outlet />
  ) : (
    <Protected />
  );
}

export default ProtectedRoute;