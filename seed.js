
'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Book = require('./models/books.js');

async function seed() {

  await Book.create({
    title: 'The Road',
    description: 'A post-apocalyptic thriller following a father and son making their away across a desolate world',
    hasRead: true
  });

  await Book.create({
    title: 'Station Eleven',
    description: 'A group of musicians and actors encounter a dangerous prophet and his followers in a post-pandemic world',
    hasRead: true
  });

  await Book.create({
    title: 'Jurassic Park',
    description: 'A group of scientists visit an island where a visionary millionaire has created a theme park with actual dinosaurs and things go awry!',
    hasRead: true
  });

  mongoose.disconnect();
};

seed();
