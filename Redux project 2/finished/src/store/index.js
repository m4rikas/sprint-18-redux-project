import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sageMiddleware = createSagaMiddleware();
const middleware = [sageMiddleware, logger];
const store = createStore(rootReducer, applyMiddleware(...middleware));

sageMiddleware.run(rootSaga);

export default store;
