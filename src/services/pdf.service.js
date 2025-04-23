const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generateReceipt = (payment) => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, '..', 'uploads', `receipt-${payment._id}.pdf`);
  doc.pipe(fs.createWriteStream(filePath));

  doc.text(`Receipt for Payment ID: ${payment._id}`, { align: 'center' });
  doc.text(`Amount: $${payment.amount}`);
  doc.text(`Date: ${payment.paidAt}`);
  doc.text(`Transaction ID: ${payment.transactionId}`);

  doc.end();

  return `uploads/receipt-${payment._id}.pdf`;
};
