const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  theme: { type: String, required: true },
  positions: [{ type: String, required: true }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
