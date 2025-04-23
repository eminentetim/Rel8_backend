const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
