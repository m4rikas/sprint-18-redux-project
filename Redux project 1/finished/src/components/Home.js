import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/auth/authActions";

function HomePage() {
  const user = useSelector((store) => store.auth.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    await dispatch(logOut());
    navigate("/login");
  }
  return (
    <div className="col-md-6 col-md-offset-3">
      <h1>
        Hi {user.firstName} {user.lastName}!
      </h1>
      <p>You're logged in with React!!</p>
      <p>Your access token is {user.token}</p>
      <p>The email address you registered with is {user.email}.</p>
      <p>You can logout and log back in again or register a new user.</p>
      <p>
        <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  );
}

export default HomePage;
