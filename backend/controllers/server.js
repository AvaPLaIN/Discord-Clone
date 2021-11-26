//* IMPORTS
const { Server } = require('../models/Server');

exports.createServer = async (req, res, next) => {
  const user = req.user;
  const { servername } = req.body;

  console.log(user, servername);

  const server = await Server.create({
    name: servername,
    admin: user._id,
  });
  await server.save();

  user.servers = [...user.servers, server._id];
  await user.save();

  res.status(200).json({
    success: true,
    data: server,
  });
};
