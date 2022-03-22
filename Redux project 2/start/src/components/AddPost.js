import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

import imageToBase64 from "image-to-base64/browser";

import { addPost } from "../store/posts/postActions";

const AddPost = () => {
  return (
    <>
      <h3>Add your post below:</h3>
      <form onSubmit={handleAddPost}>
        <textarea
          className="form-control"
          rows={3}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />

        <br />
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button
          disabled={postText === "" && ready}
          onClick={handleAddPost}
          className="btn btn-primary btn-block"
        >
          Add post
        </button>
      </form>
    </>
  );
};

export default AddPost;
