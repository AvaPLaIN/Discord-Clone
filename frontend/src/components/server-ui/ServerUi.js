//* IMPORTS
//     * REACT
import React from 'react';

//     * COMPONENTS
import { ServerUiComponent } from './ServerUi.styled';
import RoomList from '../room-list/RoomList';
import RoomDetails from '../room-details/RoomDetails';

//     * REDUX

const ServerUi = () => {
  return (
    <ServerUiComponent>
      <RoomList />
      <RoomDetails />
    </ServerUiComponent>
  );
};

export default ServerUi;
