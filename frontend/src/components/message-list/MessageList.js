//* IMPORTS
//     * REACT
import { useState, useEffect } from 'react';

//     * COMPONENTS
import { MessageListComponent } from './MessageList.styled';
import MessageItem from '../message-item/MessageItem';

//     * REDUX
import { useSelector } from 'react-redux';

//     * SERVICES
import { getMessagesFromUniqueRoom } from '../../services/server';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const roomId = useSelector((state) => state?.server?.currentRoom?._id);
  const accessToken = useSelector((state) => state?.user?.user?.accessToken);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessagesFromUniqueRoom(accessToken, roomId);
      setMessages(data.data);
    };
    roomId ? fetchMessages() : setMessages([]);
  }, [roomId, accessToken]);

  return (
    <MessageListComponent>
      {messages?.map((message) => (
        <MessageItem key={message?._id} message={message} />
      ))}
    </MessageListComponent>
  );
};

export default MessageList;
