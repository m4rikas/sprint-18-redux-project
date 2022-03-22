import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";

function EditPost({ post, show, setShow }) {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      {post.image && (
        <img className="card-img-top" src={post.image} alt="Post image" />
      )}
      <Modal.Header closeButton>
        <Modal.Title>{post.id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <textarea
          className="form-control"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleUpdate()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditPost;
