//* IMPORTS
//     * REACT
import React, { useState, useEffect } from 'react';

//     * COMPONENTS
import { MemberListComponent } from './MemberList.styled';
import MemberItem from '../member-item/MemberItem';

//     * REDUX
import { useSelector } from 'react-redux';

//     * SERVICES
import { getMembersFromUniqueServer } from '../../services/server';
import { socket } from '../../services/socket';

//     * FONT AWESOME

const MemberList = () => {
  const accessToken = useSelector((state) => state?.user?.user?.accessToken);
  const serverId = useSelector((state) => state?.server?.currentServer?._id);

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const data = await getMembersFromUniqueServer(accessToken, serverId);
      setMembers(data?.data);
    };

    serverId ? fetchMembers() : setMembers([]);
  }, [serverId, accessToken]);

  useEffect(() => {
    socket.on('newMember', (data) => {
      setMembers((prev) => [...prev, data]);
    });
  }, []);

  return (
    <MemberListComponent>
      {members?.map((member) => (
        <MemberItem key={member?._id} member={member} />
      ))}
    </MemberListComponent>
  );
};

export default MemberList;
