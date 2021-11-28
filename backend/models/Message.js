//* IMPORTS
const mongoose = require('mongoose');

//     * SCHEMAS
const { UserSchema } = require('./User');

//! SCHEMA
const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Provide message'],
    trim: true,
    minlength: 1,
    maxlength: 200,
  },
  from: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: [true, 'provide from user'],
  },
  roomId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Room',
    required: [true, 'provide room id'],
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

const Message = mongoose.model('Message', MessageSchema);

module.exports = { Message, MessageSchema };
