const News = require('../models/News');
const Gallery = require('../models/Gallery');
const Publication = require('../models/Publication');
const Minute = require('../models/Minute');
const cloudinaryService = require('../services/cloudinary.service');

exports.createNews = async (req, res) => {
  try {
    const { topic, content, audience } = req.body;
    const bannerUrl = await cloudinaryService.uploadFile(req.file);
    const news = new News({
      topic,
      bannerUrl,
      content,
      audience,
      orgId: req.tenant,
    });
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createGallery = async (req, res) => {
  try {
    const { caption, audience } = req.body;
    const imageUrl = await cloudinaryService.uploadFile(req.file);
    const gallery = new Gallery({
      imageUrl,
      caption,
      audience,
      orgId: req.tenant,
    });
    await gallery.save();
    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createPublication = async (req, res) => {
  try {
    const { title, audience } = req.body;
    const fileUrl = await cloudinaryService.uploadFile(req.file);
    const publication = new Publication({
      title,
      fileUrl,
      audience,
      orgId: req.tenant,
    });
    await publication.save();
    res.status(201).json(publication);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createMinute = async (req, res) => {
  try {
    const { content, audience } = req.body;
    const fileUrl = req.file ? await cloudinaryService.uploadFile(req.file) : null;
    const minute = new Minute({
      content,
      fileUrl,
      audience,
      orgId: req.tenant,
    });
    await minute.save();
    res.status(201).json(minute);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getNews = async (req, res) => {
  try {
    const news = await News.find({ orgId: req.tenant });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({ orgId: req.tenant });
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPublications = async (req, res) => {
  try {
    const publications = await Publication.find({ orgId: req.tenant });
    res.status(200).json(publications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMinutes = async (req, res) => {
  try {
    const minutes = await Minute.find({ orgId: req.tenant });
    res.status(200).json(minutes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { topic, content, audience } = req.body;
    const news = await News.findByIdAndUpdate(req.params.id, {
      topic, content, audience
    }, { new: true });
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateGallery = async (req, res) => {
  try {
    const { caption, audience } = req.body;
    const imageUrl = req.file ? await cloudinaryService.uploadFile(req.file) : null;
    const gallery = await Gallery.findByIdAndUpdate(req.params.id, {
      imageUrl, caption, audience
    }, { new: true });
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updatePublication = async (req, res) => {
  try {
    const { title, audience } = req.body;
    const fileUrl = req.file ? await cloudinaryService.uploadFile(req.file) : null;
    const publication = await Publication.findByIdAndUpdate(req.params.id, {
      title, fileUrl, audience
    }, { new: true });
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateMinute = async (req, res) => {
  try {
    const { content, audience } = req.body;
    const fileUrl = req.file ? await cloudinaryService.uploadFile(req.file) : null;
    const minute = await Minute.findByIdAndUpdate(req.params.id, {
      content, fileUrl, audience
    }, { new: true });
    if (!minute) {
      return res.status(404).json({ message: 'Minute not found' });
    }
    res.status(200).json(minute);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    res.status(200).json({ message: 'Gallery deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.status(200).json({ message: 'Publication deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteMinute = async (req, res) => {
  try {
    const minute = await Minute.findByIdAndDelete(req.params.id);
    if (!minute) {
      return res.status(404).json({ message: 'Minute not found' });
    }
    res.status(200).json({ message: 'Minute deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
