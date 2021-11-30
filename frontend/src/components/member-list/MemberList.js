//* IMPORTS
//     * REACT
import { useState, useEffect } from 'react';

//     * COMPONENTS
import { MemberListComponent } from './MemberList.styled';
import MemberItem from '../member-item/MemberItem';

//     * REDUX
import { useSelector } from 'react-redux';

//     * SERVICES
import { getMembersFromUniqueServer } from '../../services/server';

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

  return (
    <MemberListComponent>
      {members?.map((member) => (
        <MemberItem key={member?._id} member={member} />
      ))}
    </MemberListComponent>
  );
};

export default MemberList;
