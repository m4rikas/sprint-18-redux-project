import React from "react";

import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function Post({ post, handleShow, text = "", image = "", likes = 0, id = "" }) {
  return (
    <div className="card mx-4">
      {image && <img className="card-img-top" src={image} alt="Post image" />}
      <div className="card-body">
        <h5 className="card-title">{id}</h5>
        <p className="card-text">{text}</p>
      </div>
      <div>
        <span>Likes: {likes}</span>{" "}
        <span onClick={() => {}}>
          <FaThumbsUp />{" "}
        </span>
        <span onClick={() => {}}>
          <FaThumbsDown />
        </span>
        <button
          className="btn btn-primary mx-4"
          onClick={() => handleShow(post)}
        >
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => {}}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Post;
