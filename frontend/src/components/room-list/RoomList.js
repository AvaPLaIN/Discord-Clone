//* IMPORTS
//     * REACT
import { useState, useEffect } from 'react';

//     * COMPONENTS
import { RoomListComponent } from './RoomList.styled';
import RoomItem from '../room-item/RoomItem';

//     * REDUX
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentRoom } from '../../redux/ducks/server';

//     * SERVICES
import { getRoomsFromUniqueServer } from '../../services/server';

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faCertificate,
  faMicrophone,
  faHeadphones,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

const RoomList = () => {
  const dispatch = useDispatch();

  const serverId = useSelector((state) => state?.server?.currentServer?._id);
  const serverName = useSelector((state) => state?.server?.currentServer?.name);
  const accessToken = useSelector((state) => state?.user?.user?.accessToken);
  const { username } = useSelector((state) => state.user.user);

  const [rooms, setRooms] = useState([]);

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

  return (
    <RoomListComponent>
      <div className="room-header">
        {/* <div className="certificate">
          <FontAwesomeIcon className="icon" icon={faCertificate} />
          <p>0</p>
        </div> */}
        <h1>{serverName}</h1>
        <FontAwesomeIcon className="icon" icon={faAngleDown} />
      </div>
      <div className="room-list">
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
    </RoomListComponent>
  );
};

export default RoomList;
