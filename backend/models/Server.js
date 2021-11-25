//* IMPORTS
const mongoose = require('mongoose');

//     * SCHEMAS
const User = require('./User');
const Room = require('./Room');
const Invation = require('./Invation');

//! SCHEMA
const ServerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'provide servername'],
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  admin: {
    type: User,
    required: [true, 'provide server admin'],
  },
  rooms: [Room],
  users: [User],
  invations: [Invation],
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

//! USER MIDDLEWARE
ServerSchema.pre('save', async function (next) {
  this.updatedAt = Date.now();
  next();
});

const ServerSchema = mongoose.model('Server', ServerSchema);

module.exports = ServerSchema;
