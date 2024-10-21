const Book = require('../models/Book'); 
// Create and add a new book
exports.addBook = async (req, res) => {
    try {
      const { 
        title, 
        author, 
        genre, 
        publicationYear, 
        language, 
        isbn, 
        description, 
        availableCopies, 
      } = req.body;
      console.log(genre)
      // Validate the required fields
      if (!title || !author || !genre || !publicationYear || !isbn || !availableCopies) {
        return res.status(400).json({ success: false, message: "Please fill in all required fields." });
      }
      const image = req.file ? req.file.path : null;

      // Check if the book already exists based on ISBN
      const existingBook = await Book.findOne({ isbn });
      if (existingBook) {
        return res.status(400).json({ success: false, message: "A book with this ISBN already exists." });
      }
  
      // Create a new book instance
      const newBook = new Book({
        title,
        author,
        genre,
        publicationYear,
        language,
        isbn,
        description,
        availableCopies,
        image
      });
  
      // Save the new book to the database
      const savedBook = await newBook.save();
      
      // Return success response
      res.status(201).json({
        success: true,
        message: "Book successfully added",
        result: savedBook
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  
  // Browse (get all books)
  exports.getAllBooks = async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json({ success: true, result: books });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  // Get a single book by ID
  exports.getBookById = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ success: false, message: 'Book not found.' });
      }
  
      res.status(200).json({ success: true, result: book });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  // Update book by ID
  exports.updateBookById = async (req, res) => {
    try {
      const { title, author, genre, publishedYear } = req.body;
  
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        { title, author, genre, publishedYear },
        { new: true } // return updated document
      );
  
      if (!updatedBook) {
        return res.status(404).json({ success: false, message: 'Book not found.' });
      }
  
      res.status(200).json({ success: true, result: updatedBook, message: 'Book updated successfully.' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  // Delete book by ID
  exports.deleteBookById = async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
  
      if (!deletedBook) {
        return res.status(404).json({ success: false, message: 'Book not found.' });
      }
  
      res.status(200).json({ success: true, result: deletedBook, message: 'Book deleted successfully.' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };// Search books based on title, author, genre, or publishedYear
  exports.searchBooks = async (req, res) => {
    try {
      const { title, author, genre, publishedYear } = req.query;
  
      // Create a query object to dynamically filter based on the fields that are provided
      const query = {};
      
      if (title) query.title = { $regex: title, $options: "i" }; // case-insensitive search
      if (author) query.author = { $regex: author, $options: "i" }; // case-insensitive search
      if (genre) query.genre = { $regex: genre, $options: "i" }; // case-insensitive search
      if (publishedYear) query.publishedYear = publishedYear; // exact match for year
  
      // Search for books based on the query object
      const books = await Book.find(query);
  
      if (books.length === 0) {
        return res.status(404).json({ success: false, message: "No books found matching the criteria." });
      }
  
      res.status(200).json({ success: true, result: books });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  