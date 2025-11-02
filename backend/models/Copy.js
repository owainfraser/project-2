const mongoose = require('mongoose');
const CopySchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  status: { type: String, enum: ['available','checked_out','maintenance'], default: 'available' },
  location: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('Copy', CopySchema);
