import { all, call } from "redux-saga/effects";
import { postSagas } from "./posts/postSagas";
import { accountSagas } from "./account/accountSagas";

export default function* rootSaga() {
  yield all([call(postSagas), call(accountSagas)]);
}
