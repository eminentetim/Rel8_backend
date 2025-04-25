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

exports.updateGroupMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const message = await GroupMessage.findByIdAndUpdate(req.params.id, { content }, { new: true });
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteGroupMessage = async (req, res) => {
  try {
    const message = await GroupMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updatePrivateMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const message = await PrivateMessage.findByIdAndUpdate(req.params.id, { content }, { new: true });
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deletePrivateMessage = async (req, res) => {
  try {
    const message = await PrivateMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
