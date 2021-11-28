//* IMPORTS
const ErrorResponse = require('../utils/errorResponse');
const { Server } = require('../models/Server');
const { Message } = require('../models/Message');
const { Room } = require('../models/Room');
const { User } = require('../models/User');

exports.createMessage = async (req, res, next) => {
  const user = req.user;
  const { message, roomId } = req.body;

  //* INPUT VALIDATION
  //TODO validate message regex
  if (!message || !roomId)
    return next(new ErrorResponse('Provide valid credentials', 400));

  try {
    const newMessage = await Message.create({
      message,
      from: user._id,
      roomId,
    });
    await newMessage.save();

    // const room = await Room.findOne({ _id: roomId });
    // room.rooms = [...room.rooms, room._id];
    // await room.save();

    res.status(200).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMessagesFromUniqueRoom = async (req, res, next) => {
  const user = req.user;
  const roomId = req.body._id;

  //* INPUT VALIDATION
  if (!roomId) return next(new ErrorResponse('Provide valid room id', 400));

  try {
    const messages = await Messages.find({ roomId });
    // let messages = [];

    // if (room.messages.length) {
    //   messages = await room.populate('messages');
    //   messages = messages.messages;
    // }

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};
