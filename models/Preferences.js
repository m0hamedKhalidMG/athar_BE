const mongoose = require('mongoose');
const { Schema } = mongoose;

const PrefSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  favoriteGenre: { type: String },
  favoriteAuthor: { type: String },
  preferredBookLength: { type: String },
  readingFrequency: { type: String },
  fictionPreference: { type: String },
  admin: { type: Schema.Types.ObjectId, ref: 'Admin' }, // Add reference to Admin

  // You can add other profile-related fields here
});

module.exports = mongoose.model('Preference', PrefSchema);
