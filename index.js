const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Author = require('./models/author');
const Blog = require('./models/blog');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://Akarsha:harshaAkarsha77@cluster0.7bvmeop.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(bodyParser.json());


app.post('/author', async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).send(author);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.post('/blog', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).send(blog);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find();
    res.send(authors);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.send(blogs);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
