//* IMPORTS
const mongoose = require('mongoose');

//     * SCHEMAS
const User = require('./User');

//! SCHEMA
const MessageSchema = new mongoose.Schema({
  messages: {
    type: String,
    required: [true, 'Provide message'],
    trim: true,
    minlength: 1,
    maxlength: 200,
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
MessageSchema.pre('save', async function (next) {
  this.updatedAt = Date.now();
  next();
});

const MessageSchema = mongoose.model('Message', MessageSchema);

module.exports = MessageSchema;
