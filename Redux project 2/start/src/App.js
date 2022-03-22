import React from "react";
import "./App.css";

import { Route, Routes, Link } from "react-router-dom";
import Main from "./components/Main";
import Account from "./components/Account";

function App() {
  return (
    <>
      <nav className="navbar navbar-dark ">
        <h1>Posts</h1>

        <Link to="/">Feed</Link>
        <Link to="/account">Account</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
