const express = require("express");
const Preferences = require('../models/Preferences');

const router = express.Router();
 const upload = require('../multerconfig'); 

const { catchErrors } = require("../handlers/errorHandlers");
const {
  isValidToken,
  login,
  logout,IsAdmin,
} = require("../controllers/authController");

const bookController = require('../controllers/bookController');


// Define routes and map to controller functions
router.get('/books/search', bookController.searchBooks);

router.post('/books', isValidToken, IsAdmin, upload, bookController.addBook);
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', isValidToken, IsAdmin,bookController.updateBookById);
router.delete('/books/:id', isValidToken, IsAdmin,bookController.deleteBookById);
router.post('/profile', async (req, res) => {
  try {
    const { email, favoriteGenre, favoriteAuthor, preferredBookLength, readingFrequency, fictionPreference, adminId } = req.body;

    // Check if preferences exist for the user
    let preferences = await Preferences.findOne({ email });

    if (preferences) {
      // Update existing preferences
      preferences.favoriteGenre = favoriteGenre;
      preferences.favoriteAuthor = favoriteAuthor;
      preferences.preferredBookLength = preferredBookLength;
      preferences.readingFrequency = readingFrequency;
      preferences.fictionPreference = fictionPreference;
      preferences.admin = adminId; // Link to admin

      await preferences.save();
      return res.status(200).json({ message: 'Profile updated', user: preferences });
    } else {
      // Create new preferences
      preferences = new Preferences({
        email,
        favoriteGenre,
        favoriteAuthor,
        preferredBookLength,
        readingFrequency,
        fictionPreference,
        admin: adminId, // Link to admin
      });

      await preferences.save();
      return res.status(201).json({ message: 'Profile created', user: preferences });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing request', error: error.message });
  }
});


module.exports = router;