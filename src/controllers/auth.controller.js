const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
const Organization = require('../models/Organization');
const transporter = require('../config/mail');
const dotenv = require('dotenv');

dotenv.config();

exports.signup = async (req, res) => {
  try {
    const { name, adminEmail, password, contactDetails } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const organization = new Organization({
      name,
      adminId: new mongoose.Types.ObjectId(),
      createdAt: new Date(),
    });

    const admin = new Member({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      phone: contactDetails.phone,
      dateJoined: new Date(),
      exco: { isExco: true, position: 'Admin' },
      orgId: organization._id,
    });

    await organization.save();
    await admin.save();

    const token = jwt.sign({ userId: admin._id, orgId: organization._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: 'Verify Your Account',
      html: `<p>Please click the following link to verify your account: <a href="https://yourdomain.com/verify/${token}">Verify</a></p>`,
    }, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(201).json({ message: 'Admin account created. Please verify your email.' });
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const member = await Member.findById(decoded.userId);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    member.isVerified = true;
    await member.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const member = await Member.findOne({ email });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    if (!member.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: member._id, orgId: member.orgId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
