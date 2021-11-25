//* IMPORTS
const mongoose = require('mongoose');

//     * SCHEMAS
const User = require('./User');

//! SCHEMA
const InvationSchema = new mongoose.Schema({
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
  createdBy: User,
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

//! USER MIDDLEWARE
InvationSchema.pre('save', async function (next) {
  this.updatedAt = Date.now();
  next();
});

const InvationSchema = mongoose.model('Invation', InvationSchema);

module.exports = InvationSchema;
