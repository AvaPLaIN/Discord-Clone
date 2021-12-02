//* IMPORTS
//     * REACT
import React, { useState, useEffect, useRef } from 'react';

//     * COMPONENTS
import { RoomListComponent } from './RoomList.styled';
import RoomItem from '../room-item/RoomItem';

//     * REDUX
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentRoom } from '../../redux/ducks/server';

//     * SERVICES
import {
  getRoomsFromUniqueServer,
  createRoom,
  createInvitation,
} from '../../services/server';
import { socket } from '../../services/socket';

//     * HOOKS
import useOnClickOutside from '../../hooks/useOnClickOutside';

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faMicrophone,
  faHeadphones,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

const RoomList = () => {
  const dispatch = useDispatch();

  const serverId = useSelector((state) => state?.server?.currentServer?._id);
  const serverAdmin = useSelector(
    (state) => state?.server?.currentServer?.admin
  );
  const currentRoomId = useSelector((state) => state?.server?.currentRoom?._id);
  const serverName = useSelector((state) => state?.server?.currentServer?.name);
  const accessToken = useSelector((state) => state?.user?.user?.accessToken);
  const { username, id } = useSelector((state) => state?.user?.user);

  const [rooms, setRooms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [roomNameInput, setRoomNameInput] = useState('');
  const [invitationNumber, setInvitationNumber] = useState(1);
  const [invitationExpiresIn, setInvitationExpiresIn] = useState(1);
  const [newToken, setNewToken] = useState('');

  //* REFS
  const addContainer = useRef();
  const invitationContainer = useRef();

  useOnClickOutside(addContainer, () => setIsOpen(false));
  useOnClickOutside(invitationContainer, () => setIsInvitationOpen(false));

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getRoomsFromUniqueServer(accessToken, serverId);
      setRooms(data?.data);
    };
    if (serverId) fetchRooms();
  }, [serverId, accessToken]);

  useEffect(() => {
    socket.on('userJoinedRoom', (data) => {
      console.log('userJoinedRoom: ', data);
    });

    return () => socket.disconnect();
  }, []);

  //* HANDLER
  const handleSetCurrentRoom = (room) => {
    currentRoomId &&
      socket.emit('leaveRoom', { userId: id, roomId: currentRoomId });

    dispatch(setCurrentRoom(room));

    socket.emit('joinRoom', { userId: id, roomId: room._id });
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    createRoom(accessToken, serverId, roomNameInput);
    setRoomNameInput('');
    setIsOpen(false);
  };

  const handleCreateInvitation = async (e) => {
    e.preventDefault();
    console.log('here');
    console.log(accessToken, invitationNumber, serverId, invitationExpiresIn);
    const data = await createInvitation(
      accessToken,
      invitationNumber,
      serverId,
      invitationExpiresIn
    );
    setNewToken(data?.data);
  };

  const handleSetInvitationOpen = () => {
    if (serverAdmin === id) {
      setIsInvitationOpen(true);
    }
  };

  return (
    <RoomListComponent isOpen={isOpen} isInvitationOpen={isInvitationOpen}>
      <div className="room-header">
        <h1>{serverName}</h1>
        <FontAwesomeIcon
          onClick={handleSetInvitationOpen}
          className="icon"
          icon={faAngleDown}
        />
      </div>
      <div className="room-list">
        {serverId && (
          <div className="create">
            <button onClick={() => setIsOpen(true)}>Create</button>
          </div>
        )}
        {rooms.map((room) => (
          <RoomItem
            key={room?._id}
            room={room}
            setCurrentRoom={handleSetCurrentRoom}
          />
        ))}
      </div>
      <div className="profile">
        <div className="info">
          <h2>{username}</h2>
          <p>#1212</p>
        </div>
        <div className="settings">
          <FontAwesomeIcon className="icon" icon={faMicrophone} />
          <FontAwesomeIcon className="icon" icon={faHeadphones} />
          <FontAwesomeIcon className="icon" icon={faCog} />
        </div>
      </div>
      <div className="add">
        <div ref={addContainer} className="container">
          <div className="header">
            <button onClick={() => setIsOpen(false)}>X</button>
          </div>
          <div className="create-room">
            <form onSubmit={handleCreateRoom}>
              <input
                type="text"
                placeholder="roomname..."
                value={roomNameInput}
                onChange={(e) => setRoomNameInput(e.target.value)}
              />
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>
      <div className="invitation">
        <div ref={invitationContainer} className="container">
          <div className="header">
            <p>Create Invitation Token</p>
            <button onClick={() => setIsInvitationOpen(false)}>X</button>
          </div>
          <div className="create-invitation">
            <form onSubmit={handleCreateInvitation}>
              <div>
                <label htmlFor="expiresIn">Expires In</label>
                <select
                  id="expiresIn"
                  value={invitationExpiresIn}
                  onChange={(e) => setInvitationExpiresIn(e.target.value)}
                >
                  <option value={1}>1 Day</option>
                  <option value={3}>3 Days</option>
                  <option value={7}>7 Days</option>
                  <option value={14}>14 Days</option>
                  {/* <option value={-1}>unlimited</option> */}
                </select>
              </div>
              <div>
                <label htmlFor="number">Uses</label>
                <select
                  id="number"
                  value={invitationNumber}
                  onChange={(e) => setInvitationNumber(e.target.value)}
                >
                  <option value={1}>1 use</option>
                  <option value={5}>5 uses</option>
                  <option value={10}>10 uses</option>
                  <option value={20}>20 uses</option>
                  {/* <option value={-1}>unlimited</option> */}
                </select>
              </div>
              <button type="submit">Create</button>
              {newToken && <input value={newToken} />}
            </form>
          </div>
        </div>
      </div>
    </RoomListComponent>
  );
};

export default RoomList;
