const mongoose = require('mongoose');

const SnapshotSchema = new mongoose.Schema({
  shareCode: { type: String, required: true, unique: true },
  notesPayload: { type: Array, required: true }, 
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 86400 // Mandatory: Auto-deletes after 24 hours [cite: 37, 54]
  }
});

module.exports = mongoose.model('Snapshot', SnapshotSchema);