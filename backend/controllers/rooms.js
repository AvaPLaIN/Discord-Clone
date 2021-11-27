//* IMPORTS
const ErrorResponse = require('../utils/errorResponse');
const { Server } = require('../models/Server');
const { Room } = require('../models/Room');
const { User } = require('../models/User');

exports.createRoom = async (req, res, next) => {
  const user = req.user;
  const { roomName, serverId } = req.body;

  //* INPUT VALIDATION
  //TODO validate servername regex
  if (!roomName) return next(new ErrorResponse('Provide valid roomName', 400));

  try {
    const room = await Room.create({
      name: roomName,
    });
    await room.save();

    const server = await Server.findOne({ _id: serverId });
    server.rooms = [...server.rooms, room._id];
    await server.save();

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

exports.getRoomsFromUniqueServer = async (req, res, next) => {
  const user = req.user;
  const serverId = req.body._id;

  //* INPUT VALIDATION
  if (!serverId) return next(new ErrorResponse('Provide valid server id', 400));

  try {
    const server = await Server.findOne({ _id: serverId });
    let rooms = [];

    if (server.rooms.length) {
      rooms = await server.populate('rooms');
      rooms = rooms.rooms;
    }

    res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    next(error);
  }
};
