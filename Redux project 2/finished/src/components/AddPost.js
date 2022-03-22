import React from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../store/posts/postActions";

const AddPost = () => {
  const [postText, setPostText] = React.useState("");
  const [image, setImage] = React.useState("");
  const [image64, setImage64] = React.useState("");
  const [ready, setReady] = React.useState(true);
  const dispatch = useDispatch();
  const handleAddPost = (e) => {
    e.preventDefault();
    dispatch(addPost({ text: postText, image: image64 }));
    setPostText("");
  };

  React.useEffect(() => {
    if (!image) {
      return;
    }
    setReady(false);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage64(reader.result);
      setReady(true);
    };
    reader.readAsDataURL(image);
  }, [image]);

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
