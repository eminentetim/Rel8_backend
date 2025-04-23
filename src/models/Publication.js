const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  audience: { type: String, required: true },
  orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;
