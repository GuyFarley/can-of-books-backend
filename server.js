'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Book = require('./models/books.js');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
})

app.get('/books', getBooks);

app.post('/books', postBooks);

app.delete('/books/:id', deleteBooks);

app.put('/books/:id', putBooks);

async function getBooks(req, res, next) {
  let bookQuery = {};
  if (req.query.title) {
    bookQuery = {
      title: req.query.title
    }
  }
  try {
    let results = await Book.find(bookQuery);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

async function postBooks(req, res, next) {
  try {
    let submittedBook = await Book.create(req.body);
    console.log(submittedBook);
    res.status(200).send(submittedBook);
  } catch (error) {
    next(error);
  }
}

async function deleteBooks(req, res, next) {
  try{
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).send('book deleted');
  } catch(error) {
    next(error);
  }
}

async function putBooks(req, res, next) {
  try {
    let id = req.params.id;
    let updatedBookData = req.body;

    let updatedBook = await Book.findByIdAndUpdate(id, updatedBookData, { new: true, overwrite: true });
    res.status(200).send(updatedBook);
  } catch(error) {
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not available');
})

app.get('/test', (request, response) => {
  response.send('test request received')
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
