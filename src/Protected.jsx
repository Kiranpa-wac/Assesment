import React from "react";
import { useAtomValue } from "jotai";
import { authState } from "./authState";
import  {Navigate}  from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = useAtomValue(authState)
  return auth  ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
