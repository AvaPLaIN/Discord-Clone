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
  expiresIn: {
    type: Date,
  },
  number: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  createdBy: mongoose.SchemaTypes.ObjectId,
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

const Invation = mongoose.model('Invitation', InvitationSchema);

module.exports = { Invation, InvitationSchema };
