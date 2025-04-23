const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, required: true },
  dueId: { type: mongoose.Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  receiptUrl: { type: String },
  paidAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
