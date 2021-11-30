import styled from 'styled-components';

export const MemberListComponent = styled.div`
  width: 250px;
  background-color: #292626;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;
