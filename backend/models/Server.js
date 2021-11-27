//* IMPORTS
const mongoose = require('mongoose');

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
  invitation: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Invitation',
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
