const Due = require('../models/Due');

exports.createDue = async (req, res) => {
  try {
    const { amount, dueDate, purpose, targetGroup } = req.body;
    const due = new Due({
      amount,
      dueDate,
      purpose,
      targetGroup,
      orgId: req.tenant,
    });
    await due.save();
    res.status(201).json(due);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getDues = async (req, res) => {
  try {
    const dues = await Due.find({ orgId: req.tenant });
    res.status(200).json(dues);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateDue = async (req, res) => {
  try {
    const { amount, dueDate, purpose, targetGroup } = req.body;
    const due = await Due.findByIdAndUpdate(req.params.id, {
      amount, dueDate, purpose, targetGroup
    }, { new: true });
    if (!due) {
      return res.status(404).json({ message: 'Due not found' });
    }
    res.status(200).json(due);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteDue = async (req, res) => {
  try {
    const due = await Due.findByIdAndDelete(req.params.id);
    if (!due) {
      return res.status(404).json({ message: 'Due not found' });
    }
    res.status(200).json({ message: 'Due deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
