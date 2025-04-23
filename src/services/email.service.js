const transporter = require('../config/mail');

exports.sendMail = (options) => {
  return transporter.sendMail(options);
};
