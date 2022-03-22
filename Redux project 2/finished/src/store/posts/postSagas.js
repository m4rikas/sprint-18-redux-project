import { all, put, call, takeLatest } from "redux-saga/effects";
import * as actionType from "./postActionTypes";
import {
  getPosts,
  addPost as addPostAPI,
  likePost as likePostAPI,
  dislikePost as dislikePostAPI,
  updatePost as updatePostAPI,
  deletePost as deletePostAPI,
} from "../../services/posts";

export function* onAddPostSaga() {
  yield takeLatest(actionType.ADD_POST_STARTED, addPost);
}

export function* addPost(action) {
  try {
    const postResponse = yield call(addPostAPI, action.payload);
    if (postResponse.status !== 200) {
      throw new Error("Problem with getting posts.");
    }
    yield put({
      type: actionType.ADD_POST_SUCCESS,
      payload: postResponse.data,
    });
  } catch (err) {
    yield put({ type: actionType.ADD_POST_FAILURE, error: err });
  }
}

export function* onDeletePostSaga() {
  yield takeLatest(actionType.DELETE_POST_STARTED, deletePost);
}

export function* deletePost(action) {
  try {
    const postResponse = yield call(deletePostAPI, action.payload);
    if (postResponse.status !== 200) {
      throw new Error("Problem with getting posts.");
    }
    yield put({
      type: actionType.DELETE_POST_SUCCESS,
      payload: postResponse.data,
    });
  } catch (err) {
    yield put({ type: actionType.DELETE_POST_FAILURE, error: err });
  }
}

export function* onGetPostsSaga() {
  yield takeLatest(actionType.GET_POSTS_STARTED, fetchPosts);
}

export function* fetchPosts() {
  try {
    const postsResponse = yield call(getPosts);
    if (postsResponse.status !== 200) {
      throw new Error("Problem with getting posts.");
    }
    yield put({
      type: actionType.GET_POSTS_SUCCESS,
      payload: postsResponse.data,
    });
  } catch (err) {
    yield put({ type: actionType.GET_POSTS_FAILURE, payload: err });
  }
}

export function* onUpdatePostSaga() {
  yield takeLatest(actionType.UPDATE_POST_STARTED, updatePost);
}

export function* updatePost(action) {
  try {
    const postResponse = yield call(updatePostAPI, action.payload);
    if (postResponse.status !== 200) {
      throw new Error("Problem with getting posts.");
    }
    yield put({
      type: actionType.UPDATE_POST_SUCCESS,
      payload: postResponse.data,
    });
  } catch (err) {
    yield put({ type: actionType.UPDATE_POST_FAILURE, payload: err });
  }
}

export function* onLikePostSaga() {
  yield takeLatest(actionType.LIKE_POST_STARTED, likePost);
}

export function* likePost(action) {
  try {
    const postResponse = yield call(likePostAPI, action.payload);
    yield put({
      type: actionType.LIKE_POST_SUCCESS,
      payload: postResponse.data,
    });
  } catch (err) {
    yield put({ type: actionType.LIKE_POST_FAILURE, payload: err });
  }
}
export function* onDislikePostSaga() {
  yield takeLatest(actionType.DISLIKE_POST_STARTED, dislikePost);
}

export function* dislikePost(action) {
  try {
    const postResponse = yield call(dislikePostAPI, action.payload);
    yield put({
      type: actionType.DISLIKE_POST_SUCCESS,
      payload: postResponse.data,
    });
  } catch (err) {
    yield put({ type: actionType.DISLIKE_POST_FAILURE, payload: err });
  }
}

export function* postSagas() {
  yield all([
    call(onAddPostSaga),
    call(onDeletePostSaga),
    call(onGetPostsSaga),
    call(onUpdatePostSaga),
    call(onLikePostSaga),
    call(onDislikePostSaga),
  ]);
}
