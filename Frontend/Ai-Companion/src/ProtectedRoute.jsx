import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("authToken");

  if (!isAuthenticated) {
    //redirect to login if not authenticated
    return <Navigate to="login" />;
  }

  //if authenticated
  return children;
}

export default ProtectedRoute;