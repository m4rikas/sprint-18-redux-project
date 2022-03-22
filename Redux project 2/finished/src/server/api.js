const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const { text, application } = require("express");

const app = express();
app.use(express.json());

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await fs.readFile(path.join(__dirname, "db.json"));
    res.json(JSON.parse(posts).posts);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    const data = await JSON.parse(
      await fs.readFile(path.join(__dirname, "db.json"))
    );
    const { text, image } = req.body;
    const newPost = { id: uuidv4(), text, image, likes: 0 };
    data.posts.push(newPost);
    res.json(data.posts);
    await fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/posts/:id/like", async (req, res) => {
  try {
    const data = await JSON.parse(
      await fs.readFile(path.join(__dirname, "db.json"))
    );
    const { id } = req.params;

    const targetIndex = data.posts.findIndex((x) => x.id === id);
    const targetPost = data.posts[targetIndex];
    if (targetIndex > -1) {
      data.posts[targetIndex] = { ...targetPost, likes: targetPost.likes + 1 };
    } else {
      throw new Error("Failed to update.");
    }
    res.json(data.posts);
    await fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/posts/:id/dislike", async (req, res) => {
  try {
    const data = await JSON.parse(
      await fs.readFile(path.join(__dirname, "db.json"))
    );
    const { id } = req.params;

    const targetIndex = data.posts.findIndex((x) => x.id === id);
    const targetPost = data.posts[targetIndex];
    if (targetIndex > -1) {
      data.posts[targetIndex] = { ...targetPost, likes: targetPost.likes - 1 };
    } else {
      throw new Error("Failed to update.");
    }
    res.json(data.posts);
    await fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
});

app.patch("/api/posts/:id", async (req, res) => {
  try {
    const data = await JSON.parse(
      await fs.readFile(path.join(__dirname, "db.json"))
    );
    const { id } = req.params;

    const targetIndex = data.posts.findIndex((x) => x.id === id);
    const targetPost = data.posts[targetIndex];
    if (targetIndex > -1) {
      data.posts[targetIndex] = { ...targetPost, ...req.body };
    } else {
      throw new Error("Failed to update.");
    }
    res.json(data.posts);
    await fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  try {
    const data = await JSON.parse(
      await fs.readFile(path.join(__dirname, "db.json"))
    );
    const { id } = req.params;

    const targetIndex = data.posts.findIndex((x) => x.id === id);

    if (targetIndex > -1) {
      data.posts.splice(targetIndex, 1);
    } else {
      throw new Error("Failed to update.");
    }
    res.json(data.posts);
    await fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/account", async (req, res) => {
  try {
    const data = await JSON.parse(
      await fs.readFile(path.join(__dirname, "db.json"))
    );
    res.json(data.account);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/account", async (req, res) => {
  try {
    const data = await JSON.parse(
      await fs.readFile(path.join(__dirname, "db.json"))
    );
    data.account = { ...data.account, ...req.body };
    res.json(data.account);
    await fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
});

app.listen(3030, () => console.log("Listening on port 3030"));
