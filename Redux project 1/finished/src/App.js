import "./App.css";

import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import LogIn from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const auth = useSelector((state) => state.auth.currentUser);
  return (
    <div className="jumbotron">
      <div className="container">
        <div className="col-sm-8 col-sm-offset-2">
          <Routes>
            <Route
              path="/"
              element={<PrivateRoute auth={auth} Component={Home} />}
            />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PrivateRoute />}>
              <Route element={<Home />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
