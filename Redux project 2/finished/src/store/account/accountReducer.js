import * as actionType from "./accountActionTypes";

const initialState = {
  details: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_ACCOUNT_SUCCESS: {
      return {
        ...state,
        accountError: null,
        details: action.payload,
      };
    }
    case actionType.GET_ACCOUNT_FAILURE: {
      return {
        ...state,
        accountError: action.payload,
      };
    }
    case actionType.UPDATE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        accountError: null,
        details: action.payload,
      };
    }
    case actionType.UPDATE_ACCOUNT_FAILURE: {
      return {
        ...state,
        accountError: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default reducer;
