import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import ChatContext from "../context/ChatContext";

const ProtectedRoute = ({ children }) => {
  const { isloggedIn } = useContext(ChatContext);

  if (!isloggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
