//* IMPORTS
//     * REACT
import React, { useRef, useEffect } from 'react';

//     * COMPONENTS
import { MessageListComponent } from './MessageList.styled';
import MessageItem from '../message-item/MessageItem';

//     * REDUX
import { useSelector, useDispatch } from 'react-redux';
import { resetMessages, setMessages } from '../../redux/ducks/server';

//     * SERVICES
import { getMessagesFromUniqueRoom } from '../../services/server';

const MessageList = () => {
  const dispatch = useDispatch();

  const containerRef = useRef();

  const messages = useSelector((state) => state?.server?.messages);
  const roomId = useSelector((state) => state?.server?.currentRoom?._id);
  const accessToken = useSelector((state) => state?.user?.user?.accessToken);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessagesFromUniqueRoom(accessToken, roomId);
      dispatch(setMessages(data.data));
    };
    roomId ? fetchMessages() : dispatch(resetMessages());
  }, [roomId, accessToken, dispatch]);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  return (
    <MessageListComponent ref={containerRef}>
      {messages?.map((message) => (
        <MessageItem key={message?._id} message={message} />
      ))}
    </MessageListComponent>
  );
};

export default MessageList;
