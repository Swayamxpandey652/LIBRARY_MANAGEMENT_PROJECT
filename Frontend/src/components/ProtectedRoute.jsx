import React from "react";
import { Navigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  let decoded;
  try {
    decoded = jwtDecode.default(token);
  } catch {
    // Invalid token → redirect to login
    return <Navigate to="/login" replace />;
  }

  return allowedRoles.includes(decoded.role) ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default ProtectedRoute;
