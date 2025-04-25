const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  bannerUrl: { type: String },
  details: { type: String, required: true },
  address: { type: String },
  meetingLink: { type: String },
  audience: { type: String, required: true },
  date: { type: String, required: true },   // e.g., '2025-05-15'
  time: { type: String, required: true },   // e.g., '15:30' or '3:30 PM'
  orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
