const { nanoid } = require('nanoid');
const Snapshot = require('../models/Snapshot');

// 1. Create a share code for a bundle of notes
exports.createShareCode = async (req, res) => {
  try {
    const { notes } = req.body;
    const code = nanoid(6).toUpperCase(); // Generates a short 6-character code

    const newSnapshot = new Snapshot({
      shareCode: code,
      payload: notes
    });

    await newSnapshot.save();
    return res.status(201).json({ shareCode: code });

  } catch (error) {
    console.error("Error creating snapshot:", error);
    return res.status(500).json({ error: "Failed to create share code" });
  }
};

// 2. Get notes using a share code
exports.getNotesByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const snapshot = await Snapshot.findOne({ shareCode: code.toUpperCase() });

    if (!snapshot) {
      return res.status(404).json({ error: "Code invalid or expired" });
    }

    res.json(snapshot.payload);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};