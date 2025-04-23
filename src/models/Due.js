const mongoose = require('mongoose');

const dueSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  purpose: { type: String, required: true },
  targetGroup: { type: String, required: true },
  orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Due = mongoose.model('Due', dueSchema);

module.exports = Due;
