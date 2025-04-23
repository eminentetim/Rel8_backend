const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  dateJoined: { type: Date, required: true },
  imageUrl: { type: String },
  exco: {
    isExco: { type: Boolean, default: false },
    position: { type: String },
  },
  committee: {
    isMember: { type: Boolean, default: false },
    committeeName: { type: String },
    position: { type: String },
  },
  orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
