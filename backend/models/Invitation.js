//* IMPORTS
const mongoose = require('mongoose');

//! SCHEMA
const InvitationSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, 'Provide message'],
    trim: true,
    unique: true,
  },
  serverId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Server',
    required: [true, 'provide serverId'],
  },
  expiresIn: {
    type: Date,
    required: [true, 'provide expiresIn'],
  },
  number: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: [true, 'provide created by user'],
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

//! USER MIDDLEWARE
InvitationSchema.pre('save', async function (next) {
  this.updatedAt = Date.now();
  next();
});

const Invitation = mongoose.model('Invitation', InvitationSchema);

module.exports = { Invitation, InvitationSchema };
