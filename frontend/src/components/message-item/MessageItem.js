//* IMPORTS
//     * REACT

//     * COMPONENTS
import { MessageItemComponent } from './MessageItem.styled';

//     * REDUX

//     * SERVICES

//     * UTILS

const MessageItem = ({ message }) => {
  return (
    <MessageItemComponent>
      <div className="details">
        <h1>{message?.from?.username}</h1>
        <p>{message?.createdAt}</p>
      </div>
      <p>{message?.message}</p>
    </MessageItemComponent>
  );
};

export default MessageItem;
