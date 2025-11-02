const mongoose = require('mongoose');
const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publisher: { type: String },
  year: { type: Number },
  description: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('Game', GameSchema);
