const GroupMessage = require('../models/GroupMessage');
const PrivateMessage = require('../models/PrivateMessage');

exports.sendGroupMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const message = new GroupMessage({
      content,
      senderId: req.user.userId,
      orgId: req.tenant,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.sendPrivateMessage = async (req, res) => {
  try {
    const { content, recipientId } = req.body;
    const message = new PrivateMessage({
      content,
      senderId: req.user.userId,
      recipientId,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getGroupMessages = async (req, res) => {
  try {
    const messages = await GroupMessage.find({ orgId: req.tenant });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPrivateMessages = async (req, res) => {
  try {
    const messages = await PrivateMessage.find({
      $or: [{ senderId: req.user.userId }, { recipientId: req.user.userId }],
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
