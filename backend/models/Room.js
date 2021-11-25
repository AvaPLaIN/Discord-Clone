//* IMPORTS
const mongoose = require('mongoose');

//     * SCHEMAS
const User = require('./User');
const Message = require('./Message');

//! SCHEMA
const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'provide roomname'],
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  messages: [Message],
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
RoomSchema.pre('save', async function (next) {
  this.updatedAt = Date.now();
  next();
});

const RoomSchema = mongoose.model('Room', RoomSchema);

module.exports = RoomSchema;
