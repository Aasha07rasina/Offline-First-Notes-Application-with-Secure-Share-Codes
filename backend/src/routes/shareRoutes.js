const express = require('express');
const router = express.Router();
const shareController = require('../controllers/shareController');
const { validateNotes } = require('../middleware/validate'); // Matches the { } export

// Line 6 was crashing here:
router.post('/share', validateNotes, shareController.createShareCode);
router.get('/share/:code', shareController.getNotesByCode);

module.exports = router;