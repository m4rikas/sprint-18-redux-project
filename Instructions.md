# Authentication with Redux and Redux Saga

In the course of this exercise, you will use Redux to build an authentication flow for your application.

You'll also build a component you can use to make certain parts of your application only available to logged in users.

We'll be using `json-server-auth` to simulate a login process. This package persists users to your file system in the file called `db.json`. 

Before you start, run `npm install` and `npm run start`.

## Exercise 1: Installing and Wrapping Application with Redux

Install the libraries you'll need:

```
npm install redux react-redux
```

In `index.js`, wrap the `BrowserRouter` with a `Provider` that you'll destructure from `react-redux`. For now, pass in an empty object as the store.

```js
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={{}}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

## Exercise 2: Creating the store

We've got a bit of setup to do before we can build our components.

Create a file called `index.js` at `src/store/index.js`. We want to import some middleware, create a store, apply the middleware and export it. 

```js
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
```

The logger we're using will make our console really useful during development. Remember the remove it from your production ready application!

## Exercise 3: Adding actions, action creators and reducers

Our store will only have one reducer, the auth one. You can add different reducers for different tasks and then combine them with a root reducer. We'll do that here to leave room for extension.

In `src/store/rootReducer.js`:

```js
import { combineReducers } from 'redux';

import auth from './auth/authReducer';

export default combineReducers({ auth });
```

Next, we'll define our action types. We'll keep these as a separate constant to reduce the risk of mistyping.

In `stc/store/auth/authActionTypes.js`:

```js
const userActionTypes = {
  LOG_IN_START: 'LOG_IN_START',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_IN_FAILURE: 'LOG_IN_FAILURE',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOG_OUT: 'LOG_OUT',
};

export default userActionTypes;
```

For both the asynchronous actions, we have a starting action and two possible conclusions - success or failure. The logout will just clear the current user and doesn't require an asynchronous approach.

Now, let's set up our actions. For each of these, we are creating an action with the correct type and the relevant payload.

In `src/store/auth/authActions.js`:

```js
import types from './authActionTypes';

export const logInStart = (credentials) => ({
  type: types.LOG_IN_START,
  payload: credentials,
});

export const logInSuccess = (user) => ({
  type: types.LOG_IN_SUCCESS,
  payload: user,
});

export const logInFailure = (error) => ({
  type: types.LOG_IN_FAILURE,
  payload: error,
});

export const registerStart = (credentials) => ({
  type: types.REGISTER_START,
  payload: credentials,
});

export const registerSuccess = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: types.REGISTER_FAILURE,
  payload: error,
});

export const logOut = () => ({
  type: types.LOG_OUT,
});
```

Finally, we'll add the reducer. In `src/store/auth/authReducer.js` add:

```js
import types from "./authActionTypes";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case types.LOG_IN_FAILURE:
    case types.REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case types.LOG_OUT:
      return INITIAL_STATE;
    case types.REGISTER_SUCCESS:
      return { ...state, registerSuccess: true };
    default:
      return state;
  }
};

export default authReducer;
```

Remember, the goal of the reducer is to update the state. It can't handle any async operations which is why the start events are going to be handled by the sagas.

## Exercise 4: Creating Sagas

First we need a root saga, like we had a root reducer. We'll be able to combine sagas and separate our work like before.

In `src/store/rootSaga.js` add:

```js
import { all, call } from 'redux-saga/effects';

import { authSagas } from './auth/authSagas';

export default function* rootSaga() {
  yield all([call(authSagas)]);
}
```

To recap on the all/call functions. We're call effect creators (those generator functions we talked about) and we want to call these for all possible events. 

In our individual sagas, we'll pick off the events that we're responsible for and do the work there.

Let's create our auth saga in `src/store/auth/authSagas.js`:

```js
import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  logInFailure,
  logInSuccess,
  registerFailure,
  registerSuccess,
} from "./authActions";

import types from "./authActionTypes";

const logIn = async (email, password) => {
  const response = await axios.post("/login", {
    email,
    password,
  });
  return { token: response.data.accessToken, ...response.data.user };
};

const register = async (email, password, firstName, lastName) => {
  await axios.post("/register", {
    email,
    password,
    firstName,
    lastName,
  });
};

export function* logInWithCredentials({ payload: { email, password } }) {
  try {
    const user = yield logIn(email, password);
    yield put(logInSuccess(user));
  } catch (error) {
    yield put(logInFailure(error));
  }
}

export function* registerWithCredentials({
  payload: { email, password, firstName, lastName },
}) {
  try {
    yield register(email, password, firstName, lastName);
    yield put(registerSuccess({ email, password, firstName, lastName }));
  } catch (error) {
    yield put(registerFailure(error));
  }
}

export function* logInAfterRegister({ payload: { email, password } }) {
  yield logInWithCredentials({ payload: { email, password } });
}

export function* onLogInStart() {
  yield takeLatest(types.LOG_IN_START, logInWithCredentials);
}

export function* onRegisterStart() {
  yield takeLatest(types.REGISTER_START, registerWithCredentials);
}

export function* onRegisterSuccess() {
  yield takeLatest(types.REGISTER_SUCCESS, logInAfterRegister);
}

export function* authSagas() {
  yield all([
    call(onLogInStart),
    call(onRegisterStart),
    call(onRegisterSuccess),
  ]);
}
```

This looks like a lot, so let's take it bit by bit.

First, the `login` and `register` functions are responsible for calling the API. We could extract these into a `service` module but since we're just using them here, we'll save ourselves creating more files.

`loginWithCredentials` receives the payload from the `LOG_IN_START` action. It triggers the API and, depending on the result, will dispatch (using the put method) the required next actions.

`registerWithCredential` does the same thing but for registration.

`loginAfterRegister` allows the user to not have to login immediately after they've registered - we'll do that for them!

The `on...` functions are responsible for creating the effect corresponding to the dispatched action. For example, `onLoginStart` will trigger the `logInWithCredentials` saga when the `LOG_IN_START event is dispatched. `takeLatest` means that if someone tries to login multiple times in a row (clicking a button over and over), we'll cancel previous attempts and only take the latest.

```js
export function* onLogInStart() {
  yield takeLatest(types.LOG_IN_START, logInWithCredentials);
}
```

Each of the other `on...` functions are similar.

Finally, we export the authSagas function which combines the effect creators just like the root saga does.

Now, we have all of the logic ready to go. Let's sort our some components to use with them.

## Exercise 5: Register Component


First, we'll build the register component. 

Import all the things we'll need.

```js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { registerStart } from "../store/auth/authActions";
```

Then, we'll create our function and add some useState variables. These will track the state of our registration form as it is interacted with by our users.

```js
const Register = () => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = React.useState(false);

}

```

We'll use the `useSelector` hook to get specific items from the Redux store. Specifically, we want a boolean to tell us if the registration was successful and any error that comes back from our API.

```js

  const success = useSelector((state) => state.auth.registerSuccess);
  const error = useSelector((state) => state.auth.error);

```

Next, we'll get our dispatch and navigate ready. Dispatch will allow us to send events and trigger our sagas and actions. Navigate will allow us to change our user's page programatically.

```js
  const dispatch = useDispatch();
  const navigate = useNavigate();
```

Next, we'll as a `useEffect` hook. This will redirect our user if the registration has been successful. 


```js
  React.useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);
```

Our last bit of logic before our JSX will be a `handleChange` function that will update our useState as the form updates and our `handleSubmit` function which will dispatch our `registerStart` action.

```js
  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(registerStart(credentials));
  };
```

We'll return our JSX. We've got the Bootstrap CSS library being imported in our public index.html which we'll leverage for our styling.

First, we'll have an error message appear if there is an error present.

```js

  return (
    <div className="col-md-6 col-md-offset-3">
      <h2>Register</h2>
      {error && (
        <h3>We've had an error - have you ready registered this email?</h3>
      )}
```

Then, we have our login form. The `onSubmit` event will trigger our `handleSubmit` function.

```js

      <form name="form" onSubmit={handleSubmit}>

```

For each of our form elements, we'll follow the same pattern. 

We'll have:
- the right value taken from our credentials object
- our `onChange` handler will call our function
- we'll have a conditional error block if that field is left blank 

```js
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

```

Finally, we'll export our component:

```js

export default Register;

```

## Exercise 6: Login Component

Now, for our login component. 

First, we'll sort out our imports. Most of these are similar to the previous component. The different ones are from `react-router-dom`. These allow us to link to other parts of our application and to navigate for our user programatically.

When the user has successfully logged in, we want to move them to a particular page. In future developments, you could have them move to the page they came from if they tried to access an unauthorized route.

```js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logInStart } from "../store/auth/authActions";

import { Link, useNavigate } from "react-router-dom";
```

Like in the last component, we'll see up some state values, get our dispatch function and get data from the Redux store.

```js
const LogIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const dispatch = useDispatch();

  const currentUser = useSelector((store) => store.auth.currentUser);
```

Different from last time, we'll use the `useNavigate` hook and set up a `useEffect` hook. This time, if there is a currentUser then the login has been successful. At that point, we should redirect to the home page.

Again, you could make this more dynamic if you would like to explore that.

```js
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      return;
    }
    navigate("/");
  }, [currentUser, navigate]);

```

The rest of the logic and JSX is very similar to the last component. We only have two fields this time.

```js
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
```

Next to our login button, we'll add a link to the register page. Using the `react-router-dom` `<Link>` component will allow this to feel smooth and responsive.

```js
        <Link to="/register" className="btn btn-link">
          Register
        </Link>
```

Finally, we'll close out our tags and export our component.

```js
      </form>
    </div>
  );
};

export default LogIn;
```

## Exercise 7: PrivateRoute Component

We're going to create a `<PrivateRoute>` component which will restrict access to a given route. While not strictly a Redux exercise, this is a great use case.

In reality, it's quite a simple component. It takes two props, an auth and a component. If the auth is there, then you go to the component. If it is not, you are redirected to the `/login` route.

Add this component to `src/components/PrivateRoute.js`

```js
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ Component, auth }) {
  return auth ? <Component /> : <Navigate to="/login" />;
}

export default PrivateRoute;
```

Let's refactor our routes table to use it. In `src/App.js`, import our new component and the `useSelector` hook:

```js
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
```

Then, check if there is a user in our store:

```js
  const auth = useSelector((state) => state.auth.currentUser);
```

and refactor our `/` route:

```js
<Route
  path="/"
  element={<PrivateRoute auth={auth} Component={Home} />}
/>
```

You could also refactor the catch-all route:

```js
<Route 
  path="*" element={<PrivateRoute auth={auth} Component={Home} />} 
/>
```

If you try to navigate to `/` without having logged in, you should be redirected to the `/login` route now.

## Exercise 8: Home Component

Finally, we'll add some detail to our home component.

All we'll do is extract some of the detail from the store and report it to our user. You could obviously extend this to do a lot more.

```js
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
      <p>You access token is {user.token}</p>
      <p>The email address you registered with is {user.email}.</p>
      <p>You can logout and log back in again or register a new user.</p>
      <p>
        <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  );
}

export default HomePage;
```

The only new code here is the handleLogout. You can see that this will dispatch the `logout` action and navigate the user to the `/login` page.