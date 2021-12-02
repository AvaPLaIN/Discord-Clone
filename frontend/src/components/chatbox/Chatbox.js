//* IMPORTS
//     * REACT
import React, { useState, useEffect } from 'react';

//     * COMPONENTS
import { ChatBoxComponent } from './Chatbox.styled';
import MessageList from '../message-list/MessageList';

//     * REDUX
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../../redux/ducks/server';

//     * SERVICES
import { createMessage } from '../../services/server';
import { socket } from '../../services/socket';

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faGift,
  faGrin,
} from '@fortawesome/free-solid-svg-icons';

const Chatbox = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state?.user?.user?.accessToken);
  const roomId = useSelector((state) => state?.server?.currentRoom?._id);
  const [message, setMessage] = useState('');

  //* HANDLER
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const newMessage = await createMessage(accessToken, roomId, message);
      // dispatch(addMessage(newMessage.data));
      socket.emit('addMessage', { message: newMessage, roomId });
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChatBoxComponent>
      <MessageList />
      <div className="controller">
        <FontAwesomeIcon className="icon" icon={faPlusCircle} />
        <form className="form" onSubmit={handleSendMessage}>
          <input
            disabled={!roomId}
            type="text"
            placeholder="type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        <FontAwesomeIcon className="icon" icon={faGift} />
        <FontAwesomeIcon className="icon" icon={faGrin} />
      </div>
    </ChatBoxComponent>
  );
};

export default Chatbox;
