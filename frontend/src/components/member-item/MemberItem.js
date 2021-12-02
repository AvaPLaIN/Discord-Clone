//* IMPORTS
//     * REACT
import React from 'react';

//     * COMPONENTS
import { MemberItemComponent } from './MemberItem.styled';

//     * REDUX

//     * SERVICES

//     * FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const MemberItem = ({ member }) => {
  return (
    <MemberItemComponent>
      <FontAwesomeIcon className="icon" icon={faDiscord} />
      <h1>{member?.username}</h1>
    </MemberItemComponent>
  );
};

export default MemberItem;
