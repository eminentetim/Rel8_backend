const Member = require('../models/Member');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt');
const transporter = require('../config/mail');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

exports.uploadMembers = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    const members = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        members.push({
          name: row.Name,
          email: row.Email,
          phone: row.Phone,
          dateJoined: new Date(row.DateJoined),
          imageUrl: row.ImageUrl,
          exco: { isExco: row.Exco === 'true', position: row.ExcoPosition },
          committee: { isMember: row.Committee === 'true', committeeName: row.CommitteeName, position: row.CommitteePosition },
          orgId: req.tenant,
        });
      })
      .on('end', async () => {
        await Member.insertMany(members);
        res.status(200).json({ message: 'Members uploaded successfully' });
      });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.setPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const member = await Member.findById(decoded.userId);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    member.password = hashedPassword;
    await member.save();

    res.status(200).json({ message: 'Password set successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const { name, email, phone, dateJoined, imageUrl, exco, committee } = req.body;
    const member = await Member.findByIdAndUpdate(req.user.userId, {
      name, email, phone, dateJoined, imageUrl, exco, committee
    }, { new: true });
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
