//* IMPORTS
//     * REACT

//     * COMPONENTS
import { ServerItemComponent } from './ServerItem.styled';

//     * REDUX

//     * UTILS
import { randomColor } from '../../utils/random';

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const ServerItem = ({ server, setCurrentServer }) => {
  return (
    <ServerItemComponent
      backgroundColor={randomColor()}
      onClick={() => setCurrentServer(server)}
    >
      <FontAwesomeIcon className="server-icon" icon={faDiscord} />
      <div className="description">{server?.name}</div>
    </ServerItemComponent>
  );
};

export default ServerItem;
