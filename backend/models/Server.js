//* IMPORTS
const mongoose = require('mongoose');

//     * SCHEMAS
const { User, UserSchema } = require('./User');
const { RoomSchema } = require('./Room');
const { InvationSchema } = require('./Invation');

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
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: [true, 'provide server admin'],
  },
  rooms: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Room',
    default: [],
  },
  users: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'User',
    default: [],
  },
  invations: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Invation',
    default: [],
  },
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

const Server = mongoose.model('Server', ServerSchema);

module.exports = { Server, ServerSchema };
