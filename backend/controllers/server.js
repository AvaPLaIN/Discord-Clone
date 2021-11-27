//* IMPORTS
const ErrorResponse = require('../utils/errorResponse');
const { Server } = require('../models/Server');
const { User } = require('../models/User');

exports.createServer = async (req, res, next) => {
  const user = req.user;
  const { servername } = req.body;

  //* INPUT VALIDATION
  //TODO validate servername regex
  if (!servername)
    return next(new ErrorResponse('Provide valid servername', 400));

  try {
    const server = await Server.create({
      name: servername,
      admin: user._id,
      users: [user._id],
    });
    await server.save();

    user.servers = [...user.servers, server._id];
    await user.save();

    res.status(200).json({
      success: true,
      data: server,
    });
  } catch (error) {
    next(error);
  }
};

exports.getServersFromUniqueUser = async (req, res, next) => {
  const user = req.user;

  try {
    const { servers } = await User.findOne({ _id: user._id }).populate(
      'servers'
    );

    res.status(200).json({
      success: true,
      data: servers,
    });
  } catch (error) {
    next(error);
  }
};
