const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;// Create Book Schema
const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  image: { type: String }, 

  genre: {
    type: String,
    required: true,
    trim: true
  },
  publicationYear: {
    type: Number,
    required: true
  },
  language: {
    type: String,
    default: 'English'
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  availableCopies: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the Book model
module.exports = mongoose.model('Book', bookSchema);
