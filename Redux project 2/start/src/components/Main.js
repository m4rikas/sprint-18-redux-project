import React from "react";

import AddPost from "./AddPost";
import Post from "./Post";
import EditPost from "./EditPost";

function Main() {
  const [currentPost, setCurrentPost] = React.useState({});
  const [show, setShow] = React.useState(false);

  const posts = [];

  function handleShow(post) {
    setCurrentPost(post);
    setShow(true);
  }

  return (
    <>
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            <AddPost />
          </div>
        </div>
      </div>
      <div className="col-md-6 col-md-offset-3">
        {posts.map((post) => (
          <div class="row justify-content-md-center">
            <Post
              key={post.id}
              text={post.text}
              image={post.image}
              id={post.id}
              likes={post.likes}
              handleShow={handleShow}
              post={post}
            />
          </div>
        ))}
      </div>
      <EditPost post={currentPost} show={show} setShow={setShow} />
    </>
  );
}

export default Main;
