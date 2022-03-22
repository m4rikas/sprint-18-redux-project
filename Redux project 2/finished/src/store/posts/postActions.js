import {
  GET_POSTS_STARTED,
  ADD_POST_STARTED,
  DELETE_POST_STARTED,
  UPDATE_POST_STARTED,
  LIKE_POST_STARTED,
  DISLIKE_POST_STARTED,
} from "./postActionTypes";

export const getPosts = () => {
  return {
    type: GET_POSTS_STARTED,
  };
};
export const addPost = (data) => {
  return {
    type: ADD_POST_STARTED,
    payload: data,
  };
};
export const updatePost = (data) => {
  return {
    type: UPDATE_POST_STARTED,
    payload: data,
  };
};
export const deletePost = (id) => {
  return {
    type: DELETE_POST_STARTED,
    payload: id,
  };
};

export const likePost = (id) => {
  return {
    type: LIKE_POST_STARTED,
    payload: id,
  };
};

export const dislikePost = (id) => {
  return {
    type: DISLIKE_POST_STARTED,
    payload: id,
  };
};
