import React from "react";

function Account() {
  const [details, setDetails] = React.useState({
    firstName: "",
    lastName: "",
    bio: "",
  });

  function handleSubmit() {}

  function handleChange(e) {}

  function handleCancel() {}

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
