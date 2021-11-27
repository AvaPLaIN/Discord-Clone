const express = require('express');
const router = express.Router();

//! IMPORT CONTROLLERS
const {
  createServer,
  getServersFromUniqueUser,
} = require('../controllers/server');
const { getUsersFromUniqueServer } = require('../controllers/users');
const {
  createRoom,
  getRoomsFromUniqueServer,
} = require('../controllers/rooms');

//! IMPORT MIDDLEWARE
const { protect } = require('../middleware/auth');

//! ROUTER
//* server controllers
router.route('/createServer').post(protect, createServer);
router
  .route('/getServersFromUniqueUser')
  .get(protect, getServersFromUniqueUser);

//* users controllers
router
  .route('/getUsersFromUniqueServer')
  .get(protect, getUsersFromUniqueServer);

//* rooms controllers
router.route('/createRoom').post(protect, createRoom);
router
  .route('/getRoomsFromUniqueServer')
  .get(protect, getRoomsFromUniqueServer);

module.exports = router;
