'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  hasRead: { type: Boolean, required: true }
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;