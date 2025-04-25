const Election = require('../models/Election');
const Candidate = require('../models/Candidate');
const Vote = require('../models/Vote');
const cloudinaryService = require('../services/cloudinary.service');

exports.createElection = async (req, res) => {
  try {
    const { theme, positions, startDate, endDate } = req.body;
    const election = new Election({
      theme,
      positions,
      startDate,
      endDate,
      orgId: req.tenant,
    });
    await election.save();
    res.status(201).json(election);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createCandidate = async (req, res) => {
  try {
    const { name, bio, manifesto, positionId, electionId } = req.body;
    const imageUrl = req.file ? await cloudinaryService.uploadFile(req.file) : null;
    const videoUrl = req.videoFile ? await cloudinaryService.uploadFile(req.videoFile) : null;
    const candidate = new Candidate({
      name,
      bio,
      imageUrl,
      manifesto,
      videoUrl,
      positionId,
      electionId,
    });
    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.castVote = async (req, res) => {
  try {
    const { candidateId } = req.body;
    const vote = new Vote({
      memberId: req.user.userId,
      candidateId,
    });
    await vote.save();
    res.status(201).json(vote);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getElectionResults = async (req, res) => {
  try {
    const electionId = req.params.electionId;
    const votes = await Vote.aggregate([
      { $match: { electionId: mongoose.Types.ObjectId(electionId) } },
      { $group: { _id: '$candidateId', count: { $sum: 1 } } },
    ]);
    res.status(200).json(votes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateElection = async (req, res) => {
  try {
    const { theme, positions, startDate, endDate } = req.body;
    const election = await Election.findByIdAndUpdate(req.params.id, {
      theme, positions, startDate, endDate
    }, { new: true });
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }
    res.status(200).json(election);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateCandidate = async (req, res) => {
  try {
    const { name, bio, manifesto, positionId, electionId } = req.body;
    const imageUrl = req.file ? await cloudinaryService.uploadFile(req.file) : null;
    const videoUrl = req.videoFile ? await cloudinaryService.uploadFile(req.videoFile) : null;
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, {
      name, bio, imageUrl, manifesto, videoUrl, positionId, electionId
    }, { new: true });
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteElection = async (req, res) => {
  try {
    const election = await Election.findByIdAndDelete(req.params.id);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }
    res.status(200).json({ message: 'Election deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getElections = async (req, res) => {
  try {
    const elections = await Election.find({ orgId: req.tenant });
    res.status(200).json(elections);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getElectionById = async (req, res) => {
  try {
    const election = await Election.findOne({ _id: req.params.id, orgId: req.tenant });
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }
    res.status(200).json(election);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCandidates = async (req, res) => {
  try {
    const filter = {};
    if (req.query.electionId) filter.electionId = req.query.electionId;
    if (req.query.positionId) filter.positionId = req.query.positionId;

    const candidates = await Candidate.find(filter);
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
