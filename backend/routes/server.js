const express = require('express');
const router = express.Router();

//! IMPORT CONTROLLERS
const { createServer } = require('../controllers/server');

//! IMPORT MIDDLEWARE
const { protect } = require('../middleware/auth');

router.route('/createServer').post(protect, createServer);

module.exports = router;
