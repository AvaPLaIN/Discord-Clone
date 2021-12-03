//* IMPORTS
const { randomBytes } = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const { Invitation } = require('../models/Invitation');
const { Server } = require('../models/Server');
const { User } = require('../models/User');

exports.createInvitation = async (req, res, next) => {
  const user = req.user;
  const { number, serverId } = req.body;
  let { expiresIn } = req.body;

  //* INPUT VALIDATION
  //TODO validate message regex
  if (!expiresIn || !number || !serverId)
    return next(new ErrorResponse('Provide credentials', 400));

  expiresIn = Date.now() + expiresIn * 24 * 60 * 60 * 1000;

  try {
    const server = await Server.findOne({ _id: serverId });

    if (!server)
      return next(new ErrorResponse('Provide valid credentials', 400));

    const token = `${randomBytes(32).toString(
      'hex'
    )}/${Date.now()}/${serverId}`;

    const newInvitation = await Invitation.create({
      token,
      serverId,
      expiresIn,
      number,
      createdBy: user._id,
    });
    await newInvitation.save();

    res.status(200).json({
      success: true,
      data: newInvitation.token,
    });
  } catch (error) {
    next(error);
  }
};

exports.joinServerWithInvitation = async (req, res, next) => {
  const authUser = req.user;
  const { token } = req.body;

  if (!token) return next(new ErrorResponse('Provide credentials', 400));

  try {
    const invitation = await Invitation.findOne({ token });
    if (!invitation) return next(new ErrorResponse('no token found', 400));

    //* check expiresIn
    const expiresIn = invitation.expiresIn;
    if (expiresIn < Date.now()) {
      await Invitation.deleteOne({ token });
      return next(new ErrorResponse('Token is not valid anymore', 400));
    }
    //* check number
    const number = invitation.number;
    if (number === 0) {
      await Invitation.deleteOne({ token });
      return next(new ErrorResponse('Token is not valid anymore', 400));
    }

    if (number > 0) invitation.number - 1;
    invitation.save();

    const server = await Server.findOne({ _id: invitation.serverId });
    if (server.users.includes(authUser._id))
      return next(new ErrorResponse('You are already on the server', 400));

    server.users = [...server.users, authUser._id];
    server.save();

    const user = await User.findOne({ _id: authUser._id });
    user.servers = [...user.servers, invitation.serverId];
    user.save();

    res.status(200).json({
      success: true,
      data: server,
    });
  } catch (error) {
    next(error);
  }
};
