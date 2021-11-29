//* IMPORTS
//     * REACT
import { useState, useEffect } from 'react';

//     * COMPONENTS
import { ServerListComponent } from './ServerList.styled';
import ServerItem from '../server-item/ServerItem';

//     * REDUX
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentServer } from '../../redux/ducks/server';

//     * SERVICES
import { getServersFromUniqueUser } from '../../services/server';

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const ServerList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchServers = async () => {
      const data = await getServersFromUniqueUser(user.accessToken);
      setServers(data.data);
    };

    fetchServers();
  }, [user.accessToken]);

  //* HANDLER
  const handleSetCurrentServer = (server) => {
    dispatch(setCurrentServer(server));
  };

  return (
    <ServerListComponent>
      <div className="home">
        <FontAwesomeIcon className="server-icon" icon={faDiscord} />
        <div className="description">Home</div>
      </div>
      {servers.map((server) => (
        <ServerItem
          key={server._id}
          server={server}
          setCurrentServer={handleSetCurrentServer}
        />
      ))}
    </ServerListComponent>
  );
};

export default ServerList;
