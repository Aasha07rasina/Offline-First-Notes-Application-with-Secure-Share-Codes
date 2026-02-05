const mongoose = require('mongoose');

const SnapshotSchema = new mongoose.Schema({
  shareCode: { type: String, required: true, unique: true },
  payload: { type: Array, required: true }, // The list of notes from your friend
  createdAt: { type: Date, default: Date.now, expires: '24h' } // Auto-delete after 24 hours
});

module.exports = mongoose.model('Snapshot', SnapshotSchema);