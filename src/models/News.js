const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  bannerUrl: { type: String },
  content: { type: String, required: true },
  audience: { type: String, required: true },
  orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
