const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String },
  audience: { type: String, required: true },
  orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
