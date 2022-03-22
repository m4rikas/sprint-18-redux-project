import { combineReducers } from "redux";
import post from "./posts/postReducer";
import account from "./account/accountReducer";

export default combineReducers({ post, account });
