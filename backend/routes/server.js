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
const {
  getMessagesFromUniqueRoom,
  createMessage,
} = require('../controllers/messages');

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
  .route('/getRoomsFromUniqueServer/:serverId')
  .get(protect, getRoomsFromUniqueServer);

//* messages controllers
router
  .route('/getMessagesFromUniqueRoom/:roomId')
  .get(protect, getMessagesFromUniqueRoom);
router.route('/createMessage').post(protect, createMessage);

module.exports = router;
