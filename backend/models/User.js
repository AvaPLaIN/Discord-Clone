//* IMPORTS
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// const { Server } = require('../models/Server');

//     * VALIDATE
const {
  validateEmail,
  validateUsername,
  validatePassword,
} = require('../utils/validate');

//! SCHEMA
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Provide username'],
    trim: true,
    minlength: 3,
    maxlength: 30,
    match: [
      /^(?=.{3,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Provide valid username',
    ],
  },
  hash: {
    type: String,
    default: '#number',
  },
  email: {
    type: String,
    required: [true, 'Provide email'],
    lowercase: true,
    trim: true,
    minlength: 2,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Provide valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Provide password '],
    trim: true,
    minlength: 8,
    select: false,
  },
  friends: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'User',
    default: [],
  },
  servers: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Server',
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
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  verified: Boolean,
  verifiedToken: String,
});

//! USER MIDDLEWARE
//     ! BCRYPT PASSWORD
UserSchema.pre('save', async function (next) {
  this.updatedAt = Date.now();

  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

//     ! COMPARE PASSWORD
UserSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//     ! GENERATE JWT TOKEN
UserSchema.methods.getSignedJwtAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
  });
};

UserSchema.methods.getSignedJwtRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); //? Ten Minutes

  return resetToken;
};

UserSchema.methods.getValidateToken = function () {
  const verifyToken = crypto.randomBytes(20).toString('hex');

  this.verifiedToken = crypto
    .createHash('sha256')
    .update(verifyToken)
    .digest('hex');

  return verifyToken;
};

const User = mongoose.model('User', UserSchema);

module.exports = { User, UserSchema };
