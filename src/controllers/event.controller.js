const Event = require('../models/Event');
const cloudinaryService = require('../services/cloudinary.service');

exports.createEvent = async (req, res) => {
  try {
    const { details, address, meetingLink, audience, date, time } = req.body;
    const bannerUrl = req.file ? await cloudinaryService.uploadFile(req.file) : null;
    const event = new Event({
      bannerUrl,
      details,
      address,
      meetingLink,
      audience,
      date,
      time,
      orgId: req.tenant,
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ orgId: req.tenant });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { details, address, meetingLink, audience, date, time } = req.body;
    const bannerUrl = req.file ? await cloudinaryService.uploadFile(req.file) : null;
    const event = await Event.findByIdAndUpdate(req.params.id, {
      bannerUrl,
      details,
      address,
      meetingLink,
      audience,
      date,
      time
    }, { new: true });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
