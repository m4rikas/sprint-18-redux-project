import { all, put, call, takeLatest } from "redux-saga/effects";
import * as actionType from "./accountActionTypes";
import { getAccount, updateAccount } from "../../services/account";

export function* onGetAccountSaga() {
  yield takeLatest(actionType.GET_ACCOUNT_STARTED, fetchAccount);
}

export function* fetchAccount() {
  try {
    const postsResponse = yield call(getAccount);
    if (postsResponse.status !== 200) {
      throw new Error("Problem with getting posts.");
    }
    yield put({
      type: actionType.GET_ACCOUNT_SUCCESS,
      payload: postsResponse.data,
    });
  } catch (err) {
    yield put({ type: actionType.GET_ACCOUNT_FAILURE, payload: err });
  }
}

export function* onUpdateAccountSaga() {
  yield takeLatest(actionType.UPDATE_ACCOUNT_STARTED, postAccount);
}

export function* postAccount(action) {
  try {
    const postResponse = yield call(updateAccount, action.payload);
    if (postResponse.status !== 200) {
      throw new Error("Problem with getting posts.");
    }
    yield put({
      type: actionType.UPDATE_ACCOUNT_SUCCESS,
      payload: postResponse.data,
    });
  } catch (err) {
    yield put({ type: actionType.UPDATE_ACCOUNT_FAILURE, payload: err });
  }
}

export function* accountSagas() {
  yield all([call(onUpdateAccountSaga), call(onGetAccountSaga)]);
}
