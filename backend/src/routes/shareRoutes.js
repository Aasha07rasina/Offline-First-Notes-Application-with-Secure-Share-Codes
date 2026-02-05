const express = require('express');
const router = express.Router();
const shareController = require('../controllers/shareController');
const {validateNotes} = require('../middleware/validate');

router.post('/share' , shareController.createShareCode);
router.get('/share/:code' , shareController.getNotesByCode);

module.exports = router;