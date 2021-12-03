//* IMPORTS
//     * REACT
import React, { useState, useEffect, useRef } from 'react';

//     * COMPONENTS
import { ServerListComponent } from './ServerList.styled';
import ServerItem from '../server-item/ServerItem';

//     * REDUX
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentServer } from '../../redux/ducks/server';

//     * SERVICES
import { getServersFromUniqueUser, createServer } from '../../services/server';
import { joinServerWithInvitation } from '../../services/server';
import { socket } from '../../services/socket';

//     * HOOKS
import useOnClickOutside from '../../hooks/useOnClickOutside';

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const ServerList = () => {
  //* STATES
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state?.user?.user?.accessToken);
  const userId = useSelector((state) => state?.user?.user?.id);
  const currentServerId = useSelector(
    (state) => state?.server?.currentServer?._id
  );
  const [servers, setServers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [serverNameInput, setServerNameInput] = useState('');
  const [serverInvitationInput, setServerInvitationInput] = useState('');

  //* REFS
  const addContainer = useRef();

  useOnClickOutside(addContainer, () => setIsOpen(false));

  //* USE-EFFECT
  useEffect(() => {
    const fetchServers = async () => {
      const data = await getServersFromUniqueUser(accessToken);
      setServers(data.data);
    };

    fetchServers();
  }, [accessToken]);

  useEffect(() => {
    return () => socket.emit('leaveServer', { serverId: currentServerId });
  });

  //* HANDLER
  const handleSetCurrentServer = (server) => {
    currentServerId &&
      socket.emit('leaveServer', { serverId: currentServerId });

    dispatch(setCurrentServer(server));

    socket.emit('joinServer', { serverId: server._id });
  };

  const handleCreateServer = (e) => {
    e.preventDefault();
    createServer(accessToken, serverNameInput);
    setServerNameInput('');
    setServerInvitationInput('');
    setIsOpen(false);
  };

  const handleJoinServer = (e) => {
    e.preventDefault();
    joinServerWithInvitation(accessToken, serverInvitationInput);
    setServerNameInput('');
    setServerInvitationInput('');
    setIsOpen(false);
  };

  return (
    <ServerListComponent isOpen={isOpen}>
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
      <div className="create">
        <FontAwesomeIcon
          onClick={() => setIsOpen(true)}
          className="server-icon"
          icon={faPlus}
        />
        <div className="description">Add Server</div>
      </div>
      <div className="add">
        <div ref={addContainer} className="container">
          <div className="header">
            <button onClick={() => setIsOpen(false)}>X</button>
          </div>
          <div className="create-server">
            <form onSubmit={handleCreateServer}>
              <input
                type="text"
                placeholder="servername..."
                value={serverNameInput}
                onChange={(e) => setServerNameInput(e.target.value)}
              />
              <button type="submit">Create</button>
            </form>
          </div>
          <div className="join">
            <form onSubmit={handleJoinServer}>
              <input
                type="text"
                placeholder="invitation-link..."
                value={serverInvitationInput}
                onChange={(e) => setServerInvitationInput(e.target.value)}
              />
              <button type="submit">Join</button>
            </form>
          </div>
        </div>
      </div>
    </ServerListComponent>
  );
};

export default ServerList;
