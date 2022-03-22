import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logInStart } from "../store/auth/authActions";

import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const dispatch = useDispatch();

  const currentUser = useSelector((store) => store.auth.currentUser);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      return;
    }
    navigate("/");
  }, [currentUser, navigate]);

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      dispatch(logInStart(credentials));
    }
  };

  return (
    <div className="col-md-6 col-md-offset-3">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            className="form-control"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Log In
        </button>
        <Link to="/register" className="btn btn-link">
          Register
        </Link>
      </form>
    </div>
  );
};

export default LogIn;
