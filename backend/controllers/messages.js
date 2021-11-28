//* IMPORTS
const ErrorResponse = require('../utils/errorResponse');
const { Message } = require('../models/Message');

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
    const messages = await Message.find({ roomId });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};
