//* IMPORTS
//     * REACT
import React from 'react';

//     * COMPONENTS
import { RoomDetailsComponent } from './RoomDetails.styled';
import Chatbox from '../chatbox/Chatbox';
import MemberList from '../member-list/MemberList';

//     * REDUX
import { useSelector } from 'react-redux';

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHashtag,
  faBell,
  faThumbtack,
  faUserFriends,
  faSearch,
  faInbox,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

const RoomDetails = () => {
  const roomName = useSelector((state) => state?.server?.currentRoom?.name);

  return (
    <RoomDetailsComponent>
      <div className="header">
        <div className="room-details">
          <FontAwesomeIcon className="icon" icon={faHashtag} />
          <h1>{roomName}</h1>
        </div>
        <div className="room-settings">
          <FontAwesomeIcon className="icon" icon={faHashtag} />
          <FontAwesomeIcon className="icon" icon={faBell} />
          <FontAwesomeIcon className="icon" icon={faThumbtack} />
          <FontAwesomeIcon className="icon" icon={faUserFriends} />
          <div className="search">
            <input type="text" placeholder="Search" />
            <FontAwesomeIcon className="icon" icon={faSearch} />
          </div>
          <FontAwesomeIcon className="icon" icon={faInbox} />
          <FontAwesomeIcon className="icon" icon={faQuestionCircle} />
        </div>
      </div>
      <div className="room-ui">
        <Chatbox />
        <MemberList />
      </div>
    </RoomDetailsComponent>
  );
};

export default RoomDetails;
