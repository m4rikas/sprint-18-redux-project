import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ Component, auth }) {
  return auth ? <Component /> : <Navigate to="/login" />;
}

export default PrivateRoute;
