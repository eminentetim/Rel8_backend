const Payment = require('../models/Payment');
const Due = require('../models/Due');
const paystack = require('../services/paystack.service');
const pdfService = require('../services/pdf.service');

exports.makePayment = async (req, res) => {
  try {
    const { dueId, amount } = req.body;
    const due = await Due.findById(dueId);
    if (!due) {
      return res.status(404).json({ message: 'Due not found' });
    }

    const paymentIntent = await paystack.paymentIntent.create({
      amount,
      currency: 'usd',
    });

    const payment = new Payment({
      memberId: req.user.userId,
      dueId,
      amount,
      transactionId: paymentIntent.id,
      orgId: req.tenant,
    });

    await payment.save();

    const receiptUrl = await pdfService.generateReceipt(payment);
    payment.receiptUrl = receiptUrl;
    await payment.save();

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ orgId: req.tenant });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
