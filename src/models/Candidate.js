const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  imageUrl: { type: String },
  manifesto: { type: String, required: true },
  videoUrl: { type: String },
  positionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  electionId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
