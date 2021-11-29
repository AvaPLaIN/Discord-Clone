//* IMPORTS
//     * REACT

//     * COMPONENTS
import { RoomItemComponent } from './RoomItem.styled';

//     * REDUX

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

const RoomItem = ({ room, setCurrentRoom }) => {
  return (
    <RoomItemComponent onClick={() => setCurrentRoom(room)}>
      <FontAwesomeIcon className="icon" icon={faHashtag} />
      <h1>{room?.name}</h1>
    </RoomItemComponent>
  );
};

export default RoomItem;
