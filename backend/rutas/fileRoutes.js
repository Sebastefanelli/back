const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { authenticateToken } = require('../middleware/authMiddleware');
const fileController = require('../controllers/fileController');

router.get('/:folder?', fileController.getFiles);
router.post('/upload', authenticateToken, upload.single('file'), fileController.uploadFile);

module.exports = router;
