import axios from "axios";

export async function getPosts() {
  const posts = await axios.get("/api/posts");
  return posts;
}

export async function addPost(post) {
  const posts = await axios.post("/api/posts", post);
  return posts;
}

export async function likePost(id) {
  const posts = await axios.post(`/api/posts/${id}/like`);
  return posts;
}

export async function dislikePost(id) {
  const posts = await axios.post(`/api/posts/${id}/dislike`);
  return posts;
}

export async function updatePost(post) {
  const { id, ...rest } = post;
  const posts = await axios.patch(`/api/posts/${id}`, rest);
  return posts;
}

export async function deletePost(id) {
  const posts = await axios.delete(`/api/posts/${id}`);
  return posts;
}
