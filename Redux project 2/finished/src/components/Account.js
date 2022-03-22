import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { getAccount, updateAccount } from "../store/account/accountActions";

function Account() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account.details);

  const [details, setDetails] = React.useState({
    firstName: "",
    lastName: "",
    bio: "",
  });

  React.useEffect(() => {
    dispatch(getAccount());
  }, []);

  React.useEffect(() => {
    setDetails({ ...details, ...account });
  }, [account]);

  function handleSubmit() {
    dispatch(updateAccount(details));
  }

  function handleChange(e) {
    setDetails({ ...details, [e.target.id]: e.target.value });
  }

  function handleCancel() {
    setDetails({ ...account });
  }

  return (
    <div className="jumbotron">
      <div className="container">
        <div className="col-sm-8 col-sm-offset-2">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                value={details.firstName}
                id="firstName"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                value={details.lastName}
                id="lastName"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Bio</label>
              <textarea
                value={details.bio}
                className="form-control"
                id="bio"
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-danger" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;
