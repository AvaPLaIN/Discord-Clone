//* IMPORTS
const ErrorResponse = require('../utils/errorResponse');
const { Server } = require('../models/Server');

exports.getUsersFromUniqueServer = async (req, res, next) => {
  const user = req.user;
  const serverId = req.body._id;

  //* INPUT VALIDATION
  if (!serverId) return next(new ErrorResponse('Provide valid server id', 400));

  try {
    const server = await Server.findOne({ _id: serverId });
    const users = [];
    if (server.users.length) users = server.populate('users');

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
