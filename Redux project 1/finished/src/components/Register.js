import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { registerStart } from "../store/auth/authActions";

const Register = () => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = React.useState(false);

  const success = useSelector((state) => state.auth.registerSuccess);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(registerStart(credentials));
  };

  return (
    <div className="col-md-6 col-md-offset-3">
      <h2>Register</h2>
      {error && (
        <h3>We've had an error - have you already registered this email?</h3>
      )}
      <form name="form" onSubmit={handleSubmit}>
        <div
          className={
            "form-group" +
            (submitted && !credentials.firstName ? " has-error" : "")
          }
        >
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={credentials.firstName}
            onChange={handleChange}
          />
          {submitted && !credentials.firstName && (
            <div className="help-block">First Name is required</div>
          )}
        </div>
        <div
          className={
            "form-group" +
            (submitted && !credentials.lastName ? " has-error" : "")
          }
        >
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={credentials.lastName}
            onChange={handleChange}
          />
          {submitted && !credentials.lastName && (
            <div className="help-block">Last Name is required</div>
          )}
        </div>
        <div
          className={
            "form-group" +
            (submitted && !credentials.username ? " has-error" : "")
          }
        >
          <label htmlFor="username">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
          {submitted && !credentials.email && (
            <div className="help-block">Username is required</div>
          )}
        </div>
        <div
          className={
            "form-group" +
            (submitted && !credentials.password ? " has-error" : "")
          }
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          {submitted && !credentials.password && (
            <div className="help-block">Password is required</div>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Register</button>
          <Link to="/login" className="btn btn-link">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
