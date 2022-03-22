import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { likePost, dislikePost, deletePost } from "../store/posts/postActions";

function Post({ post, handleShow, text = "", image = "", likes = 0, id = "" }) {
  const dispatch = useDispatch();

  return (
    <div className="card mx-4">
      {image && <img className="card-img-top" src={image} alt="Post image" />}
      <div className="card-body">
        <h5 className="card-title">{id}</h5>
        <p className="card-text">{text}</p>
      </div>
      <div>
        <span>Likes: {likes}</span>{" "}
        <span
          onClick={() => {
            dispatch(likePost(id));
          }}
        >
          <FaThumbsUp />{" "}
        </span>
        <span
          onClick={() => {
            dispatch(dislikePost(id));
          }}
        >
          <FaThumbsDown />
        </span>
        <button
          className="btn btn-primary mx-4"
          onClick={() => handleShow(post)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deletePost(id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Post;
