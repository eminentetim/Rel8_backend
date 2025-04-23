const mongoose = require('mongoose');

const minuteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  fileUrl: { type: String },
  audience: { type: String, required: true },
  orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Minute = mongoose.model('Minute', minuteSchema);

module.exports = Minute;
