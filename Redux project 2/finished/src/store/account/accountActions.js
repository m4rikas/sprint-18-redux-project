import {
  GET_ACCOUNT_STARTED,
  UPDATE_ACCOUNT_STARTED,
} from "./accountActionTypes";

export const getAccount = () => {
  return {
    type: GET_ACCOUNT_STARTED,
  };
};

export const updateAccount = (details) => {
  return {
    type: UPDATE_ACCOUNT_STARTED,
    payload: details,
  };
};
