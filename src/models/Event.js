const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  bannerUrl: { type: String },
  details: { type: String, required: true },
  address: { type: String },
  meetingLink: { type: String },
  audience: { type: String, required: true },
  orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
