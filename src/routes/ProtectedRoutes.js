import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if(isLoggedIn){
    return children;
} else {
    return <Navigate to="/login" />
}

};

export default ProtectedRoute;