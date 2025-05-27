const express = require('express');
const router = express.Router();
const { getNDVITileUrl } = require('../controllers/ndviController');

router.post('/tile-url', getNDVITileUrl);

console.log("✅ NDVI route loaded");

module.exports = router;
