//* IMPORTS
//     * REACT

//     * COMPONENTS
import { ServerItemComponent } from './ServerItem.styled';

//     * REDUX

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const ServerItem = ({ server }) => {
  const colors = [
    '#9d39c5',
    '#f293b1',
    '#70d22d',
    '#2abfb0',
    '#653ff8',
    '#ce9318',
  ];

  return (
    <ServerItemComponent
      backgroundColor={colors[Math.floor(Math.random() * colors.length)]}
    >
      <FontAwesomeIcon className="server-icon" icon={faDiscord} />
      <div className="description">{server.name}</div>
    </ServerItemComponent>
  );
};

export default ServerItem;
