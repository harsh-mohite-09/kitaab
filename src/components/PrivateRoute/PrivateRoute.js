import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

export const PrivateRoute = ({ children }) => {
  const { token } = useAuthContext();
  const location = useLocation();
  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location?.pathname }} replace />
  );
};
