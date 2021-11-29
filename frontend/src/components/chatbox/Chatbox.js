//* IMPORTS
//     * REACT
import { useState } from 'react';

//     * COMPONENTS
import { ChatBoxComponent } from './Chatbox.styled';
import MessageList from '../message-list/MessageList';

//     * REDUX
import { useSelector } from 'react-redux';

//     * SERVICES
import { createMessage } from '../../services/server';

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faGift,
  faGrin,
} from '@fortawesome/free-solid-svg-icons';

const Chatbox = () => {
  const accessToken = useSelector((state) => state?.user?.user?.accessToken);
  const roomId = useSelector((state) => state?.server?.currentRoom?._id);
  const [message, setMessage] = useState('');

  //* HANDLER
  const handleSendMessage = async (e) => {
    e.preventDefault();
    await createMessage(accessToken, roomId, message);
    setMessage('');
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
