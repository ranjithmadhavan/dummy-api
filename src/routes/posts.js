const express = require("express");
const faker = require("faker");

const router = express.Router();

let posts = [];

// GET all posts
router.get("/posts", (req, res) => {
    res.json(posts);
});

// GET a single post
router.get("/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
});

// POST a new post
router.post("/posts", (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title || faker.lorem.sentence(),
        content: req.body.content || faker.lorem.paragraphs(),
        author: req.body.author || faker.name.findName(),
        createdAt: new Date(),
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// PUT (update) a post
router.put("/posts/:id", (req, res) => {
    const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Post not found" });

    posts[index] = {
        ...posts[index],
        ...req.body,
        updatedAt: new Date(),
    };
    res.json(posts[index]);
});

// DELETE a post
router.delete("/posts/:id", (req, res) => {
    const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Post not found" });

    const deletedPost = posts.splice(index, 1);
    res.json(deletedPost[0]);
});

module.exports = router;
