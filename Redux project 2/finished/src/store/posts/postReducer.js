import * as actionType from "./postActionTypes";

const initialState = {
  posts: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.ADD_POST_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case actionType.UPDATE_POST_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case actionType.GET_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case actionType.DELETE_POST_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case actionType.LIKE_POST_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case actionType.DISLIKE_POST_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        posts: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
}

export default reducer;
