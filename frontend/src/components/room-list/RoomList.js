//* IMPORTS
//     * REACT
import { useState, useEffect, useRef } from 'react';

//     * COMPONENTS
import { RoomListComponent } from './RoomList.styled';
import RoomItem from '../room-item/RoomItem';

//     * REDUX
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentRoom } from '../../redux/ducks/server';

//     * SERVICES
import { getRoomsFromUniqueServer, createRoom } from '../../services/server';

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
  const serverName = useSelector((state) => state?.server?.currentServer?.name);
  const accessToken = useSelector((state) => state?.user?.user?.accessToken);
  const { username } = useSelector((state) => state?.user?.user);

  const [rooms, setRooms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [roomNameInput, setRoomNameInput] = useState('');

  //* REFS
  const addContainer = useRef();

  useOnClickOutside(addContainer, () => setIsOpen(false));

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getRoomsFromUniqueServer(accessToken, serverId);
      setRooms(data?.data);
    };
    if (serverId) fetchRooms();
  }, [serverId, accessToken]);

  //* HANDLER
  const handleSetCurrentRoom = (room) => {
    dispatch(setCurrentRoom(room));
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    createRoom(accessToken, serverId, roomNameInput);
    setRoomNameInput('');
    setIsOpen(false);
  };

  return (
    <RoomListComponent isOpen={isOpen}>
      <div className="room-header">
        <h1>{serverName}</h1>
        <FontAwesomeIcon className="icon" icon={faAngleDown} />
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
    </RoomListComponent>
  );
};

export default RoomList;
